---
title: "SWMM5 & EPANET Explorer: Công cụ Trực quan hóa File INP Trực tuyến"
author_profile: true
author_name: "HST.AI"
date: 2025-12-06 10:00:00 +0700
layout: single
featured: true
mathjax: true
toc: true
toc_sticky: true
toc_label: "📑 Mục Lục"
permalink: "/posts/swmm-epanet-explorer-tool/"
categories:
  - Water-Modeling
  - Software-Tools
  - Engineering-Applications
tags:
  [
    "SWMM5",
    EPANET,
    "Mô hình hóa nước",
    "Thủy văn",
    "Thoát nước mưa",
    "Cấp nước",
    "Web App",
    "File INP",
    "Trực quan hóa dữ liệu",
    "Kiểm tra nhanh",
    TCVN,
    "EPA Software"
  ]
excerpt: "Giới thiệu công cụ web SWMM5 & EPANET Explorer: Trực quan hóa file dữ liệu .INP trực tuyến, không cần cài đặt, kéo & thả tệp, danh sách tiêu đề phần dữ liệu, xem chi tiết từng section (JUNCTIONS, CONDUITS, PIPES, v.v.), hỗ trợ EPA SWMM 5.2.4 & EPANET, tối ưu cho kiểm tra nhanh mô hình nước."
header:
  overlay_color: "#1a1a2e"
  overlay_filter: "linear-gradient(135deg, rgba(26, 26, 46, 0.9), rgba(0, 77, 153, 0.7))"
  caption: "© HST - Tư vấn & Quản lý dự án"

---

Bài viết giới thiệu về một công cụ tiện ích mới dành cho cộng đồng mô hình hóa nước. Dưới đây là tổng hợp về một giải pháp web giúp đơn giản hóa quy trình làm việc với các tệp dữ liệu đầu vào của SWMM và EPANET.

[![SWMM-EPANET Explorer](/assets/images/swmm-epanet-explorer.png)](https://swmm5epanetinpviewer.com/)
*Hình ảnh giao diện công cụ Trình xem tệp dữ liệu EPA SWMM5 và EPANET INP. Nhấn vào ảnh để truy cập ứng dụng.*

---

### 1. Thách thức với Tệp Đầu vào (.INP)

Trong lĩnh vực mô hình hóa thủy lực và thủy văn, các phần mềm như **EPA SWMM5** (Quản lý nước mưa) và **EPANET** (Mạng lưới cấp nước) là những tiêu chuẩn vàng. Tuy nhiên, việc làm việc trực tiếp với các tệp đầu vào dạng văn bản (.INP) của chúng thường khá cồng kềnh. 

Các tệp này chứa lượng dữ liệu khổng lồ được tổ chức thành nhiều phần khác nhau, khiến việc kiểm tra nhanh hoặc tìm kiếm thông tin cụ thể trở nên khó khăn nếu không mở phần mềm chuyên dụng.

### 2. Giải pháp Web App Trực quan

Xuất phát từ thách thức đó, một ý tưởng về công cụ xem file trực tuyến đã ra đời. Mục tiêu cốt lõi là xây dựng một ứng dụng chạy trên trình duyệt web, không cần cài đặt, cho phép người dùng tải các tệp `.INP` lên và ngay lập tức nhìn thấy cấu trúc dữ liệu của chúng.

Công cụ này tập trung vào việc tự động nhận diện và phân tách các "phần dữ liệu" (*data sections* - các mục bắt đầu bằng dấu ngoặc vuông như `[JUNCTIONS]` hay `[CONDUITS]`) bên trong tệp gốc.

### 3. Kết quả Đạt được

Kết quả là một ứng dụng web trực quan, hỗ trợ tốt cho cả định dạng **EPA SWMM 5.2.4** mới nhất và **EPANET**.

Các tính năng chính bao gồm:
* **Kéo & Thả:** Người dùng chỉ cần kéo thả file vào ứng dụng.
* **Danh sách Tiêu đề:** Hệ thống sẽ liệt kê danh sách các tiêu đề phần dữ liệu có trong file.
* **Xem chi tiết:** Khi nhấp vào bất kỳ tiêu đề nào, toàn bộ nội dung dữ liệu thô thuộc riêng phần đó sẽ được hiển thị rõ ràng trong một vùng văn bản bên dưới.

Điều này giúp các kỹ sư và nhà mô hình hóa tiết kiệm đáng kể thời gian khi cần kiểm tra nhanh thông số, cấu trúc file mà không bị "lạc" trong biển dữ liệu văn bản.

> Những thông tin và kết quả về công cụ hữu ích này được tổng hợp dựa trên bài viết chia sẻ của chuyên gia **Robert Dickinson**. Bạn có thể trải nghiệm công cụ tại: [https://swmm5epanetinpviewer.com/](https://swmm5epanetinpviewer.com/)