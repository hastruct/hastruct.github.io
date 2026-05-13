---
title: "Calcpad: Hướng dẫn tính toán kỹ thuật chuyên sâu, lập trình, vòng lặp & FEM"
author_profile: true
author_name: "HST.AI"
date: 2026-01-21 10:00:00 +0700
layout: single
featured: true
mathjax: true
toc: true
toc_sticky: true
toc_label: "📑 Mục Lục"
permalink: "/posts/calcpad-cong-cu-tinh-toan-ky-thuat/"
categories:
  - Software-Engineering
  - Technical-Tools
  - Engineering-Automation
tags:
  [
    Calcpad,
    "Tính toán kỹ thuật",
    Automation,
    "Báo cáo kỹ thuật",
    "Phân tích kết cấu",
    "Dầm bê tông",
    "Cốt thép",
    "Xuất HTML/PDF",
    "VS Code",
    Template,
    TCVN,
    FEM,
    "Bản sàn phẳng",
    "Vòng lặp",
    "Lập trình kỹ thuật",
    "BFS Element",
    "Ma trận độ cứng",
    "Quy trình chuyên nghiệp"
  ]
excerpt: "> *Hướng dẫn chuyên sâu Calcpad: lập trình vòng lặp, hàm tự định nghĩa, vector, ma trận*, ứng dụng phân tích FEM bản sàn phẳng, xuất báo cáo HTML/PDF chuyên nghiệp. Bao gồm ví dụ thực tế tính cốt thép theo TCVN 5574:2018."
header:
  overlay_color: "#f1f5f9"
  overlay_filter: "linear-gradient(135deg, rgba(27, 38, 59, 0.95), rgba(65, 90, 119, 0.8))"
  caption: "© HydrostructAI - Tư vấn Quản lý Dự án & Ứng dụng kỹ thuật"
---

Calcpad là công cụ tính toán kỹ thuật mã nguồn mở, cho phép kỹ sư viết phép tính phức tạp dưới dạng văn bản có cấu trúc và tự động tạo báo cáo chuyên nghiệp — từ dầm đơn giản đến phân tích FEM bản sàn phẳng nhiều nhịp.

**[📐 Xem các báo cáo tính toán mẫu](https://hydrostructai.com/calcpad_engineering/calcpad.html)**  
**[🏗️ Ví dụ FEM bản sàn phẳng (BFS)](https://hydrostructai.com/calcpad_engineering/cpdoutput/3.%20Flat%20Slab%20FEA.html)**

Minh họa kết quả tính toán nội lực sàn **Bending moments**
![Bending moments My](/assets/images/posts/calcpad-cong-cu-tinh-toan-ky-thuat/bending-moments-My.jpg)
*Bending moments My*

---

## 📖 Giới thiệu Calcpad

### Calcpad là gì?

Calcpad cho phép bạn:
- Viết phương trình toán học dạng văn bản đơn giản
- Lập trình tự động tính toán với vòng lặp, điều kiện, hàm
- Tạo báo cáo chuyên nghiệp (HTML + PDF) hoàn toàn tự động
- Xử lý vector, ma trận, giải hệ phương trình tuyến tính (FEM)
- Giữ lịch sử tính toán minh bạch, dễ kiểm tra độc lập
- Chia sẻ công việc dễ dàng

### Tại sao dùng Calcpad?

- **Rõ ràng:** Mọi công thức và kết quả đều nhìn thấy trong báo cáo
- **Tái sử dụng:** Thay đổi giá trị đầu vào → kết quả tự động cập nhật
- **Dễ lưu trữ:** Một file `.cpd` chứa mọi thứ — công thức, tính toán, báo cáo
- **FEM native:** Hỗ trợ ma trận hiệu năng cao (`hp`), giải `Kd = F` trực tiếp
- **Nhanh:** Viết công thức nhanh hơn Excel, dễ hơn Python cho kỹ sư

### Calcpad vs. Các công cụ khác

| Tiêu chí | Calcpad | Excel | Python |
|----------|---------|-------|--------|
| Công thức hiển thị đẹp | ✅ Tự động | ⚠️ Ẩn trong cell | ⚠️ Cần LaTeX |
| Báo cáo kỹ thuật tự động | ✅ HTML/PDF | ❌ Thủ công | ⚠️ Cần template |
| FEM / Ma trận lớn | ✅ hp matrix | ❌ | ✅ numpy |
| Kiểm tra đơn vị tự động | ✅ | ❌ | ⚠️ pint |
| Đường cong học tập | ✅ Thấp | ✅ Thấp | ❌ Cao |
| Vòng lặp, điều kiện | ✅ #For #While | ⚠️ VBA | ✅ |

---

## Tính năng chính

| Tính năng | Mô tả |
|-----------|-------|
| **Biến số** | Khai báo biến, gán giá trị, hỗ trợ đơn vị |
| **Công thức** | Viết phương trình toán học thuần túy |
| **Đơn vị** | Tự động chuyển đổi, kiểm tra tính nhất quán |
| **Hiển thị kết quả** | Dùng `= ?` để in kết quả ra báo cáo |
| **Vòng lặp** | `#For`, `#While`, `#Repeat` / `#Loop` |
| **Điều kiện** | `#If`, `#Else`, `#Else if`, `#End if` |
| **Hàm tùy chỉnh** | `f(x; y; z) = biểu_thức` |
| **Module** | `#Include`, `#Global`, `#Local` |
| **Vector & Ma trận** | Đại số tuyến tính đầy đủ, ma trận `hp` |
| **Tích phân số** | `∫` Gauss tích hợp sẵn |
| **Đồ thị** | Vẽ 2D/3D với `$Plot{}` |
| **HTML/PDF** | Xuất báo cáo chuyên nghiệp |

---

## Bắt đầu nhanh

### Bước 1: Tạo File `.cpd`

Tạo file text tên `my_analysis.cpd`:

```calcpad
"Báo cáo Phân tích Dầm"
'Bước 1: Nhập dữ liệu
L = 6 "m"    'Chiều dài nhịp
P = 50 "kN"  'Tải trọng tập trung

'Bước 2: Tính toán
M = P * L / 4 "kNm"  'Moment uốn giữa nhịp

'Bước 3: Kiểm tra kết quả
M = ?
```

### Bước 2: Chạy Calcpad

**Trên Windows/Mac:**
1. Mở Calcpad Editor
2. File → Open → Chọn `my_analysis.cpd`
3. Nhấn "Generate" hoặc `Ctrl+G`
4. File `my_analysis.html` được tạo tự động

**Trên Linux/WSL:**
```bash
calcpad my_analysis.cpd
```

### Bước 3: Sử dụng trên VS Code

VS Code giúp viết code nhanh hơn nhờ Intellisense và xem kết quả tức thì.

1. **Cài đặt:** `Ctrl+Shift+X` → tìm "Calcpad" hoặc cài từ file `.vsix`
2. **Chạy tính toán:** `Ctrl+Shift+B` → báo cáo HTML hiện ra cạnh editor
3. **Mở Calcpad Editor:** `Ctrl+Shift+O`
4. **Cấu hình WSL/Linux** — vào Settings (`Ctrl+,`):
   - `calcpad.cliPath`: `/usr/local/bin/calcpad`
   - `calcpad.settingsPath`: `$HOME/.calcpad/Settings.xml`

### Bước 4: Xuất PDF

```bash
wkhtmltopdf --page-size A4 my_analysis.html my_analysis.pdf
```

---

## Cú pháp Calcpad cơ bản

### 1. Khai báo biến & phép toán

```calcpad
'--- KHAI BÁO BIẾN ---
L = 6              'biến đơn giản
L = 6 "m"          'biến có đơn vị
f_ck = 30 "MPa"    'subscript → hiển thị f_ck
M_Ed = 75 "kNm"

'--- PHÉP TOÁN ---
A = b * h          'nhân
R_A = P*(L-a)/L    'biểu thức phức hợp
D = 2^3            'lũy thừa (8)
E = sqrt(16)       'căn bậc hai
F = abs(-5)        'giá trị tuyệt đối
G = 3!             'giai thừa (6)
H = a \ b          'chia nguyên
I = a %% b         'modulo (phần dư)
```

### 2. Hệ thống đơn vị

```calcpad
'--- CHUYỂN ĐỔI TỰ ĐỘNG ---
L = 6000 "mm"
L_m = L "m"          '→ 6 m (tự động)

q = 10 "kN/m²"
q_Pa = q "Pa"         '→ 10000 Pa

E = 35000 "MPa"
I = 0.005 "m⁴"
EI = E * I            '→ kNm² (đơn vị kết hợp tự động)

'--- HIỂN THỊ KẾT QUẢ ---
M = ?                 'hiển thị: M = 75 kNm
M = ?#2               'làm tròn 2 chữ số: 75.00
M = ?%                'dạng phần trăm
M!                    'ẩn hoàn toàn khỏi output
```

> **Lưu ý:** Calcpad tự động kiểm tra tính nhất quán đơn vị. Phép tính `6 "m" + 5 "kN"` sẽ báo lỗi — bảo vệ kỹ sư khỏi sai số đơn vị.

### 3. Định dạng văn bản trong báo cáo

```calcpad
"Tiêu đề chính"           'Heading 1 (lớn nhất)
"_Tiêu đề cấp 2"          'Heading 2
"__Tiêu đề cấp 3"         'Heading 3
"___Ghi chú kỹ thuật"     'Heading 4

"Văn bản **đậm**"
"Văn bản ***đậm nghiêng***"
"| Cột A | Cột B |"       'Bảng Markdown
"| ------ | ------ |"
"| Giá trị 1 | Giá trị 2 |"
```

### 4. Hàm tích hợp quan trọng

| Nhóm | Hàm | Mô tả |
|------|-----|-------|
| Lượng giác | `sin(x)`, `cos(x)`, `atan2(y;x)` | Hàm lượng giác |
| Log & Căn | `log(x)`, `ln(x)`, `sqrt(x)`, `cbrt(x)` | Logarithm, căn |
| Làm tròn | `round(x)`, `floor(x)`, `ceiling(x)` | Làm tròn |
| Điều kiện | `if(cond; true; false)`, `switch(c1;v1;…)` | Chọn theo điều kiện |
| Tổng hợp | `min(…)`, `max(…)`, `sum(…)`, `average(…)` | Thống kê |
| Nội suy | `line(x;x1;y1;x2;y2)`, `spline(…)` | Nội suy |

---

## 💡 Ví dụ thực tế cơ bản

### Ví dụ 1: Tính diện tích hình chữ nhật

```calcpad
"Diện tích hình chữ nhật"
b = 5 "m"    'chiều rộng
h = 3 "m"    'chiều cao
A = b * h = ? "m²"
```

### Ví dụ 2: Dầm đơn giản chịu tải tập trung

```calcpad
"Phân tích dầm đơn giản chịu tải trọng tập trung"

'Dữ liệu đầu vào
L = 6 "m"      'chiều dài dầm
P = 100 "kN"   'tải trọng tập trung giữa nhịp
a = L / 2      'vị trí tải

'Phản lực
R_A = P * (L - a) / L "kN"
R_B = P * a / L "kN"

'Moment uốn lớn nhất
M_max = P * a * (L - a) / L "kNm"

"Phản lực tại A:" R_A = ?
"Phản lực tại B:" R_B = ?
"Moment uốn cực đại:" M_max = ?
```

### Ví dụ 3: Tính cốt thép dầm bê tông (TCVN 5574:2018)

```calcpad
"Tính toán cốt thép dầm bê tông"

'Dữ liệu
M_Ed = 75 "kNm"     'moment tính toán
f_yk = 400 "MPa"    'cường độ chảy thép CB400
f_ck = 30 "MPa"     'cường độ đặc trưng bê tông
b = 0.3 "m"         'bề rộng tiết diện
h = 0.6 "m"         'chiều cao tiết diện
d = 0.55 "m"        'chiều cao có hiệu

'Hệ số vật liệu
γ_c = 1.5
γ_s = 1.15
f_cd = f_ck / γ_c "MPa"
f_yd = f_yk / γ_s "MPa"

'Diện tích thép cần thiết (gần đúng)
A_s_req = M_Ed / (0.87 * f_yd * d) "cm²"

'Thép tối thiểu
A_s_min = 0.001 * b * h "cm²"

'Chọn thép
A_s = if(A_s_req ≥ A_s_min; A_s_req; A_s_min) "cm²"

"Diện tích thép cần thiết:" A_s_req = ?
"Thép tối thiểu:" A_s_min = ?
"Diện tích thép chọn:" A_s = ?
"→ Chọn: 4Φ20 = 12.57 cm² ✓"
```

---

## Lập trình Calcpad - Tư duy kỹ sư

### Hàm tự định nghĩa (Custom Functions)

Hàm được định nghĩa một lần, dùng lại nhiều lần. Tham số ngăn cách bằng `;`.

```calcpad
'Cú pháp: tên_hàm(tham_số1; tham_số2; ...) = biểu_thức

'Hàm tính hệ số giới hạn chiều cao vùng nén (TCVN 5574)
xi_lim(f_yk) = if(f_yk ≤ 400 "MPa"; 0.65; 0.55)

'Hàm moment kháng tính toán
M_Rd(b; d; f_cd; x) = 0.8 * f_cd * b * x * (d - 0.4 * x)

'Hàm kiểm tra tiết diện
DCR_M(M_Ed; M_Rd) = M_Ed / M_Rd

'Hàm lồng nhau
check(b; d; f_cd; f_yk; M_Ed) = if(DCR_M(M_Ed; M_Rd(b; d; f_cd; xi_lim(f_yk)*d)) ≤ 1; "OK"; "NG")

'Sử dụng
b = 0.3 "m"; d = 0.55 "m"; f_cd = 20 "MPa"; f_yk = 400 "MPa"
result = check(b; d; f_cd; f_yk; 75 "kNm") = ?
```

### Module & Tổ chức thư viện

```calcpad
'--- File: material_concrete.cpd ---
#Global
'Phần này được xuất khi #Include
f_ck = 30 "MPa"        'cường độ đặc trưng
γ_c  = 1.5             'hệ số an toàn vật liệu
f_cd = f_ck / γ_c      'cường độ tính toán = 20 MPa
E_cm = 33000 "MPa"     'module đàn hồi (EC2 Bảng 3.1)
ν    = 0.2             'hệ số Poisson
#Local
'Chỉ chạy khi mở file trực tiếp — không được include
f_cd = ?               'kiểm tra giá trị

'--- File: main_analysis.cpd ---
#Include material_concrete.cpd
#Include rebar_table.cpd
'Dùng được f_ck, f_cd, E_cm ngay lập tức
M_limit = f_cd * b * d^2 * 0.295
```

### Biến chuỗi & trang bìa tự động

```calcpad
'Khai báo metadata dự án
#def project  = Dự án ABC — Tòa nhà 20 tầng, TP.HCM
#def doc_no   = TK-KC-001
#def rev      = Rev.0
#def date     = 2026-01-21
#def standard = TCVN 5574:2018 | Eurocode 2
#def author   = KS. Nguyễn Văn A

| **Dự án** | {project} |
| **Số hiệu** | {doc_no} | **Phiên bản** | {rev} |
| **Tiêu chuẩn** | {standard} |"
| **Ngày** | {date} | **Người lập** | {author} |"

'Macro đa dòng — kiểm tra ULS
#def check_uls(name; E_d; R_d; unit)
"**{name$}:** E_d = {E_d} {unit} | R_d = {R_d} {unit}"
DCR = {E_d} / {R_d}
if(DCR ≤ 1; "**✅ ĐẠT**"; "**❌ KHÔNG ĐẠT**")
#end def

check_uls$("Uốn"; M_Ed; M_Rd; "kNm")
check_uls$("Cắt"; V_Ed; V_Rd; "kN")
```

---

## 🔄 Điều kiện & vòng lặp 

### #If / #Else / #Else If

```calcpad
'--- IF ĐƠN GIẢN ---
#if M_Ed ≤ M_Rd
  "✅ Tiết diện đủ khả năng chịu uốn"
#end if

'--- IF / ELSE ---
#if A_s_calc ≥ A_s_min
  A_s = A_s_calc
  "Dùng thép theo tính toán"
#else
  A_s = A_s_min
  "Dùng thép tối thiểu theo TCVN"
#end if

'--- PHÂN LOẠI CẤP BÊ TÔNG ---
#if f_ck ≤ 20 "MPa"
  #def class$ = C16/20
#else if f_ck ≤ 30 "MPa"
  #def class$ = C25/30
#else if f_ck ≤ 40 "MPa"
  #def class$ = C35/40
#else
  #def class$ = C45/55 trở lên
#end if
"Cấp bê tông: **{class$}**"

'--- HÀM if() INLINE (trong biểu thức) ---
A_s    = if(A_calc ≥ A_min; A_calc; A_min)
status = if(DCR ≤ 1; "✅ OK"; "❌ NG")
xi_lim = switch(f_yk≤300"MPa"; 0.7; f_yk≤400"MPa"; 0.65; 0.55)
```

> **Phân biệt:** `#if` kiểm soát luồng (đa dòng, thay đổi văn bản báo cáo). `if()` là hàm inline trả về một giá trị duy nhất.

### Repeat / Loop — Lặp cố định số lần

```calcpad
'--- CÚ PHÁP ---
#repeat n        'n = số lần lặp (số, biến, hoặc biểu thức)
  'code lặp
#loop

'--- VÍ DỤ: Bảng nội lực tại n điểm trên dầm ---
L = 6 "m"; P = 100 "kN"; n = 6
i = 0

"__Bảng nội lực dầm đơn giản:"
#repeat n+1
  i = i + 1
  x = (i-1)*L/n
  R_A = P/2
  M_x = R_A*x - P*if(x > L/2; x - L/2; 0)
  x = ? M_x = ?
#loop

'--- VÍ DỤ: Tính n! ---
fact = 1; k = 0
#repeat 10
  k = k + 1
  fact = fact * k
#loop
"10! =" fact = ?
```

### For / Loop — Lặp với bộ đếm tường minh

```calcpad
'--- CÚ PHÁP ---
#for counter = start : end
  'dùng counter trong tính toán
#loop

'--- VÍ DỤ: Bảng diện tích cốt thép ---
phi_list = [8; 10; 12; 14; 16; 18; 20; 22; 25; 28; 32] "mm"
"__Bảng diện tích cốt thép đơn lẻ:"
#for i = 1 : len(phi_list)
  φ     = phi_list.i         'truy cập phần tử thứ i bằng .i
  A_bar = π/4 * φ^2 = ? "mm²"
  φ = ? A_bar = ?
#loop

'--- VÍ DỤ: Ghi kết quả vào ma trận ---
results = matrix(n; 3)       'ma trận n×3 lưu [x; M; A_s]
#for i = 1 : n
  x_i         = (i-1)*L/n
  M_i         = calc_M(x_i)
  A_s_i       = A_s(M_i; f_yd; d)
  results.i.1 = x_i
  results.i.2 = M_i
  results.i.3 = A_s_i
#loop
"M_max =" max(col(results; 2)) = ?
```

### While / Loop — Lặp theo điều kiện

Dùng cho bài toán hội tụ lặp: Newton-Raphson, phương pháp điểm bất động, cập nhật nội lực phi tuyến.

```calcpad
'--- CÚ PHÁP ---
#while condition
  'code
#loop

'--- VÍ DỤ: Newton-Raphson tìm chiều cao vùng nén x ---
M_Ed = 75 "kNm"; b = 0.3 "m"; d = 0.55 "m"; f_cd = 20 "MPa"
x   = 0.05 "m"        'điểm khởi đầu
tol = 0.0001 "m"
err = 1 "m"

#while err > tol
  x_old = x
  M_Rd  = 0.8 * f_cd * b * x * (d - 0.4*x)
  dM_dx = 0.8 * f_cd * b * (d - 0.8*x)   'đạo hàm M_Rd theo x
  x     = x - (M_Rd - M_Ed) / dM_dx
  err   = abs(x - x_old)
#loop

"**Chiều cao vùng nén hội tụ:**" x = ?
M_check = 0.8*f_cd*b*x*(d - 0.4*x) = ?   'phải ≈ M_Ed

'--- PATTERN AN TOÀN: Bộ đếm giới hạn vòng lặp ---
x = x0; iter = 0; max_iter = 200
#while iter ≤ max_iter
  iter  = iter + 1
  x_new = f_update(x)
  #if abs(x_new - x) < 1e-8
    x = x_new
    #break
  #end if
  x = x_new
#loop
"Hội tụ sau" iter = ? "vòng lặp"
```

> ⚠️ **Cảnh báo:** Luôn thêm bộ đếm tối đa (`iter ≤ max_iter`) hoặc `#break` có điều kiện giới hạn để tránh vòng lặp vô hạn.

### Break và Continue

```calcpad
'--- #BREAK: Thoát vòng lặp khi hội tụ ---
#for i = 1 : 1000
  x_new = update(x)
  #if abs(x_new - x) < eps
    "Hội tụ tại vòng lặp thứ" i = ?
    #break
  #end if
  x = x_new
#loop

'--- CONTINUE: Bỏ qua phần tử không cần xử lý ---
#for i = 1 : len(elements)
  #if mod(i; 2) ≡ 0
    #continue     'bỏ qua phần tử chẵn
  #end if
  check_element(i) = ?
#loop

'--- REPEAT KHÔNG GIỚI HẠN (với Break bắt buộc) ---
#repeat               'lặp vô hạn — PHẢI có break!
  #if converged
    #break
  #end if
  'code cập nhật...
#loop
```

---

## 🔢 Vector & Ma trận — Nền tảng FEM

Calcpad hỗ trợ đầy đủ đại số tuyến tính: vector, ma trận thường và ma trận hiệu năng cao (`hp`) tối ưu cho bài toán FEM lớn.

### Tạo Vector & Ma trận

```calcpad
'--- VECTOR ---
a = [3.6; 4.2; 4.2; 3.6] "m"     'vector từ giá trị
x = range(0; 6; 0.1)              'vector theo khoảng (step 0.1)
v = hp([1; 2; 3; 4])              'vector hiệu năng cao
u = vector_hp(n)                  'vector hp rỗng

'Truy cập phần tử
a1 = v.1                          'phần tử đầu tiên
a4 = v.4                          'phần tử thứ 4

'--- MA TRẬN ---
M = [1; 2; 3 | 4; 5; 6]          'ma trận 2×3
K  = matrix_hp(n; n)              'ma trận hp rỗng n×n
Id = identity_hp(n)              'ma trận đơn vị hp

'Ma trận cấu thành D (3×3)
D0 = E*t^3 / (12*(1-ν^2))
D  = D0 * hp([1; ν; 0 | ν; 1; 0 | 0; 0; (1-ν)/2])

'Truy cập phần tử
k11 = K.1.1
K.i.j = value                     'ghi giá trị
```

### Phép toán ma trận quan trọng

```calcpad
'--- PHÉP TOÁN ---
C    = A * B                      'nhân ma trận
KTD  = transp(B) * D * B          'B'DB (core FEM)
d    = K \ F                      'GIẢI Kd=F (phép chia trái)
Kinv = inv(K)                     'nghịch đảo

'--- TÍCH PHÂN SỐ 2D (Gauss) ---
K_ij = a1*b1 * 1∫0 1∫0 BTDB(i; j; ξ; η) dη dξ

'--- HÀM PHÂN TÍCH MA TRẬN ---
det(K)                            'định thức
rank(K)                           'hạng ma trận
trace(K)                          'vết
eigenvals(K; 10)                  '10 trị riêng đầu tiên
eigenvecs(K; 10)                  '10 vector riêng
cholesky(K)                       'phân tích Cholesky
lu(K)                             'phân tích LU
svd(K)                            'phân tích SVD

'--- LẮP GHÉP MA TRẬN TOÀN CỤC ---
K = add(K; K_e; i_start; j_start)
r = row(M; i)                     'lấy hàng i
c = col(M; j)                     'lấy cột j
```

### Hàm Vector hữu ích

| Hàm | Mô tả | Ứng dụng |
|-----|-------|----------|
| `len(v)` | Độ dài vector | Số phần tử lưới |
| `sum(v)` | Tổng | Tổng tải trọng |
| `max(v)`, `min(v)` | Giá trị lớn nhất/nhỏ nhất | M_max, V_max |
| `sort(v)` | Sắp xếp tăng dần | Eigenvalues |
| `join(v1; v2)` | Nối vector | Ghép DOF |
| `slice(v; i1; i2)` | Cắt đoạn | Trích phản lực |
| `extract(v; idx)` | Lấy theo chỉ số | DOF tự do |
| `ceiling(v/s)` | Làm tròn vector | Số phần tử lưới |

---

## 🏗️ FEM Bản sàn phẳng — Ví dụ hoàn chỉnh

Phân tích bản sàn phẳng nhiều nhịp sử dụng phần tử **Bogner-Fox-Schmit (BFS)** — phần tử tấm chữ nhật tuân thủ C1, 16 bậc tự do/phần tử (w, θx, θy, ψ tại mỗi nút góc). Đây là bài toán FEM viết hoàn toàn trong Calcpad.

📎 Xem kết quả đầy đủ: [hydrostructai.com — Flat Slab FEA](https://hydrostructai.com/calcpad_engineering/cpdoutput/3.%20Flat%20Slab%20FEA.html)

### Bước 1 — Khai báo hình học & vật liệu

```calcpad
"PHÂN TÍCH BẢN SÀN PHẲNG — PHƯƠNG PHÁP PHẦN TỬ HỮU HẠN"
"_Phần tử Bogner-Fox-Schmit (BFS) 16 bậc tự do"

"__1. Dữ liệu đầu vào"

"___1.1 Nhịp sàn"
ax= hp([3.6; 4.2; 4.2; 3.6]) "m"    'nhịp theo phương x
by= hp([3; 3.6; 3]) "m"             'nhịp theo phương y
n_sa = len(a⃗) + 1 = ?               'số trục theo x: 5
n_sb = len(b⃗) + 1 = ?               'số trục theo y: 4

'Kích thước tổng thể
l_a = sum(ax) = ? "m"                '= 15.6 m
l_b = sum(by) = ? "m"                '= 9.6 m

"___1.2 Tải trọng"
g_k = 5 "kN/m²"        'tĩnh tải đặc trưng
q_k = 5 "kN/m²"        'hoạt tải đặc trưng
q   = 1.35*g_k + 1.5*q_k = ?       'tải tính toán = 14.25 kN/m²

"___1.3 Vật liệu"
t   = 0.2 "m"           'chiều dày bản sàn
E   = 35000 "MPa"       'module đàn hồi
ν   = 0.2               'hệ số Poisson
```

### Bước 2 — Xây dựng lưới phần tử

```calcpad
"__2. Lưới phần tử hữu hạn"
a1 = 0.6 "m"; b1 = 0.6 "m"           'kích thước phần tử mục tiêu

'Số phần tử theo từng nhịp (làm tròn lên)
n⃗_a = ceiling(ax / a1) = ?            '= [6; 7; 7; 6]
n⃗_b = ceiling(by / b1) = ?            '= [5; 6; 5]

'Tổng số phần tử và nút
n_ea = sum(n⃗_a) = ?; n_ja = n_ea + 1 = ?    '26 phần tử, 27 nút
n_eb = sum(n⃗_b) = ?; n_jb = n_eb + 1 = ?    '16 phần tử, 17 nút
n_e  = n_ea * n_eb = ?                        '= 416 phần tử
n_j  = n_ja * n_jb = ?                        '= 459 nút
n_s  = n_sa * n_sb = ?                        '= 20 nút cột (điểm tựa)

#hide
'Tính tọa độ nút và ma trận liên kết (ẩn khỏi báo cáo)
x⃗_j = vector_hp(n_j)
y⃗_j = vector_hp(n_j)
ej  = matrix_hp(n_e; 4)       'ma trận liên kết: 4 nút/phần tử
#for j = 1 : n_j
  '... tính x_j, y_j và điền vào ej
#loop
#show
```

### Bước 3 — Hàm hình dạng BFS (C1-conforming)

```calcpad
"__3. Hàm hình dạng Hermite — BFS element"

'Hàm Hermite theo ξ ∈ [0,1] (chiều a)
Φ1a(ξ) = 1 - ξ^2*(3 - 2*ξ)           'dịch chuyển nút 1
Φ2a(ξ) = ξ*a1*(1 - ξ*(2 - ξ))        'góc xoay nút 1
Φ3a(ξ) = ξ^2*(3 - 2*ξ)                'dịch chuyển nút 2
Φ4a(ξ) = ξ^2*a1*(-1 + ξ)              'góc xoay nút 2

'Đạo hàm bậc 1 (cho ma trận B)
Φ′1a(ξ) = -6*ξ/a1*(1-ξ)
Φ′2a(ξ) = 1 - ξ*(4 - 3*ξ)
Φ′3a(ξ) = 6*ξ/a1*(1-ξ)
Φ′4a(ξ) = -ξ*(2 - 3*ξ)

'Đạo hàm bậc 2 (độ cong — cần cho B)
Φ″1a(ξ) = -6/a1^2*(1 - 2*ξ)
Φ″2a(ξ) = -2/a1*(2 - 3*ξ)
Φ″3a(ξ) = 6/a1^2*(1 - 2*ξ)
Φ″4a(ξ) = -2/a1*(1 - 3*ξ)

'Tương tự theo η ∈ [0,1] (chiều b): thay a1 → b1
'... Φ1b..Φ4b, Φ′1b..Φ′4b, Φ″1b..Φ″4b

'16 hàm hình dạng: N_iw, N_iθx, N_iθy, N_iψ (i=1..4)
N(k; ξ; η) = take(k;
  Φ1a(ξ)*Φ1b(η);  Φ2a(ξ)*Φ1b(η);  Φ1a(ξ)*Φ2b(η);  Φ2a(ξ)*Φ2b(η);
  Φ3a(ξ)*Φ1b(η);  Φ4a(ξ)*Φ1b(η);  Φ3a(ξ)*Φ2b(η);  Φ4a(ξ)*Φ2b(η);
  Φ3a(ξ)*Φ3b(η);  Φ4a(ξ)*Φ3b(η);  Φ3a(ξ)*Φ4b(η);  Φ4a(ξ)*Φ4b(η);
  Φ1a(ξ)*Φ3b(η);  Φ2a(ξ)*Φ3b(η);  Φ1a(ξ)*Φ4b(η);  Φ2a(ξ)*Φ4b(η))
```

### Bước 4 — Ma trận độ cứng phần tử

```calcpad
"__4. Ma trận cấu thành D (moment - độ cong)"
D0 = E*t^3 / (12*(1 - ν^2)) = ?      'độ cứng uốn
D⃗  = D0 * hp([1; ν; 0 | ν; 1; 0 | 0; 0; (1-ν)/2])

"__5. Ma trận B (strain-displacement, 3×16)"
B1(j; ξ; η) = take(j; Φ″1a(ξ)*Φ1b(η); Φ″2a(ξ)*Φ1b(η); ...)  'κxx
B2(j; ξ; η) = take(j; Φ1a(ξ)*Φ″1b(η); ...)                    'κyy
B3(j; ξ; η) = 2*take(j; Φ′1a(ξ)*Φ′1b(η); ...)                 '2κxy
B(j; ξ; η)  = hp([B1(j;ξ;η); B2(j;ξ;η); B3(j;ξ;η)])

"__6. Ma trận độ cứng phần tử K_e (16×16)"
'Tích phân 2D — Calcpad tính tích phân số tự động
BTDB_e(i; j; ξ; η) = transp(B(i; ξ; η)) * D⃗ * B(j; ξ; η)
K_e(i; j) = a1*b1 * 1∫0 1∫0 BTDB_e(i; j; ξ; η) dη dξ

'Điền ma trận K_e (16×16) — trên và trên đường chéo
n = 16
$Repeat{$Repeat{K_e.i.j = K_e(i; j) for j=i...n} for i=1...n}

"Vector tải phần tử:"
F_e(i) = a1*b1 * 1∫0 1∫0 N(i; ξ; η) * q dξ dη
F⃗_e = [0.9; 0.09; 0.09; 0.009; 0.9; -0.09; ...] "kN"
```

### Bước 5 — Lắp ghép, Điều kiện biên & Giải

```calcpad
"__7. Ma trận độ cứng toàn cục"
n_DOF = 4 * n_j                          'tổng DOF: 4×459 = 1836
K     = matrix_hp(n_DOF; n_DOF)          'ma trận toàn cục
F     = vector_hp(n_DOF)

#hide
'Lắp ghép — ẩn khỏi báo cáo (vòng lặp phức tạp)
#for e = 1 : n_e
  je = row(ej; e)                        '4 nút góc phần tử e
  K  = add_to_global(K; K_e; je)
  F  = add_to_global_F(F; F⃗_e; je)
#loop

'Áp đặt điều kiện biên — nút cột (gối đơn, w=0)
s⃗_j = [1; 6; 12; 17; 103; 108; 114; 119;
        222; 227; 233; 238; 341; 346; 352; 357;
        443; 448; 454; 459]
#for k = 1 : len(s⃗_j)
  j = s⃗_j.k
  'xóa DOF tương ứng (phương pháp penalty hoặc xóa hàng/cột)
#loop
#show

"__8. Giải hệ phương trình Kd = F"
d = K \ F                                'nghiệm: d = [w; θx; θy; ψ] mọi nút

"___Kết quả: Độ võng"
w_max   = max(abs(d_w_dof)) = ? "mm"
w_limit = l_a "mm" / 250 = ?            'L/250 theo TCVN
#if w_max ≤ w_limit
  "**✅ Độ võng ĐẠT:** {w_max} ≤ {w_limit} mm"
#else
  "**❌ Độ võng KHÔNG ĐẠT:** {w_max} > {w_limit} mm"
#end if

"Vẽ mặt võng 3D:"
$Plot{w(x; y) @ x = 0 : l_a & y = 0 : l_b}

"Biểu đồ M_x dọc nhịp giữa:"
$Plot{M_x(x; l_b/2) @ x = 0 : l_a}
```

---

## 📄 Báo cáo kết quả tính toán

### Cấu trúc báo cáo chuẩn — Trang bìa

```calcpad
"TÊN CÔNG TRÌNH — PHÂN TÍCH KẾT CẤU"
#def project  = Dự án ABC — Tòa nhà 20 tầng
#def doc_no   = TK-KC-001
#def rev      = Rev.0
#def date     = 2026-01-21
#def author   = KS. Nguyễn Văn A
#def checker  = ThS. Trần Thị B

| **Dự án** | {project} |
| **Số hiệu** | {doc_no} | **Phiên bản** | {rev} |
| **Ngày** | {date} | **Người lập** | {author} |
| **Người kiểm tra** | {checker} | **Ngày k.tra** | |
```

### Kiểm soát hiển thị

```calcpad
'Ẩn toàn bộ block — tính toán nhưng không in ra báo cáo
#hide
K = matrix_hp(n; n)
#for e = 1 : n_e
  'lắp ghép phức tạp
#loop
#show
'Hiển thị trở lại từ đây

'Ẩn dòng đơn lẻ (dấu ! cuối dòng)
x_temp = a*b + c!             'ẩn dòng này
result = x_temp / 2 = ?       'chỉ hiển thị kết quả
```

### Đồ thị và vẽ hình

```calcpad
'Biểu đồ 2D
$Plot{M(x) @ x = 0 : L}

'Đồ thị nhiều đường
$Plot{M_x(x) | M_y(x) | M_xy(x) @ x = 0 : L}

'Đồ thị 3D (bề mặt)
$Plot{w(x; y) @ x = 0:la & y = 0:lb}
```
Ví dụ kết quả biểu đồ mô men sàn 
![Bending moments](/assets/images/posts/calcpad-cong-cu-tinh-toan-ky-thuat/bending-moments.jpg)
*Bending moments*

### Xuất PDF

```bash
# Chạy tính toán
calcpad my_analysis.cpd

# Xuất PDF
wkhtmltopdf --page-size A4 \
  --margin-top 20mm --margin-bottom 20mm \
  --header-left "[project]" \
  --footer-right "[page]/[topage]" \
  my_analysis.html my_analysis.pdf
```

---

## 🎨 Định dạng văn bản

### Heading (Tiêu đề)

```calcpad
"Tiêu đề chính"            'Heading 1
"_Tiêu đề phụ"             'Heading 2
"__Tiêu đề cấp 3"          'Heading 3
"___Ghi chú"               'Heading 4
```

### In Đậm, Nghiêng

```calcpad
"Văn bản **đậm**"
"Văn bản ***đậm nghiêng***"
"Kết quả: **✅ ĐẠT**"
```

### Danh sách & Bảng

```calcpad
"Danh sách:
• Mục 1
• Mục 2
• Mục 3"

"| Nhịp | L (m) | M_max (kNm) |"
"| B1 | 6.0 | 90 |"
"| B2 | 5.4 | 72 |"
```

---

## Mẹo & Thủ thuật

### 1. Tái sử dụng Template

```bash
cp template_beam.cpd analysis_B1.cpd
# Chỉ sửa dữ liệu đầu vào — kết quả tự cập nhật!
```

### 2. Nhóm biến liên quan

```calcpad
'Vật liệu bê tông C30
f_ck = 30 "MPa"; f_cd = 20 "MPa"; E_cm = 33000 "MPa"

'Vật liệu thép CB400
f_yk = 400 "MPa"; f_yd = 348 "MPa"; E_s = 200000 "MPa"
```

### 3. Kiểm tra độc lập

```calcpad
'Tính toán chính
M_max = P*L/4 = ?

'Kiểm tra bằng công thức tay
M_check = R_A * L/2 - q*L^2/8
M_check = ?
'Nếu M_max ≈ M_check → ✓ chính xác
```

### 4. Ẩn phép tính trung gian

```calcpad
'Ẩn toàn bộ phần chuẩn bị ma trận
#hide
K = setup_global_stiffness()
F = setup_load_vector()
#show

'Chỉ hiển thị kết quả quan trọng
"Độ võng lớn nhất:" w_max = ?
```

### 5. Input form (giao diện nhập liệu)

Calcpad hỗ trợ tạo form nhập liệu để người dùng khác thay đổi thông số mà không cần sửa code:

```calcpad
'Input form — dành cho người dùng cuối
L = {6|"m"|Chiều dài nhịp}
P = {100|"kN"|Tải trọng}
b = {0.3|"m"|Bề rộng dầm}
h = {0.6|"m"|Chiều cao dầm}
```

---

## Xử lý sự cố

| Vấn đề | Nguyên nhân | Giải pháp |
|--------|-------------|-----------|
| **Lỗi cú pháp** | Thiếu dấu `"`, dấu phẩy sai | Kiểm tra cặp ngoặc, toán tử |
| **Đơn vị không khớp** | `m + mm` không chuyển đổi | Thêm `"m"` tường minh |
| **Vòng lặp không kết thúc** | Điều kiện `#while` không hội tụ | Thêm `iter ≤ max_iter` |
| **Ma trận suy biến** | Thiếu điều kiện biên | Kiểm tra số DOF bị ràng buộc |
| **HTML không được tạo** | File `.cpd` có lỗi | Xem log lỗi trong Editor |
| **PDF lỗi định dạng** | HTML chưa được tạo | Chạy `calcpad` trước `wkhtmltopdf` |
| **Hội tụ chậm Newton-Raphson** | Điểm khởi đầu xấu | Chọn `x0` gần nghiệm hơn |

---

## Hỗ trợ

**Câu hỏi thường gặp:**

1. Căn bậc hai: dùng `sqrt(x)` hoặc `√x`
2. Chuyển đơn vị: `L = 1000 "mm" = ? "m"`
3. Ẩn dòng tính toán: thêm `!` vào cuối dòng
4. Vòng lặp lặp mấy lần: dùng `#for` có bộ đếm tường minh
5. Giải ma trận: dùng phép chia trái `d = K \ F`

**Tài nguyên:**
- Documentation: [calcpad.eu/docs](https://www.calcpad.eu/docs)
- Thư viện worksheet: [calcpad.eu](https://calcpad.eu)
- GitHub: [github.com/Proektsoftbg/Calcpad](https://github.com/Proektsoftbg/Calcpad)
- Ví dụ FEM: [hydrostructai.com/calcpad_engineering](https://hydrostructai.com/calcpad_engineering/calcpad.html)

---

## Dùng Calcpad cho dự án thực? Có thể liên hệ để trao đổi thêm

Bài viết này mô tả Calcpad ở mức kỹ thuật. Nếu bạn đang cân nhắc dùng nó cho tính toán kết cấu thực tế, đặc biệt là tính cốt thép theo TCVN 5574:2018 hoặc phân tích FEM bản sàn và muốn xem template `.cpd` cụ thể trước khi tự build, có thể liên hệ trực tiếp.

HydrostructAI đang sử dụng Calcpad trong quy trình tính toán kỹ thuật nội bộ và có thể chia sẻ template cho một số bài toán phổ biến: dầm đơn, bản sàn phẳng, tính toán móng cọc.

**Liên hệ:**

- Email: [ha.nguyen@hydrostructai.com](mailto:ha.nguyen@hydrostructai.com) -> ghi rõ loại bài toán và tiêu chuẩn áp dụng
- Liên hệ: [WhatsApp](https://wa.me/84374874142) -> trao đổi kỹ thuật nhanh trong nhóm kỹ sư

Ngoài ra, nếu bạn đang xây dựng quy trình tính toán có kiểm tra độc lập (peer review) cho dự án có yêu cầu kiểm soát chất lượng cao, đây cũng là mảng HydrostructAI có thể hỗ trợ.

---

*© 2026 HydrostructAI — Tư vấn Quản lý Dự án & Ứng dụng Kỹ thuật*

---

## Tài liệu Tham khảo

### Phần mềm & Tài liệu Calcpad

[1] Proektsoft Ltd., *Calcpad — Free and Open Source Engineering Calculation Software*, Version 7.5+, Sofia, Bulgaria, 2024. Available: [https://github.com/Proektsoftbg/Calcpad](https://github.com/Proektsoftbg/Calcpad)

[2] Proektsoft Ltd., *The Calcpad Language — Quick Reference Guide*, Version 7.5, 2024. Available: [https://calcpad.eu/download/Calcpad-quick-reference.pdf](https://calcpad.eu/download/Calcpad-quick-reference.pdf)

[3] Proektsoft Ltd., *Calcpad Online Help — Iteration Blocks*, calcpad.eu, 2024. Available: [https://calcpad.eu/help/37/input-forms](https://calcpad.eu/help/37/input-forms)

[4] Proektsoft Ltd., *Calcpad Online Help — Iterative Procedures*, calcpad.eu, 2024. Available: [https://calcpad.eu/help/26/iterative-procedures](https://calcpad.eu/help/26/iterative-procedures)

[5] Proektsoft Ltd., *Calcpad README — Version 7.6*, calcpad.eu, 2025. Available: [https://calcpad.eu/download/calcpad-readme.pdf](https://calcpad.eu/download/calcpad-readme.pdf)

[6] HydrostructAI, *Finite Element Analysis of Flat Slab — BFS Element*, Engineering Calculation Report, 2025. Available: [https://hydrostructai.com/calcpad_engineering/cpdoutput/3.%20Flat%20Slab%20FEA.html](https://hydrostructai.com/calcpad_engineering/cpdoutput/3.%20Flat%20Slab%20FEA.html)

[7] HydrostructAI, *Calcpad Engineering Worksheets Library*, 2025. Available: [https://hydrostructai.com/calcpad_engineering/calcpad.html](https://hydrostructai.com/calcpad_engineering/calcpad.html)

### Tiêu chuẩn Kỹ thuật

[8] Bộ Xây dựng Việt Nam, *TCVN 5574:2018 — Kết cấu bê tông và bê tông cốt thép — Tiêu chuẩn thiết kế*, Hà Nội, 2018.

[9] Bộ Xây dựng Việt Nam, *TCVN 9386:2012 — Thiết kế công trình chịu động đất*, Hà Nội, 2012.

[10] European Committee for Standardization, *EN 1992-1-1: Eurocode 2 — Design of Concrete Structures — Part 1-1: General Rules*, Brussels, 2004.

[11] European Committee for Standardization, *EN 1990: Eurocode — Basis of Structural Design*, Brussels, 2002.

### Phương pháp Phần tử Hữu hạn

[12] Bogner, F.K., Fox, R.L., Schmit, L.A., *The Generation of Inter-Element-Compatible Stiffness and Mass Matrices by the Use of Interpolation Formulae*, Proceedings of the Conference on Matrix Methods in Structural Mechanics, Wright-Patterson Air Force Base, Ohio, pp. 397–443, 1965.

[13] Zienkiewicz, O.C., Taylor, R.L., Zhu, J.Z., *The Finite Element Method: Its Basis and Fundamentals*, 7th Edition, Butterworth-Heinemann, 2013. ISBN: 978-1856176330.

[14] Hughes, T.J.R., *The Finite Element Method: Linear Static and Dynamic Finite Element Analysis*, Dover Publications, 2000. ISBN: 978-0486411811.

[15] Reddy, J.N., *An Introduction to the Finite Element Method*, 4th Edition, McGraw-Hill Education, 2018. ISBN: 978-1260461831.

### Tính toán Kỹ thuật & Tự động hóa

[16] Bathe, K.J., *Finite Element Procedures*, 2nd Edition, Klaus-Jürgen Bathe, 2014. ISBN: 978-0979004957.

[17] The Structural Engineer Info, *Calcpad — Engineering Calculation Software Review*, thestructuralengineer.info, 2024. Available: [https://www.thestructuralengineer.info/software/calcpad](https://www.thestructuralengineer.info/software/calcpad)

[18] Wexler, N., *Engineering Calculation Software Comparison: Mathcad vs. Calcpad vs. Excel*, Structural Engineering Forum, 2023.

---
