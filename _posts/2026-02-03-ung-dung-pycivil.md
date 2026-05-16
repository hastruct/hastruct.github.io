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
excerpt: "CivilPy là thư viện Python mã nguồn mở dành cho kỹ sư xây dựng, cung cấp dữ liệu tiết diện thép AISC, công cụ thiết kế theo AASHTO và AREMA, tích hợp Midas Civil API và các bộ dữ liệu cầu SNBI và ODOT TIMS."
header:
  overlay_color: "#f1f5f9"
  overlay_filter: "linear-gradient(135deg, rgba(27, 38, 59, 0.95), rgba(65, 90, 119, 0.8))"
  caption: "© HydrostructAI - Tư vấn Quản lý Dự án & Ứng dụng kỹ thuật"
---

CivilPy là thư viện Python mã nguồn mở do Dane Parks phát triển, hướng đến việc cung cấp bộ công cụ tính toán và tự động hóa cho kỹ sư xây dựng, đặc biệt trong lĩnh vực kết cấu thép, thiết kế cầu và giao tiếp với phần mềm kỹ thuật. Phiên bản 0.2.3 phát hành ngày 4 tháng 5 năm 2026 mang lại nhiều cải tiến đáng kể so với các phiên bản trước.

Bài viết giới thiệu các tính năng chính của CivilPy, hướng dẫn cài đặt và trình bày ví dụ ứng dụng thực tế.

## Giới thiệu

Một trong những thách thức lớn nhất của kỹ sư xây dựng hiện đại là khoảng cách giữa tính toán thủ công và tự động hóa quy trình. Hầu hết các phần mềm thương mại như MIDAS, ETABS hay SAP2000 cung cấp giao diện đồ họa tiện lợi nhưng thiếu khả năng lập trình linh hoạt để xử lý hàng loạt hoặc tích hợp vào quy trình thiết kế tổng thể.

CivilPy giải quyết vấn đề này theo một hướng thực dụng hơn: thay vì thay thế phần mềm thương mại, thư viện đóng vai trò lớp trung gian cho phép kỹ sư truy cập dữ liệu chuẩn (AISC, AASHTO, AREMA), thực hiện tính toán tự động và giao tiếp với phần mềm kỹ thuật qua API.

Thư viện được cấp phép theo AGPL-3.0, hoàn toàn miễn phí và mã nguồn mở. Yêu cầu Python từ 3.10 trở lên.

![Hình minh họa Biểu đồ ứng suất đáy móng dùng CivilPy](/assets/images/posts/civilpy-thu-vien-python-ky-su-xay-dung/foundation-pressure.png)
*Hình minh họa  Biểu đồ ứng suất đáy móng dùng CivilPy)*

## Cài đặt

Cài đặt cơ bản chỉ cần một lệnh:

```bash
pip install civilpy
```

CivilPy cung cấp nhiều tùy chọn cài đặt bổ sung tùy theo nhu cầu:

| Tùy chọn | Mô tả |
|---|---|
| `civilpy[db]` | Hỗ trợ cơ sở dữ liệu |
| `civilpy[pdf]` | Đọc và xử lý PDF |
| `civilpy[geo]` | Công cụ địa lý và GIS |
| `civilpy[web]` | Công cụ web scraping |
| `civilpy[jupyter]` | Tích hợp Jupyter Notebook |
| `civilpy[validation]` | Kiểm tra và xác thực dữ liệu |
| `civilpy[full]` | Cài đặt toàn bộ tính năng |

Để cài đặt đầy đủ cho môi trường phát triển:

```bash
pip install civilpy[full]
```

## Tiết diện thép AISC

Một trong những tính năng nổi bật nhất của CivilPy là cơ sở dữ liệu tiết diện thép theo tiêu chuẩn AISC, tích hợp thư viện đơn vị `Pint` để tự động chuyển đổi và kiểm tra thứ nguyên trong quá trình tính toán.

```python
from civilpy.structural.steel import AISCSteelSection

# Truy xuất tiết diện W14x82
section = AISCSteelSection("W14X82")

print(f"Diện tích mặt cắt ngang: {section.A}")
print(f"Mô men quán tính trục x: {section.Ix}")
print(f"Mô men kháng uốn Sx: {section.Sx}")
print(f"Chiều cao tiết diện: {section.d}")
print(f"Bán kính quán tính rx: {section.rx}")
```

Kết quả trả về đều kèm đơn vị cụ thể (in², in⁴, in³...) nhờ Pint, giúp phát hiện lỗi thứ nguyên ngay trong quá trình tính toán thay vì chờ đến bước kiểm tra kết quả.

Thư viện hỗ trợ đầy đủ các loại tiết diện thép AISC: W, S, M, HP (dầm và cột), C, MC (thanh máng), L, WT, ST, MT, HSS tròn, HSS chữ nhật và các tiết diện đặc biệt khác.

## Phân tích tiết diện tổ hợp

Module `CrossSection` cho phép xây dựng và phân tích tiết diện dầm tổ hợp (plate girder), loại tiết diện phổ biến trong thiết kế cầu thép và kết cấu công nghiệp.

```python
from civilpy.structural.cross_section import CrossSection

# Xây dựng tiết diện dầm tổ hợp I
girder = CrossSection()
girder.add_plate(width=600, thickness=20, y_offset=0)     # Bản cánh dưới
girder.add_web(height=1200, thickness=12)                  # Bụng dầm
girder.add_plate(width=500, thickness=25, y_offset=1220)  # Bản cánh trên

# Tính toán đặc trưng hình học
props = girder.calculate_properties()
print(f"Trọng tâm: {props.centroid} mm")
print(f"Mô men quán tính Ixx: {props.Ixx:.2e} mm⁴")
print(f"Mô men kháng uốn trên: {props.Sx_top:.0f} mm³")
print(f"Mô men kháng uốn dưới: {props.Sx_bottom:.0f} mm³")
```

Khả năng tự động tính toán đặc trưng hình học giúp giảm đáng kể thời gian khi cần so sánh nhiều phương án tiết diện trong giai đoạn thiết kế sơ bộ.

## Thiết kế theo AASHTO và AREMA

CivilPy tích hợp các quy định tính toán từ hai tiêu chuẩn thiết kế cầu quan trọng của Bắc Mỹ.

Tiêu chuẩn AASHTO LRFD (American Association of State Highway and Transportation Officials) áp dụng phương pháp hệ số tải trọng và sức kháng cho thiết kế cầu đường bộ. Tiêu chuẩn AREMA (American Railway Engineering and Maintenance-of-Way Association) phục vụ thiết kế cầu đường sắt.

```python
from civilpy.structural.aashto import AASHTOBeam

# Phân tích dầm cầu theo AASHTO LRFD
beam = AASHTOBeam(
    span_length=30.0,    # Nhịp dầm, đơn vị feet
    section="W36X160",   # Tiết diện thép AISC
    fy=50.0,             # Cường độ chảy, ksi
    load_factor=1.25     # Hệ số tải trọng tĩnh
)

result = beam.check_flexure()
print(f"Sức kháng uốn thiết kế: {result.phi_Mn:.1f} kip-ft")
print(f"Mô men tính toán: {result.Mu:.1f} kip-ft")
print(f"Tỷ số kiểm tra DCR: {result.DCR:.3f}")
```

Việc triển khai trực tiếp công thức từ AASHTO và AREMA trong Python giúp kỹ sư kiểm tra lại logic tính toán, điều chỉnh hệ số và tích hợp vào quy trình thiết kế tự động.

## Tích hợp Midas Civil

Một trong những ưu điểm thực tiễn nhất của CivilPy là khả năng giao tiếp với phần mềm Midas Civil qua API, cho phép tự động hóa nhiều tác vụ lặp đi lặp lại.

```python
from civilpy.software.midas import MidasCivilAPI

# Kết nối với Midas Civil đang chạy
midas = MidasCivilAPI(host="localhost", port=8080)

# Đọc nội lực các phần tử
beam_forces = midas.get_beam_forces(
    load_case="SW+LL",
    element_ids=range(1, 101)
)

# Xuất kết quả ra DataFrame để phân tích
import pandas as pd
df = pd.DataFrame(beam_forces)
print(df.describe())

# Cập nhật tiết diện hàng loạt và chạy lại phân tích
for elem_id in range(1, 51):
    midas.update_section(elem_id, section_name="W21X62")

midas.run_analysis()
```

Khả năng điều khiển Midas Civil qua Python giúp tự động hóa các quy trình như: cập nhật hàng loạt tiết diện dầm, xuất báo cáo kết quả, so sánh nhiều phương án thiết kế trong một script duy nhất — những việc trước đây phải thao tác thủ công trong giao diện đồ họa.

## Dữ liệu cầu: SNBI và ODOT TIMS

CivilPy cung cấp hai module phục vụ quản lý và phân tích dữ liệu hạ tầng cầu.

Module SNBI (Specifications for the National Bridge Inventory) triển khai bộ mô hình dữ liệu dựa trên Pydantic để làm việc với dữ liệu kiểm kê cầu theo chuẩn liên bang Mỹ. Pydantic đảm bảo dữ liệu được xác thực tự động khi nhập vào, giảm nguy cơ sai sót trong quá trình xử lý.

```python
from civilpy.state.ohio.snbi import BridgeRecord

# Tạo bản ghi cầu theo chuẩn SNBI
bridge = BridgeRecord(
    structure_number="3901234",
    year_built=1985,
    main_span_length=45.7,
    deck_condition_rating=6,
    superstructure_rating=7,
    substructure_rating=5
)

print(bridge.overall_condition())
```

Module ODOT TIMS (Ohio Department of Transportation Transportation Information Mapping System) cung cấp công cụ truy vấn dữ liệu hạ tầng giao thông Ohio, hữu ích cho các dự án nghiên cứu và phân tích mạng lưới cầu.

Mặc dù hai module này xây dựng theo chuẩn dữ liệu của Mỹ, cấu trúc và cách tiếp cận có thể làm tài liệu tham khảo cho việc xây dựng hệ thống quản lý dữ liệu cầu theo tiêu chuẩn Việt Nam.

## Ưu điểm và hạn chế

### Điểm mạnh

CivilPy mang lại giá trị thực tiễn rõ ràng trong các tình huống cụ thể:

- Tính toán hàng loạt: script Python xử lý hàng trăm tiết diện trong vài giây thay vì nhập liệu thủ công từng cái một.
- Tích hợp phần mềm: module Midas Civil API kết nối các bước trong quy trình thiết kế trước đây cần thao tác thủ công.
- Kiểm chứng tính toán: mã nguồn mở cho phép xem và xác minh đúng công thức được áp dụng, không phụ thuộc vào hộp đen của phần mềm thương mại.
- Dữ liệu chuẩn sẵn có: cơ sở dữ liệu AISC tích hợp sẵn giúp tránh nhập liệu thủ công và giảm nguy cơ sai số.

### Hạn chế cần lưu ý

- Thư viện hiện tập trung vào tiêu chuẩn Bắc Mỹ (AISC, AASHTO, AREMA). Kỹ sư Việt Nam cần bổ sung thêm công thức và hệ số theo TCVN.
- Yêu cầu kỹ năng Python từ cơ bản đến trung cấp — không có giao diện đồ họa.
- Phiên bản 0.2.3 vẫn đang trong giai đoạn phát triển tích cực; API có thể thay đổi giữa các phiên bản.
- Tài liệu hiện tại chủ yếu bằng tiếng Anh.

## Kết luận

CivilPy đại diện cho một hướng tiếp cận thực dụng trong việc áp dụng Python vào kỹ thuật xây dựng: thay vì xây dựng phần mềm thay thế hoàn toàn, thư viện tập trung vào việc làm cho dữ liệu chuẩn và công cụ tính toán trở nên dễ tiếp cận và tự động hóa được.

Đối với kỹ sư Việt Nam muốn bắt đầu với lập trình kỹ thuật, CivilPy là điểm khởi đầu tốt để làm quen với tư duy "kỹ sư-lập trình viên". Việc mở rộng thư viện để hỗ trợ tiêu chuẩn TCVN là hoàn toàn khả thi và có thể đóng góp lại cho cộng đồng mã nguồn mở.

Liên hệ [WhatsApp](https://wa.me/84374874142) hoặc [ha.nguyen@hydrostructai.com](mailto:ha.nguyen@hydrostructai.com) để trao đổi thêm về ứng dụng Python trong các dự án kỹ thuật.

## Tài liệu tham khảo

1. Parks, D. (2026). *CivilPy v0.2.3*. Python Package Index. [https://pypi.org/project/civilpy/](https://pypi.org/project/civilpy/)

2. Parks, D. (2026). *CivilPy documentation*. [https://dane.daneparks.com/civilpy](https://dane.daneparks.com/civilpy)

3. Parks, D. (2026). *CivilPy source code*. GitHub. [https://github.com/drparks71/civilpy](https://github.com/drparks71/civilpy)

4. AISC. (2022). *Steel Construction Manual* (16th ed.). American Institute of Steel Construction.

5. AASHTO. (2020). *AASHTO LRFD Bridge Design Specifications* (9th ed.). American Association of State Highway and Transportation Officials.

6. AREMA. (2023). *Manual for Railway Engineering*. American Railway Engineering and Maintenance-of-Way Association.

7. FHWA. (2022). *Specifications for the National Bridge Inventory (SNBI)*. Federal Highway Administration.
