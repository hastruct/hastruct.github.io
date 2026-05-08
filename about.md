---
layout: splash
title: "HST.AI"
permalink: /about/
header:
  overlay_image: "/assets/images/hero-engineering.jpg"
  overlay_color: "#0d1b2a"
  overlay_filter: "linear-gradient(135deg, rgba(13, 27, 42, 0.92), rgba(0, 77, 153, 0.75))"
  caption: "<span style='color: #FFD700; font-weight: bold;'>Email: ha.nguyen@hydrostructai.com &nbsp;|&nbsp; Tel: +84 374 874 142</span>"
  title: "Giới thiệu chung"
---

<link rel="stylesheet" href="/assets/css/custom-home.css">

<style>
  /* ─── Root Variables ──────────────────────────────── */
  :root {
    --color-ink:       #1a1a2e;
    --color-accent:    #0057b8;
    --color-accent-2:  #e8a010;
    --color-surface:   #ffffff;
    --color-muted:     #f4f6f9;
    --color-border:    #dce1ea;
    --color-text:      #3a3f4b;
    --color-subtext:   #6b7280;
    --radius-card:     10px;
    --shadow-card:     0 2px 18px rgba(0,0,0,0.07);
  }

  /* ─── Layout Wrapper ─────────────────────────────── */
  .about-wrapper {
    max-width: 860px;
    margin: 0 auto;
    padding: 0 1rem 3rem;
    font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
    color: var(--color-text);
    line-height: 1.75;
  }

  /* ─── Section Divider ────────────────────────────── */
  .about-section {
    margin: 2.8rem 0;
    padding: 2.2rem 2.4rem;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-card);
    box-shadow: var(--shadow-card);
  }

  /* ─── Section Heading ────────────────────────────── */
  .about-section h2 {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-ink);
    letter-spacing: 0.02em;
    text-transform: uppercase;
    border-bottom: 3px solid var(--color-accent);
    padding-bottom: 0.55rem;
    margin: 0 0 1.4rem;
    display: flex;
    align-items: center;
    gap: 0.55rem;
  }

  .about-section h2 .section-icon {
    font-size: 1.15rem;
    opacity: 0.85;
  }

  /* ─── Body Text ──────────────────────────────────── */
  .about-section p {
    font-size: 1rem;
    color: var(--color-text);
    margin-bottom: 1rem;
    text-align: justify;
  }

  .about-section p:last-child { margin-bottom: 0; }

  strong { color: var(--color-ink); font-weight: 600; }

  /* ─── Tag Chips ──────────────────────────────────── */
  code.tag {
    display: inline-block;
    background: var(--color-muted);
    color: var(--color-accent);
    border: 1px solid #c7d5ea;
    padding: 0.18rem 0.6rem;
    border-radius: 4px;
    font-family: 'Consolas', 'SFMono-Regular', monospace;
    font-size: 0.82em;
    font-weight: 600;
    margin: 0 0.1rem 0.25rem;
  }

  /* ─── Pillar Grid ────────────────────────────────── */
  .pillar-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.2rem;
    margin-top: 1.4rem;
  }

  .pillar-card {
    background: var(--color-muted);
    border: 1px solid var(--color-border);
    border-top: 4px solid var(--color-accent);
    border-radius: 8px;
    padding: 1.3rem 1.4rem;
  }

  .pillar-card.accent-gold { border-top-color: var(--color-accent-2); }
  .pillar-card.accent-teal { border-top-color: #0a9b7d; }

  .pillar-card .pillar-num {
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--color-accent);
    line-height: 1;
    margin-bottom: 0.4rem;
  }

  .pillar-card.accent-gold .pillar-num { color: var(--color-accent-2); }
  .pillar-card.accent-teal .pillar-num { color: #0a9b7d; }

  .pillar-card h4 {
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--color-ink);
    margin: 0 0 0.5rem;
  }

  .pillar-card p {
    font-size: 0.88rem;
    color: var(--color-subtext);
    margin: 0;
    line-height: 1.6;
    text-align: left;
  }

  /* ─── App Grid ───────────────────────────────────── */
  .app-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.2rem;
    margin-top: 1.4rem;
  }

  .app-card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    padding: 1.3rem 1.4rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    transition: box-shadow 0.2s, transform 0.2s;
  }

  .app-card:hover {
    box-shadow: 0 6px 22px rgba(0, 87, 184, 0.12);
    transform: translateY(-2px);
  }

  .app-card .app-icon { font-size: 1.6rem; }

  .app-card h4 {
    font-size: 0.97rem;
    font-weight: 700;
    color: var(--color-ink);
    margin: 0;
  }

  .app-card p {
    font-size: 0.86rem;
    color: var(--color-subtext);
    margin: 0;
    text-align: left;
    line-height: 1.55;
  }

  .app-badge {
    display: inline-block;
    font-size: 0.72rem;
    font-weight: 700;
    padding: 0.1rem 0.5rem;
    border-radius: 3px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-top: 0.3rem;
    width: fit-content;
  }

  .app-badge.free    { background: #d4edda; color: #155724; }
  .app-badge.beta    { background: #fff3cd; color: #856404; }
  .app-badge.pro     { background: #cce5ff; color: #004085; }
  .app-badge.roadmap { background: #f8d7da; color: #721c24; }

  /* ─── Timeline ───────────────────────────────────── */
  .process-steps {
    display: flex;
    flex-direction: column;
    gap: 0;
    margin-top: 1.2rem;
    position: relative;
  }

  .process-steps::before {
    content: '';
    position: absolute;
    left: 18px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, var(--color-accent), #c7d5ea);
    border-radius: 2px;
  }

  .step {
    display: flex;
    align-items: flex-start;
    gap: 1.1rem;
    padding: 0.85rem 0 0.85rem 0.3rem;
    position: relative;
  }

  .step-dot {
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--color-accent);
    color: #fff;
    font-size: 0.78rem;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    box-shadow: 0 2px 6px rgba(0,87,184,0.25);
  }

  .step-body h4 {
    font-size: 0.96rem;
    font-weight: 700;
    color: var(--color-ink);
    margin: 0 0 0.25rem;
  }

  .step-body p {
    font-size: 0.87rem;
    color: var(--color-subtext);
    margin: 0;
    text-align: left;
    line-height: 1.55;
  }

  /* ─── Author Block ───────────────────────────────── */
  .author-block {
    display: flex;
    gap: 1.4rem;
    align-items: flex-start;
    background: var(--color-muted);
    border: 1px solid var(--color-border);
    border-left: 5px solid var(--color-accent);
    border-radius: 8px;
    padding: 1.4rem 1.5rem;
    margin-top: 0.5rem;
  }

  .author-avatar {
    flex-shrink: 0;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: var(--color-accent);
    color: #fff;
    font-size: 1.6rem;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: -1px;
  }

  .author-bio h4 {
    font-size: 1rem;
    font-weight: 700;
    color: var(--color-ink);
    margin: 0 0 0.3rem;
  }

  .author-bio p {
    font-size: 0.9rem;
    color: var(--color-subtext);
    margin: 0;
    text-align: left;
    line-height: 1.6;
  }

  /* ─── Expertise Tags ─────────────────────────────── */
  .tag-row { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.6rem; }

  .etag {
    background: #eef2fa;
    color: var(--color-accent);
    border: 1px solid #c7d5ea;
    border-radius: 4px;
    font-size: 0.78rem;
    font-weight: 600;
    padding: 0.15rem 0.55rem;
  }

  /* ─── CTA ────────────────────────────────────────── */
  .cta-row {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin-top: 1.6rem;
    justify-content: center;
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    background: var(--color-accent);
    color: #fff;
    padding: 0.65rem 1.5rem;
    border-radius: 6px;
    font-weight: 700;
    font-size: 0.95rem;
    text-decoration: none;
    transition: background 0.2s, box-shadow 0.2s;
    box-shadow: 0 3px 10px rgba(0,87,184,0.25);
  }

  .btn-primary:hover { background: #003d8a; box-shadow: 0 5px 18px rgba(0,87,184,0.35); }

  .btn-outline {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    background: transparent;
    color: var(--color-accent);
    border: 2px solid var(--color-accent);
    padding: 0.62rem 1.4rem;
    border-radius: 6px;
    font-weight: 700;
    font-size: 0.95rem;
    text-decoration: none;
    transition: all 0.2s;
  }

  .btn-outline:hover { background: var(--color-accent); color: #fff; }

  /* ─── Stat Strip ─────────────────────────────────── */
  .stat-strip {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 1rem;
    margin-top: 1.4rem;
    text-align: center;
  }

  .stat-item {
    background: var(--color-muted);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    padding: 1rem 0.8rem;
  }

  .stat-item .stat-val {
    font-size: 1.6rem;
    font-weight: 800;
    color: var(--color-accent);
    line-height: 1;
    margin-bottom: 0.25rem;
  }

  .stat-item .stat-label {
    font-size: 0.78rem;
    color: var(--color-subtext);
    font-weight: 500;
  }

  /* ─── Mobile ─────────────────────────────────────── */
  @media (max-width: 768px) {
    .about-section { padding: 1.5rem 1.2rem; }
    .author-block  { flex-direction: column; gap: 1rem; }
    .author-avatar { width: 52px; height: 52px; font-size: 1.3rem; }
  }
</style>

<div class="home-wrapper">

  {% include sidebar-left.html %}

  <div class="center-content">
  <div class="about-wrapper">

    <!-- ══════════════════════════════════════════════ -->
    <!-- 1. SỨ MỆNH                                     -->
    <!-- ══════════════════════════════════════════════ -->
    <div class="about-section">
      <h2><span class="section-icon">🏗️</span> Về HydroStructAI</h2>

      <p>
        <strong>HydroStructAI</strong> là nền tảng kỹ thuật chuyên biệt kết hợp
        <code class="tag">Quản lý dự án</code>
        <code class="tag">Đào tạo kỹ thuật</code>
        <code class="tag">Ứng dụng web kỹ thuật</code>
        <code class="tag">Ứng dụng trí tuệ nhân tạo</code> —
        mang đến cho kỹ sư xây dựng và chủ đầu tư một hệ sinh thái công cụ thực chiến, từ quản lý dự án theo chuẩn <strong>PMBOK 7th</strong> đến các ứng dụng phân tích kỹ thuật chạy ngay trên trình duyệt.
      </p>

      <p>
        Chúng tôi tin rằng <strong>quản lý dự án tốt không phải là điền đủ biểu mẫu</strong> — mà là kiến tạo giá trị thực, kiểm soát rủi ro chủ động và ra quyết định dựa trên dữ liệu. Đó cũng là triết lý mà chúng tôi đưa vào từng bài viết, từng công cụ và từng tư vấn dự án.
      </p>

      <div class="stat-strip">
        <div class="stat-item">
          <div class="stat-val">QLDA</div>
          <div class="stat-label">Quản lý dự án chuyên nghiệp</div>
        </div>
        <div class="stat-item">
          <div class="stat-val">PMBOK 7</div>
          <div class="stat-label">Chuẩn quản trị áp dụng</div>
        </div>
        <div class="stat-item">
          <div class="stat-val">LESSONS LEARNED</div>
          <div class="stat-label">Các bài học kinh nghiệm</div>
        </div>
        <div class="stat-item">
          <div class="stat-val">WASM</div>
          <div class="stat-label">Nền tảng ứng dụng trên web</div>
        </div>
        <div class="stat-item">
          <div class="stat-val">Free</div>
          <div class="stat-label">Công cụ cốt lõi miễn phí</div>
        </div>
      </div>
    </div>

    <!-- ══════════════════════════════════════════════ -->
    <!-- 2. HAI TRỤ CỘT CHUYÊN MÔN                     -->
    <!-- ══════════════════════════════════════════════ -->
    <div class="about-section">
      <h2><span class="section-icon">🎯</span> Hai Trụ Cột Chuyên Môn</h2>

      <div class="pillar-grid">

        <div class="pillar-card">
          <div class="pillar-num">01</div>
          <h4>Quản lý Dự án Xây dựng (Tư duy PMBOK 7th)</h4>
          <p>
            Tư vấn và đào tạo quản lý dự án theo tư duy <strong>Value Delivery System</strong> — từ Scope, Schedule, Cost đến Risk, Stakeholders và Quality trong bối cảnh pháp lý Việt Nam (Luật XD, NĐ 175/2024, NĐ 06/2021).
          </p>
        </div>

        <div class="pillar-card accent-gold">
          <div class="pillar-num">02</div>
          <h4>Ứng dụng Web Kỹ thuật cho Kỹ sư</h4>
          <p>
            Phát triển công cụ phân tích kỹ thuật chạy trên nền tảng <strong>WebAssembly</strong> — FEM kết cấu, tính toán thủy lực, dự toán chi phí — không cần cài đặt, không cần phần cứng đắt tiền.
          </p>
        </div>

      </div>
    </div>

    <!-- ══════════════════════════════════════════════ -->
    <!-- 3. TƯ DUY QUẢN LÝ DỰ ÁN                       -->
    <!-- ══════════════════════════════════════════════ -->
    <div class="about-section">
      <h2><span class="section-icon">📐</span> Tư Duy Quản Lý Dự Án Hiện Đại</h2>

      <p>
        Chúng tôi xây dựng nội dung và tư vấn dựa trên <strong>PMBOK® Guide</strong> — sự chuyển dịch từ quản lý quy trình sang quản lý nguyên tắc và hiệu suất, áp dụng vào thực tiễn xây dựng Việt Nam.
      </p>

      <div class="process-steps">

        <div class="step">
          <div class="step-dot">P1</div>
          <div class="step-body">
            <h4>Tư duy Hệ thống (Systems Thinking)</h4>
            <p>Nhìn dự án như một hệ thống liên thông — thay đổi GPMB ảnh hưởng thế nào đến dòng tiền? Rủi ro pháp lý tác động ra sao đến tiến độ? Mọi quyết định đều được phân tích trong bối cảnh tổng thể.</p>
          </div>
        </div>

        <div class="step">
          <div class="step-dot">P2</div>
          <div class="step-body">
            <h4>Kiểm soát Chủ động (Proactive Control)</h4>
            <p>Áp dụng <strong>Hold Points</strong> và <strong>Inspection Test Plan (ITP)</strong> để ngăn chặn sai sót trước khi phát sinh — không phải xử lý sự cố sau khi đã bê tông xong. Chi phí phòng ngừa rẻ hơn 25 lần so với sửa lỗi sau bàn giao.</p>
          </div>
        </div>

        <div class="step">
          <div class="step-dot">P3</div>
          <div class="step-body">
            <h4>Quản lý Giá trị (Value Delivery)</h4>
            <p>Mục tiêu không phải "ký xong biên bản nghiệm thu" mà là công trình đi vào vận hành đúng yêu cầu, đúng chi phí vòng đời. PM giỏi quan tâm đến <strong>Outcome</strong>, không chỉ <strong>Output</strong>.</p>
          </div>
        </div>

        <div class="step">
          <div class="step-dot">P4</div>
          <div class="step-body">
            <h4>Tuân thủ Pháp lý (Legal Compliance)</h4>
            <p>Tích hợp đầy đủ yêu cầu của <strong>Luật xây dựng</strong>, <strong>Nghị định 175/2024/NĐ-CP</strong> và <strong>NĐ 06/2021</strong> vào quy trình quản lý — RACI matrix, thẩm quyền phân cấp, hồ sơ hoàn công điện tử theo quy định mới nhất.</p>
          </div>
        </div>

        <div class="step">
          <div class="step-dot">P5</div>
          <div class="step-body">
            <h4>Tùy chỉnh linh hoạt (Tailoring)</h4>
            <p>Không có một quy trình nào phù hợp cho mọi dự án. Chúng tôi hướng dẫn cách <em>tailoring</em> phương pháp — từ Predictive (Waterfall) cho dự án lớn đến Hybrid/Agile cho dự án cần linh hoạt.</p>
          </div>
        </div>

      </div>
    </div>

    <!-- ══════════════════════════════════════════════ -->
    <!-- 4. ỨNG DỤNG WEB KỸ THUẬT                      -->
    <!-- ══════════════════════════════════════════════ -->
    <div class="about-section">
      <h2><span class="section-icon">⚙️</span> Ứng Dụng Web Hỗ Trợ Kỹ Sư</h2>

      <p>
        Các phần mềm CAE/FEM truyền thống đòi hỏi workstation đắt tiền và bản quyền hàng nghìn đô la. Chúng tôi đang thay đổi điều đó bằng cách mang lõi tính toán hiệu suất cao (C++, Fortran) lên trình duyệt qua <strong>WebAssembly</strong>.
      </p>

      <div class="app-grid">

        <div class="app-card">
          <div class="app-icon">🏗️</div>
          <h4>SheetPileFEM-WASM</h4>
          <p>Phân tích tường cừ ván theo phương pháp Phần tử Hữu hạn (FEM). Xuất kết quả biểu đồ mô men, lực cắt, chuyển vị ngay trên trình duyệt.</p>
          <span class="app-badge free">Miễn phí</span>
        </div>

        <div class="app-card">
          <div class="app-icon">💰</div>
          <h4>BoQ Estimator</h4>
          <p>Lập dự toán chi phí xây dựng theo đầu mục công việc (Bill of Quantities). Hỗ trợ xuất Excel theo đơn giá địa phương.</p>
          <span class="app-badge beta">Beta</span>
        </div>

        <div class="app-card">
          <div class="app-icon">📊</div>
          <h4>Schedule Builder</h4>
          <p>Lập tiến độ Gantt và Look-ahead Schedule trực quan. Xác định đường găng (Critical Path) và cảnh báo xung đột nguồn lực.</p>
          <span class="app-badge beta">Beta</span>
        </div>

        <div class="app-card">
          <div class="app-icon">✅</div>
          <h4>ITP & Hold Points Checklist</h4>
          <p>Bộ checklist nghiệm thu theo TCVN tích hợp Hold Points. Xuất biên bản PDF ngay trên thiết bị di động tại công trường.</p>
          <span class="app-badge free">Miễn phí</span>
        </div>

        <div class="app-card">
          <div class="app-icon">🌊</div>
          <h4>HydroFlow Simulator</h4>
          <p>Mô hình thủy lực 1D/2D cho lưu vực sông và công trình thoát nước. Nền tảng WebAssembly dựa trên solver Fortran hiệu suất cao.</p>
          <span class="app-badge roadmap">Roadmap</span>
        </div>

        <div class="app-card">
          <div class="app-icon">📐</div>
          <h4>Taylor Series Visualizer</h4>
          <p>Công cụ trực quan hóa xấp xỉ Taylor cho sinh viên và giảng viên kỹ thuật. Minh họa tương tác đa biến, đa bậc.</p>
          <span class="app-badge free">Miễn phí</span>
        </div>

      </div>

      <p style="margin-top: 1.4rem; font-size: 0.9rem; color: var(--color-subtext);">
        <strong>Lộ trình phát triển:</strong> Mỗi ứng dụng đi kèm bài viết kỹ thuật giải thích lý thuyết và thuật toán — <em>"Blog as Documentation"</em>. Phiên bản cộng đồng (Free) luôn có đầy đủ chức năng cơ bản.
      </p>
    </div>

    <!-- ══════════════════════════════════════════════ -->
    <!-- 5. TRIẾT LÝ VẬN HÀNH                          -->
    <!-- ══════════════════════════════════════════════ -->
    <div class="about-section">
      <h2><span class="section-icon">💡</span> Triết Lý Vận Hành</h2>

      <div class="pillar-grid">

        <div class="pillar-card">
          <div class="pillar-num">🆓</div>
          <h4>Giáo dục & Cộng đồng</h4>
          <p>Công cụ cốt lõi luôn miễn phí. Sinh viên kỹ thuật và kỹ sư mới ra trường xứng đáng có phần mềm chuyên nghiệp để học và thực hành, không cần bản quyền đắt tiền.</p>
        </div>

        <div class="pillar-card accent-gold">
          <div class="pillar-num">🏢</div>
          <h4>Chuyên nghiệp cho Doanh nghiệp</h4>
          <p>Phiên bản Pro mở khóa tính năng nâng cao: không giới hạn dự án, xuất báo cáo PDF chuyên nghiệp, API tích hợp hệ thống nội bộ của doanh nghiệp.</p>
        </div>

        <div class="pillar-card accent-teal">
          <div class="pillar-num">📝</div>
          <h4>Blog là Tài liệu</h4>
          <p>Mỗi bài viết giải thích cả "Tại sao?" lẫn "Như thế nào?" — lý thuyết thuật toán, khung pháp lý, và thực hành thực chiến tại công trường Việt Nam.</p>
        </div>

      </div>
    </div>

    <!-- ══════════════════════════════════════════════ -->
    <!-- 6. VỀ TÁC GIẢ                                  -->
    <!-- ══════════════════════════════════════════════ -->
    <div class="about-section">
      <h2><span class="section-icon"></span> Về Tác Giả</h2>

      <div class="author-block">
        <div class="author-avatar">HH</div>
        <div class="author-bio">
          <h4>TS. Nguyễn Hải Hà — PMP®</h4>
          <p>
            Tiến sĩ Kỹ thuật Xây dựng Công trình Thủy. Chuyên gia về Công trình Thủy lợi, Bảo vệ bờ sông bờ biển, Kết cấu công trình và Địa kỹ thuật. Có kinh nghiệm thực chiến trong quản lý và giám sát các dự án xây dựng theo chuẩn quốc tế (FIDIC, PMBOK). Đam mê lập trình và ứng dụng WebAssembly để đưa công cụ kỹ thuật hiệu suất cao lên nền tảng web.
          </p>
          <div class="tag-row">
            <span class="etag">PMP® – PMI</span>
            <span class="etag">PMBOK 7th</span>
            <span class="etag">FEM / FEA</span>
            <span class="etag">Thủy lực tính toán</span>
            <span class="etag">TCVN / QCVN</span>
            <span class="etag">NĐ 175/2024</span>
            <span class="etag">WebAssembly</span>
            <span class="etag">C++ / Python / Rust</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ══════════════════════════════════════════════ -->
    <!-- 7. KẾT NỐI                                     -->
    <!-- ══════════════════════════════════════════════ -->
    <div class="about-section">
      <h2><span class="section-icon">🤝</span> Kết Nối & Hợp Tác</h2>

      <p>
        Chúng tôi luôn tìm kiếm sự hợp tác từ kỹ sư, nhà nghiên cứu, doanh nghiệp xây dựng và các tổ chức muốn ứng dụng công nghệ vào quản lý dự án. Nếu bạn có câu hỏi, ý tưởng đóng góp hoặc nhu cầu tư vấn:
      </p>

      <ul style="margin: 0.8rem 0 1.2rem 1.5rem; padding: 0;">
        <li style="margin-bottom: 0.5rem; color: var(--color-text);">
          📧 Email: <a href="mailto:ha.nguyen@hydrostructai.com" style="color: var(--color-accent); font-weight: 600;">ha.nguyen@hydrostructai.com</a>
        </li>
        <li style="margin-bottom: 0.5rem; color: var(--color-text);">
          📞 Tel: <a href="tel:+84374874142" style="color: var(--color-accent); font-weight: 600;">+84 374 874 142</a>
        </li>
        <li style="color: var(--color-text);">
          🌐 Blog: Cập nhật hàng tuần về QLDA xây dựng, kỹ thuật số và công cụ mới
        </li>
      </ul>

      <div class="cta-row">
        <a href="/apps/" class="btn-primary">
          🚀 Khám phá Ứng dụng
        </a>
        <a href="/" class="btn-outline">
          📖 Thông tin trang chủ
        </a>
      </div>
    </div>

  </div><!-- /.about-wrapper -->
  </div><!-- /.center-content -->

  {% include sidebar-right.html %}

</div><!-- /.home-wrapper -->