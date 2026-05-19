---
title: "CivilPy: Thư viện Python mã nguồn mở cho kỹ sư xây dựng"
author_profile: true
author_name: "HST.AI"
date: 2026-02-03 10:00:00 +0700
layout: single
featured: false
toc: true
toc_sticky: true
toc_label: "Mục lục"
permalink: "/posts/civilpy-thu-vien-python-ky-su-xay-dung/"
categories:
  - Structural-Engineering
  - Software-Development
tags:
  [
    CivilPy,
    Python,
    "Kỹ thuật kết cấu",
    AISC,
    AASHTO,
    AREMA,
    "Midas Civil",
    "Mã nguồn mở",
    "Thiết kế cầu",
    "Tự động hóa thiết kế"
  ]
excerpt: "CivilPy là thư viện Python mã nguồn mở cung cấp toàn bộ tiết diện thép AISC dưới dạng đối tượng Python tích hợp đơn vị Pint, công cụ tính toán theo AASHTO và AREMA, tích hợp Midas Civil API và bộ dữ liệu quản lý cầu SNBI và ODOT TIMS."
header:
  overlay_color: "#f1f5f9"
  overlay_filter: "linear-gradient(135deg, rgba(27, 38, 59, 0.95), rgba(65, 90, 119, 0.8))"
  caption: "© HydrostructAI - Tư vấn Quản lý Dự án & Ứng dụng kỹ thuật"
---

CivilPy là thư viện Python mã nguồn mở do Dane Parks phát triển, cung cấp bộ công cụ tính toán và tự động hóa cho kỹ sư xây dựng. Phiên bản 0.2.3 phát hành ngày 4 tháng 5 năm 2026, tập trung vào ba nhóm chức năng chính: dữ liệu tiết diện thép AISC, thiết kế cầu theo AASHTO và AREMA, và tích hợp phần mềm kỹ thuật thương mại qua API.

Bài viết trình bày cấu trúc thư viện, hướng dẫn cài đặt và các ví dụ ứng dụng thực tế với đường dẫn import chính xác.

## Giới thiệu

Kỹ sư xây dựng thường làm việc với nhiều nguồn dữ liệu chuẩn bảng tiết diện thép AISC, bảng tải trọng AASHTO, quy định vật liệu AREMA nhưng phần lớn dữ liệu này chỉ tồn tại trong sách hoặc file PDF, buộc người dùng phải nhập tay vào mỗi lần tính toán. CivilPy giải quyết vấn đề này bằng cách đưa toàn bộ các bảng dữ liệu chuẩn đó vào Python dưới dạng đối tượng có thể lập trình được.

Ngoài dữ liệu chuẩn, thư viện cũng cung cấp API kết nối trực tiếp với Midas Civil và các công cụ quản lý dữ liệu cầu theo tiêu chuẩn liên bang Mỹ (SNBI, ODOT TIMS).

Thư viện được cấp phép theo AGPL-3.0, hoàn toàn miễn phí và mã nguồn mở. Yêu cầu Python 3.10 trở lên.

![Hình minh họa Biểu đồ ứng suất đáy móng dùng CivilPy](/assets/images/posts/civilpy-thu-vien-python-ky-su-xay-dung/foundation-pressure.png)
*Hình minh họa  Biểu đồ ứng suất đáy móng dùng CivilPy)*

## Cài đặt

Cài đặt cơ bản:

```bash
pip install civilpy
```

CivilPy cung cấp các gói tùy chọn tách biệt để tránh phụ thuộc không cần thiết:

| Gói tùy chọn | Nội dung |
|---|---|
| `civilpy[db]` | Kết nối PostgreSQL, Oracle và SSH tunneling |
| `civilpy[pdf]` | Đọc PDF: PyMuPDF, Camelot, Tesseract OCR |
| `civilpy[geo]` | Bản đồ Folium và xử lý GeoTIFF |
| `civilpy[web]` | Selenium và Plotly |
| `civilpy[jupyter]` | Jupyter Notebook và ipywidgets |
| `civilpy[validation]` | Pydantic models kiểm tra dữ liệu SNBI |
| `civilpy[full]` | Tất cả tính năng trên |

Môi trường phát triển đầy đủ:

```bash
pip install civilpy[full]
```

## Cấu trúc thư viện

CivilPy tổ chức theo lĩnh vực chuyên môn, mỗi sub-module độc lập:

```
civilpy/
├── structural/          # Kết cấu: thép AISC, AASHTO, AREMA, Midas Civil
├── geotech/             # Địa kỹ thuật
├── transportation/      # Hạ tầng giao thông
├── water_resources/     # Thủy văn và thủy lực
├── general/             # Tiện ích chung, quản lý đơn vị (Pint)
└── state/
    └── ohio/            # Công cụ đặc thù Ohio: SNBI, ODOT TIMS
```

Module `civilpy.structural` là trọng tâm của thư viện và chứa phần lớn các công cụ hữu ích nhất cho kỹ sư kết cấu cầu.

## Tiết diện thép AISC

`civilpy.structural.steel` cung cấp toàn bộ tiết diện thép chuẩn AISC dưới dạng đối tượng Python, tích hợp thư viện `Pint` để mang đơn vị theo từng giá trị.

Các lớp tiết diện được hỗ trợ: `W` (dầm chữ I cánh rộng), `HSS` (tiết diện hộp tròn và chữ nhật), `C` (thép máng), `L` (thép góc), `Pipe`, `HP` (cọc thép chịu tải đứng), `WT` (thép chữ T), `TwoL` (thép góc đôi).

```python
from civilpy.structural.steel import W
from civilpy.general import units

# Truy xuất tiết diện W36x150
beam = W("W36X150")

# Thuộc tính hình học kèm đơn vị tự động
print(beam.depth)   # 35.9 in
print(beam.I_x)     # 9040.0 in⁴
print(beam.S_x)     # 504.0 in³
print(beam.Z_x)     # 581.0 in³

# Tính ứng suất uốn với kiểm tra thứ nguyên
M = 400 * units("kip*ft")
fb = (M.to("kip*in") / beam.S_x.to("in^3")).to("ksi")
print(f"Ứng suất uốn: {fb:.2f}")
```

Nhờ Pint, phép tính thứ nguyên được kiểm tra tự động. Nếu đơn vị không khớp (ví dụ: kip nhân với inch nhưng chia cho in⁴), Python sẽ báo lỗi ngay thay vì trả về số vô nghĩa.

Thư viện còn cung cấp `HistoricSteelSection` cho các tiết diện trước thời điểm AISC chuẩn hóa hữu ích khi kiểm tra và đánh giá cầu cũ xây dựng trước thập niên 1920. Hàm `get_bolt_weights()` hỗ trợ tính trọng lượng bu lông cho bản thống kê vật liệu.

## Tiết diện tổ hợp và bản thép

`civilpy.structural.section_properties` cung cấp lớp `CrossSection` để xây dựng và tính toán đặc trưng hình học của tiết diện tổ hợp từ nhiều bản thép.

```python
from civilpy.structural.section_properties import CrossSection

# Dầm tổ hợp I (plate girder)
section = CrossSection()
section.add_plate(b=600, t=20)    # Bản cánh dưới: rộng 600mm, dày 20mm
section.add_plate(b=12, t=1200)   # Bụng dầm: rộng 12mm, cao 1200mm
section.add_plate(b=500, t=25)    # Bản cánh trên: rộng 500mm, dày 25mm

# Tính đặc trưng hình học
props = section.get_properties()
print(f"Diện tích: {props.area}")
print(f"Trọng tâm tính từ đáy: {props.centroid}")
print(f"Mô men quán tính Ixx: {props.I_x}")
```

Lớp `CrossSection` cũng hỗ trợ tích hợp tiết diện cán sẵn (rolled shapes) vào tiết diện tổ hợp, ví dụ dầm bê tông cốt thép có bản cánh thép hoặc dầm thép bổ sung bản gia cường.

## Thiết kế theo AASHTO

`civilpy.structural.aashto` triển khai các bảng tham chiếu và quy trình kiểm tra từ tiêu chuẩn AASHTO LRFD Bridge Design Specifications.

Các công cụ chính:

- `MethodABearing` Kiểm tra gối đàn hồi theo AASHTO LRFD Table 14.6.2 (Method A), bao gồm kiểm tra ứng suất nén, biến dạng cắt và góc xoay cho phép.
- `HL93Load` Định nghĩa tải trọng xe HL-93 (xe tải thiết kế và đoàn xe) cho tổ hợp tải trọng theo LRFD.

```python
from civilpy.structural.aashto import MethodABearing, HL93Load

# Tải trọng HL-93 xe tải thiết kế cho cầu đường bộ
truck = HL93Load()
print(truck.axle_loads)   # Tải trọng các trục xe

# Kiểm tra gối đàn hồi Method A
bearing = MethodABearing()
result = bearing.check()
print(result)
```

Các bảng tra cứu về độ phù hợp gối đỡ (bearing suitability) từ AASHTO LRFD được tích hợp sẵn, giúp lựa chọn loại gối phù hợp với từng điều kiện tải trọng mà không cần tra bảng thủ công.

## Thiết kế cầu đường sắt theo AREMA

`civilpy.structural.arema` cung cấp các định nghĩa vật liệu và tải trọng theo tiêu chuẩn AREMA Chapter 15 tiêu chuẩn thiết kế kết cấu thép cho cầu đường sắt tại Bắc Mỹ.

```python
from civilpy.structural.arema import (
    GlobalDefinitions,
    LoadDefinitions,
    ThroughPlateGirderFloorbeam
)

# Định nghĩa vật liệu toàn cục theo AREMA Chapter 15
materials = GlobalDefinitions()
print(f"Cường độ chảy thép: {materials.Fy}")
print(f"Mô đun đàn hồi: {materials.E}")

# Tải trọng Cooper E80 tải trọng tàu hỏa thiết kế
loads = LoadDefinitions()
print(loads.cooper_e80)

# Thiết kế dầm ngang dầm qua (through plate girder)
floorbeam = ThroughPlateGirderFloorbeam(
    span=16.0,       # feet
    spacing=5.0      # feet
)
print(floorbeam.design_moment())
```

`ThroughPlateGirderFloorbeam` tự động hóa thiết kế dầm ngang cho loại cầu thép dầm qua dạng phổ biến trong các cầu đường sắt cũ và hiện đại.

## Tích hợp Midas Civil

`civilpy.structural.midas` kết nối trực tiếp với phần mềm Midas Civil phiên bản 2022 trở lên thông qua REST API, cho phép đọc và ghi dữ liệu mô hình từ Python.

```python
from civilpy.structural.midas import midas_api

# Truy vấn danh sách phần tử từ mô hình đang mở
elements = midas_api(
    endpoint="/db/elem",
    method="GET"
)

# Lấy thông tin nút, tiết diện và tải trọng
nodes = midas_api(endpoint="/db/node", method="GET")
sections = midas_api(endpoint="/db/sect", method="GET")
static_loads = midas_api(endpoint="/db/stldcase", method="GET")

# Cập nhật tiết diện hàng loạt
for sect_id in range(1, 51):
    midas_api(
        endpoint=f"/db/sect/{sect_id}",
        method="PUT",
        data={"SECTID": sect_id, "SNAME": "W21X62"}
    )
```

Khả năng này giúp tự động hóa các quy trình lặp đi lặp lại: so sánh nhiều phương án tiết diện, xuất kết quả nội lực theo từng tổ hợp tải, hoặc cập nhật hàng loạt thông số mô hình mà không cần thao tác thủ công trong giao diện đồ họa.

## Quản lý dữ liệu cầu

### Dữ liệu SNBI

`civilpy.state.ohio.snbi` cung cấp bộ Pydantic models để làm việc với dữ liệu kiểm kê cầu theo tiêu chuẩn FHWA Specifications for the National Bridge Inventory (SNBI). Pydantic tự động kiểm tra kiểu và phạm vi dữ liệu khi khởi tạo đối tượng.

```python
from civilpy.state.ohio.snbi import Bridge, Inspection, Element

# Tạo bản ghi cầu theo chuẩn SNBI
bridge = Bridge(
    structure_number="3901234",
    year_built=1985,
    main_span_length=45.7
)

# Dữ liệu kiểm tra định kỳ
inspection = Inspection(
    bridge=bridge,
    rating_year=2024,
    deck_condition=6,
    superstructure_condition=7,
    substructure_condition=5
)
print(inspection.overall_rating())
```

### Dữ liệu ODOT TIMS

`civilpy.state.ohio.DOT.TIMS` kết nối với dịch vụ ArcGIS REST của Sở Giao thông Ohio (ODOT) để tải dữ liệu kiểm kê cầu toàn bang không cần xác thực.

```python
from civilpy.state.ohio.DOT.TIMS import get_tims_data, TIMSBridge

# Truy vấn dữ liệu cầu theo hạt (county)
bridges = get_tims_data(county="Franklin")
for bridge in bridges:
    print(f"{bridge.structure_number}: năm xây {bridge.year_built}")
```

Mặc dù hai module này xây dựng theo chuẩn dữ liệu của Mỹ, cấu trúc Pydantic models và cách tiếp cận có thể làm tài liệu tham khảo cho việc xây dựng hệ thống quản lý dữ liệu cầu theo tiêu chuẩn Việt Nam.

## Ưu điểm và hạn chế

### Điểm mạnh

- Dữ liệu chuẩn tích hợp sẵn: toàn bộ tiết diện AISC, bảng tham chiếu AASHTO, định nghĩa vật liệu AREMA không cần nhập tay, không có nguy cơ sai số khi tra bảng.
- Đơn vị tự động qua Pint: lỗi thứ nguyên được phát hiện ngay trong lúc tính toán thay vì sau khi đã ra kết quả.
- Tích hợp Midas Civil: điều khiển phần mềm thương mại từ Python, kết nối các bước trong quy trình thiết kế.
- Tiết diện lịch sử: `HistoricSteelSection` phục vụ đánh giá và gia cường cầu cũ.
- Mã nguồn mở AGPL-3.0: có thể kiểm chứng từng công thức được áp dụng, không phụ thuộc vào hộp đen phần mềm thương mại.

### Hạn chế cần lưu ý

- Tiêu chuẩn Bắc Mỹ: thư viện hiện tập trung vào AISC, AASHTO, AREMA. Kỹ sư áp dụng TCVN cần tự bổ sung công thức và hệ số.
- Yêu cầu lập trình Python: không có giao diện đồ họa đòi hỏi kỹ năng lập trình từ cơ bản đến trung cấp.
- Đang phát triển tích cực: phiên bản 0.2.3 vẫn ở trạng thái Beta; API có thể thay đổi giữa các phiên bản.
- Tài liệu chủ yếu bằng tiếng Anh.

## Kết luận

CivilPy là lựa chọn thực tiễn cho kỹ sư xây dựng muốn bổ sung lập trình Python vào quy trình thiết kế mà không cần xây dựng lại các bảng dữ liệu chuẩn từ đầu. Điểm mạnh cốt lõi nằm ở việc tích hợp trực tiếp AISC, AASHTO và AREMA vào Python cộng với API kết nối Midas Civil giúp tự động hóa những tác vụ lặp lại tốn thời gian nhất trong thiết kế cầu thép.

Đối với kỹ sư Việt Nam, thư viện có thể sử dụng ngay cho phần tính toán tiết diện và tự động hóa mô hình, trong khi phần kiểm tra theo TCVN vẫn cần phát triển thêm. Cấu trúc mã nguồn mở và cộng đồng đang tích cực tạo điều kiện đóng góp thêm tiêu chuẩn Việt Nam trong tương lai.

Liên hệ [WhatsApp](https://wa.me/84374874142) hoặc [ha.nguyen@hydrostructai.com](mailto:ha.nguyen@hydrostructai.com) để trao đổi về ứng dụng Python trong các dự án kỹ thuật.

## Tài liệu tham khảo

1. Parks, D. (2026). *CivilPy v0.2.3*. Python Package Index. [https://pypi.org/project/civilpy/](https://pypi.org/project/civilpy/)

2. Parks, D. (2026). *CivilPy repository*. GitHub. [https://github.com/drparks71/CivilPy](https://github.com/drparks71/CivilPy)

3. Parks, D. (2026). *CivilPy documentation*. [https://dane.daneparks.com/civilpy](https://dane.daneparks.com/civilpy)

4. AISC. (2022). *Steel Construction Manual* (16th ed.). American Institute of Steel Construction.

5. AASHTO. (2020). *AASHTO LRFD Bridge Design Specifications* (9th ed.). American Association of State Highway and Transportation Officials.

6. AREMA. (2023). *Manual for Railway Engineering*, Chapter 15: Steel Structures. American Railway Engineering and Maintenance-of-Way Association.

7. FHWA. (2022). *Specifications for the National Bridge Inventory (SNBI)*. Federal Highway Administration. [https://www.fhwa.dot.gov/bridge/nbi/snbi.cfm](https://www.fhwa.dot.gov/bridge/nbi/snbi.cfm)

8. Hunter, J. D. (2007). Matplotlib: A 2D graphics environment. *Computing in Science & Engineering*, 9(3), 90–95.
