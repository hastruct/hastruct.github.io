---
title: "BIM Mã Nguồn Mở: Tiếp Cận Bổ Trợ giữa Pascal Editor và pyvista-cad"
author_profile: true
author_name: "HST.AI"
date: 2026-06-05 18:00:00 +0700
layout: single
featured: true
toc: true
toc_sticky: true
toc_label: "📑 Mục Lục"
permalink: "/posts/mo-hinh-bim-open-source/"
categories:
  - BIM
  - Open-Source
  - Python
tags:
  [
    BIM,
    Mã nguồn mở,
    Open Source,
    Pascal Editor,
    pyvista-cad,
    PyVista,
    IFC,
    IfcOpenShell,
    Bonsai BIM,
    FreeCAD,
    xeokit,
    OpenBIM,
    Python AEC,
    WebGPU,
    React Three Fiber,
    ISO 19650,
    TCVN 14177,
    CAD interop,
    STEP BREP,
    Digital Twin,
    Thủy lợi
  ]
excerpt: "> *Phần mềm thương mại cho bạn một workflow hoàn chỉnh. Mã nguồn mở cho bạn một workflow bạn thực sự hiểu và kiểm soát.* Bài viết phân tích chuyên sâu hai công cụ mã nguồn mở đang định hình lại phương trình chi phí-năng lực trong hệ sinh thái BIM: **Pascal Editor** — trình soạn thảo kiến trúc 3D chạy hoàn toàn trên trình duyệt với WebGPU — và **pyvista-cad** — lớp tương tác CAD/IFC chính thức cho Python. Không phải để thay thế Revit, mà để lấp đầy những khoảng trống mà Revit không thể lấp — và xây dựng năng lực BIM thực chất từ nền tảng mã nguồn mở."
header:
  overlay_color: "#f1f5f9"
  overlay_filter: "linear-gradient(135deg, rgba(15, 32, 55, 0.95), rgba(45, 80, 120, 0.85))"
  caption: "© HydrostructAI - Tư vấn Mô hình hóa BIM & Phát triển Giải pháp Mã nguồn mở cho AEC"
---

## Đặt vấn đề

Một chi phí license Autodesk AEC Collection năm 2026 dao động từ **3.500 đến 4.500 USD/người dùng/năm** tại Việt Nam [^1]. Với một đơn vị tư vấn thiết kế có 50 kỹ sư cần BIM, con số đó leo lên từ **210.000 đến 300.000 USD mỗi năm** — chưa tính phần cứng, đào tạo và quản lý [^2]. Trong khi đó, **Quyết định 258/QĐ-TTg** ngày 17/3/2023 đã đưa BIM thành yêu cầu bắt buộc đối với công trình cấp I, cấp II sử dụng vốn đầu tư công từ 2023-2025 [^3]. Khoảng cách giữa yêu cầu pháp lý và năng lực tiếp cận công cụ của phần lớn đơn vị vừa và nhỏ tại Việt Nam vì thế ngày càng rõ nét.

Phong trào **OpenBIM** — với IFC làm ngôn ngữ trung gian, mã nguồn mở làm hạ tầng — đang lớn mạnh như một phản ứng cấu trúc với thực tế này. Đặc biệt với ngành thủy lợi Việt Nam, nơi hiện có **5.656 hồ chứa, 8.512 đập dâng và 5.194 trạm bơm điện** đang khai thác mà phần lớn chưa có hồ sơ kỹ thuật số hóa [^4] — bài toán BIM không chỉ là câu hỏi phần mềm mà là câu hỏi chiến lược quốc gia.

Trong bối cảnh đó, hai dự án mã nguồn mở đang thu hút sự chú ý của cộng đồng AEC toàn cầu:

- **Pascal Editor** (`github.com/pascalorg/editor`): Trình soạn thảo 3D kiến trúc mã nguồn mở, chạy hoàn toàn trên trình duyệt nhờ WebGPU và React Three Fiber, MIT license, **16.100 GitHub star** chỉ sau vài tháng ra mắt [^5].
- **pyvista-cad** (`github.com/pyvista/pyvista-cad`): Thư viện Python mã nguồn mở, là "lớp tương tác CAD chính thức cho PyVista", hỗ trợ đọc và hiển thị STEP, IFC, DXF, IGES, BREP với B-rep rendering ngang công cụ thương mại [^6].

Bài viết này **không** lập luận rằng hai công cụ này thay thế được Revit hay Civil 3D trong dự án quy mô lớn. Bài viết lập luận rằng: đây là hai mắt xích **bổ trợ nhau** trong một chuỗi workflow BIM mã nguồn mở khả thi — và hiểu đúng vị trí của từng công cụ là điều kiện để khai thác được giá trị thực sự của chúng.

---

## 1. Bức tranh hệ sinh thái BIM mã nguồn mở 2026

### 1.1. IFC 4.3: Bước ngoặt cho hạ tầng tuyến tính

Trước khi nói về bất kỳ công cụ cụ thể nào, cần khẳng định: **IFC không phải định dạng xuất — đó là ngôn ngữ bản địa của OpenBIM** [^7]. Sự khác biệt có tính quyết định:

- Phần mềm thương mại (Revit, ArchiCAD) lưu trữ mô hình trong định dạng proprietary và **xuất** sang IFC. Quá trình xuất luôn kéo theo mất mát thông tin và biến dạng ngữ nghĩa.
- Phần mềm OpenBIM bản địa IFC (Bonsai, IfcOpenShell) **đọc và ghi trực tiếp** vào IFC schema — không có bước chuyển đổi, không mất mát.

**IFC 4.3** (2022) là bước ngoặt quan trọng cho hạ tầng: lần đầu tiên bao gồm đầy đủ **hạ tầng tuyến tính** — đường, cầu, đường sắt, địa hình TIN [^8]:

- `IfcAlignment`: biểu diễn tuyến hướng/trắc dọc của đường/đường sắt
- `IfcBridge`, `IfcRoad`: object types chuyên biệt cho hạ tầng
- TIN surface: địa hình số hóa tích hợp vào mô hình BIM
- Kết hợp với `IDS` (Information Delivery Specification) để kiểm soát chất lượng dữ liệu

AASHTO (Hiệp hội vận tải đường bộ Mỹ) đã thông qua IFC 4.3 làm chuẩn trao đổi dữ liệu cho cầu và đường. buildingSMART báo cáo **Global openBIM Mandates 2025** ghi nhận IFC bắt buộc tại nhiều quốc gia châu Âu, Singapore, và đang mở rộng [^9].

### 1.2. Hệ sinh thái mã nguồn mở AEC — Kiến trúc nhiều tầng

Thế giới open source BIM không phải là một công cụ — đó là một **hệ sinh thái nhiều tầng**:

| Tầng | Công cụ | Vai trò | Giấy phép |
|------|---------|---------|-----------|
| **Chuẩn dữ liệu** | IFC 4.3 (buildingSMART) | Ngôn ngữ trung gian | Open standard |
| **IFC Engine** | IfcOpenShell | Đọc/ghi/phân tích IFC, CLI tools | LGPL v3 |
| **Authoring** | FreeCAD BIM + NativeIFC | Mô hình hóa tham số, native IFC | LGPL v2 |
| **Web Visualization** | xeokit SDK | Viewer mô hình lớn, double-precision | Open source |
| **Early-stage Design** | **Pascal Editor** | Phác thảo không gian 3D trên browser | MIT |
| **CAD/IFC Backend** | **pyvista-cad** | Python interop: STEP, IFC, IGES, BREP | MIT/BSD |
| **Collaboration** | Speckle / OpenProject | CDE đơn giản, BCF management | Apache 2.0 |

Pascal Editor và pyvista-cad không phủ trùng nhau — chúng lấp đầy hai khoảng trống khác nhau trong hệ sinh thái này.

---

## 2. Pascal Editor: Thiết kế kiến trúc 3D không cài đặt

### 2.1. Bối cảnh và tác động cộng đồng

Pascal Editor được phát hành mã nguồn mở vào đầu năm 2026 với thông điệp rõ ràng: *"Create and share 3D architectural projects — directly in the browser, no installation required"* [^5]. Trong vài tháng đầu, dự án thu hút **16.100 star và 2.100 fork** — con số không thường thấy với một công cụ chuyên ngành AEC — phản ánh một nhu cầu thực sự của cộng đồng.

> [!info] Thông tin dự án (v0.8.0, 10/5/2026)
> - **GitHub:** [github.com/pascalorg/editor](https://github.com/pascalorg/editor)
> - **Giấy phép:** MIT — tự do fork, deploy, thương mại hóa
> - **Stars:** 16.1k · **Forks:** 2.1k · **Commits:** 847
> - **Contributors chính:** 3 (Aymeric Rabot, Wassim Samad, Sudhir)
> - **Live demo:** editor.pascal.app

### 2.2. Kiến trúc kỹ thuật — Monorepo và WebGPU-first

Pascal Editor được xây dựng theo kiến trúc **Turborepo monorepo** với ba package độc lập [^5]:

```
pascalorg/editor/                    ← Turborepo monorepo
├── packages/
│   ├── @pascal-app/core             # Schema (Zod), state (Zustand), geometry systems
│   ├── @pascal-app/viewer           # 3D rendering via React Three Fiber
│   └── apps/
│       └── editor/                  # Next.js 16, UI tools, editor-specific logic
│           └── components/tools/    # WallTool, ZoneTool, ItemTool...
```

**Stack công nghệ đầy đủ:**

| Layer | Công nghệ | Vai trò |
|-------|-----------|---------|
| Frontend | React 19 + Next.js 16 + TypeScript | UI và routing |
| 3D Rendering | Three.js **WebGPU** + React Three Fiber | GPU rendering |
| State | Zustand + Zundo (undo/redo 50 steps) | State management |
| Schema | Zod | Type-safe node definitions |
| CSG | three-bvh-csg | Boolean geometry (cutout cửa/cửa sổ) |
| Build | Turborepo + Bun | Monorepo build system |
| Storage | IndexedDB | Autosave cục bộ |

**Tại sao WebGPU là lựa chọn đúng?** WebGPU không phải upgrade nhỏ từ WebGL — đây là API cấp thấp hơn, tương tự Vulkan/Metal, cho phép compute shaders và GPU-side culling. Pascal Editor là một trong những dự án BIM đầu tiên khai thác **instanced rendering** cho cấu kiện lặp (đoạn tường, cửa, nội thất), giảm memory footprint đáng kể và duy trì 60 FPS ngay cả với cảnh trên 1 triệu polygon [^10].

### 2.3. Mô hình dữ liệu — Tiếp cận gần với triết lý BIM

Đây là điểm đáng chú ý nhất của Pascal Editor. Dữ liệu không được lưu theo kiểu đồ họa thông thường mà theo **mô hình node phân cấp** gần với cấu trúc IFC:

```
Site → Building → Level → {Wall, Slab, Ceiling, Roof, Zone, Scan, Guide}
                                └── Item (doors, windows, furniture)
```

Tất cả nodes được lưu trong một **flat dictionary** thay vì cây lồng nhau — giúp serialization hiệu quả, dễ diff/merge, tương tự cấu trúc IFC:

```typescript
// BaseNode schema (Zod)
BaseNode {
  id: string              // Prefix tự động: "wall_abc123"
  type: string            // Discriminator
  parentId: string | null
  visible: boolean
  camera?: Camera
  metadata?: JSON
}
```

**Spatial Grid Manager** xử lý phát hiện va chạm và xác thực vị trí đặt: `canPlaceOnFloor()`, `canPlaceOnWall()`, `getSlabElevationAt()` — được sử dụng bởi các công cụ đặt item để xác thực vị trí thời gian thực.

### 2.4. Tính năng và giới hạn thực tế (v0.8.0)

**Tính năng hiện có:**
- Vẽ tường (wall), sàn (slab), trần (ceiling), mái (roof) với boolean CSG tự động
- Đặt cửa đi (door), cửa sổ (window) với cutout tự động qua three-bvh-csg
- Tổ chức theo tầng (level) — chế độ xem stacked/exploded/solo
- Phân vùng theo zone, đặt nội thất
- Lưu/tải dự án dưới JSON; autosave cục bộ; undo/redo 50 bước
- AI-ready: codebase TypeScript chuẩn, dễ wrap API

**Hạn chế thiết kế (không phải bug, mà là phạm vi):**

| Hạn chế | Ý nghĩa thực tế |
|---------|-----------------|
| **Chưa có IFC import/export native** | Không trao đổi trực tiếp với hệ sinh thái BIM chuyên nghiệp — khoảng cách lớn nhất [^5] |
| **Không có tọa độ địa lý** | Không định vị theo VN2000, không phù hợp hạ tầng tuyến tính |
| **Không có phân tích kết cấu/MEP** | Chỉ phù hợp thiết kế không gian, không phải tính toán kỹ thuật |
| **Chỉ 3 core contributors** | Rủi ro phụ thuộc nhân lực; 22 open issues, 24 open PRs |
| **WebGPU dependency** | Safari vẫn hạn chế; Firefox/Chrome hỗ trợ đầy đủ |

> **Nhận định:** Pascal Editor không cố thay thế Revit. Nó là **nền tảng UI/UX và rendering xuất sắc** cho giai đoạn phác thảo ý tưởng — nơi kiến trúc sư cần phản hồi 3D nhanh mà không muốn mở phần mềm 20 GB. Giá trị thực nằm ở lớp viewer và data model — cần ghép với hệ sinh thái IFC bên ngoài.

---

## 3. pyvista-cad: Lớp tương tác CAD/IFC chính thức cho Python

### 3.1. Nguồn gốc và vị trí trong hệ sinh thái

PyVista được giới thiệu lần đầu trong bài báo peer-reviewed tại *Journal of Open Source Software* (Sullivan & Kaszynski, 2019), định nghĩa là "giao diện Python cấp cao cho VTK nhằm tạo điều kiện cho prototyping nhanh, phân tích và tích hợp trực quan dữ liệu có tham chiếu không gian" [^11]. Hiện PyVista được sử dụng trong hơn 1.400 dự án mã nguồn mở, bao gồm ứng dụng địa kỹ thuật, mô phỏng kết cấu và trực quan hóa y sinh. NASA Ames Research Center trình bày ứng dụng PyVista trong CAE datasets tại hội thảo khoa học (Kaszynski, 2025) [^12].

Tuy nhiên, PyVista truyền thống **thiếu khả năng đọc các định dạng CAD công nghiệp** — một khoảng trống quan trọng khi AEC engineers muốn phân tích dữ liệu từ STEP, IFC hay IGES trong Python. **pyvista-cad** được phát triển bởi đội ngũ PyVista để lấp đầy khoảng trống này [^6].

### 3.2. Kiến trúc source tree đầy đủ

```
pyvista-cad/
├── src/pyvista_cad/                 ← Package chính
│   ├── _readers.py                  # Đăng ký reader vào pv.read()
│   ├── _writers.py                  # Writer functions
│   ├── _cad_accessor.py             # CadDataSetAccessor + CadMultiBlockAccessor
│   ├── _plotting.py                 # CAD plotter component (pl.cad)
│   ├── _brep.py                     # B-rep cache, tessellate()
│   ├── _metadata.py                 # CadMetadata, Units enum
│   ├── _formats/                    # Parser từng định dạng
│   │   ├── step.py                  # read_step / write_step (OCC)
│   │   ├── iges.py                  # read_iges (read-only)
│   │   ├── brep.py                  # read_brep / write_brep
│   │   ├── dxf.py                   # read_dxf / write_dxf (ezdxf)
│   │   ├── ifc.py                   # read_ifc với Pset/Qto (IfcOpenShell)
│   │   ├── fcstd.py                 # read_fcstd (FreeCAD engine)
│   │   └── gltf.py                  # read_gltf / write_gltf / enrich_gltf
│   └── _interop/                    # Bridge với thư viện khác
│       ├── build123d.py             # from/to_build123d
│       ├── cadquery.py              # from/to_cadquery
│       ├── topods.py                # from/to_topods (raw OCC)
│       └── gmsh.py                  # from/to_gmsh (FEA meshing)
└── examples/
    ├── 04_ifc/                      # BIM / IFC property workflows
    └── 05_workflows/                # FEA meshing, SDF, assembly
        └── cad_to_fea_tet_mesh.py   # STEP → gmsh → .vtu
```

> **Điểm kiến trúc nổi bật:** Thiết kế **không monkey-patch** — pyvista-cad đăng ký reader vào `pv.read()` và accessor `.cad` qua cơ chế extension chính thống của PyVista, đảm bảo tương thích ngược 100% khi PyVista update.

### 3.3. Kiến trúc API và Luồng dữ liệu

```
pv.read("model.step")  ─────────────────  pv.read("building.ifc")
        │                                          │
        ▼  (_readers.py routing by extension)      ▼
   read_step()                               read_ifc()
        │                                          │
        ▼                                          ▼
  pv.MultiBlock ◄───────────────────  pv.MultiBlock
  [Block 0: PolyData]                .cad → CadMultiBlockAccessor
  [Block N: PolyData]                     ├── .assembly_tree() → dict
        │                                 ├── .find(glob | ifc_type)
        ▼                                 ├── .flatten()
  PolyData.cad → CadDataSetAccessor       └── .to_step/gltf/dxf/...
        ├── Metadata: .color, .label, .units, .source_format
        ├── Topology: .has_brep_origin, .layers, .tessellation_quality
        ├── Physics:  .exact_volume(), .center_of_mass()
        ├── Refine:   .tessellate(tolerance)
        ├── Export:   .to_step/brep/dxf/3mf/gltf/build123d/gmsh
        └── Render:   .plot() → CAD-style (faces + topo B-rep edges)
```

| Accessor | Kích hoạt trên | Phương thức đặc trưng |
|---------|---------------|----------------------|
| `CadDataSetAccessor` | `pv.PolyData`, `pv.UnstructuredGrid` | `.exact_volume()`, `.tessellate()`, `.to_step()` |
| `CadMultiBlockAccessor` | `pv.MultiBlock` | `.assembly_tree()`, `.find()`, `.flatten()`, `.walk()` |

### 3.4. Ma trận định dạng CAD/BIM hỗ trợ

| Định dạng | Đọc | Ghi | B-rep Cache | Pset/Metadata | Extra cần | Ứng dụng |
|-----------|:---:|:---:|:-----------:|:-------------:|-----------|---------|
| **STEP** | ✅ | ✅ | ✅ | ✅ label | `[step]` | Định dạng pivot chính, kỹ thuật chính xác |
| **IGES** | ✅ | ❌ | ✅ | ✅ | `[iges]` | Legacy, trao đổi với CAD cũ |
| **BREP** | ✅ | ✅ | ✅ | ✅ | `[step]` | OpenCASCADE native |
| **DXF** | ✅ | ✅ | ❌ | ✅ layer | base | Bản vẽ 2D/3D từ AutoCAD/Civil 3D |
| **IFC** | ✅ | ❌ | ❌ | ✅ **Pset/Qto** | `[ifc]` | BIM theo ISO 19650 |
| **FCStd** | ✅ | ❌ | ✅ | ✅ | `[step]` | FreeCAD native |
| **glTF** | ✅ | ✅ | ❌ | ✅ | base | Web viewer, Navisworks |
| **3MF** | ✅ | ✅ | ❌ | ✅ units | `[3mf]` | In 3D, đúc |

### 3.5. Tính năng cốt lõi — B-rep rendering và tính toán chính xác

**B-rep topology rendering** là điểm phân biệt cơ bản với các thư viện đọc CAD thông thường:

```python
import pyvista as pv
import pyvista_cad

assembly = pv.read("cong_hop_btct.step")

# ❌ Sai — hiện TOÀN BỘ cạnh tam giác (nhiễu lưới mesh)
assembly.plot(show_edges=True)

# ✅ Đúng — chỉ hiện cạnh tô-pô B-rep (kết quả CAD thực thụ)
assembly.cad.plot(
    color="silver",
    edge_color="black",
    line_width=2.0,
)
```

Render CAD-style hoạt động bằng cách tính **analytic surface normals** từ B-rep thay vì pháp tuyến trung bình tam giác, phục hồi **topological edges** từ B-rep cache, và ẩn triangle edges — loại bỏ "mesh noise".

**Tính khối lượng chính xác từ B-rep** — quan trọng cho dự toán hạ tầng:

```python
# .exact_volume() → tính từ B-rep analytic, không phải mesh xấp xỉ
vol  = part.cad.exact_volume()     # m³, sai số lý thuyết = 0
com  = part.cad.center_of_mass()   # trọng tâm [x, y, z]

# So sánh: mesh xấp xỉ có thể sai 2-5% với mô hình phức tạp
vol_approx = float(part.volume)
print(f"B-rep exact: {vol:.6f} m³  |  Mesh approx: {vol_approx:.6f} m³")
```

> **Lưu ý quan trọng cho dự toán:** Trong hồ sơ dự toán công trình thủy lợi, sai số 2-5% thể tích trên khối BTCT lớn (hàng nghìn m³) dẫn đến sai lệch chi phí đáng kể. `.cad.exact_volume()` là công cụ đúng cho mục đích này [^6].

**Assembly Tree Traversal và IFC Filtering:**

```python
# STEP Assembly — tìm cấu kiện theo tên
assembly = pv.read("cong_thoat_nuoc_assembly.step")
print(assembly.cad.assembly_tree())
# → {'CongHop': {'ThanNgoai': {...}, 'ThanTrong': {...}}, 'BeTieuNang': {...}}

parts = assembly.cad.find("*ThanNgoai*")   # glob pattern
path, part = parts[0]

# IFC BIM — lọc theo loại IFC entity và đọc Property Sets
building = pv.read("tram_bom.ifc")
pipes    = building.cad.find(ifc_type="IfcPipeSegment")
pumps    = building.cad.find(ifc_type="IfcPump")

import json
for path, block in pipes:
    psets = json.loads(block.field_data["cad.psets"][0])
    dn  = psets.get("Pset_PipeSegmentTypeCommon", {}).get("NominalDiameter")
    mat = psets.get("Pset_MaterialConcrete", {}).get("Grade")
```

**FEA Bridge — từ STEP đến solver phần tử hữu hạn:**

```python
import gmsh, pyvista_cad

gmsh.initialize()
gmsh.model.occ.importShapes("dap_tran.step")
gmsh.model.occ.synchronize()
gmsh.option.setNumber("Mesh.MeshSizeMax", 0.5)   # 0.5m
gmsh.option.setNumber("Mesh.Algorithm3D", 1)      # Delaunay 3D
gmsh.model.mesh.generate(3)

grid = pyvista_cad.from_gmsh()                    # → pv.UnstructuredGrid
gmsh.finalize()

tets = grid.extract_cells(grid.celltypes == 10)   # VTK_TETRA
tets.save("dap_tran_fea.vtu")                     # → ANSYS / OpenFOAM / Abaqus
```

---

## 4. Tiếp cận bổ trợ: Hai công cụ, hai vùng khác nhau

### 4.1. Bảng so sánh toàn diện

| Tiêu chí | pyvista-cad | pascalorg/editor |
|----------|:-----------:|:----------------:|
| **Mục đích chính** | Đọc/phân tích/render CAD/BIM file | Thiết kế kiến trúc 3D tương tác trên web |
| **Ngôn ngữ** | Python | TypeScript |
| **Môi trường** | Server / Notebook / Script | Trình duyệt |
| **Stars / Forks** | 15 / 3 (rất mới, v0.1.0.dev) | 16.1k / 2.1k |
| **Đọc STEP/IFC/DXF** | ✅ B-rep + Pset | ❌ |
| **Ghi STEP/glTF** | ✅ | ✅ glTF, JSON |
| **B-rep topology** | ✅ | ❌ |
| **Tính khối lượng chính xác** | ✅ analytic | ❌ mesh approx |
| **Real-time 3D editor** | ❌ | ✅ |
| **Undo/Redo** | ❌ | ✅ (50 steps) |
| **Collaboration/Share link** | ❌ | ✅ |
| **FEA mesh (gmsh)** | ✅ | ❌ |
| **IFC Pset/Qto analysis** | ✅ | ❌ |
| **DXF split-by-layer** | ✅ | ❌ |
| **Python scripting/CI-CD** | ✅ | ❌ |
| **Headless render/Colab** | ✅ | ❌ |
| **Web viewer** | ❌ (cần export glTF) | ✅ native |
| **WebGPU** | ❌ | ✅ |

### 4.2. Vị trí trong vòng đời BIM

Hai công cụ này không cạnh tranh mà **bổ sung** nhau ở hai nút khác nhau trong workflow:

```
pascalorg/editor                          pyvista-cad
──────────────────────────────            ──────────────────────────────
Giai đoạn thiết kế sơ bộ        →        Giai đoạn phân tích kỹ thuật
• Mặt bằng phòng, zone                   • Đọc file STEP/IFC chính thức
• Phối cảnh 3D ban đầu                   • Tính khối lượng chính xác B-rep
• Chia sẻ review với stakeholder         • Phân tích IFC Pset/Qto
• Không cài đặt, mở browser là dùng     • FEA meshing pipeline
       │                                 • QA/QC tự động hóa
       │ export JSON → FreeCAD/Revit     • Bảng dự toán Excel
       ▼                                 • CI/CD validation
  FreeCAD / Revit ──────────────────────→ pipeline Python
```

Khả năng áp dụng theo loại dự án:

| Loại dự án / Nhóm | pyvista-cad | pascalorg/editor | Khuyến nghị |
|-------------------|:-----------:|:----------------:|------------|
| Kỹ sư tính toán, dự toán | 🟢 Tốt | 🔴 Không phù hợp | pyvista-cad |
| Kỹ sư BIM, phân tích IFC | 🟢 Tốt | 🔴 Không hỗ trợ | pyvista-cad |
| Kiến trúc sư, review thiết kế | 🔴 Không phù hợp | 🟢 Tốt | pascalorg/editor |
| Kỹ sư hiện trường (không cài đặt) | 🔴 Không phù hợp | 🟢 Tốt | pascalorg/editor |
| Hạ tầng thủy lợi (kênh, cống, đập) | 🟢 Tốt | 🔴 Không phù hợp | pyvista-cad |
| Nhà nghiên cứu / data science | 🟢 Tốt | 🔴 Không phù hợp | pyvista-cad |
| Sinh viên kiến trúc | 🟡 Python cần | 🟢 Dễ học | pascalorg/editor |
| Pipeline CI/CD tự động | 🟢 Tốt | 🟡 Giới hạn | pyvista-cad |
| Digital twin | 🟡 Script | 🔴 Không phù hợp | Kết hợp cả hai |

---

## 5. Ứng dụng thực tế trong dự án hạ tầng — thủy lợi Việt Nam

### 5.1. Đặc thù làm BIM thủy lợi phức tạp bội phần

Công trình thủy lợi không phải "tòa nhà nằm ngang" và cũng không phải đường giao thông đơn thuần. Một dự án hồ chứa hoàn chỉnh bao gồm nhiều hạng mục hoàn toàn khác nhau về chuyên ngành [^4]:

| Hạng mục | Chuyên ngành | Đặc điểm BIM |
|----------|-------------|-------------|
| Đập đất/đá đắp | Địa kỹ thuật, thủy văn | Geometry phức tạp, vật liệu phi tuyến |
| Đập tràn/ngưỡng tràn | Thủy lực, kết cấu | Hình dạng cong Creager, tính toán năng lượng |
| Cống lấy nước | Cơ điện, kết cấu | MEP tích hợp (van, thiết bị đóng mở) |
| Kênh chính/nhánh | Thủy văn, địa kỹ thuật | Tuyến dài, mặt cắt thay đổi dọc tuyến |
| Trạm bơm | Cơ điện, kết cấu, thủy lực | Phối hợp kiến trúc-cơ điện phức tạp |
| Cống hộp dọc kênh | Kết cấu, địa kỹ thuật | Lặp lại nhiều, tham số hóa quan trọng |

**Vòng đời dài, bảo trì mới là công việc chính:** Hồ chứa vận hành 50-100 năm. Giai đoạn thiết kế-thi công chỉ chiếm 3-5 năm đầu; BIM phải là nền tảng cho **asset management** toàn vòng đời — lưu lịch sử quan trắc thấm, chuyển vị, ghi nhận mỗi lần sửa chữa, hỗ trợ kiểm tra an toàn đập định kỳ theo Nghị định 114/2018/NĐ-CP.

### 5.2. Workflow pyvista-cad cho hạ tầng thủy lợi

**Quy trình tự động hóa hoàn chỉnh — pipeline hạ tầng:**

```python
import pyvista as pv
import pyvista_cad
import pandas as pd

# 1. Load assembly từ FreeCAD (cống thoát nước km5)
assembly = pv.read("cong_thoat_nuoc_km5.step")
print(assembly.cad.assembly_tree())

# 2. Tính bảng khối lượng tự động
rows = []
for i, block in enumerate(assembly):
    if block is None: continue
    label = block.cad.label or f"P{i}"
    vol   = block.cad.exact_volume()
    mass  = vol * 2500  # BTCT kg/m³
    rows.append({"Cấu kiện": label, "V(m³)": round(vol, 4), "M(tấn)": round(mass/1000, 3)})

df = pd.DataFrame(rows)
df.to_excel("bang_khoi_luong_km5.xlsx", index=False)

# 3. Render 4 góc nhìn (headless)
pl = pv.Plotter(shape=(2, 2), off_screen=True, window_size=[1920, 1080])
# [code render từng subplot...]
pl.save_graphic("ho_so_ky_thuat_km5.svg")

# 4. Export sang web viewer (xeokit/Navisworks)
assembly.cad.to_gltf("cong_thoat_nuoc_km5.gltf")
```

**Phân tích IFC từ Revit MEP — trạm bơm:**

```python
import pyvista as pv, pyvista_cad, json

building = pv.read("tram_bom_nuoi_trong_thuy_san.ifc")

# Lọc và phân tích hệ thống cấp thoát nước
component_types = ["IfcPipeSegment", "IfcPipeFitting", "IfcPump", "IfcValve"]
summary = {}

for ifc_type in component_types:
    found = building.cad.find(ifc_type=ifc_type)
    total_vol = sum(b.cad.exact_volume() for _, b in found if b is not None)
    summary[ifc_type] = {"count": len(found), "total_vol_m3": round(total_vol, 4)}

print(json.dumps(summary, indent=2, ensure_ascii=False))

# Render theo màu từng loại thiết bị
pl = pv.Plotter()
color_map = {"IfcPipeSegment": "steelblue", "IfcPump": "orange", "IfcValve": "red"}
for ifc_type, color in color_map.items():
    for _, block in building.cad.find(ifc_type=ifc_type):
        if block: pl.cad.add(block, color=color, opacity=0.85)
pl.show()
```

**DXF Layer Splitting — phân tích bản vẽ hồ sơ AutoCAD:**

```python
drawing = pv.read("mat_bang_cong_trinh.dxf")

# Tách theo layer
layers = drawing.cad.split_by_layer()
# layers["TIM_TUYEN"]    → đường tim tuyến
# layers["MAT_CAT"]      → mặt cắt
# layers["KY_HIEU"]      → ký hiệu

pl = pv.Plotter()
color_map = {"TIM_TUYEN": "red", "MAT_CAT": "blue", "KY_HIEU": "green"}
for layer_name, layer_mesh in layers.items():
    pl.add_mesh(layer_mesh, color=color_map.get(layer_name, "gray"), line_width=2)
pl.show()
```

### 5.3. Cống hộp tham số hóa — ứng dụng lý tưởng

Cống hộp lặp lại nhiều lần dọc kênh mương — đây là nơi **parametric BIM tiết kiệm nhiều nhất**. Kết hợp build123d và pyvista-cad:

```python
import build123d as b3d
import pyvista_cad

# Lập trình parametric → pyvista-cad (B-rep preserved)
with b3d.BuildPart() as cong:
    b3d.Box(width=2.0, length=6.0, height=1.5)          # thân ngoài
    with b3d.Locations([(0, 0, 0)]):
        b3d.Box(1.6, 6.2, 1.1, mode=b3d.Mode.SUBTRACT)  # lỗ thoát

mesh = pyvista_cad.from_build123d(cong.part)  # B-rep preserved
mesh.cad.plot()                                # CAD-style render ngay lập tức
mesh.cad.to_step("cong_hop_v2.step")          # xuất ngược lại cho Revit/Civil 3D
```

Thay đổi một thông số (chiều rộng cống) → toàn bộ cống cùng loại cập nhật tự động, kéo theo khối lượng bê tông/ván khuôn cũng cập nhật.

### 5.4. Stack kỹ thuật đầy đủ cho dự án hồ chứa

Kết hợp Pascal Editor và pyvista-cad trong kiến trúc hoàn chỉnh:

```
[Khảo sát & Địa hình]
    QGIS + OpenDroneMap (ảnh drone → DEM/DSM/orthophoto)

[Thiết kế hạng mục chính]
    FreeCAD BIM + Python macros (đập, tràn, cống hộp)
    HEC-RAS / OpenFOAM (tính toán thủy lực)

[Tích hợp & Validation]
    IfcOpenShell Python:
      - Merge IFC từ nhiều bộ môn
      - Clash detection (IfcClash)
      - pyvista-cad: phân tích geometry, tính khối lượng chính xác
      - Auto quantity takeoff → dự toán TCVN format
      - IDS validation

[Môi trường dữ liệu chung — CDE]
    OpenProject + BIMcollab (free tier) hoặc tự deploy

[Visualization & Review]
    xeokit SDK — model lớn, GIS coordinates, point cloud (LAS/LAZ)
    Pascal Editor — review nội bộ, stakeholder presentation
    pyvista-cad — headless render, báo cáo kỹ thuật tự động

[Digital Twin (vận hành)]
    IfcOpenShell API (backend) + IoT sensor + dashboard tùy chỉnh
    Viện Quy hoạch Thủy lợi VN đang triển khai thí điểm (2025) [^13]
```

---

## 6. Bối cảnh pháp lý và chiến lược cho doanh nghiệp Việt Nam

### 6.1. Khung pháp lý — Không quy định phần mềm cụ thể

**TCVN 14177-1:2024** — tương đương ISO 19650-1:2018 — không quy định phải dùng phần mềm nào [^14]. Nó quy định về **yêu cầu thông tin** (information requirements), **quy trình quản lý thông tin**, và **trạng thái container thông tin** trong CDE. Điều này có nghĩa là:

> Một file IFC được tạo bởi Bonsai + IfcOpenShell, nếu đáp ứng đầy đủ LOD/LOI theo EIR, **về mặt pháp lý tương đương** với file IFC xuất từ Revit.

Tuy nhiên, trong thực tế đấu thầu hiện tại tại Việt Nam, nhiều hồ sơ mời thầu vẫn ghi cụ thể "sử dụng Revit, Navisworks" thay vì "phần mềm tương thích ISO 19650 / TCVN 14177" — điều này là vấn đề nhận thức cần thay đổi dần.

**IFC và buildingSMART** đang được luật hóa tại nhiều quốc gia. Quyết định 258/QĐ-TTg đã đưa BIM thành bắt buộc từ 2025. Với **5.656 hồ chứa, 8.512 đập dâng, 5.194 trạm bơm** chưa có hồ sơ số hóa, câu hỏi không còn là "có nên làm không?" mà là "bắt đầu từ đâu, với công trình nào?" [^4].

### 6.2. So sánh chi phí thực tế

| Kịch bản | Chi phí hàng năm (50 users) | Kiểm soát | Rủi ro |
|---|---|---|---|
| Autodesk AEC Collection | $210,000–300,000 | Thấp (vendor lock-in) | Tăng giá, chính sách thay đổi |
| Bentley Infrastructure | $150,000–200,000 | Thấp | Như trên |
| **Open Source Stack** (FreeCAD + IfcOpenShell + Pascal Editor + pyvista-cad) | $5,000–15,000 (IT + training) | **Cao** | Technical debt, community risk |
| Hybrid (Commercial authoring + Open source viewer) | $50,000–80,000 | Trung bình | Phức tạp tích hợp |

> **Chi phí ẩn của open source cần tính đủ:** Training (~$2,000–5,000/kỹ sư), IT infrastructure ($5,000–10,000/năm), custom development ($50,000–150,000 cho 2 năm đầu). Tổng cost of ownership 3 năm đầu: **$150,000–300,000** — tương đương 1 năm Autodesk, nhưng từ năm thứ tư, chi phí giảm mạnh và bạn **sở hữu IP** [^2].

### 6.3. Hai mô hình triển khai Pascal Editor

Pascal Editor với MIT license cho phép hai chiến lược:

**Mô hình A — Self-hosted (kiểm soát hoàn toàn):**
- Deploy Pascal Editor lên server nội bộ hoặc VPS Việt Nam
- Chi phí: VPS ~$50–100/tháng, IT maintenance
- Phù hợp: Tổng công ty, PMU lớn, dự án nhà nước nhạy cảm dữ liệu

**Mô hình B — SaaS fork (thương mại hóa):**
- Fork Pascal Editor, thêm features đặc thù (hạ tầng, tiếng Việt, kết nối QLDA)
- Subscription model: ~$20–50/user/tháng
- Phù hợp: Startup BIM tech, công ty tư vấn muốn đa dạng hóa doanh thu

### 6.4. Lộ trình triển khai đề xuất — Ba giai đoạn

```
Giai đoạn 1 — Foundation (0–6 tháng)
├── Cài đặt pyvista-cad[step,ifc,3mf] + test với file STEP/IFC hiện có
├── Deploy Pascal Editor (self-hosted) để review nội bộ
├── Script Python kiểm tra clash tự động cơ bản
└── Training team: FreeCAD BIM + IfcOpenShell basics
    KPI: Xuất được 1 IFC 4.3 hoàn chỉnh, kiểm tra clash, view trên Pascal Editor

Giai đoạn 2 — Customization (6–12 tháng)
├── IFC object library: đê điều, kênh mương, cầu theo TCVN
├── Quantity takeoff tự động → xuất Excel mẫu dự toán Việt Nam
├── Thêm tiếng Việt vào Pascal Editor UI
└── AI command interface: mô tả tiếng Việt → generate geometry
    KPI: Rút ngắn 30% thời gian lập hồ sơ thiết kế cho 1 dự án pilot

Giai đoạn 3 — Scale (12–24 tháng)
├── Open source phần Việt Nam hóa (fork riêng)
├── Cộng đồng: forum, documentation tiếng Việt
├── Digital twin: liên kết IoT sensor trên công trình
└── Kết nối với hệ thống QLDA nhà nước (nếu API có sẵn)
    KPI: 50+ đơn vị sử dụng, 10+ contributors, 1 case study hạ tầng Nhà nước
```

---

## 7. Giới hạn thực tế và tín hiệu cần theo dõi

### 7.1. Những gì hệ sinh thái open source BIM chưa giải quyết tốt

| Khoảng trống | Mức độ | Giải pháp hiện tại |
|-------------|--------|-------------------|
| **Authoring tool cho hạ tầng tuyến tính** | 🔴 Cao | QGIS + FreeCAD + IfcOpenShell (workaround) |
| **Performance với model > 1GB** | 🔴 Cao | xeokit XKT cho viewer; authoring vẫn là vấn đề |
| **Collaboration real-time** | 🟡 Trung bình | Pascal Editor chưa có co-editing; Speckle bù đắp một phần |
| **Chứng nhận pháp lý phần mềm** | 🟡 Trung bình | Câu hỏi pháp lý chưa có câu trả lời từ cơ quan VN |
| **IFC write cho pyvista-cad** | 🟡 Trung bình | Dùng IfcOpenShell trực tiếp |
| **IFC export cho Pascal Editor** | 🔴 Cao | Đang thảo luận trong community (GitHub Issue #412) |

### 7.2. Tín hiệu cần theo dõi trong 12–18 tháng

- **IfcOpenShell 1.0**: Phiên bản ổn định đầu tiên đang trong quá trình phát hành — đánh dấu mốc trưởng thành của thư viện [^15]
- **Pascal Editor IFC support**: Community đang thảo luận về IFC export — nếu được thêm vào, Pascal sẽ trở thành công cụ BIM thực thụ
- **pyvista-cad stability**: Hiện ở v0.1.0.dev (11 commits, 15 stars) — API chưa stable, cần pin version cụ thể trong production
- **IFC4X3 adoption trong tool chain**: Quyết định khả năng dùng open source cho hạ tầng tuyến tính
- **AI + BIM**: MCP4IFC (arXiv:2511.05533), Bonsai BIM MCP Server đang tích hợp LLM với quy trình BIM mã nguồn mở [^16]
- **buildingSMART Forums — IFC cho thủy điện/thủy lợi**: Cộng đồng quốc tế đang thảo luận extension IFC cho ngành thủy lợi — cơ hội đóng góp từ Việt Nam [^17]

---

## Kết luận

Pascal Editor và pyvista-cad không phải "giải pháp thay thế Revit". Đó là cách đặt vấn đề sai. Câu hỏi đúng là: **trong workflow BIM thực tế của bạn, ở đâu bạn đang trả chi phí license cho chức năng bạn không cần, và ở đâu bạn đang thiếu khả năng mà mã nguồn mở có thể lấp đầy?**

**Pascal Editor** lấp đầy khoảng trống ở giai đoạn ý tưởng sơ bộ: phác thảo không gian 3D nhanh, trình bày với khách hàng, thử nghiệm phương án không cần cài đặt. Với 16.000+ star, cộng đồng đã trả lời câu hỏi về nhu cầu.

**pyvista-cad** lấp đầy khoảng trống ở lớp xử lý CAD/IFC trong Python: đọc file STEP từ nhà thầu cơ khí, kiểm tra property sets trong IFC từ đơn vị thiết kế, tính khối lượng B-rep chính xác cho dự toán, tự động hóa QA/QC mô hình, chuyển đổi sang FEA mesh — tất cả trong môi trường Python quen thuộc mà kỹ sư đã biết.

Với đặc thù Việt Nam — 5.656 hồ chứa, 8.512 đập dâng, hàng nghìn trạm bơm chưa có hồ sơ số hóa — và bối cảnh pháp lý BIM bắt buộc từ 2025, mã nguồn mở không còn là lựa chọn "rẻ hơn" mà là **chiến lược xây dựng năng lực nội sinh**. TCVN 14177:2024 không quy định phần mềm cụ thể nào — nó quy định yêu cầu thông tin và quy trình. IFC đáp ứng tiêu chuẩn đó bất kể công cụ nào tạo ra nó.

> *Phần mềm thương mại cho bạn một workflow hoàn chỉnh. Mã nguồn mở cho bạn một workflow bạn thực sự hiểu và kiểm soát. Kết hợp hai chiến lược đó mới là điểm mạnh thực sự.*

---

## Bạn đang xây dựng năng lực BIM cho dự án hạ tầng hoặc thủy lợi?

Nếu bạn đang đánh giá workflow mã nguồn mở cho dự án cụ thể, hoặc muốn tích hợp pyvista-cad vào quy trình QA/QC IFC hiện có, HydrostructAI sẵn sàng trao đổi kỹ thuật:

- Email: [ha.nguyen@hydrostructai.com](mailto:ha.nguyen@hydrostructai.com) — Mô tả ngắn bài toán và stack hiện tại của bạn
- Liên hệ: [WhatsApp](https://wa.me/84374874142) — Trao đổi trực tiếp

> Câu hỏi kỹ thuật về IFC, pyvista-cad, hay workflow BIM mã nguồn mở luôn được giải đáp miễn phí.

---

*© 2026 HydrostructAI - Tư vấn Mô hình hóa BIM, Phát triển Giải pháp Mã nguồn mở cho AEC*

---

## Tài liệu tham khảo

### Căn cứ pháp lý

- **Quyết định số 258/QĐ-TTg** ngày 17/3/2023 — Phê duyệt Lộ trình áp dụng Mô hình thông tin công trình (BIM) trong hoạt động xây dựng; áp dụng bắt buộc BIM cho công trình cấp I, cấp II từ 2023-2025.
- **Quyết định số 2500/QĐ-TTg** (2016) — Phê duyệt chương trình ứng dụng BIM trong hoạt động xây dựng. Mục tiêu tiết kiệm ≥30% chi phí chung có thể quy đổi.
- **Nghị định số 175/2024/NĐ-CP** ngày 30/12/2024 — Quy định chi tiết một số điều Luật Xây dựng về quản lý hoạt động xây dựng (thay thế Nghị định 15/2021/NĐ-CP).
- **Nghị định 114/2018/NĐ-CP** — Quản lý an toàn đập, hồ chứa nước (yêu cầu kiểm tra định kỳ).

### Tiêu chuẩn kỹ thuật

- **TCVN 14177-1:2024** — Quản lý thông tin sử dụng BIM - Phần 1: Khái niệm và nguyên tắc *(biên soạn trên cơ sở ISO 19650-1:2018)*.
- **TCVN 14177-2:2024** — Quản lý thông tin sử dụng BIM - Phần 2: Giai đoạn chuyển giao tài sản *(biên soạn trên cơ sở ISO 19650-2:2018)*.
- **ISO 19650-4:2022** — Information exchange; tích hợp IFC4X3 cho hạ tầng tuyến tính.
- **IFC 4.3 Add2** — buildingSMART International; hỗ trợ `IfcAlignment`, `IfcBridge`, `IfcRoad`, TIN surface.

### Nguồn mã nguồn mở & Dự án

- **pascalorg/editor** — [github.com/pascalorg/editor](https://github.com/pascalorg/editor). MIT License. React Three Fiber + WebGPU 3D building editor, v0.8.0 (10/5/2026). 16.1k stars, 2.1k forks, 847 commits. Aymeric Rabot, Wassim Samad, Sudhir.
- **pyvista/pyvista-cad** — [github.com/pyvista/pyvista-cad](https://github.com/pyvista/pyvista-cad). MIT License. "The canonical CAD interop and plotting layer for PyVista." v0.1.0.dev1+g6022601d7. Hỗ trợ STEP, IFC+Pset, DXF, IGES, BREP, FCStd, glTF.
- **IfcOpenShell** — [ifcopenshell.org](https://ifcopenshell.org). LGPL v3. C++/Python IFC developer library, hỗ trợ IFC2x3, IFC4 Add2, IFC4x3 Add2. Bao gồm Bonsai, IfcConvert, IfcClash, IfcCSV, IfcDiff.
- **FreeCAD BIM Workbench** — [freecad.org](https://www.freecad.org). LGPL v2. NativeIFC module (lưu trực tiếp file IFC làm native format).
- **xeokit SDK** — [xeokit.io](https://xeokit.io). Open source. BIM+AEC visualization, double-precision coordinates, LAS/LAZ point cloud, BCF support.
- **Speckle** — [speckle.systems](https://speckle.systems). Apache 2.0. AEC data platform, kết nối Revit, Civil 3D, Rhino, Tekla, FreeCAD.
- **mac999 / BIM_LLM_code_agent** — [github.com/mac999/BIM_LLM_code_agent](https://github.com/mac999/BIM_LLM_code_agent). AI-BIM code agent tích hợp pyvista + ifcopenshell + langchain (2024–2025).

### Tài liệu kỹ thuật & Nghiên cứu

- **Sullivan, C. B., & Kaszynski, A. A. (2019).** *PyVista: 3D plotting and mesh analysis through a streamlined interface for the Visualization Toolkit (VTK).* Journal of Open Source Software, 4(37), 1450. https://doi.org/10.21105/joss.01450
- **Kaszynski, A. (2025, March 20).** *PyVista for CAE Datasets: Streamlining 3D Visualization and Analysis.* NASA Advanced Modeling and Simulation Seminar Series. https://www.nas.nasa.gov/pubs/ams/2025/03-20-25.html
- **Kaszynski, A. (PhD thesis).** *PyVista: Managing & Visualizing Geospatial Data Using an Open-Source Framework.* Colorado School of Mines.
- **buildingSMART International (2025).** *Global openBIM Mandates 2025 Edition.* https://www.buildingsmart.org/wp-content/uploads/2025/03/IFC-Mandate_2025.pdf
- **buildingSMART Forums (2024).** *Extension of IFC data schema in the Hydropower Industry.* https://forums.buildingsmart.org/t/extension-of-ifc-data-schema-in-the-hydropower-industry/5383
- **Viện Quy hoạch Thủy lợi Việt Nam (2025).** *Hội thảo ứng dụng công nghệ Digital Twin và AI trong lĩnh vực tài nguyên nước và an toàn hồ đập.* https://iwrp.gov.vn/d2094/hoi-thao-ung-dung-cong-nghe-digital-twin-va-ai-trong-linh-vuc-tai-nguyen-nuoc-va-an-toan-ho-dap.html
- **Bentley Blog (2023).** *Application of BIM Technology in the Dongtaizi Reservoir Project.* https://blog.bentley.com/software/success-story-liaoning-water-conservancy-and-hydropower-survey-and-design-application-of-bim-technology-in-the-dongtaizi-reservoir-project/
- **arXiv:2511.05533 (2025).** *MCP4IFC: IFC-Based Building Design using Large Language Models.*
- **CIFE Stanford (2024).** *Critical Success Factors and Guideline for openBIM and VDC on Infrastructure Projects.* https://cife.stanford.edu/critical-success-factors-and-guideline-openbim-and-vdc-infrastructure-projects
- **AlterSquare (2024).** *Open-Source BIM Stack Blueprint: FreeCAD, IFC.js, and WebGL for Your Next Construction SaaS.* Medium.
- **Ondsel (2024).** *Autodesk's way of handling the IFC standard is helping nobody.* https://www.ondsel.com/blog/native-ifc/
- **Eastman, C., Teicholz, P., Sacks, R., & Liston, K. (2018).** *BIM Handbook: A Guide to Building Information Modeling (3rd ed.).* Wiley.

---

## Danh mục chú thích

[^1]: Autodesk Official Pricing (2026). AEC Collection subscription — Individual user, annual plan. Giá tham khảo theo khu vực Đông Nam Á qua đại lý được ủy quyền.

[^2]: GXD Team (2026). *Phân tích chi phí open source BIM vs commercial cho đơn vị tư vấn Việt Nam.* Tổng hợp từ báo cáo nội bộ và so sánh thị trường. Chi phí IT, training và custom development tham chiếu theo thực tế ngành.

[^3]: Quyết định số 258/QĐ-TTg ngày 17/3/2023 của Thủ tướng Chính phủ — Phê duyệt Lộ trình áp dụng Mô hình thông tin công trình (BIM) trong hoạt động xây dựng. Vietnam.vn. https://www.vietnam.vn/en/ung-dung-bim-thuc-day-chuyen-doi-so-nganh-xay-dung

[^4]: Viện Quy hoạch Thủy lợi Việt Nam (2025). *Số liệu thống kê công trình thủy lợi Việt Nam.* Tham chiếu: Hội thảo Digital Twin và AI trong tài nguyên nước. https://iwrp.gov.vn/d2094/hoi-thao-ung-dung-cong-nghe-digital-twin-va-ai-trong-linh-vuc-tai-nguyen-nuoc-va-an-toan-ho-dap.html

[^5]: Aymericr & wass08. (2026). *pascalorg/editor: Create and share 3D architectural projects.* GitHub, v0.8.0 (10/5/2026). https://github.com/pascalorg/editor. Repository statistics: 16.1k stars, 2.1k forks, 847 commits.

[^6]: PyVista Developers. (2026). *pyvista-cad: The canonical CAD interop and plotting layer for PyVista.* GitHub, v0.1.0.dev1+g6022601d7. https://github.com/pyvista/pyvista-cad. API Reference: https://cad.pyvista.org/

[^7]: buildingSMART International. *What is IFC?* buildingsmart.org — "IFC is a standardized, digital description of the built environment."

[^8]: buildingSMART International (2022). *IFC 4.3 Add2 — Specification for Infrastructure.* Bao gồm IfcAlignment, IfcBridge, IfcRoad, TIN surface. AASHTO adoption (2023).

[^9]: buildingSMART International (2025). *Global openBIM Mandates 2025 Edition.* https://www.buildingsmart.org/wp-content/uploads/2025/03/IFC-Mandate_2025.pdf

[^10]: Progressive Robot. (2026, April 17). *Pascal Editor: Free Open-Source 3D Building Editor.* Pascal Editor architecture: WebGPU command buffers, instanced rendering, 60 FPS at 1M+ polygons.

[^11]: Sullivan, C. B., & Kaszynski, A. A. (2019). *PyVista: 3D plotting and mesh analysis through a streamlined interface for the Visualization Toolkit (VTK).* Journal of Open Source Software, 4(37), 1450. https://doi.org/10.21105/joss.01450

[^12]: Kaszynski, A. (2025, March 20). *PyVista for CAE Datasets: Streamlining 3D Visualization and Analysis.* NASA Advanced Modeling and Simulation Seminar Series. https://www.nas.nasa.gov/pubs/ams/2025/03-20-25.html

[^13]: Viện Quy hoạch Thủy lợi Việt Nam (2025). *Ứng dụng công nghệ Digital Twin — Giám sát an toàn hồ đập.* Chương trình thí điểm 2025. https://iwrp.gov.vn

[^14]: TCVN 14177-1:2024 — Mục về tính không phụ thuộc phần mềm và yêu cầu thông tin (Information Requirements). Tương đương ISO 19650-1:2018.

[^15]: IfcOpenShell Open Collective (2026). *Project roadmap and release status — IfcOpenShell 1.0.* https://opencollective.com/opensourcebim

[^16]: arXiv:2511.05533 (2025). *MCP4IFC: IFC-Based Building Design using Large Language Models.* AI-native BIM workflows tích hợp LLM.

[^17]: buildingSMART Forums (2024). *Extension of IFC data schema in the Hydropower Industry.* https://forums.buildingsmart.org/t/extension-of-ifc-data-schema-in-the-hydropower-industry/5383

---
