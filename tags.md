---
layout: splash
title: "Danh Sách Tags"
permalink: /tags/
header:
  overlay_image: "/assets/images/hero-engineering.jpg"
  title: "Tags"
---

<link rel="stylesheet" href="/assets/css/custom-home.css">

<style>
  /* Khử padding-top mặc định của khung nội dung theme để dai liên hệ dính sát ảnh hero */
  .page__inner-wrap,
  .page__content {
    padding-top: 0 !important;
    margin-top: 0 !important;
  }

  /* Thanh liên hệ nằm NGOÀI ảnh hero, ngay phía dưới: dàn đều 2 bên, WhatsApp cố định chính giữa */
  .hero-contact-bar {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 0.5rem;
    padding: 0.3rem 1.5rem;
    margin: 0;
    line-height: 1;
    background: #f4f6f9;
    border-bottom: 1px solid #e1e4e8;
  }

  .hero-contact-bar a:nth-child(1) { justify-self: start; }
  .hero-contact-bar a:nth-child(2) { justify-self: center; }
  .hero-contact-bar a:nth-child(3) { justify-self: end; }

  .tag-section { margin-bottom: 3rem; }

  .tag-header {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid #667eea;
  }

  .tag-header h2 {
    margin: 0;
    font-size: 1.8rem;
    color: #1a1a2e;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .tag-badge {
    background: #667eea;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
  }

  .posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .post-card {
    background: white;
    border: 1px solid #e1e4e8;
    border-radius: 8px;
    padding: 1.5rem;
    transition: all 0.2s;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }

  .post-card:hover {
    border-color: #667eea;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
    transform: translateY(-2px);
  }

  .post-card h3 { margin: 0 0 0.5rem 0; font-size: 1.1rem; }
  .post-card a { color: #0d6efd; text-decoration: none; font-weight: 600; }
  .post-card a:hover { text-decoration: underline; }

  .post-date { font-size: 0.85rem; color: #6a737d; margin-bottom: 0.75rem; }

  .post-excerpt {
    font-size: 0.9rem;
    color: #586069;
    line-height: 1.5;
    margin-bottom: 1rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .post-cta {
    display: inline-block;
    padding: 0.5rem 1rem;
    background: #667eea;
    color: white !important;
    text-decoration: none;
    border-radius: 4px;
    font-size: 0.85rem;
    font-weight: 600;
    transition: all 0.2s;
  }

  .post-cta:hover { background: #5468d3; transform: translateY(-1px); }

  .post-tags { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.75rem; }

  .post-tag {
    font-size: 0.75rem;
    background: #f1f3f5;
    color: #495057;
    padding: 0.25rem 0.5rem;
    border-radius: 3px;
    text-decoration: none;
    transition: all 0.2s;
  }

  .post-tag:hover { background: #667eea; color: white; }

  .intro-box {
    background: linear-gradient(135deg, #f5f7fa 0%, #f9fafc 100%);
    border-left: 4px solid #667eea;
    padding: 1.5rem;
    border-radius: 4px;
    margin-bottom: 2rem;
  }

  .tags-footer {
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid #e1e4e8;
    text-align: center;
    color: #6a737d;
    font-size: 0.9rem;
  }
</style>

<div class="hero-contact-bar">
  <a href="https://zalo.me/84374874142" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:0.3rem;background:#0068FF;color:#fff;text-decoration:none;font-weight:700;font-size:0.72rem;padding:0.3rem 0.65rem;border-radius:20px;box-shadow:0 2px 6px rgba(0,104,255,0.4);">💬 Zalo</a>
  <a href="https://wa.me/84374874142" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:0.3rem;background:#25D366;color:#fff;text-decoration:none;font-weight:700;font-size:0.72rem;padding:0.3rem 0.65rem;border-radius:20px;box-shadow:0 2px 6px rgba(37,211,102,0.4);">📱 WhatsApp</a>
  <a href="http://hatech.info" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:0.3rem;background:#e8a010;color:#1e3a5f;text-decoration:none;font-weight:700;font-size:0.72rem;padding:0.3rem 0.65rem;border-radius:20px;box-shadow:0 2px 6px rgba(232,160,16,0.4);">🌐 Profile</a>
</div>

<div class="home-wrapper">

  {% include sidebar-left.html %}

  <div class="center-content">
    
    <div class="intro-box">
      <h3 style="margin-top: 0;">📌 Cách Sử Dụng Tags</h3>
      <p>Trang này hiển thị tất cả <strong>tags</strong> được sử dụng trong các bài viết của HST.AI. Mỗi tag liệt kê các bài viết liên quan kèm <strong>tóm tắt nội dung</strong> và <strong>ngày đăng</strong>.</p>
      <p style="margin-bottom: 0;"><strong>Mẹo:</strong> Sử dụng Ctrl+F (⌘+F trên Mac) để tìm tag bạn cần.</p>
    </div>

    {% assign tags = site.tags | sort %}
    {% assign tag_count = tags | size %}

    <div style="margin-bottom: 1.5rem;">
      <h2 style="color: #1a1a2e; margin-bottom: 0.5rem;">
        🏷️ Tất Cả Tags
        <span class="tag-badge">{{ tag_count }} tags</span>
      </h2>
      <p style="color: #6a737d; margin: 0;">Nhấp vào tiêu đề bài viết để đọc nội dung đầy đủ</p>
    </div>

    {% for tag in tags %}
      {% assign tag_name = tag | first %}
      {% assign tag_posts = tag | last %}
      {% assign post_count = tag_posts | size %}

      <div class="tag-section">
        <div class="tag-header">
          <h2>{{ tag_name }}</h2>
          <span class="tag-badge">{{ post_count }}</span>
        </div>

        <div class="posts-grid">
          {% for post in tag_posts %}
            <div class="post-card">
              <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
              <div class="post-date">📅 {{ post.date | date: "%d/%m/%Y" }}</div>
              {% if post.excerpt %}
                <div class="post-excerpt">{{ post.excerpt | strip_html | truncatewords: 30 }}</div>
              {% elsif post.content %}
                <div class="post-excerpt">{{ post.content | strip_html | truncatewords: 30 }}</div>
              {% else %}
                <div class="post-excerpt"><em>Không có mô tả</em></div>
              {% endif %}
              <div style="margin-top: 1rem;">
                <a href="{{ post.url }}" class="post-cta">Đọc tiếp <i class="fas fa-arrow-right" style="margin-left: 0.25rem;"></i></a>
              </div>
              {% if post.tags %}
                <div class="post-tags">
                  {% for tag_item in post.tags limit:3 %}
                    <span class="post-tag">{{ tag_item }}</span>
                  {% endfor %}
                  {% if post.tags.size > 3 %}
                    <span class="post-tag">+{{ post.tags.size | minus: 3 }}</span>
                  {% endif %}
                </div>
              {% endif %}
            </div>
          {% endfor %}
        </div>
      </div>
    {% endfor %}

    <div class="tags-footer">
      <p>Cập nhật lần cuối: <strong>{{ site.time | date: "%d/%m/%Y %H:%M" }}</strong></p>
      <p>Tổng cộng: <strong>{{ site.posts | size }}</strong> bài viết | <strong>{{ tag_count }}</strong> tags</p>
    </div>

  </div>

</div>
{% include sidebar-right.html %}