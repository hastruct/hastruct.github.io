# Hướng dẫn đổi tên GitHub Organization và Repository

**Mục tiêu:** Đổi từ `hydrostructai/hydrostructai.github.io` → `hystruct/hystruct.github.io`

> `hydrostructai` là **GitHub Organization** (không phải personal account).  
> Đường dẫn cài đặt: `github.com/organizations/hydrostructai/settings/profile`

---

## Tổng quan các bước

| # | Bước | Nơi thực hiện | Có thể hoàn tác? |
|---|------|--------------|-----------------|
| 1 | Đổi tên Organization | Organization Settings → Profile | Có (trong 90 ngày) |
| 2 | Đổi tên Repository | Repo Settings → General | Có |
| 3 | Cập nhật git remote cục bộ | Terminal | Có |
| 4 | Cập nhật các file trong repo | Code editor | Có (git revert) |
| 5 | Kiểm tra GitHub Pages & Custom Domain | Repo Settings → Pages | Có |

---

## Bước 1 — Đổi tên GitHub Organization

> ⚠️ **Yêu cầu:** Chỉ **Owner** của Organization mới có quyền đổi tên.

### Cách thực hiện

1. Truy cập: **`github.com/organizations/hydrostructai/settings/profile`**
2. Tại mục **Organization name** (đầu trang) → nhấn **Edit** hoặc sửa trực tiếp tên `hydrostructai`
3. Nhập tên mới: `hystruct`
4. Cuộn xuống → nhấn **Save**

Hoặc qua **Danger Zone** (cuối trang Settings → General):
1. `github.com/organizations/hydrostructai/settings` → cuộn xuống **Danger Zone**
2. Nhấn **Rename organization**
3. Nhập `hystruct` → xác nhận

### Hậu quả tức thì

- `github.com/hydrostructai` → redirect 301 về `github.com/hystruct` (trong **90 ngày**)
- `hydrostructai.github.io` → redirect về `hystruct.github.io`
- Tất cả repo, team, project trong org tự động chuyển về namespace mới
- Email thông báo gửi đến tất cả Owner của org
- **OAuth Apps** đang dùng org scope cần được cập nhật thủ công

---

## Bước 2 — Đổi tên Repository

1. Vào `github.com/hydrostructai/hydrostructai.github.io` → tab **Settings**
2. Mục **General** → **Repository name**
3. Đổi thành: `hystruct.github.io`
4. Nhấn **Rename**

**Lưu ý:** GitHub Pages nhận diện `<org-name>.github.io` là trang chủ org, nên tên repo **phải khớp** với tên org mới.

---

## Bước 3 — Cập nhật git remote cục bộ

Sau khi đổi tên org và repo trên GitHub, cập nhật remote trong máy local:

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

### Lệnh kiểm tra nhanh (chạy từ thư mục gốc repo)

```bash
# Tìm tất cả file chứa "hydrostructai" (bỏ qua raw/ và .git/)
grep -r "hydrostructai" . \
  --include="*.yml" --include="*.md" \
  --include="*.html" --include="*.css" \
  -rl | grep -v "./raw/" | grep -v "./.git/"
```

Kết quả hiện tại cần xử lý:

```
_config.yml
_data/contact.yml
_includes/home-center.html
_includes/app_layout_standard.html
apps/landing.html
apps/social-media-downloader/index.html
index.html
about.md  /  apps.md  /  tags.md  /  README.md
_posts/2025-10-28-sheet-pile-fem-wasm-intro.md
_posts/2025-12-09-terrain-aware-pathfinding.md
_posts/2025-12-13-shortcol3d-development.md
_posts/2026-01-21-calcpad-introduction.md
_posts/2026-01-26-pmp-qlda.md
_posts/2026-02-03-ung-dung-pycivil.md
_posts/2026-03-16-TCVN-9902-2025-diem-moi.md
_posts/2026-04-02-pmp-freecram.md
_posts/2026-04-28-giai-phap-QLDA-nha.md
_posts/2026-05-11-bim-ung-dung-ha-tang-thuy-loi.md
_posts/2026-05-16-quan-ly-du-an-mot-trang-giay.md
```

---

### 4.1 — `_config.yml` (bắt buộc)

```yaml
# Dòng cần sửa (dòng 18–19):
url: "https://hystruct.github.io"       # nếu không dùng custom domain
repository: "hystruct/hystruct.github.io"

# Nếu giữ nguyên custom domain hydrostructai.com → KHÔNG đổi dòng url
```

---

### 4.2 — `CNAME` (chỉ nếu đổi domain)

File hiện tại chứa: `hydrostructai.com`

- **Giữ domain cũ** `hydrostructai.com` → không cần đổi file này
- **Đổi sang domain mới**: sửa nội dung thành domain mới (ví dụ `hystruct.com`)

---

### 4.3 — Thay thế hàng loạt

```bash
# Thay thế toàn bộ "hydrostructai" → "hystruct" (bỏ qua raw/ và .git/)
find . -not -path "./raw/*" -not -path "./.git/*" \
  \( -name "*.yml" -o -name "*.md" -o -name "*.html" \) \
  -exec sed -i 's/hydrostructai/hystruct/g' {} +

# Kiểm tra lại — kết quả phải rỗng
grep -r "hydrostructai" . \
  --include="*.yml" --include="*.md" --include="*.html" \
  -rl | grep -v "./raw/" | grep -v "./.git/"
```

> ⚠️ Lệnh `sed` thay thế **toàn bộ** — nếu muốn giữ lại tên cũ trong nội dung bài viết (ví dụ lịch sử brand), hãy kiểm tra thủ công từng file `_posts/*.md` trước.

---

### 4.4 — Commit sau khi cập nhật

```bash
git add -A
git commit -m "refactor: rename hydrostructai → hystruct across all files"
git push -u origin main
```

---

## Bước 5 — Kiểm tra GitHub Pages & Custom Domain

### Không dùng custom domain

1. Vào **Repo Settings → Pages**
2. Source: branch `main`, thư mục `/ (root)`
3. URL mới: `https://hystruct.github.io`

### Có custom domain (`hydrostructai.com`)

1. Giữ nguyên file `CNAME` → nội dung `hydrostructai.com`
2. DNS tại nhà cung cấp domain **không cần thay đổi**
3. **Repo Settings → Pages → Custom domain**: xác nhận vẫn là `hydrostructai.com`
4. GitHub tự xử lý routing từ domain về org pages mới

---

## Checklist xác nhận

- [ ] Đã đổi tên Organization thành `hystruct` tại `github.com/organizations/hydrostructai/settings/profile`
- [ ] Repo đã đổi tên thành `hystruct.github.io`
- [ ] `git remote -v` hiển thị URL `github.com/hystruct/hystruct.github.io.git`
- [ ] `_config.yml`: dòng `repository` đã là `hystruct/hystruct.github.io`
- [ ] Không còn chuỗi `hydrostructai` trong `_includes/`, `_data/`, `apps/` (ngoài thư mục `raw/`)
- [ ] GitHub Actions build thành công (tab **Actions** trên repo)
- [ ] Truy cập `https://hystruct.github.io` hoặc custom domain → site hoạt động bình thường

---

## Lưu ý SEO và backlinks

- Redirect 301 từ `hydrostructai.github.io` → `hystruct.github.io` hoạt động trong **90 ngày**
- Sau 90 ngày, tên org cũ `hydrostructai` có thể bị người khác đăng ký
- Cập nhật sớm: Google Search Console (submit lại sitemap), LinkedIn, Facebook Page, email signatures
- Nếu dùng Google Analytics: kiểm tra property domain không bị ảnh hưởng (custom domain không đổi thì ổn)

---

*Cập nhật: 2026-05-17*
