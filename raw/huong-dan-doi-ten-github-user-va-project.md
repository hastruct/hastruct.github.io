# Hướng dẫn đổi tên GitHub Username và Repository

**Mục tiêu:** Đổi từ `hydrostructai/hydrostructai.github.io` → `hystruct/hystruct.github.io`

---

## Tổng quan các bước

| # | Bước | Nơi thực hiện | Có thể hoàn tác? |
|---|------|--------------|-----------------|
| 1 | Đổi tên GitHub Username | GitHub Settings | Có (trong 90 ngày) |
| 2 | Đổi tên Repository | GitHub Repo Settings | Có |
| 3 | Cập nhật git remote cục bộ | Terminal | Có |
| 4 | Cập nhật các file trong repo | Code editor | Có (git revert) |
| 5 | Kiểm tra GitHub Pages & Custom Domain | GitHub Repo Settings | Có |

---

## Bước 1 — Đổi tên GitHub Username

> ⚠️ **Lưu ý quan trọng:** GitHub tự động redirect URL cũ trong 90 ngày, nhưng các liên kết hardcode trong code **không** tự cập nhật.

1. Đăng nhập GitHub → **Settings** (góc trên phải, click avatar)
2. Chọn **Account** → cuộn xuống mục **Change username**
3. Nhập username mới: `hystruct`
4. Xác nhận → **Change my username**

**Hậu quả tức thì:**
- URL cũ `github.com/hydrostructai` → redirect 301 về `github.com/hystruct` (trong 90 ngày)
- Email thông báo gửi về hộp thư đã đăng ký
- GitHub Pages URL cũ `hydrostructai.github.io` → redirect về `hystruct.github.io`

---

## Bước 2 — Đổi tên Repository

1. Vào repo `hydrostructai/hydrostructai.github.io`
2. Chọn tab **Settings**
3. Mục **General** → **Repository name**
4. Đổi thành: `hystruct.github.io`
5. Nhấn **Rename**

**Lưu ý:** GitHub Pages chỉ nhận diện repo `<username>.github.io` là trang chủ, nên tên repo **phải khớp** với username mới.

---

## Bước 3 — Cập nhật git remote cục bộ

Sau khi đổi tên username và repo trên GitHub, cập nhật remote trong máy local:

```bash
# Kiểm tra remote hiện tại
git remote -v

# Cập nhật URL remote
git remote set-url origin https://github.com/hystruct/hystruct.github.io.git

# Xác nhận
git remote -v
# Kết quả mong đợi:
# origin  https://github.com/hystruct/hystruct.github.io.git (fetch)
# origin  https://github.com/hystruct/hystruct.github.io.git (push)
```

---

## Bước 4 — Cập nhật các file trong repo

Dưới đây là danh sách **tất cả các file** trong repo này cần cập nhật:

### 4.1 — `_config.yml` (bắt buộc)

```yaml
# Dòng cần sửa:
url: "https://hystruct.github.io"        # Nếu không dùng custom domain
repository: "hystruct/hystruct.github.io"

# Nếu giữ custom domain hydrostructai.com thì KHÔNG đổi url
```

**Vị trí:** dòng 18–19

---

### 4.2 — `CNAME` (chỉ nếu đổi domain)

File hiện tại: `hydrostructai.com`

- **Nếu giữ domain cũ** `hydrostructai.com`: không cần đổi
- **Nếu đổi sang domain mới**: cập nhật nội dung file thành domain mới

```
hystruct.com
```

---

### 4.3 — `_data/contact.yml`

Cập nhật các URL email/liên kết có chứa `hydrostructai`.

---

### 4.4 — `_includes/home-center.html` và `_includes/app_layout_standard.html`

Tìm và thay thế toàn bộ chuỗi `hydrostructai` → `hystruct`.

---

### 4.5 — Các bài viết trong `_posts/`

Các file có chứa references cần cập nhật:

| File | Nội dung cần kiểm tra |
|------|-----------------------|
| `2025-10-28-sheet-pile-fem-wasm-intro.md` | Link hoặc mention |
| `2025-12-13-shortcol3d-development.md` | Link hoặc mention |
| `2026-01-21-calcpad-introduction.md` | Link hoặc mention |
| `2026-01-26-pmp-qlda.md` | Link hoặc mention |
| `2026-02-03-ung-dung-pycivil.md` | Link hoặc mention |
| `2026-03-16-TCVN-9902-2025-diem-moi.md` | Link hoặc mention |
| `2026-04-02-pmp-freecram.md` | Link hoặc mention |
| `2026-04-28-giai-phap-QLDA-nha.md` | Link hoặc mention |
| `2026-05-11-bim-ung-dung-ha-tang-thuy-loi.md` | Link hoặc mention |
| `2026-05-16-quan-ly-du-an-mot-trang-giay.md` | Link hoặc mention |
| `2025-12-09-terrain-aware-pathfinding.md` | Link hoặc mention |

---

### 4.6 — `apps/landing.html` và `apps/social-media-downloader/index.html`

Tìm và thay thế `hydrostructai` → `hystruct`.

---

### 4.7 — Các file khác

| File | Ghi chú |
|------|---------|
| `index.html` | Kiểm tra hardcode URL |
| `about.md` | Kiểm tra bio/links |
| `apps.md` | Kiểm tra links |
| `tags.md` | Kiểm tra links |
| `README.md` | Cập nhật mô tả repo |

---

### Lệnh tìm kiếm nhanh (chạy từ thư mục gốc)

```bash
# Tìm tất cả file chứa "hydrostructai" (bỏ qua raw/ và .git/)
grep -r "hydrostructai" . \
  --include="*.yml" --include="*.md" \
  --include="*.html" --include="*.css" \
  -rl | grep -v "./raw/" | grep -v "./.git/"

# Thay thế hàng loạt (Linux/macOS)
find . -not -path "./raw/*" -not -path "./.git/*" \
  \( -name "*.yml" -o -name "*.md" -o -name "*.html" \) \
  -exec sed -i 's/hydrostructai/hystruct/g' {} +

# Kiểm tra lại sau khi thay thế
grep -r "hydrostructai" . \
  --include="*.yml" --include="*.md" --include="*.html" \
  -rl | grep -v "./raw/" | grep -v "./.git/"
```

> ⚠️ Lệnh `sed` thay thế **toàn bộ** — xem xét từng file trước nếu cần giữ lại lịch sử tên cũ trong nội dung bài viết.

---

## Bước 5 — Kiểm tra GitHub Pages & Custom Domain

### Nếu KHÔNG có custom domain:

1. Vào **Settings** → **Pages**
2. Source: `main` branch, thư mục `/ (root)`
3. URL mới: `https://hystruct.github.io`

### Nếu CÓ custom domain (hydrostructai.com):

1. Giữ nguyên file `CNAME` với nội dung `hydrostructai.com`
2. DNS tại nhà cung cấp domain **không cần đổi** — GitHub tự xử lý redirect
3. **Settings → Pages → Custom domain**: xác nhận domain vẫn là `hydrostructai.com`

---

## Bước 6 — Commit và push sau khi cập nhật

```bash
git add -A
git commit -m "refactor: rename hydrostructai to hystruct across all files"
git push -u origin main
```

---

## Checklist xác nhận

- [ ] Username GitHub đã đổi thành `hystruct`
- [ ] Repository đã đổi tên thành `hystruct.github.io`
- [ ] `git remote -v` hiển thị URL mới
- [ ] `_config.yml`: `repository` đã cập nhật
- [ ] Không còn `hydrostructai` nào trong `_includes/`, `_data/`, `apps/`
- [ ] `_posts/*.md`: các bài viết đã kiểm tra links
- [ ] GitHub Pages build thành công (Actions → kiểm tra workflow)
- [ ] Truy cập `https://hystruct.github.io` hoặc custom domain → site hoạt động bình thường

---

## Lưu ý về SEO và backlinks

- Các backlink cũ trỏ về `hydrostructai.github.io` sẽ được redirect 301 trong **90 ngày** (chỉ khi không có ai đăng ký lại username cũ)
- Sau 90 ngày, username cũ có thể bị người khác đăng ký
- Nên cập nhật tất cả profiles (LinkedIn, Facebook, Google Search Console...) sớm nhất có thể
- Submit lại sitemap trên **Google Search Console** với URL mới

---

*Cập nhật: 2026-05-17*
