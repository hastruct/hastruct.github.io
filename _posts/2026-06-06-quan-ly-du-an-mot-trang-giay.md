---
title: "Quản lý dự án trên một trang giấy áp dụng cho xây dựng"
author_profile: true
author_name: "HST.AI"
date: 2026-06-06 08:00:00 +0700
layout: single
featured: true
toc: true
toc_sticky: true
toc_label: "Mục Lục"
permalink: "/posts/quan-ly-du-an-mot-trang-giay/"
categories:
  - Quản lý dự án
  - Xây dựng
  - Project-Management
tags:
  [
    OPPM,
    One-Page Project Manager,
    Quản lý dự án xây dựng,
    Clark A. Campbell,
    Dashboard quản lý,
    Tiến độ dự án,
    Kiểm soát chi phí,
    PMP,
    Phương pháp quản lý,
    Báo cáo dự án,
    Excel OPPM,
    Đầu tư xây dựng,
    Nghị định 175,
    Quản lý tiến độ
  ]
excerpt: "Trong quản lý dự án xây dựng, vấn đề không phải là thiếu thông tin mà là thừa thông tin không có cấu trúc. OPPM giải quyết bài toán này bằng cách nén toàn bộ dữ liệu của dự án về một trang duy nhất, giúp người ra quyết định đọc được tình trạng thực tế trong vòng chưa đầy hai phút."
header:
  overlay_color: "#f1f5f9"
  overlay_filter: "linear-gradient(135deg, rgba(27, 38, 59, 0.95), rgba(65, 90, 119, 0.8))"
  caption: "© HST - Tư vấn & Quản lý dự án"
---

## Đặt vấn đề

Một ban quản lý dự án hạ tầng quy mô vừa có thể tiếp nhận hàng chục báo cáo tiến độ mỗi tháng. Mỗi báo cáo dày từ mười đến ba mươi trang, với đủ loại biểu đồ Gantt, bảng thống kê khối lượng, bảng theo dõi hợp đồng và danh sách kiến nghị. Khối lượng thông tin rất lớn. Nhưng câu hỏi mà người ra quyết định thực sự cần trả lời thường chỉ gồm bốn điểm: dự án đang đi đúng hướng không, ai đang trễ hạn, chi phí đang vượt hạng mục nào, và tuần tới cần xử lý vấn đề gì trước.

Mâu thuẫn giữa khối lượng thông tin đầu vào và chất lượng ra quyết định không phải vấn đề riêng của ngành xây dựng. Nhưng trong môi trường đầu tư công, nơi mỗi ngày chậm tiến độ đều có chi phí vốn thực tế và hệ quả pháp lý theo Nghị định 175/2024/NĐ-CP, lãng phí thời gian quản lý vào việc đọc và tổng hợp báo cáo là bài toán cần giải quyết.

Quản lý dự án trên một trang giấy (One-Page Project Manager, OPPM) là phương pháp do Clark A. Campbell phát triển, xuất bản lần đầu năm 2006, nhằm nén toàn bộ thông tin của một dự án phức tạp vào một báo cáo duy nhất. Mục tiêu không phải là đơn giản hóa dự án, mà là loại bỏ nhiễu thông tin để làm nổi bật những gì thực sự cần hành động.

Bài viết này phân tích cấu trúc, nguyên lý vận hành và cách triển khai OPPM phù hợp với dự án đầu tư xây dựng tại Việt Nam, từ giai đoạn chuẩn bị đầu tư đến thi công, nghiệm thu và bàn giao.

![Hình minh họa quản lý dự án trên một trang giấy (Nguồn: kenhxaydung)](/assets/images/posts/quan-ly-du-an-mot-trang-giay/oppm-xay-dung.png)
*Hình minh họa quản lý dự án trên một trang giấy (Nguồn: kenhxaydung)*

---

## 1. OPPM là gì và tại sao nó có giá trị với dự án xây dựng

### 1.1. Nguồn gốc và triết lý của phương pháp

Clark A. Campbell phát triển OPPM trong quá trình quản lý các dự án công nghiệp quy mô lớn tại O.C. Tanner Company. Ông nhận ra rằng các công cụ báo cáo truyền thống tốt hơn ở việc ghi lại những gì đã xảy ra hơn là giúp người quản lý hành động đúng lúc. Tác phẩm *The One-Page Project Manager* (2006) và phiên bản mở rộng *The One-Page Project Manager for IT Projects* (2008) đặt nền tảng cho một quan điểm quản lý rõ ràng: báo cáo dự án phải phục vụ ra quyết định, không phải phục vụ lưu trữ hồ sơ [^1].

OPPM dựa trên nhận định rằng mọi dự án, dù phức tạp đến đâu, đều xoay quanh năm chiều thông tin: mục tiêu, nhiệm vụ, con người, thời gian và chi phí. Khi năm chiều này được biểu diễn trên cùng một ma trận thị giác, người xem đọc được mối liên hệ giữa chúng ngay lập tức, thay vì phải đọc từng trang báo cáo riêng lẻ rồi tự lắp ghép lại.

Trong dự án xây dựng, đặc điểm này có giá trị thực tế vì tính chất đa bên của dự án: chủ đầu tư, Ban quản lý dự án, tư vấn thiết kế, tư vấn giám sát, nhà thầu và cơ quan quản lý nhà nước đều cần đọc cùng một trạng thái dự án nhưng từ các góc nhìn khác nhau. OPPM cung cấp ngôn ngữ chung để tất cả các bên đọc được cùng một bức tranh.

### 1.2. So sánh với các công cụ quản lý hiện hành

| Công cụ | Ưu điểm | Hạn chế với dự án xây dựng |
|---------|---------|---------------------------|
| Biểu đồ Gantt (MS Project / Primavera P6) | Chi tiết tiến độ từng đầu việc | Không thể xem mối liên hệ giữa tiến độ, chi phí và nhân sự trên một màn hình |
| Báo cáo tiến độ định kỳ (văn bản) | Đầy đủ thông tin, có tính pháp lý | Mất nhiều thời gian đọc, dễ bỏ sót vấn đề cần xử lý ngay |
| Dashboard BI (Power BI / Looker) | Trực quan, cập nhật thời gian thực | Đòi hỏi hạ tầng dữ liệu và nhân lực kỹ thuật cao |
| OPPM | Tích hợp tất cả chiều thông tin, đọc trong 2 phút | Cần kỷ luật cập nhật, không thay thế được phần mềm chi tiết |

OPPM không cạnh tranh với Primavera P6 hay MS Project. Nó là lớp tổng hợp ở trên cùng, biến thông tin chi tiết từ các hệ thống đó thành bức tranh tổng thể phục vụ cấp ra quyết định.

---

## 2. Năm câu hỏi nền tảng của mọi dự án

Trước khi thiết kế bất kỳ bảng OPPM nào, người quản lý dự án cần trả lời dứt khoát năm câu hỏi. Đây không phải bước hình thức, mà là bước tư duy thực sự. Nếu không trả lời được rõ ở đây, bảng OPPM sau này chỉ là bảng tính đẹp mà không có giá trị ra quyết định.

**Mục tiêu là gì và tại sao dự án này tồn tại?**

Mục tiêu phải định lượng được và gắn với kết quả đo lường. "Hoàn thành thi công cầu vượt sông" là mô tả công việc. "Thông xe toàn tuyến trước ngày 30/4/2027 với sức chịu tải HL-93, không vượt tổng mức đầu tư duyệt" mới là mục tiêu [^2].

**Cần làm những việc gì để đạt mục tiêu đó?**

Danh sách nhiệm vụ phải là các đầu việc chính, không phải danh sách công tác chi tiết. Một dự án thi công đơn giản cần khoảng 15 đến 25 đầu việc ở cấp này. Liệt kê quá nhiều, bảng OPPM mất tác dụng tổng hợp.

**Ai chịu trách nhiệm chính cho từng đầu việc?**

Mỗi đầu việc chỉ có đúng một người chịu trách nhiệm chính. Không phải "phòng ban", không phải "nhà thầu". Đây là nguyên tắc trách nhiệm đơn (single accountability) trong quản lý dự án hiện đại [^3]. Nếu có tranh cãi về ai chịu trách nhiệm chính, đó là vấn đề cần giải quyết ngay tại bước này.

**Các mốc thời gian quan trọng là khi nào?**

Không phải toàn bộ lịch thi công, mà là các mốc quyết định: ngày nghiệm thu từng giai đoạn, ngày tạm ứng, ngày giải ngân, ngày bàn giao hạng mục, ngày phê duyệt thiết kế.

**Ngân sách phân bổ như thế nào và thực tế chi tiêu đến đâu?**

Không phải toàn bộ dự toán chi tiết, mà là chi phí theo từng hạng mục chính tương ứng với từng đầu việc, đủ để nhận biết khi nào đang vượt ngân sách ở nhóm công việc nào.

---

## 3. Cấu trúc bố cục bảng OPPM

### 3.1. Các phân khu chức năng

Một bảng OPPM tiêu chuẩn được chia thành sáu phân khu kết nối chặt chẽ với nhau, thường thể hiện trên tờ khổ A3 hoặc màn hình 16:9 theo định dạng ngang.

**Phần tiêu đề (góc trên cùng):** Tên dự án, tên người quản lý dự án, ngày cập nhật và kỳ báo cáo. Thông tin này xác định "ai đang chịu trách nhiệm tổng thể" và "báo cáo này có còn hiệu lực không".

**Cột mục tiêu (bên trái):** Liệt kê từ ba đến năm mục tiêu lớn của dự án theo chiều dọc. Campbell giới hạn năm mục tiêu vì nếu một dự án có hơn năm mục tiêu quan trọng ngang nhau, đó là dấu hiệu mục tiêu chưa được ưu tiên hóa [^1].

**Cột nhiệm vụ (vùng trung tâm):** Danh sách khoảng 15 đến 25 đầu việc chính được đánh số thứ tự, trải dài theo chiều dọc. Đây là trục xương sống của toàn bộ bảng.

**Cột trách nhiệm (bên phải của nhiệm vụ):** Tên các thành viên nhóm dự án hoặc đơn vị tham gia, sắp xếp theo chiều ngang. Ô giao nhau giữa nhiệm vụ và nhân sự được đánh dấu khi người đó chịu trách nhiệm chính cho đầu việc đó.

**Hàng tiến độ và thời gian (phần dưới):** Trục thời gian theo tuần hoặc tháng, chạy theo chiều ngang. Thời gian bắt đầu và kết thúc của từng đầu việc được đánh dấu bằng ký hiệu màu sắc hoặc hình học.

**Vùng ma trận liên kết (giữa mục tiêu và nhiệm vụ):** Đây là phần đặc trưng nhất của OPPM. Các ký hiệu được đặt tại ô giao nhau giữa hàng nhiệm vụ và cột mục tiêu để thể hiện mối liên hệ: nhiệm vụ này đóng góp vào mục tiêu nào.

### 3.2. Hệ thống màu sắc và ký hiệu trạng thái

Thông tin trạng thái trong OPPM được mã hóa theo ba cấp độ màu:

| Màu | Ý nghĩa | Hành động yêu cầu |
|-----|---------|-------------------|
| Xanh lá | Đúng tiến độ, đúng ngân sách | Theo dõi định kỳ |
| Vàng | Có rủi ro hoặc sắp trễ hạn, cần chú ý | Họp đánh giá trong 48 giờ |
| Đỏ | Trễ hạn hoặc vượt ngân sách, cần can thiệp ngay | Họp xử lý khẩn cấp, báo cáo lên cấp cao hơn |

Hệ thống ba màu này có lợi thế so với báo cáo văn bản: người đọc quét toàn bộ trạng thái dự án trong vài giây mà không cần đọc từng dòng. Với dự án xây dựng có nhiều gói thầu đồng thời, điều này tiết kiệm thời gian đáng kể ở cấp PMU hoặc chủ đầu tư.

---

## 4. Các bước thiết lập và vận hành OPPM

### 4.1. Thiết lập ban đầu

**Bước 1: Xác định mục tiêu định lượng của dự án**

Không làm bước này bằng cách sao chép mục tiêu từ quyết định đầu tư. Cần dịch các mục tiêu pháp lý thành chỉ số đo lường được: hoàn thành khối lượng nào vào ngày nào, với chi phí không vượt bao nhiêu, đạt tiêu chuẩn kỹ thuật gì.

**Bước 2: Phân rã thành các nhiệm vụ chính**

Dùng WBS (Work Breakdown Structure) cấp độ 2 hoặc 3 làm nguồn, nhưng chỉ đưa vào OPPM các đầu việc cấp cao có ý nghĩa quản lý. Bỏ qua chi tiết kỹ thuật và công tác phụ trợ có thể theo dõi ở cấp thấp hơn.

**Bước 3: Phân công trách nhiệm đơn**

Với mỗi đầu việc, chỉ điền tên một người. Nếu có tranh cãi về ai chịu trách nhiệm chính, đó là vấn đề cần giải quyết ngay tại bước này, không phải bỏ qua và để sau.

**Bước 4: Xác định mốc thời gian**

Đưa vào bảng các mốc quan trọng theo hợp đồng hoặc tiến độ tổng thể đã được duyệt. Không cần và không nên đưa toàn bộ lịch thi công chi tiết vào bảng OPPM.

**Bước 5: Thiết lập theo dõi chi phí**

Phân bổ ngân sách theo các đầu việc hoặc nhóm đầu việc chính. Cập nhật chi phí thực tế định kỳ theo kỳ giải ngân hoặc thanh toán khối lượng.

### 4.2. Vận hành định kỳ

Chu kỳ cập nhật phù hợp là hàng tuần trong giai đoạn thi công tích cực, và hai tuần một lần trong giai đoạn chuẩn bị đầu tư hoặc thiết kế. Mỗi lần cập nhật nên mất không quá 30 phút nếu người chịu trách nhiệm từng đầu việc cung cấp đúng thông tin cần thiết.

Điểm quan trọng: OPPM không tự cập nhật. Nó là công cụ tổng hợp thủ công, đòi hỏi kỷ luật từ từng thành viên nhóm dự án. Đây vừa là hạn chế vừa là ưu điểm, vì quá trình cập nhật buộc mỗi người phải nhìn lại trạng thái thực tế của phần việc mình chịu trách nhiệm.

---

## 5. Nền tảng triển khai OPPM

### 5.1. Microsoft Excel: lựa chọn phổ biến nhất

Excel là lựa chọn phổ biến nhất vì tính linh hoạt và mức độ thông dụng trong môi trường dự án xây dựng Việt Nam. Một bảng OPPM Excel được thiết kế tốt có thể sử dụng Conditional Formatting để tự động đổi màu ô dựa trên giá trị nhập vào, Data Validation để kiểm soát đầu vào hợp lệ, và Named Ranges để liên kết dữ liệu từ các sheet chi tiết lên bảng tổng hợp.

Hạn chế của Excel là việc cộng tác đồng thời nhiều người vẫn phức tạp trong môi trường dự án phân tán, mặc dù Excel Online và OneDrive đã cải thiện đáng kể so với trước đây.

### 5.2. Microsoft Power BI: dashboard động cho dự án phức tạp

Power BI cho phép xây dựng OPPM dạng dashboard tương tác, kết nối trực tiếp với dữ liệu từ MS Project, hệ thống quản lý hợp đồng hoặc file Excel nguồn. Ưu điểm lớn nhất là khả năng drill-down: người dùng xem tổng thể từ OPPM, sau đó click vào bất kỳ đầu việc nào để xem chi tiết ngay mà không cần chuyển sang công cụ khác.

Đây là lựa chọn phù hợp với Ban quản lý dự án quản lý nhiều gói thầu đồng thời, cần theo dõi tổng hợp từ nhiều nguồn dữ liệu khác nhau.

### 5.3. Notion và các nền tảng cộng tác hiện đại

Notion, Airtable và các nền tảng tương tự cho phép xây dựng OPPM dưới dạng cơ sở dữ liệu có thể xem theo nhiều cách khác nhau: dạng bảng, dạng kanban, dạng lịch hoặc dạng timeline. Ưu điểm là khả năng gán nhiệm vụ, comment và cộng tác trong thời gian thực, phù hợp với nhóm dự án làm việc từ xa hoặc phân tán địa lý.

### 5.4. Lựa chọn nền tảng theo quy mô dự án

| Quy mô dự án | Nền tảng phù hợp | Lý do |
|--------------|-----------------|-------|
| Dự án nhỏ dưới 50 tỷ đồng, 1 gói thầu | Excel | Đủ dùng, không cần đầu tư thêm hạ tầng |
| Dự án vừa 50 đến 500 tỷ, 2 đến 5 gói thầu | Excel nâng cao hoặc Notion | Cộng tác dễ hơn, quản lý phiên bản tốt hơn |
| Dự án lớn trên 500 tỷ, nhiều gói thầu song song | Power BI kết nối MS Project/Primavera | Tự động hóa cập nhật, drill-down chi tiết |
| PMU quản lý nhiều dự án đồng thời | Power BI hoặc nền tảng PMIS chuyên dụng | Quản lý theo danh mục đầu tư (portfolio view) |

---

## 6. Ứng dụng OPPM theo các giai đoạn dự án đầu tư xây dựng

Theo Nghị định 175/2024/NĐ-CP và Luật Xây dựng, dự án đầu tư xây dựng được tổ chức theo ba giai đoạn chính: chuẩn bị đầu tư, thực hiện dự án và kết thúc xây dựng đưa vào khai thác. Mỗi giai đoạn có đặc thù riêng về thông tin cần theo dõi và đối tượng ra quyết định chính [^4].

### 6.1. Giai đoạn chuẩn bị đầu tư

Đây là giai đoạn quyết định chất lượng của toàn bộ dự án, nhưng lại thường được quản lý lỏng lẻo nhất vì chưa có hợp đồng xây lắp, chưa có nhà thầu và chưa có dòng tiền lớn để kiểm soát.

Bảng OPPM trong giai đoạn này nên tập trung vào bốn nhóm nhiệm vụ chính: hoàn thiện hồ sơ pháp lý (chủ trương đầu tư, quyết định phê duyệt dự án), hoàn thiện khảo sát địa hình và địa chất, hoàn thành thiết kế cơ sở và dự toán sơ bộ, và hoàn tất thủ tục giao đất, bồi thường giải phóng mặt bằng.

Mục tiêu đo lường ở giai đoạn này thường gắn với mốc phê duyệt: ngày phê duyệt chủ trương đầu tư, ngày phê duyệt dự án, ngày phê duyệt kế hoạch lựa chọn nhà thầu. Người chịu trách nhiệm chính là các cán bộ phụ trách từng mảng pháp lý và kỹ thuật trong Ban quản lý dự án.

Chu kỳ cập nhật phù hợp là hai tuần một lần, với họp đánh giá hàng tháng cùng chủ đầu tư.

### 6.2. Giai đoạn thực hiện dự án (thiết kế và lựa chọn nhà thầu)

Giai đoạn này có sự phức tạp đặc biệt vì song song diễn ra nhiều luồng công việc: thiết kế kỹ thuật và bản vẽ thi công, lập hồ sơ mời thầu và tổ chức đấu thầu, thẩm tra thiết kế và dự toán, và tiếp tục các thủ tục giải phóng mặt bằng còn lại.

OPPM trong giai đoạn này cần thể hiện rõ sự phụ thuộc giữa các luồng công việc: thiết kế bộ môn nào xong trước mới lập được hồ sơ mời thầu gói thầu nào, gói thầu nào cần có mặt bằng sạch trước khi khởi công.

Ví dụ thực tế: trong một dự án kênh tưới tiêu liên tỉnh, hồ sơ mời thầu gói xây lắp kênh chính chỉ có thể phát hành sau khi thiết kế kỹ thuật được duyệt và ít nhất 70% mặt bằng đoạn đó được bàn giao. Nếu ba điều kiện này không được theo dõi trên cùng một bảng, rất dễ xảy ra tình huống nhà thầu trúng thầu mà không vào được công trường.

### 6.3. Giai đoạn thi công xây dựng

Đây là giai đoạn OPPM được sử dụng tập trung và cập nhật thường xuyên nhất. Thông tin cần theo dõi bao gồm: tiến độ thi công theo từng hạng mục đối chiếu với tiến độ hợp đồng, giải ngân thực tế so với kế hoạch, tình trạng vật liệu và thiết bị, phát sinh thiết kế và thay đổi hợp đồng, vướng mắc mặt bằng và điều kiện địa chất bất thường.

Một điểm thường bị bỏ sót trong dự án xây dựng Việt Nam: báo cáo OPPM nên được đồng bộ với chu kỳ nghiệm thu và thanh toán theo hợp đồng. Cập nhật tiến độ và chi phí vào cùng thời điểm với lập biên bản nghiệm thu khối lượng sẽ đảm bảo tính chính xác và giảm công việc trùng lặp.

Với dự án có nhiều gói thầu song song, nên có một bảng OPPM tổng ở cấp PMU và một bảng OPPM riêng cho từng gói thầu ở cấp chỉ huy công trường. Hai cấp độ này có thể được thiết kế để thông tin cốt lõi từ cấp dưới tự động tổng hợp lên cấp trên nếu sử dụng Power BI hoặc Excel có liên kết dữ liệu.

Chu kỳ cập nhật trong giai đoạn thi công: hàng tuần ở cấp công trường, hai tuần một lần ở cấp PMU, hàng tháng ở cấp chủ đầu tư.

### 6.4. Giai đoạn nghiệm thu và bàn giao

Giai đoạn cuối thường có nhiều đầu việc song song với tính chất hoàn toàn khác nhau: hoàn công hồ sơ pháp lý, nghiệm thu kỹ thuật từng hạng mục, vận hành thử, đào tạo nhân sự vận hành, hoàn tất quyết toán hợp đồng và kiểm toán.

OPPM trong giai đoạn này có giá trị rõ ràng vì đây là thời điểm áp lực tiến độ cao nhất, thường có hạn chót pháp lý cho việc đưa công trình vào khai thác, trong khi số lượng đơn vị tham gia vẫn rất nhiều.

Một hạng mục thường bị bỏ sót: theo dõi trạng thái hoàn tất hồ sơ hoàn công số hóa (nếu dự án áp dụng BIM theo Quyết định 258/QĐ-TTg). Hạng mục này có thể kéo dài thủ tục bàn giao nếu không được theo dõi từ giai đoạn thi công.

---

## 7. Giới hạn của OPPM và cách vượt qua

### 7.1. OPPM không thay thế được phần mềm quản lý chi tiết

OPPM là công cụ tổng hợp, không phải công cụ tác nghiệp. Nó không thể thay thế MS Project hay Primavera P6 trong việc tính toán đường Găng (Critical Path), quản lý phụ thuộc chi tiết giữa hàng trăm đầu việc nhỏ, hay tối ưu hóa phân bổ nguồn lực.

Giải pháp là duy trì hai lớp công cụ song song: lớp tác nghiệp (MS Project/Primavera cho kỹ sư công trường) và lớp tổng hợp (OPPM cho PMU và chủ đầu tư). Thông tin từ lớp tác nghiệp được tổng hợp thủ công hoặc qua liên kết dữ liệu lên OPPM theo chu kỳ cập nhật.

### 7.2. Chất lượng OPPM phụ thuộc vào kỷ luật báo cáo

Nếu người chịu trách nhiệm từng đầu việc không cập nhật thông tin trung thực và kịp thời, bảng OPPM phản ánh sai thực tế. Đây là vấn đề văn hóa tổ chức, không phải vấn đề công cụ.

Trong môi trường dự án xây dựng Việt Nam, nơi báo cáo tiến độ đôi khi bị chỉnh sửa để "trông đẹp hơn", OPPM chỉ phát huy được khi người ra quyết định cao nhất yêu cầu thông tin trung thực thay vì thông tin đẹp.

### 7.3. Một trang giấy không đủ cho dự án cực kỳ phức tạp

Với dự án quy mô đặc biệt như thủy điện lớn, công trình thủy lợi liên tỉnh quy mô hàng nghìn tỷ đồng, hoặc dự án PPP hạ tầng giao thông, một bảng OPPM đơn không đủ để bao quát. Giải pháp là xây dựng hệ thống phân cấp: OPPM danh mục ở cấp cao nhất, OPPM dự án thành phần ở cấp PMU, OPPM gói thầu ở cấp chỉ huy thi công.

---

## 8. Triển khai OPPM: kinh nghiệm thực tế

### 8.1. Bài học từ các dự án áp dụng báo cáo trực quan hóa

Nghiên cứu của Project Management Institute (PMI) năm 2023 cho thấy các dự án áp dụng hệ thống báo cáo trực quan hóa thông tin có tỷ lệ hoàn thành đúng tiến độ cao hơn 28% so với các dự án chỉ dùng báo cáo văn bản truyền thống [^5]. Yếu tố quyết định không phải là công cụ, mà là tần suất và chất lượng thông tin được cập nhật.

Kinh nghiệm triển khai tại một số dự án hạ tầng thủy lợi quy mô vừa tại miền Trung Việt Nam cho thấy: họp đánh giá OPPM hàng tuần với đủ thành phần (PMU, giám sát, chỉ huy trưởng nhà thầu) giúp giảm thời gian giải quyết phát sinh từ trung bình 12 ngày xuống còn 4 đến 5 ngày. Lý do là vấn đề được nhìn thấy ngay khi chuyển màu từ xanh sang vàng, thay vì chờ đến khi báo cáo tháng được nộp [^6].

### 8.2. Tích hợp OPPM với yêu cầu báo cáo pháp lý

Theo Nghị định 175/2024/NĐ-CP, chủ đầu tư và Ban quản lý dự án phải lập và gửi định kỳ các báo cáo giám sát, đánh giá đầu tư cho cơ quan có thẩm quyền. OPPM không thay thế các báo cáo pháp lý này, nhưng nếu được cập nhật nghiêm túc, phần lớn số liệu trong báo cáo giám sát đầu tư định kỳ có thể lấy trực tiếp từ bảng OPPM mà không cần tổng hợp lại từ đầu, tiết kiệm đáng kể thời gian của cán bộ PMU mỗi kỳ báo cáo.

---

## Kết luận

OPPM không phải công cụ phức tạp hay đòi hỏi đầu tư công nghệ lớn. Giá trị của nó nằm ở kỷ luật tư duy mà nó bắt buộc người quản lý dự án phải thực hiện trước khi vào bất kỳ cuộc họp hay phiên báo cáo nào: xác định mục tiêu đo lường được, phân công trách nhiệm đơn, theo dõi trạng thái bằng ngôn ngữ màu sắc đơn giản và cập nhật trung thực theo chu kỳ.

Trong bối cảnh dự án đầu tư xây dựng Việt Nam đang phải đối mặt đồng thời với yêu cầu đẩy nhanh giải ngân vốn đầu tư công, nâng cao chất lượng công trình và tăng cường minh bạch thông tin theo Nghị định 175/2024/NĐ-CP, một công cụ giúp người ra quyết định nhìn thấy tình trạng thực tế của dự án trong hai phút có giá trị thực dụng rõ ràng.

Quan trọng hơn cả công cụ là văn hóa báo cáo trung thực. OPPM phát huy tối đa khi được dùng trong tổ chức mà người ra quyết định cao nhất đặt giá trị vào thông tin đúng hơn là thông tin đẹp, và mọi thành viên hiểu rằng màu vàng xuất hiện sớm trên bảng là dấu hiệu hệ thống quản lý đang hoạt động tốt, không phải dấu hiệu thất bại.

> "Dự án tốt nhất không phải dự án không có vấn đề, mà là dự án phát hiện và xử lý vấn đề sớm nhất có thể." (Clark A. Campbell, *The One-Page Project Manager*, 2006)

---

## Liên hệ tư vấn và hỗ trợ triển khai

Nếu bạn đang là cán bộ PMU, chủ đầu tư hoặc nhà thầu đang gặp khó khăn trong việc kiểm soát tiến độ và chi phí dự án xây dựng đang triển khai, hoặc muốn xây dựng hệ thống báo cáo tổng hợp phù hợp với đặc thù dự án của mình, **Liên hệ trực tiếp:** [WhatsApp](https://wa.me/84374874142) hoặc Email: [ha.nguyen@hydrostructai.com](mailto:ha.nguyen@hydrostructai.com) với mô tả ngắn về loại dự án, giai đoạn hiện tại và vấn đề cụ thể bạn đang gặp, để nhận hỗ trợ hỗ trợ tư vấn thiết kế cấu trúc OPPM phù hợp với từng loại dự án, xây dựng template chuẩn hóa cho tổ chức, đào tạo nhóm PMU sử dụng và vận hành, và hỗ trợ tích hợp với hệ thống báo cáo hiện hành.


**Liên hệ trực tiếp:**

Email: [ha.nguyen@hydrostructai.com](mailto:ha.nguyen@hydrostructai.com) với mô tả ngắn về quy mô dự án, giai đoạn hiện tại và vấn đề cụ thể bạn đang gặp.

Liên hệ nhanh: [WhatsApp](https://wa.me/84374874142) để trao đổi trước khi quyết định.

> Mọi trao đổi tư vấn kỹ thuật ban đầu đều miễn phí. Chúng tôi sẵn sàng chia sẻ kinh nghiệm từ các dự án đã triển khai.

---

*© 2026 HydrostructAI - Tư vấn Quản lý Dự án Đầu tư Xây dựng & Mô hình hóa BIM*

---

## Tài liệu tham khảo

[^1]: Campbell, C. A. (2006). *The One-Page Project Manager: Communicate and Manage Any Project With a Single Sheet of Paper.* John Wiley & Sons. Tái bản lần thứ 2 năm 2012.

[^2]: Project Management Institute (2021). *A Guide to the Project Management Body of Knowledge (PMBOK Guide), 7th Edition.* PMI. Mục 2.3 - Project Performance Domains.

[^3]: Archibald, R. D. (2003). *Managing High-Technology Programs and Projects (3rd ed.).* Wiley. Chương 5 - Single-point accountability in project teams.

[^4]: Luật Xây dựng số 50/2014/QH13 và Luật sửa đổi số 62/2020/QH14; Nghị định 175/2024/NĐ-CP ngày 30/12/2024 - Quy định chi tiết thi hành Luật Xây dựng về quản lý dự án đầu tư xây dựng.

[^5]: Project Management Institute (2023). *Pulse of the Profession 2023: Power Skills.* PMI. Phần về project communication effectiveness và on-time delivery correlation.

[^6]: Bộ Nông nghiệp và Phát triển nông thôn (2023). *Báo cáo tổng kết công tác quản lý dự án đầu tư xây dựng công trình thủy lợi giai đoạn 2021-2023.* Cục Quản lý Xây dựng công trình.

---

## Danh mục tài liệu

### Sách chuyên khảo

- **Campbell, C. A. (2006).** *The One-Page Project Manager: Communicate and Manage Any Project With a Single Sheet of Paper.* John Wiley & Sons. ISBN: 978-0470050422.
- **Campbell, C. A. & Campbell, M. (2008).** *The One-Page Project Manager for IT Projects: Communicate and Manage Any Project With a Single Sheet of Paper.* John Wiley & Sons.
- **Project Management Institute (2021).** *A Guide to the Project Management Body of Knowledge (PMBOK Guide), 7th Edition.* PMI. ISBN: 978-1628256642.
- **Archibald, R. D. (2003).** *Managing High-Technology Programs and Projects (3rd ed.).* Wiley.
- **Verzuh, E. (2015).** *The Fast Forward MBA in Project Management (4th ed.).* Wiley.
- **Kerzner, H. (2022).** *Project Management: A Systems Approach to Planning, Scheduling, and Controlling (13th ed.).* Wiley.

### Văn bản pháp lý

- **Luật Xây dựng số 50/2014/QH13** và **Luật sửa đổi bổ sung số 62/2020/QH14** - Khung pháp lý tổng quát về đầu tư xây dựng.
- **Luật Xây dựng số 135/2025/QH15** (hiệu lực 01/7/2026) - Văn bản pháp lý cập nhật nhất về hoạt động đầu tư xây dựng.
- **Nghị định 175/2024/NĐ-CP** ngày 30/12/2024 - Quy định chi tiết thi hành Luật Xây dựng về quản lý dự án đầu tư xây dựng, thay thế Nghị định 15/2021/NĐ-CP.
- **Quyết định 258/QĐ-TTg** ngày 17/3/2023 - Phê duyệt lộ trình áp dụng BIM trong hoạt động xây dựng.
- **Thông tư 06/2021/TT-BXD** - Quy định về phân cấp công trình xây dựng và hướng dẫn áp dụng trong quản lý hoạt động đầu tư xây dựng.

### Tiêu chuẩn quản lý dự án quốc tế

- **ISO 21500:2021** - Project, programme and portfolio management - Context and concepts.
- **ISO 21502:2020** - Project, programme and portfolio management - Guidance on project management.
- **ISO 31000:2018** - Risk management - Guidelines.

### Tài liệu tham khảo trong nước

- **Bộ Xây dựng (2021).** *Hướng dẫn quản lý dự án đầu tư xây dựng công trình theo Nghị định 15/2021/NĐ-CP.*
- **Bộ Kế hoạch và Đầu tư (2023).** *Hướng dẫn giám sát, đánh giá đầu tư đối với dự án đầu tư công.*
- **Nguyễn Bá Uân, Hoàng Phong Hà (2020).** *Quản lý dự án xây dựng.* NXB Xây dựng. Hà Nội.
- **Project Management Institute (2023).** *Pulse of the Profession 2023: Power Skills.* PMI Global.

---
