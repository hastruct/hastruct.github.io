---
layout: archive
title: "Danh Sách Tags"
permalink: /tags/
header:
  overlay_image: "/assets/images/hero-engineering.jpg"
  caption: "<div class='hero-contact-wrapper'><span class='c-item'><span style='color: #FFD700; font-weight: bold;'>WhatsApp: <a href='https://wa.me/qr/UOQNWYT5B7SNG1'>HST.AI</a></span> <span class='c-sep'>|</span> <span class='c-item'>Email: <a href='mailto:ha.nguyen@hydrostructai.com'>ha.nguyen@hydrostructai.com</a></span> <span class='c-sep'>|</span> <span class='c-item'>Tel: +84 374874142</span></div>"
  title: "Tags - Danh Sách Thẻ"
---

<link rel="stylesheet" href="/assets/css/custom-home.css">

## 📌 Cách Sử Dụng Tags

Trang này liệt kê tất cả **tags** được sử dụng trong các bài viết của HST.AI. Nhấp vào bất kỳ tag nào để xem các bài viết liên quan.

### 🏷️ Các Danh Mục Tag Chính:

- **Kỹ Thuật Kết Cấu:** PileGroup, ShortColumn, SheetPileFEM, FEM, Biaxial
- **Tiêu Chuẩn & Quy Định:** TCVN5574:2018, TCVN10304:2014, ACI318, Eurocode2
- **Phần Mềm:** VBA, JavaScript, ETABS, WebAssembly
- **Chủ Đề:** Tutorial, Case Study, Theory, Code, Calculation
- **Ngành:** Civil Engineering, Water Resources, Infrastructure, BIM

---

## 📋 Danh Sách Tags (Tất Cả)

{% assign tags = site.tags | sort %}
{% assign tag_count = tags | size %}

**Tổng cộng: {{ tag_count }} tags**

{% for tag in tags %}
  {%- capture tag_name -%}{{ tag | first }}{%- endcapture -%}
  {%- capture tag_post_count -%}{{ tag | last | size }}{%- endcapture -%}
  
  <div style="margin: 20px 0; padding: 12px; background: #f9f9f9; border-left: 4px solid #667eea; border-radius: 4px;">
    <h3 style="margin: 0 0 8px 0; color: #333;">
      <a href="/tags/{{ tag_name | slugify }}/" style="text-decoration: none; color: #0d6efd;">
        {{ tag_name }}
      </a>
      <span style="font-size: 0.85rem; color: #666; margin-left: 8px; background: #e9ecef; padding: 2px 8px; border-radius: 12px;">
        {{ tag_post_count }} bài
      </span>
    </h3>
    
    <!-- Danh sách bài viết theo tag -->
    <ul style="margin: 0; padding-left: 20px; list-style-type: none;">
      {%- for post in tag[1] -%}
        <li style="margin: 4px 0;">
          <a href="{{ post.url }}" style="color: #333; text-decoration: none;">
            • {{ post.title }}
          </a>
          <span style="font-size: 0.8rem; color: #999;">
            ({{ post.date | date: "%d/%m/%Y" }})
          </span>
        </li>
      {%- endfor -%}
    </ul>
  </div>
{% endfor %}

---

## 🎯 Gợi Ý Sử Dụng

- **Tìm nhanh:** Sử dụng Ctrl+F (⌘+F trên Mac) để tìm tag bạn cần
- **Theo dõi chủ đề:** Subscribe vào tag yêu thích để nhận thông báo bài mới
- **SEO:** Mỗi tag có trang riêng tối ưu cho tìm kiếm

---

**Cập nhật lần cuối:** {{ site.time | date: "%d/%m/%Y" }}