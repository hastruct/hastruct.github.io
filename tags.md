---
layout: splash
title: "Danh Sách Tags"
permalink: /tags/
header:
  overlay_image: "/assets/images/hero-engineering.jpg"
  <div class='hero-contact-wrapper' style='font-weight: 900;'>
	  <span class='c-item' style='color: #FF0000;'>
		WhatsApp: <a href='https://wa.me/qr/UOQNWYT5B7SNG1' style='color: #FF0000; text-decoration: none;'>HST.AI</a>
	  </span> 
	  
	  <span class='c-sep' style='color: #000000; margin: 0 5px;'>|</span> 
	  
	  <span class='c-item' style='color: #00008B;'>
		Email: <a href='mailto:ha.nguyen@hydrostructai.com' style='color: #00008B; text-decoration: none;'>ha.nguyen@hydrostructai.com</a>
	  </span> 
	  
	  <span class='c-sep' style='color: #000000; margin: 0 5px;'>|</span> 
	  
	  <span class='c-item' style='color: #000000;'>
		Tel: +84 374874142
	  </span>
</div>

  title: "Tags"
---

<link rel="stylesheet" href="/assets/css/custom-home.css">

<style>
  /* Tags Page Specific Styles */
  .tag-section {
    margin-bottom: 3rem;
  }

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

  .post-card h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.1rem;
  }

  .post-card a {
    color: #0d6efd;
    text-decoration: none;
    font-weight: 600;
  }

  .post-card a:hover {
    text-decoration: underline;
  }

  .post-date {
    font-size: 0.85rem;
    color: #6a737d;
    margin-bottom: 0.75rem;
  }

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

  .post-cta:hover {
    background: #5468d3;
    transform: translateY(-1px);
  }

  .post-tags {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-top: 0.75rem;
  }

  .post-tag {
    font-size: 0.75rem;
    background: #f1f3f5;
    color: #495057;
    padding: 0.25rem 0.5rem;
    border-radius: 3px;
    text-decoration: none;
    transition: all 0.2s;
  }

  .post-tag:hover {
    background: #667eea;
    color: white;
  }

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

<!-- Structure like apps.md: home-wrapper + sidebar-left + center-content -->
<div class="home-wrapper">

  <!-- LEFT SIDEBAR (từ _includes/sidebar-left.html) -->
  {% include sidebar-left.html %}-->

  <!-- CENTER CONTENT -->
  <div class="center-content">
    
    <!-- Introduction Box -->
    <div class="intro-box">
      <h3 style="margin-top: 0;">📌 Cách Sử Dụng Tags</h3>
      <p>Trang này hiển thị tất cả <strong>tags</strong> được sử dụng trong các bài viết của HST.AI. Mỗi tag liệt kê các bài viết liên quan kèm <strong>tóm tắt nội dung</strong> và <strong>ngày đăng</strong>.</p>
      <p style="margin-bottom: 0;"><strong>Mẹo:</strong> Sử dụng Ctrl+F (⌘+F trên Mac) để tìm tag bạn cần.</p>
    </div>

    <!-- Tags List -->
    {% assign tags = site.tags | sort %}
    {% assign tag_count = tags | size %}

    <div style="margin-bottom: 1.5rem;">
      <h2 style="color: #1a1a2e; margin-bottom: 0.5rem;">
        🏷️ Tất Cả Tags
        <span class="tag-badge">{{ tag_count }} tags</span>
      </h2>
      <p style="color: #6a737d; margin: 0;">Nhấp vào tiêu đề bài viết để đọc nội dung đầy đủ</p>
    </div>

    <!-- Tags Sections -->
    {% for tag in tags %}
      {% assign tag_name = tag | first %}
      {% assign tag_posts = tag | last %}
      {% assign post_count = tag_posts | size %}

      <div class="tag-section">
        <div class="tag-header">
          <h2>{{ tag_name }}</h2>
          <span class="tag-badge">{{ post_count }}</span>
        </div>

        <!-- Posts Grid -->
        <div class="posts-grid">
          {% for post in tag_posts %}
            <div class="post-card">
              <!-- Post Title -->
              <h3>
                <a href="{{ post.url }}">{{ post.title }}</a>
              </h3>

              <!-- Post Date -->
              <div class="post-date">
                📅 {{ post.date | date: "%d/%m/%Y" }}
              </div>

              <!-- Post Excerpt / Summary -->
              {% if post.excerpt %}
                <div class="post-excerpt">
                  {{ post.excerpt | strip_html | truncatewords: 30 }}
                </div>
              {% elsif post.content %}
                <div class="post-excerpt">
                  {{ post.content | strip_html | truncatewords: 30 }}
                </div>
              {% else %}
                <div class="post-excerpt">
                  <em>Không có mô tả</em>
                </div>
              {% endif %}

              <!-- Read More Button -->
              <div style="margin-top: 1rem;">
                <a href="{{ post.url }}" class="post-cta">
                  Đọc tiếp <i class="fas fa-arrow-right" style="margin-left: 0.25rem;"></i>
                </a>
              </div>

              <!-- Tags -->
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

    <!-- Footer -->
    <div class="tags-footer">
      <p>Cập nhật lần cuối: <strong>{{ site.time | date: "%d/%m/%Y %H:%M" }}</strong></p>
      <p>Tổng cộng: <strong>{{ site.posts | size }}</strong> bài viết | <strong>{{ tag_count }}</strong> tags</p>
    </div>

  </div>

</div>
<!-- RIGHT SIDEBAR -->
  {% include sidebar-right.html %}