---
layout: single
title: "Quy hoạch tuyến công trình dựa trên địa hình với thuật toán Hybrid A*"
author_profile: true
author_name: "HST.AI"
date: 2025-12-09 08:30:00 +0700
featured: false
toc: true
toc_sticky: true
toc_label: "Mục lục"
permalink: "/posts/terrain-aware-pathfinding/"
categories:
  - Algorithms
  - Hydraulic-Engineering
  - Python
tags:
  [
    "Hybrid A*",
    "Quy hoạch tuyến",
    "Mô hình số độ cao",
    DEM,
    "Thuật toán tối ưu",
    "Thoát nước đô thị",
    "Revit API",
    BIM,
    "Kỹ thuật hạ tầng",
    Python,
    "Kỹ thuật tính toán"
  ]
excerpt: "Bài toán quy hoạch tuyến cống thoát nước không phải là tìm đường ngắn nhất mà là tìm đường có chi phí đào đắp thấp nhất, đảm bảo dòng tự chảy và tương thích với địa hình. Bài viết trình bày thuật toán Hybrid A* với hàm chi phí tích hợp dữ liệu DEM và ràng buộc thủy lực, cùng ví dụ cài đặt bằng Python và tích hợp Revit API."
header:
  overlay_color: "#f1f5f9"
  overlay_filter: "linear-gradient(135deg, rgba(27, 38, 59, 0.95), rgba(65, 90, 119, 0.8))"
  caption: "© HST - Tư vấn & Quản lý dự án"
---

Trong thiết kế mạng lưới thoát nước và hạ tầng kỹ thuật ngầm, bài toán quy hoạch tuyến phức tạp hơn nhiều so với tìm đường ngắn nhất thông thường. Người kỹ sư phải cân bằng đồng thời giữa chiều dài tuyến, chi phí đào đắp phụ thuộc vào địa hình thực tế, và các ràng buộc thủy lực để đảm bảo dòng tự chảy. Bài viết trình bày cách định dạng bài toán này thành bài toán tối ưu và giải bằng thuật toán Hybrid A* tích hợp dữ liệu mô hình số độ cao (DEM).

## Đặt vấn đề

Bài toán quy hoạch tuyến cống thoát nước khác hoàn toàn với bài toán tìm đường ngắn nhất trên đồ thị phẳng. Trên mặt phẳng 2D, khoảng cách Euclidean là tiêu chí duy nhất. Trong thực tế hạ tầng, phải xử lý đồng thời ba nhóm điều kiện:

- Điều kiện hình học: độ dốc tuyến phải nằm trong dải cho phép $$[i_{\min},\, i_{\max}]$$ theo yêu cầu thủy lực và thi công
- Điều kiện thủy lực: hướng dòng chảy phải đảm bảo tự chảy ($$z_{\text{upstream}} > z_{\text{downstream}}$$)
- Điều kiện kinh tế: tối ưu hóa cao độ đặt ống để giảm thiểu khối lượng đào đắp

Thách thức này xuất hiện trong nhiều bài toán thực tế: quy hoạch tuyến cống thoát nước mưa trên địa hình đồi dốc, thiết kế tuyến kênh tưới tiêu có cao độ thay đổi, lựa chọn tuyến đường ống ngầm qua vùng đất phức tạp, hay quy hoạch tuyến đường giao thông nội đồng với giới hạn độ dốc nghiêm ngặt.

Thuật toán tìm đường thông thường như Dijkstra hay A* tiêu chuẩn không phù hợp vì chúng tối ưu hóa một chiều chi phí duy nhất và không xử lý được ràng buộc vật lý liên tục [^1].

![Quy hoạch tuyến hạ tầng dựa trên mô hình số độ cao](/assets/images/posts/terrain-aware-pathfinding/terrain-planning-cover.jpg)
*Mô hình DEM 3D với tuyến tối ưu qua địa hình phức tạp (Kangneoung et al, 2024)*

## Mô hình số độ cao

Mô hình số độ cao (Digital Elevation Model, DEM) là cơ sở dữ liệu địa hình dạng raster, trong đó mỗi ô lưới lưu trữ giá trị cao độ bề mặt đất tại vị trí tương ứng. Độ phân giải của DEM quyết định trực tiếp mức độ chính xác của bài toán quy hoạch tuyến.

| Nguồn | Độ phân giải | Phạm vi | Sai số điển hình |
|---|---|---|---|
| SRTM (NASA/USGS) | 30m | Toàn cầu | ±5–16m chiều đứng |
| ASTER GDEM v3 | 30m | Toàn cầu | ±8–17m chiều đứng |
| ALOS World 3D | 5m | Toàn cầu | ±5m chiều đứng |
| LiDAR khảo sát | 0,1–1m | Khu vực | ±0,05–0,2m |
| Cục Đo đạc Bản đồ Việt Nam | 5–25m | Việt Nam | Theo từng khu vực |

Đối với bài toán quy hoạch tuyến cống có yêu cầu chính xác kỹ thuật, LiDAR khảo sát thực địa là lựa chọn phù hợp nhất. DEM vệ tinh (SRTM, ASTER) thích hợp cho giai đoạn nghiên cứu khả thi hoặc phạm vi khảo sát rộng [^2].

Trong Python, thư viện `rasterio` là công cụ tiêu chuẩn để đọc và xử lý dữ liệu DEM định dạng GeoTIFF:

```python
import rasterio
import numpy as np

def load_dem(filepath: str) -> tuple:
    """Đọc DEM từ GeoTIFF, trả về mảng cao độ và biến đổi tọa độ."""
    with rasterio.open(filepath) as src:
        dem_array = src.read(1).astype(np.float32)
        transform = src.transform
        crs = src.crs
    return dem_array, transform, crs

def get_elevation(dem: np.ndarray, transform, x: float, y: float) -> float:
    """Lấy cao độ tại tọa độ địa lý (x, y) bằng nội suy lưới."""
    col, row = ~transform * (x, y)
    col, row = int(col), int(row)
    if 0 <= row < dem.shape[0] and 0 <= col < dem.shape[1]:
        return float(dem[row, col])
    return float('nan')
```

## Từ A* đến Hybrid A*

Thuật toán A* (Hart, Nilsson và Raphael, 1968) là phương pháp tìm đường tối ưu trên đồ thị có trọng số, kết hợp chi phí đã đi $g(n)$ với ước lượng heuristic $h(n)$ để hướng tìm kiếm về phía đích [^3]:

$$f(n) = g(n) + h(n)$$

Điều kiện để A* đảm bảo tìm ra đường tối ưu: hàm heuristic $h(n)$ phải không vượt quá chi phí thực (admissible). Khoảng cách Euclidean đến đích thỏa mãn điều kiện này với mọi hàm chi phí dương.

A* tiêu chuẩn hoạt động trên lưới rời rạc — mỗi nút tương ứng với một ô lưới và chỉ chuyển sang các nút kề (4 hoặc 8 hướng). Giới hạn này tạo ra tuyến đường gấp khúc theo ô lưới, không phù hợp với thiết kế kỹ thuật.

Hybrid A* [^4] mở rộng A* sang không gian trạng thái liên tục. Thay vì snap vào lưới, các trạng thái được lưu trong không gian $(x, y, \theta)$ với $\theta$ là góc hướng. Khi mở rộng nút, thuật toán mô phỏng nhiều hướng tiến trong không gian liên tục nhưng vẫn dùng lưới rời rạc để kiểm tra trạng thái đã thăm (closed set). Kết quả là tuyến đường mượt mà, có thể điều chỉnh độ cong liên tục.

Với bài toán quy hoạch tuyến cống, trạng thái là bộ ba $$(x,\, y,\, z_{\text{invert}})$$ trong đó $$z_{\text{invert}}$$ là cao độ đáy ống tại điểm hiện tại. Không gian tìm kiếm là không gian 3D liên tục bị ràng buộc bởi các điều kiện thủy lực.

| Tiêu chí | Dijkstra | A* tiêu chuẩn | Hybrid A* |
|---|---|---|---|
| Không gian trạng thái | Rời rạc | Rời rạc | Liên tục |
| Hướng di chuyển | 4 hoặc 8 | 4 hoặc 8 | Tùy biến |
| Chất lượng tuyến | Gấp khúc theo lưới | Gấp khúc theo lưới | Mượt mà |
| Heuristic | Không | Có | Có |
| Tốc độ tìm kiếm | Chậm | Nhanh | Nhanh |
| Phù hợp hạ tầng | Thấp | Trung bình | Cao |

## Hàm chi phí mở rộng

Hàm chi phí tổng hợp là thành phần cốt lõi của thuật toán, tích hợp bốn yếu tố:

$$f(n) = g(n) + h(n) + C_{\text{terrain}}(n) + C_{\text{hydraulic}}(n)$$

Trong đó:

- $$g(n)$$ — chi phí tích lũy từ điểm xuất phát đến nút hiện tại (khoảng cách Euclidean tích lũy)
- $$h(n)$$ — heuristic khoảng cách đến đích (khoảng cách Euclidean 2D, admissible)
- $$C_{\text{terrain}}(n)$$ — chi phí đào đắp, tỉ lệ với chiều sâu chôn ống vượt mức tối thiểu
- $$C_{\text{hydraulic}}(n)$$ — hình phạt vi phạm ràng buộc thủy lực

Chi phí đào đắp tính theo hàm bậc hai của độ sâu đào:

$$C_{\text{terrain}}(n) = \alpha \cdot \max\!\left(0,\; z_{\text{ground}}(n) - z_{\text{invert}}(n) - d_{\text{min}}\right)^2$$

Hàm bậc hai thay vì tuyến tính phản ánh thực tế chi phí thi công tăng nhanh theo chiều sâu đào: ở độ sâu lớn phải gia cố vách hố, thay đổi phương pháp đào và tăng chi phí an toàn lao động [^5]. Hệ số $$\alpha$$ được hiệu chỉnh theo đơn giá đào đắp của từng địa phương và loại đất.

Ràng buộc thủy lực được xử lý theo hai cơ chế:

Cơ chế cứng (node pruning): nút bị loại hoàn toàn khỏi không gian tìm kiếm nếu vi phạm điều kiện không thể thỏa mãn — đi ngược dòng hoặc độ dốc vượt giới hạn vật lý. Chi phí gán bằng vô cùng.

Cơ chế mềm (soft penalty): chi phí tăng dần và liên tục khi độ dốc tiệm cận giới hạn dưới $i_{\min}$ của khả năng tự chảy, định hướng thuật toán tìm tuyến có độ dốc an toàn hơn mà không loại bỏ hoàn toàn.

## Triển khai thuật toán

### Cấu trúc dữ liệu và hàm chi phí

```python
from dataclasses import dataclass, field
from typing import Optional
import math

@dataclass
class Node:
    x: float
    y: float
    z_invert: float      # Cao độ đáy ống (m)
    g: float = 0.0       # Chi phí tích lũy từ xuất phát
    h: float = 0.0       # Heuristic đến đích
    parent: Optional['Node'] = field(default=None, repr=False)

    @property
    def f(self) -> float:
        return self.g + self.h

    def __lt__(self, other: 'Node') -> bool:
        return self.f < other.f


def calculate_transition_cost(
    curr: Node,
    next_xy: tuple,
    dem: 'np.ndarray',
    transform,
    i_min: float = 0.003,    # Độ dốc tự chảy tối thiểu (0,3%)
    i_max: float = 0.10,     # Độ dốc tối đa cho phép (10%)
    cover_min: float = 0.5,  # Chiều sâu chôn ống tối thiểu (m)
    alpha: float = 50.0      # Hệ số phạt chi phí đào đắp
) -> tuple:
    """
    Tính chi phí chuyển trạng thái và cao độ đáy ống tại điểm tiếp theo.
    Trả về (cost, z_invert_next). cost = inf nếu vi phạm ràng buộc cứng.
    """
    nx, ny = next_xy
    dist = math.hypot(nx - curr.x, ny - curr.y)
    if dist == 0:
        return float('inf'), None

    z_ground_next = get_elevation(dem, transform, nx, ny)
    if math.isnan(z_ground_next):
        return float('inf'), None

    # Cao độ đáy ống tại điểm tiếp theo (đảm bảo chiều sâu chôn tối thiểu)
    z_invert_next = z_ground_next - cover_min

    # Độ dốc thực tế của đoạn ống
    dz = curr.z_invert - z_invert_next
    slope = dz / dist

    # Ràng buộc cứng — node pruning
    if slope < 0:         # Đi ngược dòng
        return float('inf'), None
    if slope > i_max:     # Độ dốc vượt giới hạn cho phép
        return float('inf'), None

    # Chi phí đào đắp — hàm bậc hai
    excess_depth = max(0.0, z_ground_next - z_invert_next - cover_min)
    c_terrain = alpha * excess_depth ** 2

    # Hình phạt mềm — độ dốc tiệm cận giới hạn tự chảy
    c_hydraulic = (max(0.0, i_min - slope) * 1000.0)

    return dist + c_terrain + c_hydraulic, z_invert_next
```

### Vòng lặp chính Hybrid A*

```python
import heapq

def hybrid_astar_pipe(
    start: tuple,
    goal: tuple,
    dem: 'np.ndarray',
    transform,
    step_size: float = 5.0,
    n_directions: int = 16,
    **cost_kwargs
) -> list:
    """
    Tìm tuyến cống tối ưu từ start đến goal trên địa hình DEM.
    Trả về danh sách (x, y, z_invert) hoặc [] nếu không tìm thấy.
    """
    sx, sy = start
    z0 = get_elevation(dem, transform, sx, sy) - cost_kwargs.get('cover_min', 0.5)
    start_node = Node(sx, sy, z0)
    start_node.h = math.hypot(goal[0] - sx, goal[1] - sy)

    open_list = [start_node]
    closed_set: dict = {}

    # Các hướng mở rộng phân bố đều 360°
    angles = [2 * math.pi * i / n_directions for i in range(n_directions)]

    while open_list:
        curr = heapq.heappop(open_list)

        # Kiểm tra đến đích
        if math.hypot(curr.x - goal[0], curr.y - goal[1]) < step_size:
            return _reconstruct_path(curr)

        # Discretize vị trí để kiểm tra closed set
        gx = round(curr.x / step_size)
        gy = round(curr.y / step_size)
        if closed_set.get((gx, gy), float('inf')) <= curr.g:
            continue
        closed_set[(gx, gy)] = curr.g

        # Mở rộng sang tất cả hướng
        for angle in angles:
            nx = curr.x + step_size * math.cos(angle)
            ny = curr.y + step_size * math.sin(angle)

            edge_cost, z_next = calculate_transition_cost(
                curr, (nx, ny), dem, transform, **cost_kwargs
            )
            if math.isinf(edge_cost) or z_next is None:
                continue

            next_node = Node(nx, ny, z_next)
            next_node.g = curr.g + edge_cost
            next_node.h = math.hypot(goal[0] - nx, goal[1] - ny)
            next_node.parent = curr
            heapq.heappush(open_list, next_node)

    return []


def _reconstruct_path(node: Node) -> list:
    path = []
    while node:
        path.append((node.x, node.y, node.z_invert))
        node = node.parent
    return list(reversed(path))
```

### Sử dụng và trực quan hóa kết quả

```python
import matplotlib.pyplot as plt

# Tải DEM và tìm tuyến
dem, transform, crs = load_dem("dem_project.tif")

path = hybrid_astar_pipe(
    start=(100.0, 200.0),
    goal=(850.0, 650.0),
    dem=dem,
    transform=transform,
    step_size=5.0,
    n_directions=24,
    i_min=0.003,
    i_max=0.08,
    cover_min=0.6,
    alpha=60.0
)

if path:
    xs, ys, zs = zip(*path)
    print(f"Tuyến tìm được: {len(path)} điểm, chiều dài ~{sum(math.hypot(xs[i+1]-xs[i], ys[i+1]-ys[i]) for i in range(len(xs)-1)):.1f}m")

    # Trực quan hóa cao độ đáy ống theo chiều dài tuyến
    dists = [0.0]
    for i in range(1, len(path)):
        d = math.hypot(xs[i] - xs[i-1], ys[i] - ys[i-1])
        dists.append(dists[-1] + d)

    z_ground = [get_elevation(dem, transform, x, y) for x, y in zip(xs, ys)]

    fig, ax = plt.subplots(figsize=(12, 4))
    ax.plot(dists, z_ground, 'k-', label='Cao độ mặt đất')
    ax.plot(dists, zs, 'b--', label='Cao độ đáy ống (z_invert)')
    ax.fill_between(dists, zs, z_ground, alpha=0.2, color='orange', label='Vùng đào đắp')
    ax.set_xlabel('Chiều dài tuyến (m)')
    ax.set_ylabel('Cao độ (m)')
    ax.legend()
    ax.set_title('Mặt cắt dọc tuyến cống tối ưu')
    plt.tight_layout()
    plt.savefig('long_section.png', dpi=150)
```

## Tích hợp BIM và Revit API

Sau khi thuật toán trả về danh sách tọa độ `[(x₁, y₁, z₁), (x₂, y₂, z₂), …]`, bước tiếp theo là tạo mô hình BIM từ kết quả. Revit API cung cấp đủ công cụ để tự động hóa việc tạo đường ống và cống theo từng đoạn tuyến.

```csharp
using Autodesk.Revit.DB;
using Autodesk.Revit.DB.Plumbing;
using System.Collections.Generic;

public class PipeGeneratorCommand : IExternalCommand
{
    public Result Execute(ExternalCommandData commandData,
                          ref string message, ElementSet elements)
    {
        Document doc = commandData.Application.ActiveUIDocument.Document;

        // Nhận tọa độ từ kết quả Python (qua JSON hoặc subprocess)
        List<XYZ> path = LoadPathFromJson("optimal_path.json");

        using (Transaction tx = new Transaction(doc, "Tạo tuyến cống tối ưu"))
        {
            tx.Start();

            ElementId systemTypeId = GetSystemTypeId(doc, "Stormwater");
            ElementId pipeTypeId   = GetPipeTypeId(doc, "Reinforced Concrete Pipe");
            ElementId levelId      = doc.ActiveView.GenLevel.Id;

            for (int i = 0; i < path.Count - 1; i++)
            {
                // Chuyển từ mét sang feet (đơn vị nội bộ Revit)
                XYZ p1 = ToRevitUnit(path[i]);
                XYZ p2 = ToRevitUnit(path[i + 1]);
                Pipe.Create(doc, systemTypeId, pipeTypeId, levelId, p1, p2);
            }

            tx.Commit();
        }
        return Result.Succeeded;
    }

    private static XYZ ToRevitUnit(XYZ pt) => new XYZ(
        UnitUtils.ConvertToInternalUnits(pt.X, UnitTypeId.Meters),
        UnitUtils.ConvertToInternalUnits(pt.Y, UnitTypeId.Meters),
        UnitUtils.ConvertToInternalUnits(pt.Z, UnitTypeId.Meters)
    );
}
```

Kết quả là mô hình BIM tự động với tuyến cống chạy theo địa hình thực tế và cao độ đáy ống chính xác theo tính toán tối ưu. Từ đây, kỹ sư xuất bản vẽ thi công, kiểm tra xung đột (clash detection) và tính khối lượng đào đắp trực tiếp trong Revit mà không cần nhập tọa độ thủ công [^6].

Sự kết hợp Python (thuật toán tối ưu, xử lý DEM) và C# Revit API (tạo mô hình BIM) phản ánh xu hướng tích hợp công cụ tính toán khoa học với phần mềm thiết kế trong quy trình thiết kế kỹ thuật số — nơi mỗi bước xử lý dữ liệu được tự động hóa thay vì thực hiện thủ công.

## Giới hạn và hướng mở rộng

Phương pháp trình bày có một số giới hạn cần lưu ý trước khi áp dụng thực tế.

Về độ chính xác địa hình, kết quả thuật toán phụ thuộc trực tiếp vào chất lượng DEM. Sai số cao độ ±5m từ SRTM có thể tạo ra sai lệch đáng kể trong thiết kế tuyến cống có độ dốc nhỏ (0,3–1%). Với dự án có yêu cầu kỹ thuật cao, cần kết hợp dữ liệu LiDAR khảo sát thực địa.

Về tính toán thủy lực, mô hình hiện tại chỉ kiểm tra ràng buộc độ dốc và hướng chảy. Thiết kế thực tế theo TCVN 7957:2023 còn cần tính khẩu độ cống theo lưu lượng thiết kế (phương trình Manning), kiểm tra tốc độ dòng chảy giới hạn (không lắng cặn và không xói mòn), và phân tích lưu vực thoát nước [^7].

Về tính toán đa mục tiêu, bài toán thực tế thường có nhiều mục tiêu cạnh tranh: tối thiểu chi phí đào đắp, tối thiểu chiều dài tuyến, tối thiểu số hố ga trung chuyển. Thay vì hàm chi phí đơn, các phương pháp như NSGA-II [^8] hoặc Pareto frontier có thể cung cấp cho kỹ sư một tập các phương án đánh đổi để lựa chọn theo điều kiện cụ thể của từng dự án.

## Kết luận

Quy hoạch tuyến dựa trên địa hình là minh họa rõ nét cho xu hướng kỹ thuật tính toán (Computational Engineering): bài toán thực tế — vốn đòi hỏi kinh nghiệm và trực giác chuyên môn — được định dạng thành bài toán tối ưu có thể giải bằng thuật toán. Hybrid A* với hàm chi phí tích hợp DEM và ràng buộc thủy lực cho phép kỹ sư khám phá không gian phương án nhanh hơn nhiều so với vẽ tuyến thủ công.

Điều quan trọng cần nhớ: thuật toán cung cấp phương án khởi điểm tốt, không phải giải pháp cuối cùng. Kỹ sư vẫn cần hiệu chỉnh tuyến dựa trên điều kiện thực địa, yêu cầu pháp lý theo TCVN 7957:2023 và kinh nghiệm chuyên môn tích lũy. Mã nguồn trong bài được đơn giản hóa cho mục đích minh họa; hệ thống thực tế cần bổ sung xử lý ngoại lệ, kiểm tra tính hội tụ và tinh chỉnh hệ số chi phí theo từng dự án cụ thể.

Để trao đổi về ứng dụng trong các dự án thiết kế hạ tầng cụ thể, hãy liên hệ trực tiếp:

- Liên hệ: [Zalo](https://zalo.me/84374874142) | [WhatsApp](https://wa.me/84374874142)
- Email: [ha.nguyen@hydrostructai.com](mailto:ha.nguyen@hydrostructai.com)

## Tài liệu tham khảo

[^1]: Russell, S., & Norvig, P. (2020). *Artificial Intelligence: A Modern Approach* (4th ed.), Chapter 3: Solving Problems by Searching. Pearson.

[^2]: USGS. (2019). *Shuttle Radar Topography Mission (SRTM) 1 Arc-Second Global*. U.S. Geological Survey. [https://doi.org/10.5066/F7PR7TFT](https://doi.org/10.5066/F7PR7TFT)

[^3]: Hart, P. E., Nilsson, N. J., & Raphael, B. (1968). A formal basis for the heuristic determination of minimum cost paths. *IEEE Transactions on Systems Science and Cybernetics*, 4(2), 100–107.

[^4]: Dolgov, D., Thrun, S., Montemerlo, M., & Diebel, J. (2010). Path planning for autonomous vehicles in unknown semi-structured environments. *The International Journal of Robotics Research*, 29(5), 485–501.

[^5]: Bộ Xây dựng. (2022). *Định mức dự toán xây dựng công trình — Phần công tác đào, đắp đất bằng máy* (Thông tư 12/2021/TT-BXD). Nhà xuất bản Xây dựng.

[^6]: Autodesk. (2024). *Revit API Developers Guide*. Autodesk Developer Network. [https://www.revitapidocs.com](https://www.revitapidocs.com)

[^7]: Bộ Xây dựng. (2023). *TCVN 7957:2023 — Thoát nước: Mạng lưới và công trình bên ngoài — Tiêu chuẩn thiết kế*. Ban kỹ thuật tiêu chuẩn Việt Nam.

[^8]: Deb, K., Pratap, A., Agarwal, S., & Meyarivan, T. (2002). A fast and elitist multiobjective genetic algorithm: NSGA-II. *IEEE Transactions on Evolutionary Computation*, 6(2), 182–197.

---

## Danh mục tài liệu

### Thuật toán và lý thuyết tối ưu hóa

- **Hart, P. E., Nilsson, N. J., & Raphael, B.** (1968). A formal basis for the heuristic determination of minimum cost paths. *IEEE Transactions on Systems Science and Cybernetics*, 4(2), 100–107.
- **Dijkstra, E. W.** (1959). A note on two problems in connexion with graphs. *Numerische Mathematik*, 1(1), 269–271.
- **Dolgov, D., Thrun, S., Montemerlo, M., & Diebel, J.** (2010). Path planning for autonomous vehicles in unknown semi-structured environments. *The International Journal of Robotics Research*, 29(5), 485–501.
- **Deb, K., Pratap, A., Agarwal, S., & Meyarivan, T.** (2002). A fast and elitist multiobjective genetic algorithm: NSGA-II. *IEEE Transactions on Evolutionary Computation*, 6(2), 182–197.
- **Russell, S., & Norvig, P.** (2020). *Artificial Intelligence: A Modern Approach* (4th ed.). Pearson.

### Dữ liệu địa hình và GIS

- **USGS.** (2019). *SRTM 1 Arc-Second Global*. [https://doi.org/10.5066/F7PR7TFT](https://doi.org/10.5066/F7PR7TFT)
- **Tachikawa, T., Hato, M., Kaku, M., & Iwasaki, A.** (2011). Characteristics of ASTER GDEM version 2. *IEEE IGARSS*, 3657–3660.
- **Gillies, S. et al.** (2013). Rasterio: Geospatial raster I/O for Python programmers. [https://github.com/rasterio/rasterio](https://github.com/rasterio/rasterio)

### Tiêu chuẩn kỹ thuật Việt Nam

- **Bộ Xây dựng.** (2023). *TCVN 7957:2023 — Thoát nước: Mạng lưới và công trình bên ngoài — Tiêu chuẩn thiết kế*. Ban kỹ thuật tiêu chuẩn Việt Nam.
- **Bộ Xây dựng.** (2022). *Định mức dự toán xây dựng công trình — Công tác đào, đắp đất* (Thông tư 12/2021/TT-BXD). Nhà xuất bản Xây dựng.

### Phần mềm và API

- **Autodesk.** (2024). *Revit API Developers Guide*. [https://www.revitapidocs.com](https://www.revitapidocs.com)
- **van der Walt, S., Colbert, S. C., & Varoquaux, G.** (2011). The NumPy Array: A structure for efficient numerical computation. *Computing in Science & Engineering*, 13(2), 22–30.
- **Hunter, J. D.** (2007). Matplotlib: A 2D graphics environment. *Computing in Science & Engineering*, 9(3), 90–95.
