
html_content = """<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tải Bộ Tài Liệu & Bảng Tính Toán Kết Cấu Công Trình - HydroStruct AI</title>
    <style>
        :root {
            --primary-color: #0f172a; /* Slate 900 */
            --secondary-color: #1e293b; /* Slate 800 */
            --accent-color: #0ea5e9; /* Sky 500 */
            --accent-hover: #0284c7; /* Sky 600 */
            --text-main: #f8fafc; /* Slate 50 */
            --text-muted: #94a3b8; /* Slate 400 */
            --bg-light: #ffffff;
            --bg-tint: #f1f5f9; /* Slate 100 */
            --border-color: #e2e8f0; /* Slate 200 */
            --success-color: #10b981; /* Emerald 500 */
        }

        *, *::before, *::after {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            background-color: var(--primary-color);
            color: #334155;
            line-height: 1.6;
            -webkit-font-smoothing: antialiased;
        }

        /* Utility classes */
        .container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 24px;
        }

        /* Header Section */
        header {
            background-color: rgba(15, 23, 42, 0.9);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding: 16px 0;
            position: sticky;
            top: 0;
            z-index: 100;
            backdrop-filter: blur(8px);
        }

        .header-wrap {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            font-size: 20px;
            font-weight: 800;
            color: var(--text-main);
            letter-spacing: -0.5px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .logo span {
            color: var(--accent-color);
        }

        .hotline {
            font-size: 14px;
            color: var(--text-muted);
            font-weight: 500;
        }

        .hotline a {
            color: var(--text-main);
            text-decoration: none;
            font-weight: 600;
            border-bottom: 1px dashed var(--accent-color);
        }

        /* Hero Section */
        .hero {
            padding: 60px 0 80px 0;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: var(--text-main);
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .hero-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 48px;
            align-items: center;
        }

        @media (min-width: 992px) {
            .hero-grid {
                grid-template-columns: 1.12fr 0.88fr;
            }
        }

        .hero-content h1 {
            font-size: 32px;
            font-weight: 800;
            line-height: 1.25;
            margin-bottom: 20px;
            color: #ffffff;
            letter-spacing: -0.5px;
        }

        .hero-content h1 span {
            color: var(--accent-color);
            background: linear-gradient(to right, #0ea5e9, #38bdf8);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .hero-content .subtitle {
            font-size: 16px;
            color: var(--text-muted);
            margin-bottom: 32px;
        }

        /* Document Mockup Visual */
        .doc-mockup {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            padding: 32px;
            position: relative;
            box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
        }

        .mockup-header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 24px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding-bottom: 16px;
        }

        .mockup-icon {
            width: 48px;
            height: 48px;
            background: rgba(14, 165, 233, 0.1);
            border: 1px solid rgba(14, 165, 233, 0.3);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--accent-color);
            font-size: 24px;
            font-weight: bold;
        }

        .mockup-title h3 {
            font-size: 16px;
            font-weight: 700;
        }

        .mockup-title p {
            font-size: 12px;
            color: var(--text-muted);
        }

        .file-list {
            list-style: none;
        }

        .file-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px;
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 8px;
            margin-bottom: 12px;
            font-size: 14px;
        }

        .file-name {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .file-name::before {
            content: "📊";
            font-size: 16px;
        }

        .file-name.pdf::before {
            content: "📕";
        }

        .file-size {
            color: var(--text-muted);
            font-size: 12px;
        }

        /* Lead Capture Form */
        .form-container {
            background-color: rgba(30, 41, 59, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            padding: 32px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(12px);
        }

        .form-container h2 {
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 8px;
            color: #ffffff;
        }

        .form-container p {
            font-size: 14px;
            color: var(--text-muted);
            margin-bottom: 24px;
        }

        .form-group {
            margin-bottom: 18px;
        }

        .form-group label {
            display: block;
            font-size: 13px;
            font-weight: 600;
            margin-bottom: 6px;
            color: var(--text-muted);
        }

        .form-control {
            width: 100%;
            padding: 12px 16px;
            background-color: rgba(15, 23, 42, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 8px;
            color: #ffffff;
            font-size: 14px;
            transition: all 0.2s ease;
        }

        .form-control:focus {
            outline: none;
            border-color: var(--accent-color);
            box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.2);
        }

        select.form-control {
            appearance: none;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 16px center;
            background-size: 16px;
            padding-right: 40px;
        }

        .btn-submit {
            width: 100%;
            padding: 14px;
            background-color: var(--accent-color);
            border: none;
            border-radius: 8px;
            color: #ffffff;
            font-size: 15px;
            font-weight: 700;
            cursor: pointer;
            transition: background-color 0.2s ease;
            margin-top: 10px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            box-shadow: 0 4px 6px -1px rgba(14, 165, 233, 0.3);
        }

        .btn-submit:hover {
            background-color: var(--accent-hover);
        }

        .form-privacy {
            text-align: center;
            font-size: 12px;
            color: var(--text-muted);
            margin-top: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
        }

        /* Expert Quote Section */
        .quote-section {
            background-color: var(--bg-light);
            padding: 60px 0;
            border-bottom: 1px solid var(--border-color);
        }

        .quote-box {
            max-width: 850px;
            margin: 0 auto;
            background-color: var(--bg-tint);
            border-left: 4px solid var(--accent-color);
            border-radius: 0 16px 16px 0;
            padding: 32px;
            display: grid;
            grid-template-columns: 1fr;
            gap: 24px;
            align-items: center;
        }

        @media (min-width: 600px) {
            .quote-box {
                grid-template-columns: 120px 1fr;
            }
        }

        .quote-avatar {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background-color: #cbd5e1;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 36px;
            border: 3px solid #ffffff;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
            justify-self: center;
        }

        .quote-text blockquote {
            font-size: 16px;
            font-style: italic;
            color: #1e293b;
            font-weight: 500;
            margin-bottom: 12px;
        }

        .quote-author {
            font-size: 14px;
            font-weight: 700;
            color: #0f172a;
        }

        .quote-author span {
            font-weight: 400;
            color: #64748b;
        }

        /* Value Proposition Section */
        .values-section {
            background-color: var(--bg-light);
            padding: 80px 0;
        }

        .section-title {
            text-align: center;
            margin-bottom: 54px;
        }

        .section-title h2 {
            font-size: 26px;
            font-weight: 800;
            color: #0f172a;
            letter-spacing: -0.5px;
            margin-bottom: 12px;
        }

        .section-title p {
            font-size: 15px;
            color: #64748b;
            max-width: 600px;
            margin: 0 auto;
        }

        .values-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 30px;
        }

        @media (min-width: 768px) {
            .values-grid {
                grid-template-columns: repeat(3, 1fr);
            }
        }

        .value-card {
            background-color: #ffffff;
            border: 1px solid var(--border-color);
            border-radius: 12px;
            padding: 32px;
            transition: all 0.3s ease;
        }

        .value-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 20px -3px rgba(0, 0, 0, 0.05);
            border-color: rgba(14, 165, 233, 0.3);
        }

        .card-icon {
            font-size: 24px;
            margin-bottom: 20px;
            display: inline-block;
            background-color: var(--bg-tint);
            width: 52px;
            height: 52px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 10px;
            color: var(--accent-color);
        }

        .value-card h3 {
            font-size: 18px;
            font-weight: 700;
            color: #0f172a;
            margin-bottom: 12px;
        }

        .value-card p {
            font-size: 14px;
            color: #475569;
            line-height: 1.6;
        }

        /* Contact CTA Block */
        .cta-block {
            background-color: var(--secondary-color);
            color: var(--text-main);
            padding: 60px 0;
            text-align: center;
            border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .cta-block h3 {
            font-size: 22px;
            font-weight: 700;
            margin-bottom: 12px;
        }

        .cta-block p {
            font-size: 15px;
            color: var(--text-muted);
            max-width: 700px;
            margin: 0 auto 24px auto;
        }

        .cta-phone {
            display: inline-block;
            background-color: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.1);
            padding: 12px 24px;
            border-radius: 30px;
            color: #ffffff;
            font-weight: 700;
            font-size: 18px;
            text-decoration: none;
            transition: all 0.2s ease;
        }

        .cta-phone:hover {
            border-color: var(--accent-color);
            color: var(--accent-color);
        }

        /* Footer Section */
        footer {
            background-color: var(--primary-color);
            padding: 32px 0;
            border-top: 1px solid rgba(255, 255, 255, 0.05);
            color: var(--text-muted);
            font-size: 13px;
        }

        .footer-wrap {
            display: flex;
            flex-direction: column;
            gap: 16px;
            align-items: center;
            justify-content: space-between;
        }

        @media (min-width: 768px) {
            .footer-wrap {
                flex-direction: row;
            }
        }

        .footer-links {
            display: flex;
            gap: 24px;
        }

        .footer-links a {
            color: var(--text-muted);
            text-decoration: none;
            transition: color 0.2s ease;
        }

        .footer-links a:hover {
            color: var(--text-main);
        }
    </style>
</head>
<body>

    <header>
        <div class="container header-wrap">
            <div class="logo">🧬 HydroStruct<span>AI</span></div>
            <div class="hotline">Hỗ trợ kỹ thuật: <a href="tel:0946389799">0946.389.799</a></div>
        </div>
    </header>

    <section class="hero">
        <div class="container hero-grid">
            
            <div class="hero-content">
                <h1>BỘ THƯ VIỆN & BẢNG TÍNH TOÁN <span>KẾT CẤU CÔNG TRÌNH</span> CHUẨN ISO TỰ ĐỘNG HÓA</h1>
                <p class="subtitle">Hệ thống file tính toán tối ưu dầm, cột, móng, sàn theo TCVN mới nhất, tích hợp thuật toán AI giúp kỹ sư cắt giảm 50% thời gian triển khai và 15% khối lượng vật liệu.</p>
                
                <div class="doc-mockup">
                    <div class="mockup-header">
                        <div class="mockup-icon">AI</div>
                        <div class="mockup-title">
                            <h3>Gói Tài Liệu Kỹ Thuật Cao Cấp</h3>
                            <p>Phát hành bởi HydroStructAI Team • Cập nhật 2026</p>
                        </div>
                    </div>
                    <ul class="file-list">
                        <li class="file-item">
                            <span class="file-name">Bảng tính tối ưu tiết diện Dầm - Cột bê tông cốt thép</span>
                            <span class="file-size">4.2 MB (.xlsx)</span>
                        </li>
                        <li class="file-item">
                            <span class="file-name">Module Excel tự động hóa tính toán Móng băng & Móng cọc</span>
                            <span class="file-size">3.8 MB (.xlsx)</span>
                        </li>
                        <li class="file-item">
                            <span class="file-name">File mẫu Thuyết minh tính toán Kết cấu tiêu chuẩn kiểm định</span>
                            <span class="file-size">1.5 MB (.docx)</span>
                        </li>
                        <li class="file-item">
                            <span class="file-name pdf">Cẩm nang ứng dụng AI & Machine Learning trong tối ưu hóa kết cấu</span>
                            <span class="file-size">2.1 MB (.pdf)</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="form-container">
                <h2>Đăng Ký Nhận Tài Liệu</h2>
                <p>Vui lòng điền thông tin chính xác. Toàn bộ gói tài liệu và link tải bảng tính độc quyền sẽ được gửi tự động vào Email của bạn.</p>
                
                <form action="#" method="POST" autocomplete="on">
                    <div class="form-group">
                        <label Framework for="full_name">Họ và tên kỹ sư *</label>
                        <label for="full_name" class="screen-reader-text" style="display:none">Họ và tên</label>
                        <input type="text" id="full_name" name="full_name" class="form-control" placeholder="Ví dụ: Nguyễn Văn A" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="email">Email công việc *</label>
                        <input type="email" id="email" name="email" class="form-control" placeholder="name@company.com" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="phone">Số điện thoại (Zalo nhận file) *</label>
                        <input type="tel" id="phone" name="phone" class="form-control" placeholder="Nhập số điện thoại của bạn" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="position">Chuyên ngành / Vị trí công tác</label>
                        <select id="position" name="position" class="form-control">
                            <option value="structural_engineer">Kỹ sư kết cấu / Dân dụng</option>
                            <option value="architect">Kiến trúc sư / Thiết kế</option>
                            <option value="project_manager">Quản lý dự án / Giám sát (PM/QS)</option>
                            <option value="student">Học viên / Sinh viên kỹ thuật</option>
                            <option value="other">Vị trí khác</option>
                        </select>
                    </div>

                    <button type="submit" class="btn-submit">Nhận trọn bộ tài liệu ngay</button>
                    
                    <div class="form-privacy">
                        🔒 Cam kết bảo mật thông tin nội bộ theo tiêu chuẩn mã hóa.
                    </div>
                </form>
            </div>

        </div>
    </section>

    <section class="quote-section">
        <div class="container">
            <div class="quote-box">
                <div class="quote-avatar">👨‍💻</div>
                <div class="quote-text">
                    <blockquote>
                        "Sai sót trong tính toán kết cấu không chỉ gây lãng phí hàng tỷ đồng chi phí vật liệu mà còn tiềm ẩn nguy cơ mất an toàn nghiêm trọng cho công trình. Bộ công cụ tự động hóa này được chúng tôi chuẩn hóa nhằm giúp các kỹ sư kiểm soát sai số tuyệt đối và tối ưu hóa hàm lượng cốt thép một cách khoa học nhất."
                    </blockquote>
                    <div class="quote-author">Dr. Minh Nguyen <span>• Giám đốc Kỹ thuật tại HydroStructAI Team</span></div>
                </div>
            </div>
        </div>
    </section>

    <section class="values-section">
        <div class="container">
            <div class="section-title">
                <h2>Giá Trị Thực Tế Kỹ Sư Sẽ Nhận Được</h2>
                <p>Không chỉ là lý thuyết suông, bộ tài liệu cung cấp các công cụ thực chiến áp dụng ngay vào dự án của bạn.</p>
            </div>
            
            <div class="values-grid">
                <div class="value-card">
                    <div class="card-icon">📈</div>
                    <h3>Bảng tính Excel tự động</h3>
                    <p>Hệ thống công thức lập sẵn cho dầm, cột, móng theo TCVN mới nhất. Tự động kiểm tra điều kiện cường độ, độ võng, vết nứt chỉ bằng cách nhập tải trọng nội lực.</p>
                </div>
                <div class="value-card">
                    <div class="card-icon">📂</div>
                    <h3>Thuyết minh mẫu chuẩn ISO</h3>
                    <p>File Word thuyết minh mẫu hoàn chỉnh, trình bày khoa học, mạch lạc, giúp kỹ sư dễ dàng vượt qua các bước thẩm tra, thẩm định khắt khe từ chủ đầu tư.</p>
                </div>
                <div class="value-card">
                    <div class="card-icon">🤖</div>
                    <h3>Tư duy tối ưu hóa bằng AI</h3>
                    <p>Hướng dẫn phương pháp ứng dụng Generative AI và thuật toán nội suy nhằm tìm ra tiết diện cấu kiện tối ưu, tiết kiệm cốt thép từ 12-18% so với phương pháp thủ công.</p>
                </div>
            </div>
        </div>
    </section>

    <section class="cta-block">
        <div class="container">
            <h3>Cần Hỗ Trợ Tích Hợp Hệ Thống Tính Toán AI Vào Doanh Nghiệp?</h3>
            <p>Nếu doanh nghiệp của bạn quan tâm đến giải pháp tự động hóa thiết kế kết cấu quy mô lớn, hãy liên hệ trực tiếp với đội ngũ chuyên gia công nghệ của chúng tôi.</p>
            <a href="tel:0946389799" class="cta-phone">📞 Hotline Kỹ Thuật: 0946.389.799</a>
        </div>
    </section>

    <footer>
        <div class="container footer-wrap">
            <div>&copy; 2026 HydroStructAI. All rights reserved.</div>
            <div class="footer-links">
                <a href="#">Chính sách bảo mật</a>
                <a href="#">Điều khoản sử dụng</a>
            </div>
        </div>
    </footer>

</body>
</html>
"""

with open("hydrostructai_landing_page.html", "w", encoding="utf-8") as f:
    f.write(html_content)

print("File generated successfully.")



```

```text
File generated successfully.


```

