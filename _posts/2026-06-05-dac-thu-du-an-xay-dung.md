---
title: "Đặc thù của dự án xây dựng: tại sao khó quản lý hơn các ngành khác"
author_profile: true
author_name: "HST.AI"
date: 2026-06-05 18:00:00 +0700
layout: single
featured: true
toc: true
toc_sticky: true
toc_label: "Mục Lục"
permalink: "/posts/dac-thu-du-an-xay-dung/"
categories:
  - Quản lý dự án
  - Xây dựng
  - Project-Management
tags:
  [
    Đặc thù xây dựng,
    Quản lý dự án xây dựng,
    Rủi ro xây dựng,
    Giải phóng mặt bằng,
    An toàn lao động,
    PMBOK,
    Xây dựng Việt Nam,
    PMU,
    Chủ đầu tư,
    Nhà thầu,
    Địa chất công trình,
    Tiến độ thi công
  ]
excerpt: "Dự án xây dựng khó không phải vì thiếu công cụ hay phương pháp. Khó vì sản phẩm cố định tại chỗ, thời gian dài, nhiều bên liên quan và hàng loạt rủi ro không có trong ngành khác."
header:
  overlay_color: "#f1f5f9"
  overlay_filter: "linear-gradient(135deg, rgba(27, 38, 59, 0.95), rgba(65, 90, 119, 0.8))"
  caption: "© HydrostructAI - Tư vấn Quản lý Dự án Đầu tư Xây dựng"
---

## Đặt vấn đề

Dự án phần mềm có thể làm lại từ đầu nếu phát hiện sai hướng sớm. Chi phí là vài tuần sprint. Dự án xây dựng không có khái niệm đó. Một tòa nhà đã đổ móng xong thì không "refactor" được móng. Một cây cầu đã thi công 60% mà phát hiện lỗi thiết kế thì hậu quả không giống gì việc rollback code.

Điều này nghe hiển nhiên, nhưng phần lớn các phương pháp quản lý dự án phổ biến hiện nay (PMBOK, Prince2, Agile và các biến thể) được xây dựng chủ yếu từ kinh nghiệm ngành IT và dịch vụ. Khi áp dụng vào xây dựng, nhiều phần phải dịch sang bối cảnh hoàn toàn khác.

Bài này không so sánh ngành nào khó hơn. Mục tiêu đơn giản hơn: hiểu rõ những đặc thù làm cho dự án xây dựng khó quản lý theo cách riêng của nó, để chọn đúng công cụ và phương pháp cho đúng bối cảnh.

---

## 1. Sản phẩm cố định tại chỗ và không thể nhân bản

### 1.1. Nhà máy di động đến công trường

Hầu hết sản phẩm công nghiệp được sản xuất trong nhà máy rồi vận chuyển đến nơi tiêu thụ. Dây chuyền sản xuất được tối ưu hóa, môi trường được kiểm soát, công nhân làm đi làm lại cùng quy trình đến khi thuần thục.

Xây dựng làm ngược lại. Nhà máy đến công trường. Toàn bộ đội ngũ, thiết bị, vật liệu phải di chuyển đến một địa điểm cố định, thường là địa hình phức tạp, thời tiết không kiểm soát được, hạ tầng hỗ trợ chưa có sẵn. Mỗi công trình là một nhà máy tạm thời phải được lắp đặt, vận hành và tháo dỡ.

Không có hai công trường nào giống nhau. Điều kiện nền đất, vị trí địa lý, khí hậu địa phương, khả năng tiếp cận, cộng đồng xung quanh: tất cả khác nhau. Kinh nghiệm từ công trình này không chuyển giao tự động sang công trình kia.

### 1.2. Không thể thử nghiệm trước

Phần mềm có thể triển khai trên môi trường test trước khi lên production. Sản phẩm tiêu dùng có thể ra phiên bản beta. Dự án xây dựng không có khái niệm đó.

<<<<<<< Updated upstream
Mỗi công trình là bản duy nhất. Khi thi công, không có "ăn thử thứ nhất" được phép sai. Đổ bê tông sai tỷ lệ cốt thép thì phải đập ra làm lại. Lắp đặt hệ thống HVAC sai sơ đồ thì gỡ toàn bộ. Chi phí của lỗi trong xây dựng cao hơn nhiều so với phần lớn các ngành khác vì mọi sai lầm đều vật chất hóa thành sản phẩm thực đã được làm ra.
=======
Mỗi công trình là bản duy nhất. Khi thi công, không có "lần thử thứ nhất" được phép sai. Đổ bê tông sai tỷ lệ cốt thép thì phải đập ra làm lại. Lắp đặt hệ thống HVAC sai sơ đồ thì gỡ toàn bộ. Chi phí của lỗi trong xây dựng cao hơn nhiều so với phần lớn các ngành khác vì mọi sai lầm đều vật chất hóa thành sản phẩm thực đã được làm ra.
>>>>>>> Stashed changes

Đây là lý do giai đoạn thiết kế và lập kế hoạch trong xây dựng không phải là thủ tục bổ sung, mà là khoản đầu tư thực sự. Mỗi giờ làm kỹ ở khâu thiết kế bù lại nhiều giờ sửa chữa ở công trường.

---

## 2. Thời gian dài và những biến động không lường trước

### 2.1. Dự án kéo dài nhiều năm

Một dự án phần mềm lớn có thể hoàn thành trong 12 đến 18 tháng. Dự án xây dựng dân dụng trung bình ở Việt Nam từ 2 đến 5 năm. Công trình hạ tầng lớn (cao tốc, cầu, cảng) thường 5 đến 10 năm.

Khoảng thời gian này tạo ra nhiều rủi ro mà các ngành khác ít gặp.

Biến động giá vật liệu. Giá thép, xi măng, cát, nhân công có thể thay đổi 20 đến 40% trong vài năm. Hợp đồng ký năm 2022 có thể không tính được đợt tăng giá thép năm 2021-2022 hay biến động xăng dầu sau đó. Điều chỉnh hợp đồng vì biến động thị trường là một phần công việc thường xuyên của PMU.

Thay đổi quy định pháp lý. Dự án bắt đầu theo Nghị định 15/2021/NĐ-CP có thể phải điều chỉnh hồ sơ khi Nghị định 175/2024/NĐ-CP ra đời. Dự án thiết kế theo tiêu chuẩn cũ có thể phải cập nhật khi tiêu chuẩn mới ban hành. [^1]

Thay đổi nhân sự. Cán bộ PMU có thể luân chuyển. Giám đốc ban quản lý có thể thay đổi. Mỗi lần thay người là một lần phải bàn giao kiến thức, và phần lớn kiến thức đó không được tài liệu hóa đủ.

### 2.2. Đường Găng trong môi trường thực tế

Phân tích đường Găng trên giấy giả định rằng khi hoạt động A xong thì hoạt động B có thể bắt đầu ngay. Thực tế thi công có nhiều ràng buộc vật lý không có trong lịch biểu.

Đội nhân lực không thể phân thân. Nếu đội bê tông đang đổ tầng 3 thì không thể đồng thời đổ tầng 5, dù về mặt logic hai hoạt động độc lập nhau. Thiết bị có công suất hữu hạn: cần trục tháp phục vụ toàn công trường, nếu hỏng thì nhiều hoạt động đồng thời bị tắc. Thời tiết xác định lại lịch: không đổ bê tông khi trời mưa, không cẩu cấu kiện khi gió trên cấp 4.

Phần mềm lập lịch mô hình hóa được nhiều ràng buộc, nhưng không bao giờ mô hình hóa được đủ thực tế công trường. Kỹ sư lập lịch giỏi là người hiểu khoảng cách giữa mô hình và thực tế, không phải người vận hành phần mềm thuần thục nhất.

---

## 3. Nhiều bên liên quan với lợi ích không đồng nhất

### 3.1. Cấu trúc tổ chức phân tầng

Một dự án xây dựng quy mô trung bình tại Việt Nam thường có ít nhất 7 đến 10 đầu mối liên quan trực tiếp: chủ đầu tư, ban quản lý dự án (PMU chuyên trách hoặc chủ đầu tư kiêm nhiệm), tư vấn thiết kế, tư vấn giám sát, tư vấn quản lý dự án (TVQLDA), nhà thầu thi công chính, các nhà thầu phụ, và cơ quan quản lý nhà nước có thẩm quyền.

Mỗi đầu mối có hợp đồng riêng, trách nhiệm riêng, nhịp công việc riêng và lợi ích riêng. Nhà thầu chính muốn tối ưu hóa tiến độ và lợi nhuận của gói thầu mình. Tư vấn giám sát muốn nghiệm thu đúng kỹ thuật, đôi khi chậm. Chủ đầu tư muốn bàn giao đúng hạn và trong ngân sách. Những mục tiêu này không phải lúc nào cũng cùng hướng.

### 3.2. Quyền ra quyết định bị phân tán

Trong dự án đầu tư công, một quyết định phê duyệt điều chỉnh thiết kế có thể cần ý kiến từ 5 đến 7 cơ quan: PMU, chủ đầu tư (đơn vị chủ quản), Sở Xây dựng, Sở Tài chính, UBND tỉnh (nếu vượt ngưỡng), và đôi khi cả Bộ chủ quản. Quy trình này có thể mất từ 1 đến 6 tháng.

Trong thời gian chờ phê duyệt, công trường có ba lựa chọn không lựa chọn nào lý tưởng: dừng thi công hạng mục liên quan (tốn kém, mất tiến độ), tiếp tục thi công với rủi ro thiết kế chưa được phê duyệt, hoặc tạm chuyển sang hạng mục khác không bị ảnh hưởng nếu có.

### 3.3. Vùng xám trách nhiệm ở ranh giới hợp đồng

Trong chuỗi hợp đồng phân tầng, có những "vùng xám" trách nhiệm ở điểm giao tiếp giữa các bên. Ai chịu khi thiết kế kỹ thuật và bản vẽ thi công không khớp nhau? Ai xử lý khi nhà thầu phụ phát hiện điều kiện nền đất khác với báo cáo khảo sát?

Hợp đồng tốt xác định rõ những điểm giao tiếp này. Phần lớn hợp đồng ở thị trường Việt Nam chưa làm đủ điều đó, và khoảng trống đó chuyển thành tranh chấp.

---

## 4. Phụ thuộc thời tiết và điều kiện địa chất

### 4.1. Mùa vụ thi công tại Việt Nam

Lịch thi công phụ thuộc nhiều vào mùa mưa. Miền Trung mưa lũ từ tháng 9 đến tháng 12. Tây Nguyên mưa từ tháng 5 đến tháng 10. Đồng bằng sông Cửu Long lũ từ tháng 7 đến tháng 11.

Lịch biểu thi công không tính đến mùa mưa là lịch trên giấy. Nhà thầu có kinh nghiệm tự điều chỉnh. Nhà thầu thiếu kinh nghiệm chạy đua thi công vào đầu mùa khô, đổ bê tông vội, rồi báo cáo "trễ do mưa" khi đến mùa sau.

### 4.2. Điều kiện địa chất bất ngờ

Báo cáo khảo sát địa chất được lập trên cơ sở số lượng hố khoan hữu hạn. Khi khai đào, thực tế địa chất có thể khác hoàn toàn: gặp túi bùn, gặp hang karst, gặp mực nước ngầm cao hơn dự kiến, gặp đất bị ô nhiễm do hoạt động công nghiệp trước đó.

Điều kiện địa chất bất ngờ là một trong những nguyên nhân hàng đầu gây phát sinh chi phí và trễ tiến độ trong các dự án xây dựng toàn cầu. Không phải vì thiếu khảo sát, mà vì đất đai không đồng nhất và chi phí khảo sát đủ để loại bỏ hoàn toàn bất ngờ là không thực tế.

Điều này tạo ra vấn đề pháp lý thường xuyên: ai chịu rủi ro địa chất? FIDIC Red Book 2017 có cơ chế rõ ràng cho "unforeseeable physical conditions" (Sub-Clause 4.12). Hợp đồng xây dựng Việt Nam theo Thông tư 09/2016/TT-BXD có quy định nhưng thường ít chi tiết hơn, dẫn đến tranh chấp khi tình huống thực tế xảy ra. [^2]

---

## 5. Rủi ro an toàn lao động có tính vật chất cao

### 5.1. Môi trường làm việc liên tục thay đổi

Khác với nhà máy hay văn phòng, công trường xây dựng là môi trường làm việc luôn thay đổi. Mỗi tuần, địa hình công trường khác tuần trước: hố đào sâu hơn, tầng mới được dựng, giàn giáo di chuyển, thiết bị nặng hoạt động trong bán kính hẹp với người.

Theo số liệu từ Bộ Lao động, Thương binh và Xã hội, xây dựng liên tục là một trong ba ngành có tỷ lệ tai nạn lao động chết người cao nhất tại Việt Nam, cùng với khai khoáng và vận tải. [^3] Phần lớn các vụ tai nạn nghiêm trọng không đến từ sự cố thiết bị phức tạp, mà từ ngã cao, vật rơi từ trên xuống, và điện giật.

### 5.2. Hệ lụy quản lý dự án từ sự cố an toàn

Khi xảy ra tai nạn nghiêm trọng, hậu quả không chỉ là nhân đạo. Công trường có thể bị đình chỉ trong thời gian điều tra. Nhà thầu có thể bị xử phạt, đình chỉ hoạt động, hoặc bị loại khỏi các gói thầu tiếp theo theo Điều 17 Nghị định 175/2024/NĐ-CP. Chủ đầu tư có thể phải giải trình với cơ quan quản lý.

Chi phí trực tiếp và gián tiếp của một vụ tai nạn lao động nghiêm trọng thường cao hơn rất nhiều so với chi phí đầu tư đúng đắn vào hệ thống an toàn từ đầu. Đây không phải lập luận đạo đức, đây là toán kinh tế.

---

## 6. Giải phóng mặt bằng: rủi ro đặc thù Việt Nam

### 6.1. Nguyên nhân trễ tiến độ số một

Hỏi bất kỳ PMU hay nhà thầu nào có kinh nghiệm nhiều dự án tại Việt Nam: nguyên nhân trễ tiến độ số một là gì? Câu trả lời gần như đồng nhất: giải phóng mặt bằng (GPMB).

GPMB không phải đặc thù riêng của Việt Nam, nhưng độ phức tạp và thời gian kéo dài của nó ở Việt Nam vượt xa nhiều nước trong khu vực. Quy trình kiểm đếm, định giá, phê duyệt phương án bồi thường, khiếu nại, tái định cư, thu hồi đất, bàn giao mặt bằng có thể kéo dài 2 đến 5 năm cho một dự án hạ tầng tuyến tính dài. [^4]

Tổng tiến độ của một dự án thường bị quyết định bởi mặt trận chậm nhất của GPMB, không phải bởi năng lực thi công.

### 6.2. Tác động chuỗi lên lập lịch và hợp đồng

Khi GPMB chậm, nhà thầu nhận bàn giao mặt bằng không đúng hạn. Thiết bị và nhân lực đã huy động, chi phí đang chạy, nhưng không có chỗ thi công. Hợp đồng thường có điều khoản kéo dài tiến độ do nguyên nhân khách quan, nhưng điều khoản này hiếm khi tính đủ chi phí thực tế phát sinh cho nhà thầu trong thời gian chờ.

Khi mặt bằng bàn giao theo từng phần, nhà thầu phải điều chỉnh lịch biểu liên tục. Thi công không liên tục, nhân lực điều phối đi lại giữa các điểm, thiết bị huy động rồi giải thể rồi huy động lại. Chi phí thực tế luôn cao hơn chi phí thi công liên tục có kế hoạch.

---

## 7. Vốn lớn và chu kỳ thanh toán dài

### 7.1. Đặc điểm dòng tiền của nhà thầu

Nhà thầu xây dựng thường phải ứng vốn trước: mua vật liệu, trả nhân công, thuê thiết bị, trước khi được nghiệm thu và thanh toán. Chu kỳ từ khi ứng vốn đến khi nhận thanh toán thường 30 đến 90 ngày, đôi khi dài hơn trong dự án đầu tư công do thủ tục nghiệm thu, thẩm tra và phê duyệt thanh toán.

Điều này có nghĩa là nhà thầu vận hành với khoảng 20 đến 30% giá trị hợp đồng đang nằm trong vòng quay vốn. Nhà thầu thiếu vốn lưu động sẽ giảm tiến độ, sử dụng vật liệu kém chất lượng hơn, hoặc trì hoãn thanh toán cho nhà thầu phụ, tạo ra chuỗi vấn đề xuống.

### 7.2. Dòng tiền là chỉ số sức khỏe thực của nhà thầu

Tỷ lệ hoàn thành 70% không nói lên nhiều nếu nhà thầu đang chờ thanh toán 40% giá trị hợp đồng. Khi cán bộ PMU nhận thấy nhà thầu chậm trả lương công nhân hoặc chậm thanh toán nhà thầu phụ, đó là tín hiệu cảnh báo sớm về khả năng tài chính của nhà thầu. Đợi đến khi nhà thầu bỏ công trường thì đã muộn hàng tháng.

---

## Kết luận

Bảy đặc thù trên không hoạt động độc lập. Chúng tương tác và khuếch đại nhau.

Một dự án hạ tầng công cộng kéo dài 5 năm với mặt bằng bàn giao từng phần, điều kiện địa chất bất ngờ ở một số đoạn, nhiều cơ quan phê duyệt, và nhà thầu căng vốn lưu động đang vận hành trong môi trường pháp lý phức tạp sẽ tạo ra cấu trúc rủi ro mà không phương pháp quản lý dự án nào giải quyết được bằng công thức đơn giản.

Điều đó không có nghĩa là quản lý dự án xây dựng không thể cải thiện. Có thể cải thiện, và nhiều tổ chức đang làm tốt hơn mức trung bình ngành. Nhưng điểm xuất phát phải là hiểu rõ các đặc thù này, không phải áp đặt công cụ từ ngành khác mà không điều chỉnh.

Các bài tiếp theo trong chuỗi này sẽ đi vào từng loại dự án cụ thể: đầu tư công, bất động sản, công nghiệp, nông nghiệp và hạ tầng nông thôn. Mỗi loại có thêm một lớp đặc thù riêng chồng lên những đặc thù chung đã phân tích ở đây.

---

## Tham khảo thêm

<<<<<<< Updated upstream
Các bài trong chuỗi quản lý dự án xây dựng đi sâu hơn vào từng nhóm vấn đề đặc thù đã phân tích:

- [Tư vấn quản lý dự án xây dựng: Vấn đề thực tiễn và giải pháp](/posts/tvqlda-van-de-giai-phap/) — Bốn nhóm vấn đề TVQLDA kèm căn cứ pháp lý theo Nghị định 175/2024: nhân sự, quyền hạn, pháp lý và xung đột lợi ích. Nền tảng để hiểu ai có vai trò gì trong việc xử lý các đặc thù đã nêu.
- [Hướng dẫn quản lý tiến độ và chi phí xây dựng theo chuẩn PMBOK](/posts/quan-ly-tien-do-project/) — EVM giúp đo lường tích hợp tiến độ và chi phí, đặc biệt có giá trị trong bối cảnh thời gian dài và nhiều biến số.
- [Quản lý nhà thầu phụ hiệu quả trong dự án xây dựng](/posts/quan-ly-nha-thau-phu/) — Sáu nguyên tắc quản lý nhà thầu phụ từ thực tiễn quốc tế, là cách cụ thể để xử lý đặc thù "nhiều bên liên quan" đã phân tích ở bài này.
- [Đầu tư công trong xây dựng: vốn trung hạn, ODA và những nút thắt hệ thống](/posts/dau-tu-cong-von-trung-han-oda/) — Áp dụng cụ thể cho loại dự án có quy trình phê duyệt nhiều tầng và áp lực giải ngân ngân sách.
- [Thực trạng quản lý dự án xây dựng Việt Nam 2026](/posts/thuc-trang-qlda-viet-nam-2026/) — Số liệu tổng quan về giải ngân, chất lượng công trình và năng lực PM toàn ngành.
=======
Bài viết [**Tư vấn quản lý dự án xây dựng: Vấn đề thực tiễn và giải pháp**](/posts/tvqlda-van-de-giai-phap/) phân tích bốn nhóm vấn đề TVQLDA thường gặp kèm căn cứ pháp lý theo Nghị định 175/2024 và Luật Xây dựng 135/2025, là nền tảng để hiểu ai có vai trò gì trong việc xử lý các đặc thù đã nêu.

Bài viết [**Hướng dẫn quản lý tiến độ và chi phí xây dựng theo chuẩn PMBOK**](/posts/quan-ly-tien-do-project/) trình bày cụ thể cách EVM giúp đo lường tích hợp tiến độ và chi phí trong bối cảnh các đặc thù trên.
>>>>>>> Stashed changes

---

## Liên hệ tư vấn và hỗ trợ triển khai

Nếu bạn đang phụ trách một dự án xây dựng và muốn đánh giá lại mức độ rủi ro hiện tại, hoặc cần hỗ trợ xây dựng khung quản lý phù hợp với đặc thù dự án, liên hệ trực tiếp: [WhatsApp](https://wa.me/84374874142) hoặc Email: [ha.nguyen@hydrostructai.com](mailto:ha.nguyen@hydrostructai.com) với mô tả ngắn về loại dự án, giai đoạn hiện tại và vấn đề cụ thể đang gặp.

---

*© 2026 HydrostructAI - Tư vấn Quản lý Dự án Đầu tư Xây dựng & Mô hình hóa BIM*

---

## Tài liệu tham khảo

[^1]: Chính phủ nước CHXHCN Việt Nam. (2024). *Nghị định 175/2024/NĐ-CP ngày 30/12/2024 quy định chi tiết thi hành một số điều của Luật Xây dựng.* Hà Nội. Tra cứu tại [vbpl.vn](https://vbpl.vn/TW/Pages/vbpq-toanvan.aspx?ItemID=173849).

[^2]: FIDIC. (2017). *Conditions of Contract for Construction (Red Book), Second Edition*, Sub-Clause 4.12: Unforeseeable Physical Conditions. Fédération Internationale des Ingénieurs-Conseils. Geneva.

[^3]: Bộ Lao động, Thương binh và Xã hội. (2024). *Báo cáo tai nạn lao động năm 2023.* Hà Nội. Tra cứu tại [molisa.gov.vn](https://www.molisa.gov.vn).

[^4]: Bộ Kế hoạch và Đầu tư. (2024). *Báo cáo tình hình thực hiện và giải ngân vốn đầu tư công năm 2024.* Tra cứu tại [mpi.gov.vn](https://mpi.gov.vn).

---

## Danh mục tài liệu

### Văn bản pháp luật

| Văn bản | Nội dung | Tra cứu |
|---------|----------|---------|
| **Luật XD 135/2025/QH15** (HH 01/7/2026) | Khung pháp lý đầu tư xây dựng cập nhật | [vbpl.vn](https://vbpl.vn/TW/Pages/vbpq-van-ban-goc.aspx?ItemID=185659) |
| **Nghị định 175/2024/NĐ-CP** | Quản lý dự án đầu tư xây dựng | [vbpl.vn](https://vbpl.vn/TW/Pages/vbpq-toanvan.aspx?ItemID=173849) |
| Thông tư 09/2016/TT-BXD | Hướng dẫn hợp đồng xây dựng | [vbpl.vn](https://vbpl.vn) |

### Tài liệu quản lý dự án quốc tế

- **FIDIC. (2017).** *Conditions of Contract for Construction (Red Book), Second Edition.* Geneva.
- **Project Management Institute. (2021).** *A Guide to the Project Management Body of Knowledge (PMBOK Guide), 7th Edition.* PMI.
- **Merrow, E. W. (2011).** *Industrial Megaprojects: Concepts, Strategies, and Practices for Success.* Wiley.

### Bài viết liên quan trên HydrostructAI

- [Tư vấn quản lý dự án xây dựng: Vấn đề thực tiễn và giải pháp](/posts/tvqlda-van-de-giai-phap/)
- [Hướng dẫn quản lý tiến độ và chi phí xây dựng theo chuẩn PMBOK](/posts/quan-ly-tien-do-project/)
- [Quản lý nhà thầu phụ hiệu quả trong dự án xây dựng](/posts/quan-ly-nha-thau-phu/)

---
