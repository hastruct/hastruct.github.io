---
layout: splash
title: "Ứng dụng"
permalink: /apps/
header:
  overlay_image: "/assets/images/hero-engineering.jpg"
caption: "<div class='hero-contact-wrapper'><span class='c-item' style='color: #FF0000; font-weight: 900;'>WhatsApp: <a href='https://wa.me/qr/UOQNWYT5B7SNG1' style='color: #FF0000; font-weight: 900;'>HST.AI</a></span> <span class='c-sep'>|</span> <span class='c-item' style='color: #00008B; font-weight: 900;'>Email: <a href='mailto:ha.nguyen@hydrostructai.com' style='color: #00008B; font-weight: 900;'>ha.nguyen@hydrostructai.com</a></span> <span class='c-sep'>|</span> <span class='c-item' style='color: #000000; font-weight: 900;'>Tel: +84 374874142</span></div>"
  title: "Các Ứng dụng cho Kỹ thuật xây dựng"
---

<link rel="stylesheet" href="{{ site.baseurl }}/assets/css/custom-home.css">

<style>
  /* ── FIX: đảm bảo .center-content là flex child đúng cách ── */
  .home-wrapper {
    display: flex;
    align-items: flex-start;
    gap: 0;
    width: 100%;
  }

  .center-content {
    flex: 1;          /* chiếm toàn bộ không gian còn lại */
    min-width: 0;     /* ngăn flex child bị overflow ra ngoài */
    padding: 1.5rem 1.5rem 2rem;
  }

  /* ── App card badges ── */
  .app-card-badges {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-bottom: 0.8rem;
  }

  .badge {
    padding: 0.35em 0.6em;
    font-weight: 600;
    border-radius: 4px;
    font-size: 0.7rem;
    color: #fff;
    text-transform: uppercase;
  }

  .bg-primary { background-color: #0d6efd; }
  .bg-success  { background-color: #198754; }
  .bg-danger   { background-color: #dc3545; }
  .bg-info     { background-color: #0dcaf0; }
  .bg-warning  { background-color: #ffc107; color: #000; }

  /* ── App features list ── */
  .app-features-list {
    background: #f8f9fa;
    padding: 10px 15px;
    border-radius: 6px;
    margin-bottom: 15px;
    border: 1px solid #eee;
  }

  .app-features-list h6 {
    margin: 0 0 5px 0;
    font-size: 0.8rem;
    font-weight: 700;
    color: #555;
    text-transform: uppercase;
  }

  .app-features-list ul {
    margin: 0;
    padding-left: 1.2rem;
    font-size: 0.85rem;
    color: #666;
  }

  .app-features-list li { margin-bottom: 2px; }

  /* ── WASM Info Box ── */
  .wasm-box {
    background: #f0f7ff;
    border: 1px solid #cce5ff;
    border-radius: 8px;
    padding: 1.5rem;
    margin-top: 2rem;
    text-align: center;
  }

  .wasm-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-top: 15px;
  }

  .wasm-item h6 {
    font-size: 0.8rem;
    margin: 5px 0 0 0;
    font-weight: bold;
  }

  .wasm-item p {
    font-size: 0.75rem;
    margin: 0;
    color: #666;
  }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .home-wrapper {
      flex-direction: column;
    }
    .wasm-grid {
      grid-template-columns: 1fr;
      gap: 20px;
    }
  }
</style>

<div class="home-wrapper">

  {% include sidebar-left.html %}

  <div class="center-content">

    <h2 class="section-title">Danh sách Ứng dụng</h2>
    <p style="color: #666; margin-bottom: 20px;">
      Các công cụ tính toán chạy trực tiếp trên trình duyệt, không cần cài đặt.
    </p>

    <div class="app-grid">

      <!-- 1. ShortCol 3D -->
      <div class="app-card">
        <div class="app-card-image">
          <img src="{{ site.baseurl }}/assets/images/app-icons/shortcol3D.png" alt="Short Column 3D">
        </div>
        <div class="app-card-body">
          <h3 class="app-card-title">ShortCol 3D</h3>
          <div class="app-card-badges">
            <span class="badge bg-primary">Bê tông</span>
            <span class="badge bg-success">Lệch tâm xiên</span>
          </div>
          <p class="app-card-desc">
            Xây dựng biểu đồ tương tác không gian 3D (P-Mx-My) cho cột bê tông cốt thép tiết diện chữ nhật.
          </p>
          <div class="app-features-list">
            <h6>Tính năng:</h6>
            <ul>
              <li>Biểu đồ 3D xoay chiều trực quan</li>
              <li>Kiểm tra hệ số an toàn</li>
              <li>Xuất thuyết minh tính toán</li>
            </ul>
          </div>
          <a href="{{ site.baseurl }}/apps/landing.html" class="btn--app">Xem chi tiết</a>
        </div>
      </div>

      <!-- 2. ShortCol 2D -->
      <div class="app-card">
        <div class="app-card-image">
          <img src="{{ site.baseurl }}/assets/images/app-icons/shortcol2D.png" alt="Short Column 2D">
        </div>
        <div class="app-card-body">
          <h3 class="app-card-title">ShortCol 2D</h3>
          <div class="app-card-badges">
            <span class="badge bg-primary">Bê tông</span>
            <span class="badge bg-warning">Lệch tâm phẳng</span>
          </div>
          <p class="app-card-desc">
            Biểu đồ tương tác 2D (P-M) cho cột tiết diện chữ nhật chịu nén lệch tâm phẳng.
          </p>
          <div class="app-features-list">
            <h6>Tính năng:</h6>
            <ul>
              <li>Vẽ biểu đồ tương tác lát cắt</li>
              <li>Tính toán cốt thép nhanh</li>
              <li>Giao diện nhập liệu đơn giản</li>
            </ul>
          </div>
          <a href="{{ site.baseurl }}/apps/landing.html" class="btn--app">Xem chi tiết</a>
        </div>
      </div>

      <!-- 3. Cọc Chịu Tải Ngang -->
      <div class="app-card">
        <div class="app-card-image">
          <img src="{{ site.baseurl }}/assets/images/app-icons/lateral-pile.png"
               alt="Lateral Pile Analysis"
               onerror="this.src='{{ site.baseurl }}/assets/images/app-icons/pile-group2.png'">
        </div>
        <div class="app-card-body">
          <h3 class="app-card-title">Cọc Chịu Tải Ngang</h3>
          <div class="app-card-badges">
            <span class="badge bg-danger">P-Y Curve</span>
            <span class="badge bg-info" style="color: #000;">TCVN 10304</span>
          </div>
          <p class="app-card-desc">
            Phân tích cọc đơn chịu tải trọng ngang sử dụng mô hình phi tuyến p-y curve.
          </p>
          <div class="app-features-list">
            <h6>Tính năng:</h6>
            <ul>
              <li>Mô hình đất nền nhiều lớp</li>
              <li>Đất dính và đất rời</li>
              <li>Biểu đồ chuyển vị &amp; nội lực</li>
            </ul>
          </div>
          <a href="{{ site.baseurl }}/apps/landing.html" class="btn--app">Xem chi tiết</a>
        </div>
      </div>

      <!-- 4. Tường Cừ FEM -->
      <div class="app-card">
        <div class="app-card-image">
          <img src="{{ site.baseurl }}/assets/images/app-icons/sheetpile-icon.png" alt="Sheet Pile FEM">
        </div>
        <div class="app-card-body">
          <h3 class="app-card-title">Tường Cừ (FEM)</h3>
          <div class="app-card-badges">
            <span class="badge bg-primary">FEM</span>
            <span class="badge bg-success">WASM</span>
          </div>
          <p class="app-card-desc">
            Phân tích tường cừ, tường vây hố đào sâu bằng phương pháp Phần tử hữu hạn.
          </p>
          <div class="app-features-list">
            <h6>Tính năng:</h6>
            <ul>
              <li>Mô phỏng thi công theo giai đoạn</li>
              <li>Hệ thanh chống (Strut) &amp; Neo</li>
              <li>Tính toán dòng thấm</li>
            </ul>
          </div>
          <a href="{{ site.baseurl }}/apps/landing.html" class="btn--app">Xem chi tiết</a>
        </div>
      </div>

      <!-- 5. Nhóm Cọc 3D -->
      <div class="app-card">
        <div class="app-card-image">
          <img src="{{ site.baseurl }}/assets/images/app-icons/pilegroup-icon.png" alt="Pile Group 3D">
        </div>
        <div class="app-card-body">
          <h3 class="app-card-title">Nhóm Cọc 3D</h3>
          <div class="app-card-badges">
            <span class="badge bg-warning">Zavriev</span>
            <span class="badge bg-primary">Móng cọc</span>
          </div>
          <p class="app-card-desc">
            Phân tích móng cọc đài cao (bệ cứng) theo phương pháp Zavriev-Spiro.
          </p>
          <div class="app-features-list">
            <h6>Tính năng:</h6>
            <ul>
              <li>Hỗ trợ cọc xiên không gian</li>
              <li>Tải trọng 6 thành phần</li>
              <li>Tính phản lực đầu cọc</li>
            </ul>
          </div>
          <a href="{{ site.baseurl }}/apps/landing.html" class="btn--app">Xem chi tiết</a>
        </div>
      </div>

      <!-- 6. Dốc Nước & Tiêu Năng -->
      <div class="app-card">
        <div class="app-card-image">
          <img src="{{ site.baseurl }}/assets/images/app-icons/hydraulic-spillway.png"
               alt="Hydraulic Spillway"
               onerror="this.src='{{ site.baseurl }}/assets/images/app-icons/chute-spillway.png'">
        </div>
        <div class="app-card-body">
          <h3 class="app-card-title">Dốc Nước &amp; Tiêu Năng</h3>
          <div class="app-card-badges">
            <span class="badge bg-primary">Thủy lực</span>
            <span class="badge bg-success">Hydraulic Jump</span>
          </div>
          <p class="app-card-desc">
            Tính toán thủy lực dốc nước và bể tiêu năng dựa trên lý thuyết nước nhảy thủy lực.
          </p>
          <div class="app-features-list">
            <h6>Tính năng:</h6>
            <ul>
              <li>Tính toán nối tiếp sau dốc</li>
              <li>Thiết kế bể tiêu năng</li>
              <li>Kiểm tra hệ số ngập an toàn</li>
            </ul>
          </div>
          <a href="{{ site.baseurl }}/apps/landing.html" class="btn--app">Xem chi tiết</a>
        </div>
      </div>

    </div><!-- /.app-grid -->

    <!-- WASM Info Box -->
    <div class="wasm-box">
      <h5 style="color: #0d6efd; margin-bottom: 0.5rem; font-weight: bold;">
        <i class="fas fa-microchip"></i> Công Nghệ WebAssembly (WASM)
      </h5>
      <p style="font-size: 0.9rem; margin-bottom: 1rem;">
        Các ứng dụng trên được biên dịch từ C++ chạy native trên trình duyệt.
      </p>
      <div class="wasm-grid">
        <div class="wasm-item">
          <i class="fas fa-bolt text-warning"></i>
          <h6>Tốc độ cao</h6>
          <p>Hiệu năng như App cài đặt</p>
        </div>
        <div class="wasm-item">
          <i class="fas fa-user-shield text-success"></i>
          <h6>Bảo mật</h6>
          <p>Dữ liệu xử lý tại máy bạn</p>
        </div>
        <div class="wasm-item">
          <i class="fas fa-wifi text-primary"></i>
          <h6>Offline</h6>
          <p>Dùng được khi mất mạng</p>
        </div>
      </div>
    </div>

  </div><!-- /.center-content -->

  {% include sidebar-right.html %}

</div><!-- /.home-wrapper -->