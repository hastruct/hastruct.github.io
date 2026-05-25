---
title: "Tại sao dự án xây dựng phát hiện vấn đề quá muộn và cách EVM giải quyết điều đó"
author_profile: true
author_name: "HST.AI"
date: 2026-05-25 14:00:00 +0700
layout: single
featured: true
toc: true
toc_sticky: true
toc_label: "Mục Lục"
permalink: "/posts/quan-ly-tien-do-project/"
categories:
  - Quản lý dự án
  - Xây dựng
  - Project-Management
tags:
  [
    PMBOK,
    Earned Value Management,
    EVM,
    Quản lý tiến độ,
    Kiểm soát chi phí,
    Phần mềm quản lý dự án,
    Primavera P6,
    MS Project,
    Xây dựng Việt Nam,
    Schedule Management,
    Cost Management,
    PMU,
    Chủ đầu tư,
    Đầu tư công,
    Nghị định 175,
    Kiểm soát dự án,
    PMP,
    CPI,
    SPI,
    Baseline
  ]
excerpt: "Chậm tiến độ và vượt chi phí là hai thất bại phổ biến nhất của dự án đầu tư xây dựng tại Việt Nam. Nguyên nhân hiếm khi là thiếu công cụ; nguyên nhân thực sự là thiếu phương pháp đo lường tích hợp giữa tiến độ và chi phí theo một cơ sở tham chiếu duy nhất. PMBOK cung cấp khung tư duy đó. Bài viết này phân tích cách áp dụng khung đó vào thực tế quản lý dự án xây dựng Việt Nam, cùng tiêu chí lựa chọn phần mềm phù hợp với từng quy mô và bối cảnh pháp lý."
header:
  overlay_color: "#f1f5f9"
  overlay_filter: "linear-gradient(135deg, rgba(27, 38, 59, 0.95), rgba(65, 90, 119, 0.8))"
  caption: "© HydrostructAI - Tư vấn Quản lý Dự án Đầu tư Xây dựng"
---

## Đặt vấn đề

Báo cáo tổng hợp kết quả kiểm toán năm 2024 của Kiểm toán Nhà nước ghi nhận hàng trăm dự án đầu tư công vi phạm tiến độ hợp đồng, trong đó phần lớn kéo theo vượt tổng mức đầu tư được duyệt [^1]. Đây không phải con số bất thường của một năm; đây là xu hướng lặp lại qua nhiều chu kỳ kiểm toán liên tiếp.

Câu hỏi đặt ra không phải "tại sao dự án trễ tiến độ", câu trả lời đó thường rõ ràng: giải phóng mặt bằng chậm, thời tiết bất lợi, nhà thầu thiếu năng lực, thiết kế phải điều chỉnh. Câu hỏi thực sự là: **tại sao người ra quyết định biết quá muộn rằng dự án đang trật bánh?**

Trong nhiều trường hợp được ghi nhận, dự án đã trễ nhiều tháng nhưng báo cáo tiến độ định kỳ vẫn cho thấy "đạt kế hoạch" hoặc "chậm tiến độ nhẹ". Nguyên nhân nằm ở một vấn đề phương pháp cơ bản: tiến độ và chi phí được theo dõi riêng rẽ, trên hai hệ thống khác nhau, theo hai chu kỳ khác nhau, bởi hai bộ phận khác nhau. Không có cơ sở tham chiếu thống nhất để đánh giá xem khối lượng đã hoàn thành thực sự tương ứng với bao nhiêu phần trăm kế hoạch và tiêu tốn bao nhiêu ngân sách.

PMBOK (Cẩm nang Kiến thức Quản lý Dự án do Project Management Institute xuất bản) đề xuất một cách tiếp cận khác: tích hợp quản lý tiến độ và chi phí ngay từ giai đoạn lập kế hoạch thông qua một đường cơ sở (baseline) duy nhất, và đo lường sai lệch bằng hệ thống chỉ số có thể hành động được.

Bài viết này phân tích khung tư duy đó, cách áp dụng trong bối cảnh pháp lý đầu tư xây dựng Việt Nam, và tiêu chí lựa chọn phần mềm hỗ trợ phù hợp với từng quy mô dự án.

---

## 1. Hai lĩnh vực kiến thức cốt lõi trong PMBOK

### 1.1. Quản lý tiến độ (Schedule Management)

PMBOK phiên bản 7 (2021) tiếp cận quản lý tiến độ như một vòng lặp kiểm soát liên tục, không phải một nhiệm vụ lập kế hoạch một lần [^2]. Sáu quy trình chính của lĩnh vực này trong PMBOK 6 (được tham chiếu rộng rãi trong thực tiễn) bao gồm:

Xác định hoạt động (Define Activities): Phân rã các hoạt động (Work breakdown structure, WBS) thành các hoạt động đủ nhỏ để ước lượng và theo dõi. Đây là bước thường bị bỏ qua hoặc làm qua loa trong dự án xây dựng Việt Nam: WBS được lập theo hạng mục hợp đồng thay vì theo hoạt động có thể theo dõi tiến độ thực tế.

Sắp xếp trình tự (Sequence Activities): Xác định mối quan hệ phụ thuộc giữa các hoạt động. Trong dự án xây dựng, mối quan hệ Finish-to-Start là phổ biến, nhưng nhiều trường hợp thực tế có quan hệ Start-to-Start hoặc Finish-to-Finish cần được mô hình hóa chính xác để lịch tổng thể phản ánh đúng hiện thực thi công.

Ước lượng thời gian (Estimate Activity Durations): Dữ liệu lịch sử từ các dự án tương tự là nguồn tin cậy nhất. Trong bối cảnh thiếu cơ sở dữ liệu lịch sử có hệ thống của ngành xây dựng Việt Nam, nhiều dự án ước lượng theo kinh nghiệm cá nhân của kỹ sư lập lịch, dẫn đến sai lệch lớn.

Xây dựng lịch biểu (Develop Schedule): Kết hợp toàn bộ thông tin trên để tạo ra lịch biểu tổng thể kèm đường Găng (Critical Path). Đường Găng xác định chuỗi hoạt động quyết định thời gian hoàn thành dự án, bất kỳ sự chậm trễ nào trên chuỗi này đều làm chậm toàn bộ dự án.

Kiểm soát tiến độ (Control Schedule): Đây là quy trình thực sự tạo giá trị, nhưng cũng là quy trình bị bỏ sót nhiều nhất. Kiểm soát tiến độ không phải cập nhật tiến độ, mà là so sánh tiến độ thực tế với baseline, phân tích nguyên nhân sai lệch và ra quyết định điều chỉnh.


![Tiến độ dự án](\assets\images\posts\2026-05-26-quan-ly-tien-do-project/construction-gantt-resources-costs-150-2048x1095.jpg) *Hình minh họa tiến độ dự án. (Nguồn: projectmanager.com)

### 1.2. Quản lý chi phí (Cost Management)

Bốn quy trình trong lĩnh vực quản lý chi phí của PMBOK tạo ra một chuỗi logic từ kế hoạch đến kiểm soát [^3]:

Lập kế hoạch quản lý chi phí: Xác định đơn vị đo lường, mức độ chính xác cần thiết, và chu kỳ cập nhật chi phí, thường bị bỏ qua vì người ta cho rằng "chi phí theo dự toán là đủ".

Ước lượng chi phí: Gắn kết chi phí ước tính với từng hoạt động trong WBS, không phải với từng hạng mục hợp đồng tổng hợp. Sự khác biệt này quan trọng: chi phí theo hạng mục hợp đồng cho biết đã chi bao nhiêu tiền, nhưng không cho biết khối lượng đó có đúng kế hoạch không.

Xác định ngân sách: Tổng hợp chi phí ước tính thành đường ngân sách tổng thể (cost baseline) theo thời gian, là đường cong S (S-curve) thường thấy trong báo cáo tiến độ. Đường S này là cơ sở duy nhất để đánh giá tiến độ giải ngân thực tế.

Kiểm soát chi phí: So sánh chi phí thực tế với ngân sách theo kế hoạch, kết hợp với dữ liệu tiến độ để đánh giá hiệu quả chi tiêu: đã chi bao nhiêu, và khối lượng hoàn thành có đúng kế hoạch không.

---

## 2. Earned Value Management: Nền tảng đo lường tích hợp

### 2.1. Tại sao cần EVM

Theo dõi tiến độ và chi phí riêng rẽ tạo ra hai thước đo không thể so sánh với nhau. Ví dụ: dự án đã chi 40% ngân sách và hoàn thành 35% khối lượng. Đây là tốt hay xấu? Câu trả lời phụ thuộc vào thời điểm: nếu dự án mới ở tháng thứ hai của giai đoạn thi công kéo dài 18 tháng, con số đó có thể tốt. Nếu đã ở tháng thứ mười, đó là tín hiệu đáng lo ngại.

Earned Value Management (EVM) giải quyết bài toán này bằng cách đặt cả tiến độ và chi phí trên cùng một thước đo: giá trị tiền tệ theo kế hoạch [^4].

### 2.2. Ba chỉ số nền tảng

EVM xây dựng trên ba chỉ số gốc, được tính tại bất kỳ thời điểm nào trong vòng đời dự án:

| Chỉ số | Ký hiệu | Định nghĩa |
|--------|---------|------------|
| Planned Value | PV | Giá trị ngân sách cho khối lượng dự kiến hoàn thành đến thời điểm đo |
| Earned Value | EV | Giá trị ngân sách cho khối lượng thực tế đã hoàn thành |
| Actual Cost | AC | Chi phí thực tế đã chi cho khối lượng đã hoàn thành |

Sự khác biệt giữa PV và EV nói lên trạng thái tiến độ bằng đơn vị tiền: nếu EV < PV, dự án đang chậm tiến độ theo giá trị đã đặt kế hoạch. Sự khác biệt giữa EV và AC nói lên hiệu quả chi phí: nếu AC > EV, dự án đang tốn nhiều hơn ngân sách cho cùng khối lượng hoàn thành.

### 2.3. Sáu chỉ số phái sinh và ngưỡng hành động

Từ ba chỉ số gốc, EVM tính ra các chỉ số phái sinh có tính hành động cao. Bảng dưới đây tổng hợp sáu chỉ số quan trọng nhất kèm ngưỡng cảnh báo thực tiễn cho dự án xây dựng:

| Chỉ số | Công thức | Trạng thái tốt | Cảnh báo vàng | Cảnh báo đỏ |
|--------|-----------|---------------|--------------|-------------|
| SV: Sai lệch tiến độ | EV − PV | > 0 | -5% đến 0 | < -5% BAC |
| CV: Sai lệch chi phí | EV − AC | > 0 | -5% đến 0 | < -5% BAC |
| SPI: Hiệu suất tiến độ | EV / PV | ≥ 1,0 | 0,9 đến 1,0 | < 0,9 |
| CPI: Hiệu suất chi phí | EV / AC | ≥ 1,0 | 0,95 đến 1,0 | < 0,95 |
| EAC: Dự báo chi phí HT | BAC / CPI | ≤ BAC | BAC đến BAC×1,1 | > BAC×1,1 |
| TCPI: Chỉ số phấn đấu | (BAC−EV)/(BAC−AC) | ≤ 1,0 | 1,0 đến 1,1 | > 1,1 |

**SPI = 0,85** nghĩa là mỗi đơn vị thời gian làm việc chỉ tạo ra 85% giá trị kế hoạch, tương đương cần thêm khoảng 18% thời gian nếu giữ nguyên tốc độ.

**CPI = 0,90** nghĩa là mỗi đồng chi ra chỉ tạo ra 0,9 đồng giá trị theo kế hoạch. Khi CPI đã xuống dưới 0,95 và tiếp tục giảm, xác suất phục hồi về ≥ 1,0 trước khi kết thúc dự án rất thấp theo nghiên cứu của PMI [^4].

**TCPI** là chỉ số ít được sử dụng nhưng rất có giá trị: nó cho biết để hoàn thành phần khối lượng còn lại đúng trong ngân sách ban đầu, CPI từ giờ trở đi phải đạt bao nhiêu. TCPI > 1,1 nghĩa là mỗi đồng ngân sách còn lại phải tạo ra 1,1 đồng giá trị, và mức này trên thực tế hầu như không đạt được nếu không có can thiệp cơ cấu.

### 2.4. Dự báo chi phí cuối dự án (EAC) và ngưỡng pháp lý

Giá trị thực sự của EVM không nằm ở việc mô tả trạng thái hiện tại, mà ở khả năng dự báo kết quả cuối dự án từ dữ liệu hiện tại. Công thức phổ biến nhất:

**EAC = BAC / CPI**

Trong đó BAC (Budget at Completion) là tổng ngân sách được duyệt. Nếu CPI hiện tại là 0,88 và BAC là 200 tỷ đồng, EAC dự báo là khoảng 227 tỷ đồng, vượt 13,6% tổng mức đầu tư.

Với dự án đầu tư công tại Việt Nam, vượt quá 10% tổng mức đầu tư yêu cầu phê duyệt điều chỉnh theo Điều 62 Luật Xây dựng số 135/2025/QH15 [^5]. Nếu PMU có dự báo EAC từ sớm (ví dụ khi dự án mới đạt 30% khối lượng), quy trình điều chỉnh có thể được khởi động trước khi thực sự vượt ngưỡng, thay vì phải xử lý khủng hoảng sau khi đã vượt.

VAC (Variance at Completion = BAC − EAC): Chỉ số này cho biết dự án dự kiến sẽ tiết kiệm hay vượt chi bao nhiêu so với ngân sách được duyệt khi hoàn thành. VAC âm là tín hiệu cần chuẩn bị hồ sơ điều chỉnh tổng mức đầu tư.

### 2.5. Chu kỳ ba giai đoạn vận hành hệ thống EVM

Khung EVM là chu kỳ vận hành có cấu trúc, gồm ba giai đoạn với mục tiêu và đầu ra khác nhau:

Giai đoạn 1 (Lập kế hoạch, tuần đầu dự án): Thiết lập cấu trúc phân công công việc (WBS) đủ chi tiết để gán nguồn lực và chi phí; xây dựng bộ tài nguyên (nhân công, máy móc, vật tư) với đơn giá cụ thể; tính toán Cost Baseline (đường S-curve, cơ sở duy nhất để đánh giá giải ngân trong suốt vòng đời dự án); xác định đường Găng ban đầu.

Giai đoạn 2 (Giám sát thực hiện, hàng tuần trong thi công): Cập nhật % hoàn thành thực tế từng công tác theo phương pháp đo lường đã định nghĩa; tính BCWP (EV) và so sánh với BCWS (PV) và ACWP (AC); tính SPI, CPI, dự báo EAC; kích hoạt cảnh báo khi chỉ số vượt ngưỡng; sinh báo cáo tiến độ kèm phân tích nguyên nhân.

Giai đoạn 3 (Dự báo và kết thúc, giai đoạn cuối dự án): Phân tích xu hướng SPI/CPI xuyên suốt dự án để rút bài học; so sánh tiến độ thực tế với baseline (As-Built vs. Baseline); hoàn thiện báo cáo quyết toán với dữ liệu EVM làm cơ sở kiểm toán; lưu trữ dữ liệu năng suất thực tế làm benchmark cho dự án tương lai.

Ba giai đoạn này tương ứng với ba nhóm câu hỏi khác nhau: "Chúng ta đang đi đúng hướng không?" (Giai đoạn 2), "Chúng ta sẽ kết thúc như thế nào?" (Giai đoạn 3), và "Chúng ta có cơ sở để lập kế hoạch chính xác hơn lần sau không?" (kết quả từ Giai đoạn 3 đưa vào Giai đoạn 1 của dự án tiếp theo).

---

## 3. Khung dữ liệu nền tảng cho hệ thống quản lý tích hợp

Trước khi chọn phần mềm, cần hiểu rằng chất lượng của hệ thống EVM phụ thuộc trực tiếp vào hai cấu trúc dữ liệu nền tảng: cấu trúc phân công công việc (WBS) và bộ tài nguyên (Resource Pool). Nếu hai cấu trúc này không được thiết lập đúng, phần mềm dù tốt đến đâu cũng không tính được EV chính xác.

### 3.1. Cấu trúc WBS 4 tầng cho dự án xây dựng

WBS là xương sống của toàn bộ hệ thống. Với dự án xây dựng Việt Nam, cấu trúc 4 tầng sau đây phù hợp với cả cách tổ chức hợp đồng và yêu cầu theo dõi tiến độ chi tiết:

| Tầng | Cấp độ | Ví dụ | Chức năng |
|------|--------|-------|----------|
| Tầng 1 | Dự án | Dự án cầu vượt sông X | Tổng hợp toàn bộ |
| Tầng 2 | Giai đoạn / Gói thầu | Gói thầu xây lắp chính | Theo dõi theo hợp đồng |
| Tầng 3 | Hạng mục công trình | Phần móng, Phần thân, MEP | Theo dõi kỹ thuật |
| Tầng 4 | Công tác / Bước công việc | Đào đất, Đổ bê tông lót, Lắp thép | Gán nguồn lực và chi phí |

Tầng 4 là cấp duy nhất có thể gán trực tiếp nhân công, máy móc và vật tư, và đây là nơi EV được tạo ra. Tầng 1, 2, 3 là cấp tổng hợp (Summary Task), giá trị của chúng được tính tự động từ tầng 4 lên.

Mỗi tầng 4 cần được gắn với: thời gian bắt đầu và kết thúc, danh sách tài nguyên được gán, phương pháp đo lường % hoàn thành, và một cột mốc (Milestone) khi hoàn thành nghiệm thu. Milestone là điểm kiểm soát trong lịch biểu, không có thời lượng nhưng là ranh giới rõ ràng giữa "đang làm" và "đã xong được xác nhận".

### 3.2. Bộ tài nguyên (Resource Pool) cho xây dựng Việt Nam

Resource Pool trong hệ thống quản lý dự án xây dựng cần phân thành ba nhóm rõ ràng:

Nhóm nhân công (Work Resources): Kỹ sư công trường, chỉ huy trưởng, giám sát hiện trường, thợ bê tông, thợ sắt, thợ nề, thợ ván khuôn, an toàn viên. Đơn giá tính theo giờ, phân biệt giờ thường và giờ tăng ca. Lịch làm việc theo lịch công trường thực tế: Thứ 2 đến Thứ 7, hai buổi sáng chiều, không áp dụng lịch tiêu chuẩn văn phòng.

Nhóm máy móc thiết bị (cũng là Work Resources nhưng tính chi phí khác): Máy đào, xe bơm bê tông, cần trục tháp, xe tải, máy đầm. Đơn giá có thể phân tách thành: đơn giá theo giờ vận hành (hourly rate) và chi phí cố định mỗi lần huy động (cost per use). Bơm bê tông ví dụ có chi phí huy động xe tương đối cao cố định mỗi lần, không phụ thuộc số giờ bơm.

Nhóm vật liệu (Material Resources): Bê tông thương phẩm (m³), thép (tấn), gạch (viên), xi măng (kg), cát (m³), ván khuôn (m²). Đơn giá theo đơn vị vật liệu, không phải theo giờ. Chi phí vật liệu được ghi nhận (Accrue) tại thời điểm bắt đầu sử dụng (Start) không phải phân bổ theo thời gian.

Khi Resource Pool được xây dựng đúng, phần mềm có thể tính tự động: tổng chi phí nhân công của từng công tác, chi phí máy móc theo ca, chi phí vật liệu theo khối lượng thực tế, rồi tổng hợp lên thành Cost Baseline cho toàn dự án. Đây là cơ sở để tính AC thực tế và so sánh với EV.

---

## 4. Phân loại phần mềm theo chức năng và quy mô

### 4.1. Nhóm phần mềm lập lịch và đường Găng

Nhóm này tập trung vào xây dựng và theo dõi lịch biểu dự án, mô hình hóa đường Găng và quản lý nguồn lực. Đây là nền tảng kỹ thuật của bất kỳ hệ thống quản lý tiến độ nghiêm túc nào.

Đặc trưng của nhóm này là khả năng mô hình hóa quan hệ phụ thuộc phức tạp giữa hàng trăm đến hàng nghìn hoạt động, tính toán đường Găng tự động, và phân tích tác động khi một hoạt động bị trễ lên toàn bộ lịch biểu. Đây là công cụ cần thiết cho kỹ sư lập lịch và phụ trách tiến độ cấp công trường.

Hạn chế của nhóm này: chúng thường không tích hợp sẵn với quản lý chi phí ở mức độ đủ chi tiết, và đường Găng chỉ có giá trị nếu dữ liệu thực tế được cập nhật nghiêm túc theo chu kỳ.

### 4.2. Nhóm phần mềm quản lý chi phí và dự toán

Nhóm này bao gồm các công cụ lập dự toán, kiểm soát chi phí theo hạng mục, và theo dõi giải ngân. Trong bối cảnh Việt Nam, nhiều dự án đầu tư công vẫn sử dụng phần mềm dự toán chuyên dụng cho thị trường nội địa để đảm bảo tuân thủ định mức xây dựng do Bộ Xây dựng ban hành [^6].

Điểm yếu cơ bản của nhóm này: chi phí được gắn với hạng mục dự toán, không phải với hoạt động tiến độ. Do đó, không thể tính toán EV hay phân tích SPI/CPI trực tiếp từ hệ thống chi phí đơn thuần.

### 4.3. Nhóm nền tảng quản lý dự án tích hợp

Đây là nhóm có khả năng kết hợp tiến độ, chi phí, tài liệu và truyền thông trên một nền tảng duy nhất, đáp ứng triết lý tích hợp của PMBOK. Ưu điểm lớn nhất là khả năng tính toán EV và các chỉ số EVM từ dữ liệu tiến độ và chi phí cập nhật theo thời gian thực hoặc theo chu kỳ.

Tuy nhiên, độ phức tạp triển khai và chi phí bản quyền của nhóm này cao hơn đáng kể so với hai nhóm trước. Chi phí triển khai và đào tạo thường chiếm phần lớn tổng đầu tư, và quy trình làm việc phải được chuẩn hóa đầy đủ trước khi phần mềm mang lại giá trị thực sự.

### 4.4. Nhóm công cụ dashboard và báo cáo

Nhóm này không thay thế phần mềm quản lý tiến độ hay chi phí, mà hoạt động như lớp trình bày tổng hợp phục vụ cấp ra quyết định. Khi được kết nối với nguồn dữ liệu từ hai nhóm trên, chúng cho phép xây dựng các dashboard EVM tự động cập nhật và biểu đồ S-curve theo thời gian thực.

Giá trị của nhóm này phụ thuộc hoàn toàn vào chất lượng dữ liệu nguồn. Một dashboard đẹp kết nối với dữ liệu không chính xác còn nguy hiểm hơn không có dashboard, vì nó tạo ra ảo giác kiểm soát.

### 4.5. Lựa chọn theo quy mô dự án

| Quy mô dự án | Cấu hình đề xuất | Lý do |
|-------------|-----------------|-------|
| Dưới 50 tỷ đồng, 1 đến 2 gói thầu | Phần mềm lập lịch đơn + Excel EVM | Đủ dùng, chi phí thấp, đội ngũ nhỏ |
| 50 đến 300 tỷ đồng, 3 đến 8 gói thầu | Phần mềm lập lịch chuyên dụng + phần mềm chi phí nội địa + dashboard BI | Đáp ứng yêu cầu pháp lý + đủ năng lực phân tích |
| 300 đến 1.000 tỷ đồng, nhiều gói thầu | Nền tảng tích hợp hoặc tổ hợp kết nối dữ liệu | Đủ khả năng kết hợp EVM đa gói thầu |
| Trên 1.000 tỷ đồng, PMU chuyên trách | Nền tảng PMIS chuyên dụng theo chuẩn EVM | Yêu cầu báo cáo EVM cho nhà tài trợ, cơ quan kiểm toán |

---

## 5. Tiêu chí lựa chọn phù hợp với bối cảnh Việt Nam

### 5.1. Tuân thủ yêu cầu báo cáo pháp lý

Nghị định 175/2024/NĐ-CP quy định chủ đầu tư và Ban quản lý dự án phải lập báo cáo giám sát, đánh giá đầu tư theo chu kỳ và nộp cho cơ quan có thẩm quyền [^7]. Phần mềm được lựa chọn phải hỗ trợ xuất dữ liệu phù hợp với định dạng báo cáo theo quy định này, không phải chỉ xuất báo cáo theo chuẩn quốc tế.

Tương tự, hồ sơ thanh toán khối lượng theo Nghị định 175/2024/NĐ-CP yêu cầu biên bản nghiệm thu và xác nhận khối lượng theo từng hạng mục dự toán được duyệt. Nếu hệ thống phần mềm theo dõi chi phí theo cấu trúc hoạt động khác với cấu trúc dự toán, cần có cơ chế ánh xạ (mapping) để đảm bảo tính nhất quán.

### 5.2. Khả năng hỗ trợ ngôn ngữ và tài liệu tiếng Việt

Phần mềm không có tài liệu hướng dẫn tiếng Việt hoặc cộng đồng người dùng Việt Nam đủ lớn sẽ tạo ra rào cản đào tạo đáng kể, đặc biệt với nhân sự mới của PMU. Chi phí đào tạo thực tế thường cao hơn nhiều so với ước tính ban đầu khi phần mềm hoàn toàn bằng tiếng Anh và cộng đồng hỗ trợ không có tài liệu tham khảo nội địa.

### 5.3. Mô hình giấy phép và chi phí tổng sở hữu

Chi phí bản quyền phần mềm thường chiếm phần nhỏ trong tổng chi phí thực sự của việc triển khai. Ba khoản chi phí thường bị đánh giá thấp: chi phí tùy chỉnh để phù hợp với quy trình nội bộ, chi phí đào tạo đội ngũ ban đầu và đào tạo lại khi nhân sự thay đổi, và chi phí quản trị hệ thống dữ liệu theo thời gian.

Đối với dự án đầu tư công, cần xem xét thêm việc chi phí phần mềm có nằm trong cơ cấu chi phí tư vấn quản lý dự án hay phải được phê duyệt riêng như một khoản mục trong dự toán.

### 5.4. Khả năng mở rộng và tích hợp

Phần mềm được chọn cần có khả năng tích hợp với các công cụ đang sử dụng trong tổ chức, đặc biệt là phần mềm dự toán chi phí theo định mức Bộ Xây dựng. Dữ liệu chi phí không thể nhập tay từ hệ thống này sang hệ thống khác mà không mất thời gian và giảm độ chính xác.

---

## 6. Năm thách thức triển khai phổ biến và cách vượt qua

### 6.1. Kháng cự thay đổi quy trình làm việc

Phần mềm quản lý tiến độ và chi phí thay đổi cách làm việc của nhiều vị trí trong tổ chức, từ kỹ sư công trường đến cán bộ kế toán PMU. Kháng cự thay đổi là phản ứng bình thường, không phải dấu hiệu không hợp tác. Cách vượt qua hiệu quả nhất là bắt đầu với pilot nhỏ trên một gói thầu cụ thể, chứng minh giá trị thực tế trước khi mở rộng.

### 6.2. Dữ liệu đầu vào không nhất quán

Phần mềm EVM chỉ tốt khi dữ liệu tốt. Nếu tiến độ thực tế được cập nhật theo trực giác ("khoảng 60% rồi") thay vì theo số liệu đo lường được (khối lượng đã hoàn thành / khối lượng kế hoạch), kết quả EVM sẽ sai lệch. Cần định nghĩa rõ phương pháp đo lường % hoàn thành cho từng loại hoạt động ngay từ đầu dự án.

Các phương pháp đo lường phổ biến trong xây dựng: phương pháp cột mốc (0/100 hoặc 20/80/100 theo mốc nghiệm thu), phương pháp tỷ lệ vật liệu đã lắp đặt, và phương pháp đường cong kinh nghiệm cho công việc lặp lại. Mỗi loại hoạt động cần gắn với một phương pháp cụ thể và nhất quán trong suốt vòng đời dự án.

### 6.3. Baseline không được bảo vệ đúng mức

Baseline là điểm tham chiếu bất biến để tính EV và PV. Khi baseline bị thay đổi mà không có quy trình phê duyệt rõ ràng (ví dụ để "che giấu" sai lệch tiến độ), toàn bộ hệ thống EVM mất ý nghĩa. Quy trình quản lý baseline cần được quy định trong hợp đồng TVQLDA và trong Kế hoạch quản lý dự án theo Điều 89 Nghị định 175/2024/NĐ-CP.

Nguyên tắc: chỉ có hai lý do được chấp nhận để điều chỉnh baseline: phê duyệt thay đổi phạm vi có giá trị dương, và điều chỉnh tổng mức đầu tư được cấp có thẩm quyền phê duyệt. Tất cả các sai lệch do hiệu suất thực thi phải được giữ trong báo cáo EVM, không được "dọn sạch" bằng cách cập nhật baseline.

### 6.4. Thiếu nhân sự kỹ thuật vận hành hệ thống

Phần mềm chuyên dụng đòi hỏi ít nhất một người có đủ năng lực kỹ thuật để vận hành, duy trì và đào tạo người khác. Khi người này rời dự án, hệ thống thường bị suy thoái dần vì không ai đủ kỹ năng duy trì theo chuẩn ban đầu. Giải pháp: tài liệu hóa quy trình vận hành hệ thống ngay từ đầu, và đảm bảo ít nhất hai người trong PMU được đào tạo ở mức độ vận hành độc lập.

### 6.5. Không có quy trình leo thang khi chỉ số cảnh báo

SPI và CPI thấp chỉ có giá trị nếu có quy trình rõ ràng quy định: khi nào thì báo cáo lên cấp nào, ai có trách nhiệm phân tích nguyên nhân, và ai có quyền phê duyệt kế hoạch phục hồi (recovery plan). Nếu báo cáo EVM hàng tuần cho thấy CPI = 0,83 nhưng không có ai phân tích và hành động, hệ thống chỉ là thủ tục hành chính.

---

## 7. Tích hợp với khung pháp lý đầu tư xây dựng Việt Nam

### 7.1. Báo cáo giám sát đầu tư định kỳ

Nghị định 29/2021/NĐ-CP về giám sát, đánh giá đầu tư yêu cầu chủ đầu tư báo cáo định kỳ các chỉ tiêu về tiến độ thực hiện, giải ngân vốn và những vấn đề phát sinh [^8]. Hệ thống EVM được vận hành tốt có thể cung cấp trực tiếp hầu hết số liệu cần thiết cho báo cáo này, giảm đáng kể thời gian tổng hợp của cán bộ PMU.

Cụ thể, chỉ số SPI và CPI theo từng gói thầu có thể được trình bày trực tiếp trong báo cáo giám sát đầu tư thay vì chỉ tường thuật tiến độ tổng thể bằng văn bản. Đây là cách làm đang được một số chủ đầu tư tiên phong áp dụng để tăng chất lượng và tốc độ xử lý báo cáo ở cơ quan quản lý nhà nước.

### 7.2. Kiểm soát điều chỉnh tổng mức đầu tư

Dự báo EAC từ hệ thống EVM cho phép PMU và chủ đầu tư chủ động theo dõi xu hướng chi phí cuối dự án. Khi EAC vượt ngưỡng 90% BAC (tức là còn 10% dư địa trước khi vi phạm hạn mức điều chỉnh tổng mức), đây là thời điểm cần bắt đầu chuẩn bị hồ sơ điều chỉnh theo trình tự quy định tại Luật Xây dựng 135/2025/QH15 [^5].

Thực tế phổ biến hiện nay là hồ sơ điều chỉnh tổng mức đầu tư được nộp sau khi vượt mức đã rõ ràng, đặt PMU vào thế bị động và kéo dài thủ tục phê duyệt. Hệ thống EVM cảnh báo sớm đủ để xử lý chủ động.

### 7.3. Tích hợp với BIM

Quyết định 258/QĐ-TTg năm 2023 xác định lộ trình áp dụng mô hình thông tin công trình (BIM) trong hoạt động đầu tư xây dựng [^9]. Khi BIM được áp dụng đầy đủ, mô hình BIM có thể liên kết trực tiếp với lịch biểu và chi phí để tạo thành mô hình 4D (BIM + thời gian) và 5D (BIM + chi phí). Đây là nền tảng để hệ thống EVM có dữ liệu tiến độ và chi phí chính xác hơn, tự động hơn từ dữ liệu đo đạc thực địa.

Với dự án đang trong giai đoạn đầu tư mới, lựa chọn phần mềm quản lý tiến độ và chi phí cần xem xét khả năng tích hợp với nền tảng BIM trong tương lai gần.

---

## 8. Xây dựng năng lực nội bộ: Bước không thể bỏ qua

Phần mềm tốt trong tay đội ngũ không được đào tạo sẽ cho kết quả tệ hơn Excel trong tay người hiểu việc. Đây là quan sát thực tế từ nhiều dự án triển khai hệ thống quản lý tiến độ tại Việt Nam.

Năng lực cần xây dựng bao gồm ba cấp độ khác nhau:

Kỹ sư công trường cần hiểu cách đo lường và báo cáo % hoàn thành theo phương pháp đã định nghĩa. Không cần biết vận hành phần mềm, nhưng phải cung cấp đúng thông tin đúng thời hạn.

Cán bộ PMU vận hành phần mềm trực tiếp: cập nhật lịch biểu thực tế, tính EV và xuất báo cáo. Cần đào tạo kỹ thuật cụ thể về phần mềm đang dùng và phương pháp EVM.

Quản lý PMU và chủ đầu tư cần đọc và diễn giải chỉ số EVM, phân biệt khi nào SPI/CPI thấp là tín hiệu cần hành động và khi nào là biến động bình thường đầu kỳ. Không cần biết vận hành phần mềm, nhưng phải hiểu phương pháp đủ để không bị báo cáo đẹp che mắt.

Đào tạo theo cấp độ khác nhau tránh được bẫy phổ biến là đào tạo đồng loạt cho tất cả mọi người cùng nội dung kỹ thuật, gây lãng phí thời gian và không tạo ra năng lực ở đúng cấp độ cần thiết [^10].

---

## Kết luận

Vấn đề trong quản lý tiến độ và chi phí dự án xây dựng Việt Nam không phải là thiếu phần mềm. Phần mềm Primavera P6 đã có mặt tại nhiều PMU từ hơn một thập kỷ; phần mềm dự toán nội địa đã được chuẩn hóa theo định mức Bộ Xây dựng. Vấn đề là hai hệ thống này không nói chuyện được với nhau để tạo ra chỉ số tích hợp có khả năng cảnh báo sớm.

PMBOK giải quyết vấn đề này ở cấp độ tư duy: trước khi chọn phần mềm, cần thiết lập một đường cơ sở (baseline) tích hợp tiến độ và chi phí, một phương pháp đo lường % hoàn thành nhất quán, và một quy trình leo thang rõ ràng khi chỉ số cảnh báo xuất hiện.

Khi khung tư duy đó được thiết lập đúng, phần mềm (dù là Excel, phần mềm lập lịch chuyên dụng, hay nền tảng tích hợp) chỉ là công cụ tự động hóa những gì đã được thiết kế rõ ràng trong quy trình. Công cụ phức tạp trong quy trình mơ hồ tạo ra báo cáo sai nhanh hơn, không phải quyết định đúng nhanh hơn.

Dự án đầu tư công Việt Nam có đủ khung pháp lý để triển khai EVM một cách có căn cứ: Nghị định 175/2024/NĐ-CP cung cấp cấu trúc quản lý, Luật Xây dựng 135/2025/QH15 cung cấp ngưỡng kiểm soát chi phí, và hệ thống báo cáo giám sát đầu tư theo Nghị định 29/2021/NĐ-CP cung cấp chu kỳ đo lường. Thứ còn thiếu là ý chí triển khai nhất quán và đầu tư vào năng lực đội ngũ.

> *"Không có hệ thống báo cáo nào tốt hơn quyết tâm của tổ chức muốn nhìn thấy thực tế thay vì muốn báo cáo đẹp."*

---

## Tham khảo thêm

Các bài trong chuỗi quản lý dự án xây dựng liên quan trực tiếp đến nội dung bài viết này:

- [Tư vấn quản lý dự án xây dựng: Vấn đề thực tiễn và giải pháp](/posts/tvqlda-van-de-giai-phap/) — Bốn nhóm vấn đề TVQLDA kèm căn cứ pháp lý theo Nghị định 175/2024 và Luật Xây dựng 135/2025. Nền tảng để hiểu ai có vai trò triển khai hệ thống EVM trong cấu trúc dự án.
- [Quản lý nhà thầu phụ hiệu quả trong dự án xây dựng](/posts/quan-ly-nha-thau-phu/) — Chi phí và tiến độ nhà thầu phụ là dữ liệu nguồn của EVM ở cấp gói thầu. Bài này phân tích cách thu thập và đo lường dữ liệu đó trong thực tế.
- [Đặc thù của dự án xây dựng: tại sao khó quản lý hơn các ngành khác](/posts/dac-thu-du-an-xay-dung/) — Bảy đặc thù tạo bối cảnh ảnh hưởng trực tiếp đến khả năng cập nhật baseline và tính chính xác của EVM.

---

## Liên hệ tư vấn và hỗ trợ triển khai

Nếu bạn đang là cán bộ PMU, chủ đầu tư hoặc tư vấn quản lý dự án muốn thiết lập hệ thống kiểm soát tiến độ và chi phí tích hợp theo chuẩn PMBOK cho dự án xây dựng đang triển khai tại Việt Nam, liên hệ trực tiếp: [WhatsApp](https://wa.me/84374874142) hoặc Email: [ha.nguyen@hydrostructai.com](mailto:ha.nguyen@hydrostructai.com) với mô tả ngắn về loại dự án, giai đoạn hiện tại và vấn đề cụ thể bạn đang gặp, để nhận hỗ trợ đánh giá hệ thống hiện tại, thiết kế quy trình EVM phù hợp với quy mô và bối cảnh pháp lý của dự án, lựa chọn và cấu hình phần mềm phù hợp, và đào tạo đội ngũ PMU theo ba cấp độ năng lực.

---

*© 2026 HydrostructAI - Tư vấn Quản lý Dự án Đầu tư Xây dựng & Mô hình hóa BIM*

---

## Tài liệu tham khảo

[^1]: Kiểm toán Nhà nước (2024). *Báo cáo tổng hợp kết quả kiểm toán năm 2024.* Hà Nội: KTNN. [portal.sav.gov.vn](https://portal.sav.gov.vn/Files/Others/dcc85cbf-ae3c-4491-afe5-b6d6dfd1de15/00.%20BC%20THKQKT%202024%20(PH).pdf).

[^2]: Project Management Institute (2021). *A Guide to the Project Management Body of Knowledge (PMBOK Guide), 7th Edition.* PMI. ISBN: 978-1628256642. Section 2.5: Project Performance Domains; *PMBOK Guide, 6th Edition* (2017), Chapter 6: Project Schedule Management.

[^3]: Project Management Institute (2017). *A Guide to the Project Management Body of Knowledge (PMBOK Guide), 6th Edition.* PMI. Chapter 7: Project Cost Management.

[^4]: Fleming, Q. W. & Koppelman, J. M. (2016). *Earned Value Project Management, 4th Edition.* Project Management Institute. ISBN: 978-1628250695. Chương 2: The Concept of Earned Value.

[^5]: Luật Xây dựng số 135/2025/QH15 (hiệu lực 01/7/2026), Điều 62: Điều chỉnh dự án đầu tư xây dựng. Tra cứu tại: [vbpl.vn](https://vbpl.vn/TW/Pages/vbpq-van-ban-goc.aspx?ItemID=185659).

[^6]: Bộ Xây dựng (2021). Hệ thống định mức xây dựng và phương pháp lập dự toán chi phí đầu tư xây dựng theo Thông tư 11/2021/TT-BXD và Thông tư 12/2021/TT-BXD. Tra cứu tại: [vbpl.vn](https://vbpl.vn/TW/Pages/vbpq-toanvan.aspx?ItemID=152300).

[^7]: Nghị định 175/2024/NĐ-CP ngày 30/12/2024, Điều 89: Kế hoạch tổng thể quản lý dự án; Chương VI: Giám sát, đánh giá dự án đầu tư xây dựng. Tra cứu tại: [vbpl.vn](https://vbpl.vn/TW/Pages/vbpq-toanvan.aspx?ItemID=173849).

[^8]: Nghị định 29/2021/NĐ-CP ngày 26/3/2021 *Quy định về trình tự, thủ tục thẩm định dự án quan trọng quốc gia và giám sát, đánh giá đầu tư.* Tra cứu tại: [vbpl.vn](https://vbpl.vn/TW/Pages/vbpq-luocdo.aspx?ItemID=153954).

[^9]: Quyết định 258/QĐ-TTg ngày 17/3/2023 *Phê duyệt lộ trình áp dụng mô hình thông tin công trình (BIM) trong hoạt động xây dựng.* Tra cứu tại: [thuvienphapluat.vn](https://thuvienphapluat.vn/van-ban/Xay-dung-Do-thi/Quyet-dinh-258-QD-TTg-2023-ap-dung-Mo-hinh-thong-tin-cong-trinh-BIM-trong-hoat-dong-xay-dung-559799.aspx).

[^10]: Project Management Institute (2023). *Pulse of the Profession 2023: Power Skills.* PMI Global. Phần: Training effectiveness and skill gap analysis in project teams.

---

## Danh mục tài liệu

### Sách và tài liệu học thuật

- **Fleming, Q. W. & Koppelman, J. M. (2016).** *Earned Value Project Management, 4th Edition.* Project Management Institute. ISBN: 978-1628250695.
- **Humphreys, G. C. (2011).** *Project Management Using Earned Value, 2nd Edition.* Humphreys & Associates.
- **Project Management Institute (2017).** *A Guide to the Project Management Body of Knowledge (PMBOK Guide), 6th Edition.* PMI. ISBN: 978-1628251951.
- **Project Management Institute (2021).** *A Guide to the Project Management Body of Knowledge (PMBOK Guide), 7th Edition.* PMI. ISBN: 978-1628256642.
- **Project Management Institute (2019).** *Practice Standard for Earned Value Management, 3rd Edition.* PMI.
- **Campbell, C. A. (2006).** *The One-Page Project Manager.* John Wiley & Sons. Xem thêm: [Quản lý dự án trên một trang giấy](/posts/quan-ly-du-an-mot-trang-giay/).
- **Kerzner, H. (2022).** *Project Management: A Systems Approach to Planning, Scheduling, and Controlling, 13th Edition.* Wiley.
- **Nguyễn Bá Uân & Hoàng Phong Hà (2020).** *Quản lý dự án xây dựng.* NXB Xây dựng. Hà Nội.

### Văn bản pháp luật

| Văn bản | Nội dung | Tra cứu |
|---------|----------|---------|
| **Luật XD 135/2025/QH15** (HH 01/7/2026) | Khung pháp lý đầu tư xây dựng cập nhật | [vbpl.vn](https://vbpl.vn/TW/Pages/vbpq-van-ban-goc.aspx?ItemID=185659) |
| **Nghị định 175/2024/NĐ-CP** | Quản lý dự án đầu tư xây dựng | [vbpl.vn](https://vbpl.vn/TW/Pages/vbpq-toanvan.aspx?ItemID=173849) |
| Nghị định 29/2021/NĐ-CP | Giám sát, đánh giá đầu tư | [vbpl.vn](https://vbpl.vn/TW/Pages/vbpq-luocdo.aspx?ItemID=153954) |
| Nghị định 10/2021/NĐ-CP | Quản lý chi phí đầu tư xây dựng | [vbpl.vn](https://vbpl.vn/botuphap/Pages/vbpq-van-ban-goc.aspx?ItemID=147606) |
| Thông tư 11/2021/TT-BXD | Hướng dẫn định mức xây dựng | [vbpl.vn](https://vbpl.vn/TW/Pages/vbpq-toanvan.aspx?ItemID=152300) |
| Thông tư 12/2021/TT-BXD | Hướng dẫn lập dự toán chi phí | [vbpl.vn](https://vbpl.vn/TW/Pages/vbpq-toanvan.aspx?ItemID=152302) |
| Quyết định 258/QĐ-TTg (2023) | Lộ trình áp dụng BIM | [thuvienphapluat.vn](https://thuvienphapluat.vn/van-ban/Xay-dung-Do-thi/Quyet-dinh-258-QD-TTg-2023-ap-dung-Mo-hinh-thong-tin-cong-trinh-BIM-trong-hoat-dong-xay-dung-559799.aspx) |

### Tiêu chuẩn quản lý dự án quốc tế

- **ISO 21500:2021:** Project, programme and portfolio management: Context and concepts. [iso.org](https://www.iso.org/standard/75704.html)
- **ISO 21502:2020:** Project, programme and portfolio management: Guidance on project management. [iso.org](https://www.iso.org/standard/74947.html)
- **ANSI/EIA-748-D (2019):** Earned Value Management Systems (EVMS). Tiêu chuẩn EVMS của Bộ Quốc phòng Hoa Kỳ, tài liệu tham chiếu quan trọng nhất về triển khai EVM trong dự án phức tạp.
- **ISO 31000:2018 / TCVN ISO 31000:2018:** Quản lý rủi ro. [iso.org](https://www.iso.org/standard/65694.html)

### Báo cáo và tài liệu đánh giá

- **Kiểm toán Nhà nước (2024).** *Báo cáo tổng hợp kết quả kiểm toán năm 2024.* [portal.sav.gov.vn](https://portal.sav.gov.vn/Files/Others/dcc85cbf-ae3c-4491-afe5-b6d6dfd1de15/00.%20BC%20THKQKT%202024%20(PH).pdf)
- **Project Management Institute (2023).** *Pulse of the Profession 2023: Power Skills.* [pmi.org](https://www.pmi.org)
- **Viện Kinh tế Xây dựng, Bộ Xây dựng (2023).** *Báo cáo thực trạng và giải pháp nâng cao chất lượng dịch vụ tư vấn quản lý dự án đầu tư xây dựng tại Việt Nam.* [vienkinhtexaydung.gov.vn](https://vienkinhtexaydung.gov.vn)
- **Bộ Kế hoạch và Đầu tư (2024).** *Báo cáo tình hình thực hiện và giải ngân vốn đầu tư công.* [mpi.gov.vn](https://mpi.gov.vn)

### Bài viết liên quan trên HydrostructAI

- [Tư vấn quản lý dự án xây dựng: Vấn đề thực tiễn và giải pháp](/posts/tvqlda-van-de-giai-phap/): Phân tích bốn nhóm vấn đề TVQLDA kèm căn cứ pháp lý Nghị định 175/2024 và Luật XD 135/2025.
- [Quản lý dự án trên một trang giấy (OPPM)](/posts/quan-ly-du-an-mot-trang-giay/): Công cụ báo cáo tổng hợp tiến độ, chi phí và rủi ro phục vụ cấp ra quyết định.
- [Quản lý nhà thầu phụ hiệu quả](/posts/quan-ly-nha-thau-phu/): Sáu nguyên tắc thực tiễn quốc tế theo PMP và FIDIC.

---
