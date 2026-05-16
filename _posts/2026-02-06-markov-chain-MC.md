---
title: "Markov Chain Monte Carlo: Tổng quan và ứng dụng trong kỹ thuật xây dựng"
author_profile: true
author_name: "HST.AI"
date: 2026-02-06 10:00:00 +0700
layout: single
featured: false
toc: true
toc_sticky: true
toc_label: "Mục lục"
permalink: "/posts/markov-chain-mcmc-ung-dung/"
categories:
  - Data-Science
  - Statistical-Methods
  - Engineering-Analysis
tags:
  [
    MCMC,
    "Markov Chain Monte Carlo",
    "Lấy mẫu thống kê",
    "Suy luận Bayes",
    "Phân tích độ tin cậy kết cấu",
    "Quản lý rủi ro dự án",
    "Tối ưu hóa thiết kế",
    Python,
    "Metropolis-Hastings",
    "Gibbs Sampling",
    Thuật toán,
    PMBOK,
    "Phân tích dự báo"
  ]
excerpt: "Phân tích chuyên sâu thuật toán Markov Chain Monte Carlo và ứng dụng thực tế trong kỹ thuật xây dựng. Bao gồm lý thuyết chuỗi Markov, phương pháp Monte Carlo, suy luận Bayes, các thuật toán MCMC phổ biến và ví dụ mô phỏng với dữ liệu."
header:
  overlay_color: "#f1f5f9"
  overlay_filter: "linear-gradient(135deg, rgba(27, 38, 59, 0.95), rgba(65, 90, 119, 0.8))"
  caption: "© HydrostructAI - Tư vấn Quản lý Dự án & Ứng dụng kỹ thuật"
---

MCMC (Markov Chain Monte Carlo) là nhóm thuật toán lấy mẫu từ phân phối xác suất bằng cách xây dựng một chuỗi Markov có phân phối cân bằng trùng với phân phối mục tiêu. Kỹ thuật này là nền tảng của suy luận Bayes hiện đại và có nhiều ứng dụng trong phân tích rủi ro kỹ thuật, độ tin cậy kết cấu và tối ưu hóa thiết kế.

## Chuỗi Markov

Chuỗi Markov là mô hình ngẫu nhiên mô tả một chuỗi trạng thái, trong đó xác suất chuyển sang trạng thái tiếp theo chỉ phụ thuộc vào trạng thái hiện tại, không phụ thuộc vào lịch sử trước đó. Đây gọi là tính chất Markov:

$$P(X_{n+1} | X_n, X_{n-1}, ..., X_0) = P(X_{n+1} | X_n)$$

Ma trận chuyển trạng thái (Transition Matrix) mô tả xác suất chuyển từ trạng thái này sang trạng thái khác. Sau một số bước đủ lớn, phân phối xác suất của trạng thái hội tụ về phân phối cân bằng (equilibrium distribution) — phân phối ổn định không thay đổi qua các bước tiếp theo.

## Phương pháp Monte Carlo

Phương pháp Monte Carlo là nhóm thuật toán tính toán dựa trên lấy mẫu ngẫu nhiên lặp đi lặp lại để ước lượng các đại lượng số học. Nguyên lý cốt lõi là sử dụng tính ngẫu nhiên để giải các bài toán có thể xác định về nguyên tắc nhưng quá phức tạp để giải trực tiếp.

Theo quy luật số lớn (Law of Large Numbers), khi số mẫu tăng, giá trị trung bình của mẫu hội tụ về kỳ vọng thực sự của phân phối. Điều này cho phép xấp xỉ các tích phân phức tạp chỉ bằng cách lấy mẫu và tính trung bình.

## Suy luận Bayes

Suy luận Bayes sử dụng định lý Bayes để cập nhật xác suất của một giả thuyết khi có thêm bằng chứng:

$$ P(\theta | D) = \frac{P(D | \theta) P(\theta)}{P(D)} $$

Trong đó:
- $$P(\theta \mid D)$$ — phân phối hậu nghiệm (posterior): xác suất của tham số $$\theta$$ sau khi quan sát dữ liệu $$D$$
- $$P(D \mid \theta)$$ — likelihood: xác suất quan sát được dữ liệu $$D$$ nếu tham số là $$\theta$$
- $$P(\theta)$$ — phân phối tiên nghiệm (prior): niềm tin ban đầu về $$\theta$$ trước khi có dữ liệu
- $$P(D)$$ — hằng số chuẩn hóa (evidence), thường rất khó tính trong không gian nhiều chiều

## Markov Chain Monte Carlo

### Tại sao cần MCMC

Trong thống kê Bayes, tính toán trực tiếp phân phối hậu nghiệm $$P(\theta \mid D)$$ thường không khả thi vì mẫu số $$P(D)$$ đòi hỏi tích phân qua toàn bộ không gian tham số — vốn có thể có hàng trăm hoặc hàng nghìn chiều trong các mô hình thực tế.

MCMC giải quyết vấn đề này bằng cách lấy mẫu trực tiếp từ phân phối hậu nghiệm mà không cần tính hằng số chuẩn hóa $$P(D)$$.

### Cách thức hoạt động

MCMC kết hợp hai phương pháp:
- Monte Carlo: lấy mẫu ngẫu nhiên để ước lượng phân phối mục tiêu
- Chuỗi Markov: tạo các mẫu phụ thuộc nhau sao cho phân phối giới hạn của chuỗi chính là phân phối mục tiêu

Trực giác: hãy tưởng tượng một "con robot" nhảy ngẫu nhiên trong không gian tham số. Robot có xu hướng ở lại lâu hơn ở các vùng xác suất cao và ít ghé thăm các vùng xác suất thấp. Dấu vết bước chân của robot chính là các mẫu từ phân phối cần tìm.

### Các thuật toán phổ biến

Metropolis-Hastings (MH) là thuật toán tổng quát nhất: đề xuất bước nhảy ngẫu nhiên và chấp nhận hay từ chối bước nhảy đó dựa trên tỷ lệ mật độ xác suất giữa trạng thái mới và trạng thái hiện tại. Không cần tính chuẩn hóa vì tỷ lệ này triệt tiêu $$P(D)$$.

Gibbs Sampling là trường hợp đặc biệt của MH: thay vì nhảy qua nhiều chiều cùng lúc, thuật toán cập nhật từng biến một trong khi giữ nguyên các biến còn lại. Hiệu quả cao khi các phân phối điều kiện có dạng giải tích tường minh.

Hamiltonian Monte Carlo (HMC) và biến thể NUTS (No-U-Turn Sampler) sử dụng đạo hàm của hàm log-posterior để đề xuất bước nhảy hiệu quả hơn, tránh hiện tượng random walk kém hiệu quả ở không gian nhiều chiều. Đây là thuật toán mặc định trong Stan và PyMC.

Affine Invariant Ensemble Sampler (emcee) sử dụng nhiều "walkers" chạy song song và tương tác với nhau, đặc biệt hiệu quả với các phân phối bất đối xứng hoặc có tương quan mạnh giữa các tham số.

## Ứng dụng thực tế

### Kỹ thuật xây dựng và quản lý dự án

Phân tích rủi ro dự án: mô phỏng thời gian hoàn thành dự án khi thời gian mỗi tác vụ là biến ngẫu nhiên (mô hình PERT/CPM với phân phối Beta hoặc Log-normal). MCMC ước lượng phân phối đầy đủ của ngày hoàn thành, không chỉ giá trị kỳ vọng, giúp định lượng xác suất trễ tiến độ và hỗ trợ quyết định dự phòng thời gian.

Phân tích độ tin cậy kết cấu: đánh giá xác suất phá hủy của kết cấu chịu tải trọng ngẫu nhiên (gió, động đất) khi đặc trưng vật liệu và hình học có sự không chắc chắn. MCMC ước lượng phân phối của hệ số an toàn hiệu quả hơn Monte Carlo thuần túy ở các vùng xác suất phá hủy thấp.

Tối ưu hóa thiết kế: tìm kiếm tham số thiết kế tối ưu trong không gian nhiều chiều, đặc biệt khi hàm mục tiêu không lồi hoặc có nhiều cực trị cục bộ mà các phương pháp gradient không vượt qua được.

### Tài chính và phân tích rủi ro đầu tư

Tối ưu danh mục đầu tư: ước lượng phân phối lợi nhuận và VaR (Value at Risk). MCMC cho phép mô hình hóa phân phối đuôi dày (fat-tailed), phản ánh thực tế thị trường tốt hơn giả định phân phối chuẩn.

Mô hình biến động ngẫu nhiên (Stochastic Volatility): dự báo biến động giá tài sản và định giá quyền chọn trong các mô hình phức tạp hơn Black-Scholes, nơi tham số biến động không còn là hằng số.

Phát hiện thay đổi chế độ thị trường (Regime Switching): xác định điểm chuyển đổi giữa các trạng thái thị trường (tăng trưởng, biến động cao, suy giảm) để điều chỉnh chiến lược giao dịch tự động.

## Ví dụ mô phỏng với Metropolis-Hastings

Phần này trình bày kết quả mô phỏng thuật toán Metropolis-Hastings để ước lượng tham số của mô hình tuyến tính $$y = mx + c$$ từ dữ liệu nhiễu — bài toán cơ bản nhưng minh họa rõ toàn bộ quy trình MCMC.

### Dữ liệu giả định

Bộ dữ liệu gồm 30 điểm quan trắc có nhiễu đo ($$\sigma = 1$$). Các thanh sai số thể hiện độ không đảm bảo đo lường — đây là đầu vào cho hàm likelihood.

<figure>
  <img src="{{ site.baseurl }}/assets/images/posts/2026-02-06-markov-chain-MC/mcmc_1_data.png" alt="Dữ liệu giả định">
  <figcaption>Dữ liệu giả định với nhiễu đo ($$\sigma = 1$$).</figcaption>
</figure>

### Quá trình chạy chuỗi

Thuật toán chạy 100.000 bước. Trace plot cho thấy giá trị của `Slope` (hệ số góc) và `Intercept` (hệ số chặn) qua các vòng lặp. Chuỗi hội tụ sau vài nghìn bước đầu — giai đoạn này gọi là burn-in và sẽ bị loại trước khi phân tích kết quả.

<figure>
  <img src="{{ site.baseurl }}/assets/images/posts/2026-02-06-markov-chain-MC/mcmc_2_chains.png" alt="Trace plot MCMC">
  <figcaption>Trace plot của Slope và Intercept qua 100.000 bước.</figcaption>
</figure>

### Phân phối hậu nghiệm

Sau khi loại bỏ burn-in, histogram các tham số thể hiện phân phối hậu nghiệm — không phải chỉ một giá trị điểm mà là toàn bộ dải bất định của ước lượng:
- Slope: ~1,40 (giá trị thật: 1,5)
- Intercept: ~4,29 (giá trị thật: 4,0)

<figure>
  <img src="{{ site.baseurl }}/assets/images/posts/2026-02-06-markov-chain-MC/mcmc_3_histograms.png" alt="Phân phối hậu nghiệm">
  <figcaption>Histogram phân phối hậu nghiệm của Slope và Intercept.</figcaption>
</figure>

### Tương quan tham số

Biểu đồ phân tán cho thấy tương quan âm giữa `Slope` và `Intercept`: khi hệ số góc tăng, hệ số chặn có xu hướng giảm. Đây là hiện tượng điển hình của hồi quy tuyến tính và thể hiện rõ hơn qua MCMC so với ước lượng điểm thông thường.

<figure>
  <img src="{{ site.baseurl }}/assets/images/posts/2026-02-06-markov-chain-MC/mcmc_4_correlation.png" alt="Tương quan tham số">
  <figcaption>Tương quan âm giữa Slope và Intercept trong chuỗi MCMC.</figcaption>
</figure>

### Corner plot

Corner plot trình bày đồng thời phân phối biên (Marginal Distribution) trên đường chéo và phân phối đồng thời (Joint Distribution) ở ngoài đường chéo, giúp nhìn tổng thể mối quan hệ giữa tất cả các tham số trong một biểu đồ duy nhất.

<figure>
  <img src="{{ site.baseurl }}/assets/images/posts/2026-02-06-markov-chain-MC/mcmc_5_corner.png" alt="Corner plot">
  <figcaption>Corner plot tổng hợp phân phối biên và phân phối đồng thời.</figcaption>
</figure>

### Đường khớp tốt nhất

Đường thẳng từ bộ tham số có Likelihood cao nhất được vẽ chồng lên dữ liệu quan sát để kiểm tra trực quan chất lượng khớp mô hình.

<figure>
  <img src="{{ site.baseurl }}/assets/images/posts/2026-02-06-markov-chain-MC/mcmc_6_bestfit.png" alt="Đường khớp tốt nhất">
  <figcaption>Đường khớp tốt nhất (Maximum Likelihood) với dữ liệu.</figcaption>
</figure>

### Độ không đảm bảo của mô hình

Bằng cách vẽ ngẫu nhiên 100 đường thẳng từ chuỗi MCMC, ta hình dung được dải không chắc chắn của mô hình — điều mà ước lượng điểm (OLS) không cung cấp được. Dải này phản ánh độ không đảm bảo cả về dữ liệu lẫn tham số mô hình.

<figure>
  <img src="{{ site.baseurl }}/assets/images/posts/2026-02-06-markov-chain-MC/mcmc_7_uncertainty.png" alt="Độ không đảm bảo mô hình">
  <figcaption>Dải không chắc chắn của mô hình qua 100 mẫu MCMC.</figcaption>
</figure>

## Tài liệu tham khảo

1. Metropolis, N., Rosenbluth, A. W., Rosenbluth, M. N., Teller, A. H., & Teller, E. (1953). Equation of state calculations by fast computing machines. *The Journal of Chemical Physics*, 21(6), 1087–1092.

2. Gelfand, A. E., & Smith, A. F. M. (1990). Sampling-based approaches to calculating marginal densities. *Journal of the American Statistical Association*, 85(410), 398–409.

3. Neal, R. M. (2011). MCMC using Hamiltonian dynamics. In S. Brooks, A. Gelman, G. Jones, & X.-L. Meng (Eds.), *Handbook of Markov Chain Monte Carlo* (pp. 113–162). CRC Press.

4. Foreman-Mackey, D., Hogg, D. W., Lang, D., & Goodman, J. (2013). emcee: The MCMC Hammer. *Publications of the Astronomical Society of the Pacific*, 125(925), 306–312.

5. Salvatier, J., Wiecki, T. V., & Fonnesbeck, C. (2016). Probabilistic programming in Python using PyMC3. *PeerJ Computer Science*, 2, e55.

6. Gelman, A., Carlin, J. B., Stern, H. S., Dunson, D. B., Vehtari, A., & Rubin, D. B. (2013). *Bayesian Data Analysis* (3rd ed.). CRC Press.

7. Wikipedia. (2024). Markov chain Monte Carlo. [https://en.wikipedia.org/wiki/Markov_chain_Monte_Carlo](https://en.wikipedia.org/wiki/Markov_chain_Monte_Carlo)

8. Stanford University. (2021). CS109: Probability for Computer Scientists — Markov Chains. [https://web.stanford.edu/class/archive/cs/cs109/cs109.1218/files/student_drive/9.6.pdf](https://web.stanford.edu/class/archive/cs/cs109/cs109.1218/files/student_drive/9.6.pdf)
