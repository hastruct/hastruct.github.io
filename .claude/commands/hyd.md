Lưu file markdown lên GitHub repository `hastruct/hastruct.github.io`.

**Cú pháp:** `/hyd path/file.md`

**Đối số:** `$ARGUMENTS` — đường dẫn đến file cần lưu, ví dụ `_posts/2026-05-19-ten-bai.md`

---

## Hướng dẫn thực hiện

1. Xác định đường dẫn file từ `$ARGUMENTS`. Nếu không có đối số, hỏi người dùng đường dẫn file cần lưu.

2. Đọc nội dung file local tại đường dẫn tương đối so với thư mục gốc của repo (`/home/user/hastruct.github.io/$ARGUMENTS`).

3. Kiểm tra xem file đã tồn tại trên GitHub chưa bằng cách dùng `mcp__github__get_file_contents` với:
   - `owner`: `hastruct`
   - `repo`: `hastruct.github.io`
   - `path`: đường dẫn file (từ `$ARGUMENTS`)
   - `branch`: `main`

4. Dùng `mcp__github__create_or_update_file` để tạo hoặc cập nhật file trên GitHub:
   - `owner`: `hastruct`
   - `repo`: `hastruct.github.io`
   - `path`: đường dẫn file (từ `$ARGUMENTS`)
   - `message`: `docs: add/update $ARGUMENTS`
   - `content`: nội dung file đã encode base64
   - `branch`: `main`
   - `sha`: (nếu file đã tồn tại, lấy sha từ bước 3)

5. Xác nhận kết quả với người dùng: hiển thị URL GitHub của file vừa lưu theo định dạng:
   `https://github.com/hastruct/hastruct.github.io/blob/main/$ARGUMENTS`
