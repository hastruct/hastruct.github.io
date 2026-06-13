// ============================================================
// QLDA.gs - Khao sat thuc trang Quan ly Du an
// HydroStructAI (HST - Tu van & Quan ly du an)
// ------------------------------------------------------------
// Project Apps Script doc lap (standalone), khong phu thuoc file nao khac.
// Deploy as Web App: Execute as Me | Anyone with access.
// Form tinh tai hydrostructai.com/apps/survey_form_qlda.html goi fetch POST
// (mode no-cors) den endpoint nay.
//
// QUAN TRONG: Cac chuoi gia tri trong calcLeadScore phai TRUNG KHOP tuyet doi
// voi thuoc tinh value cua option trong form (survey_form_qlda.html).
// ============================================================

const SPREADSHEET_ID_QLDA = "1zXgH9QVlCZh8F570wU4oi-gOVOlOK8DUoYQcCYykcfg";
const DRIVE_FOLDER_QLDA   = "1v09__x7JRisK3SYQEgifxPvj_y72ztQ0";
const CRM_EMAIL           = "ha.nguyen@hydrostructai.com";
const SENDER_NAME         = "HST- Tư vấn & Quản lý dự án";

// ------------------------------------------------------------
// doGet: health-check khi mo URL tren trinh duyet
// ------------------------------------------------------------
function doGet(e) {
  const html = '<html><body style="font-family:sans-serif;padding:32px;max-width:600px">' +
    '<h2 style="color:#1e3a8a">HST - Khao sat QLDA</h2>' +
    '<p>Endpoint dang hoat dong. Form tai: ' +
    '<a href="https://hydrostructai.com/apps/survey_form_qlda.html">hydrostructai.com/apps/survey_form_qlda.html</a></p>' +
    '</body></html>';
  return HtmlService.createHtmlOutput(html)
    .setTitle('HST QLDA Endpoint')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// ------------------------------------------------------------
// doPost router
// Form gui body: payload = JSON.stringify({ action:'khao-sat-qlda', ... })
// ------------------------------------------------------------
function doPost(e) {
  try {
    const raw = (e && e.parameter && e.parameter.payload) ? e.parameter.payload : "{}";
    const data = JSON.parse(raw);

    if (data.action === "khao-sat-qlda") {
      const result = saveKhaoSatQLDA(data);
      return jsonOut({ status: "ok", khId: result.khId, tag: result.tag });
    }
    return jsonOut({ status: "error", message: "Unknown action" });
  } catch (err) {
    return jsonOut({ status: "error", message: String(err) });
  }
}

function jsonOut(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// ------------------------------------------------------------
// Tinh diem lead (Lead Scoring)
// HOT >= 70 | WARM 40-69 | COLD < 40
// Cac chuoi so sanh dung dau tieng Viet, trung khop value trong form.
// ------------------------------------------------------------
function calcLeadScore(data) {
  let score = 0;

  if (data.quyMo === "Trên 500 tỷ")          score += 30;
  else if (data.quyMo === "100-500 tỷ")      score += 20;
  else if (data.quyMo === "10-100 tỷ")       score += 10;

  if (data.tuVanMienPhi === "Có")            score += 40;

  if (data.thoiDiem === "Ngay bây giờ")      score += 30;
  else if (data.thoiDiem === "1-3 tháng tới") score += 15;

  if (data.vaiTro === "Chủ đầu tư")          score += 10;

  return score;
}

function tagOf(score) {
  return score >= 70 ? "HOT" : score >= 40 ? "WARM" : "COLD";
}

// ------------------------------------------------------------
// Luu du lieu khao sat: 3 sheet + gui 2 email
// Dung LockService chong race condition
// ------------------------------------------------------------
function saveKhaoSatQLDA(data) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID_QLDA);
    initQLDASheets(ss); // tao sheet + header neu chua co

    const ts    = new Date();
    const khId  = "KH-" + ts.getTime() + "-" + Math.floor(Math.random() * 1000);
    const score = calcLeadScore(data);
    const tag   = tagOf(score);

    // Sheet 1: QLDA_KhachHang (1 hang)
    const khSheet = ss.getSheetByName("QLDA_KhachHang");
    khSheet.appendRow([
      ts,
      khId,
      data.hoTen || "",
      data.email || "",
      data.dienThoai || "",
      data.vaiTro || "",
      data.loaiDuAn || "",
      data.quyMo || "",
      data.khuVuc || "",
      score,
      tag,
      false // EmailSent, cap nhat sau khi gui xong
    ]);
    const khRow = khSheet.getLastRow();

    // Sheet 2: QLDA_ThucTrang (18 hang A1-D4)
    const thucTrang = data.thucTrang || [];
    if (thucTrang.length > 0) {
      const rows = thucTrang.map(function (q) {
        return [khId, q.nhom, q.ma, q.diem];
      });
      const sh = ss.getSheetByName("QLDA_ThucTrang");
      sh.getRange(sh.getLastRow() + 1, 1, rows.length, 4).setValues(rows);
    }

    // Sheet 3: QLDA_NhuCau (1 hang)
    ss.getSheetByName("QLDA_NhuCau").appendRow([
      khId,
      (data.khoKhan || []).join("; "),
      (data.dichVu || []).join("; "),
      data.tuVanMienPhi || "",
      data.thoiDiem || ""
    ]);

    // Gui email tai lieu cho nguoi khao sat
    let emailSent = false;
    if (data.email) {
      try {
        sendTaiLieuQLDA(data.email, data.hoTen || "");
        emailSent = true;
      } catch (mailErr) {
        Logger.log("Loi gui mail tai lieu: " + mailErr);
      }
    }
    khSheet.getRange(khRow, 12).setValue(emailSent); // cot L: EmailSent

    // CRM alert cho noi bo (chi HOT/WARM gui ngay)
    try {
      sendCRMAlert(data, score, tag);
    } catch (crmErr) {
      Logger.log("Loi gui CRM alert: " + crmErr);
    }

    return { khId: khId, tag: tag, score: score };
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}

// ------------------------------------------------------------
// Email gui tai lieu cho nguoi khao sat (noi dung tieng Viet co dau)
// ------------------------------------------------------------
function sendTaiLieuQLDA(email, hoTen) {
  const driveLink = "https://drive.google.com/drive/folders/" + DRIVE_FOLDER_QLDA + "?usp=sharing";
  const ten = (hoTen || "").trim();
  MailApp.sendEmail({
    to: email,
    subject: "Tặng Anh/Chị Bộ tài liệu Quản lý Dự án thực chiến",
    htmlBody: buildQLDAEmailHTML(ten, driveLink),
    name: SENDER_NAME,
    replyTo: CRM_EMAIL
  });
  // Tiep can qua link "Anyone with link" - ap dung cho moi loai email, khong can revoke.
}

function buildQLDAEmailHTML(hoTen, link) {
  const chao = hoTen ? ("Chào " + hoTen + ",") : "Chào Anh/Chị,";
  return '' +
'<div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;color:#202124;line-height:1.6">' +
  '<p>' + chao + '</p>' +
  '<p>Cảm ơn Anh/Chị đã dành thời gian tham gia khảo sát thực trạng Quản lý Dự án tại Việt Nam.</p>' +
  '<p>Tôi gửi Anh/Chị Bộ tài liệu Quản lý Dự án thực chiến, miễn phí và dùng ngay, ' +
    'tổng hợp từ kinh nghiệm thực tế các dự án hạ tầng, thủy lợi và xây dựng tại Việt Nam.</p>' +
  '<p style="margin-bottom:6px"><strong>Bộ tài liệu bao gồm:</strong></p>' +
  '<ul style="margin-top:0">' +
    '<li>Mẫu cấu trúc thư mục quản lý dự án (tham khảo)</li>' +
    '<li>Mẫu báo cáo tiến độ 1 trang (OPPM - One Page Project Manager)</li>' +
  '</ul>' +
  '<p style="text-align:center;margin:24px 0">' +
    '<a href="' + link + '" ' +
       'style="background:#1a73e8;color:#ffffff;padding:12px 28px;border-radius:6px;' +
       'text-decoration:none;font-weight:600;display:inline-block">Tải bộ tài liệu</a>' +
  '</p>' +
  '<hr style="border:none;border-top:1px solid #e0e0e0;margin:24px 0">' +
  '<p>Nếu Anh/Chị muốn trao đổi thêm về dự án đang triển khai, xin vui lòng ' +
  '<p>liên hệ: <a href="https://zaloapp.com/qr/p/fdy0yluq6pjx?src=qr">Zalo</a> | ' +
    '<a href="https://wa.me/84374874142">WhatsApp</a> | ' +
    'Email: <a href="mailto:ha.nguyen@hydrostructai.com">ha.nguyen@hydrostructai.com</a></p>' +
  '<p style="margin-top:24px">Trân trọng,<br>' +
    '<strong>HST - Tư vấn &amp; Quản lý dự án</strong><br>' +
    '<a href="mailto:ha.nguyen@hydrostructai.com">ha.nguyen@hydrostructai.com</a> | ' +
    '<a href="https://hydrostructai.com">hydrostructai.com</a></p>' +
  '<p style="font-size:11px;color:#9e9e9e;margin-top:20px">' +
    'Nếu bạn muốn ngừng nhận email, vui lòng reply "Hủy đăng ký".</p>' +
'</div>';
}

// ------------------------------------------------------------
// CRM alert cho noi bo (HOT/WARM gui ngay, COLD tong hop cuoi tuan)
// ------------------------------------------------------------
function sendCRMAlert(data, score, tag) {
  if (tag === "COLD") return; // COLD khong gui ngay

  const subject = "[" + tag + "] " + (data.hoTen || "Không tên") +
    " - " + (data.vaiTro || "") +
    " - " + (data.quyMo || "") +
    " - liên hệ " + (data.thoiDiem || "");

  const sheetUrl = "https://docs.google.com/spreadsheets/d/" + SPREADSHEET_ID_QLDA;

  const body = "" +
    "Lead mới từ Khảo sát QLDA\n\n" +
    "Họ tên:       " + (data.hoTen || "") + "\n" +
    "Email:        " + (data.email || "") + "\n" +
    "Điện thoại:   " + (data.dienThoai || "") + "\n" +
    "Vai trò:      " + (data.vaiTro || "") + "\n" +
    "Loại dự án:   " + (data.loaiDuAn || "") + "\n" +
    "Quy mô:       " + (data.quyMo || "") + "\n" +
    "Khu vực:      " + (data.khuVuc || "") + "\n" +
    "Tư vấn 30':   " + (data.tuVanMienPhi || "") + "\n" +
    "Thời điểm:    " + (data.thoiDiem || "") + "\n" +
    "Lead Score:   " + score + " (" + tag + ")\n\n" +
    "Khó khăn:     " + ((data.khoKhan || []).join("; ")) + "\n" +
    "Dịch vụ cần:  " + ((data.dichVu || []).join("; ")) + "\n\n" +
    "Xem Sheet:    " + sheetUrl;

  MailApp.sendEmail(CRM_EMAIL, subject, body);
}

// ------------------------------------------------------------
// Tao 3 sheet raw + header neu chua ton tai.
// Dashboard_QLDA tao rieng bang buildDashboardQLDA().
// ------------------------------------------------------------
function initQLDASheets(ss) {
  const schema = {
    "QLDA_KhachHang": ["Timestamp", "KH_ID", "HoTen", "Email", "DienThoai", "VaiTro",
                       "LoaiDuAn", "QuyMo", "KhuVuc", "LeadScore", "TrangThai", "EmailSent"],
    "QLDA_ThucTrang": ["KH_ID", "Nhom", "MaCauHoi", "DiemDanhGia"],
    "QLDA_NhuCau":    ["KH_ID", "KhoKhanLonNhat", "DichVuMongMuon", "TuVanMienPhi", "ThoiDiemLienHe"]
  };

  Object.keys(schema).forEach(function (name) {
    let sh = ss.getSheetByName(name);
    if (!sh) {
      sh = ss.insertSheet(name);
      const headers = schema[name];
      sh.getRange(1, 1, 1, headers.length)
        .setValues([headers])
        .setBackground("#1e3a8a")
        .setFontColor("#ffffff")
        .setFontWeight("bold");
      sh.setFrozenRows(1);
    }
  });
}

// ------------------------------------------------------------
// Chay 1 lan thu cong: set folder tai lieu thanh Anyone with link -> View
// ------------------------------------------------------------
function initDriveFolderSharing() {
  DriveApp.getFolderById(DRIVE_FOLDER_QLDA)
    .setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  Logger.log("OK: Folder " + DRIVE_FOLDER_QLDA + " da set Anyone with link -> View");
}

// ------------------------------------------------------------
// Tao / cap nhat sheet Dashboard_QLDA voi cong thuc tong hop
// Chay thu cong sau khi da co du lieu. Chart radar tao thu cong tu vung C.
// ------------------------------------------------------------
function buildDashboardQLDA() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID_QLDA);
  let sh = ss.getSheetByName("Dashboard_QLDA");
  if (!sh) sh = ss.insertSheet("Dashboard_QLDA");
  sh.clear();

  const rows = [
    ["DASHBOARD KHẢO SÁT QLDA", ""],
    ["", ""],
    ["A. TỔNG QUAN", ""],
    ["Tổng responses", '=COUNTA(QLDA_KhachHang!B2:B)'],
    ["HOT leads",      '=COUNTIF(QLDA_KhachHang!K:K,"HOT")'],
    ["WARM leads",     '=COUNTIF(QLDA_KhachHang!K:K,"WARM")'],
    ["COLD leads",     '=COUNTIF(QLDA_KhachHang!K:K,"COLD")'],
    ["Emails đã gửi",  '=COUNTIF(QLDA_KhachHang!L:L,TRUE)'],
    ["Muốn tư vấn 30'",'=COUNTIF(QLDA_NhuCau!D:D,"Có")'],
    ["", ""],
    ["C. ĐIỂM TRUNG BÌNH THỰC TRẠNG (cho Radar chart)", ""],
    ["Nhóm A - Năng lực nội bộ",   '=IFERROR(AVERAGEIF(QLDA_ThucTrang!B:B,"A",QLDA_ThucTrang!D:D),0)'],
    ["Nhóm B - Vấn đề thường gặp", '=IFERROR(AVERAGEIF(QLDA_ThucTrang!B:B,"B",QLDA_ThucTrang!D:D),0)'],
    ["Nhóm C - Sử dụng tư vấn",    '=IFERROR(AVERAGEIF(QLDA_ThucTrang!B:B,"C",QLDA_ThucTrang!D:D),0)'],
    ["Nhóm D - Chuyển đổi số",     '=IFERROR(AVERAGEIF(QLDA_ThucTrang!B:B,"D",QLDA_ThucTrang!D:D),0)'],
    ["", ""],
    ["E. PIPELINE (cho Funnel chart)", ""],
    ["HOT (liên hệ ngay)",  '=COUNTIF(QLDA_KhachHang!K:K,"HOT")'],
    ["WARM (1-3 tháng)",    '=COUNTIF(QLDA_KhachHang!K:K,"WARM")'],
    ["COLD (trên 3 tháng)", '=COUNTIF(QLDA_KhachHang!K:K,"COLD")']
  ];

  sh.getRange(1, 1, rows.length, 2).setValues(rows);

  sh.getRange("A1").setFontSize(14).setFontWeight("bold").setFontColor("#1e3a8a");
  ["A3", "A11", "A17"].forEach(function (a) {
    sh.getRange(a).setFontWeight("bold").setBackground("#e8f0fe").setFontColor("#1a237e");
  });
  sh.setColumnWidth(1, 280);
  sh.setColumnWidth(2, 140);

  Logger.log("OK: Dashboard_QLDA da tao. Insert > Chart: chon A12:B15 -> Radar chart | chon A18:B20 -> Funnel/Bar chart.");
}

