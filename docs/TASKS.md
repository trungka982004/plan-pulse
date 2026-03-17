# To-Do Tasks Breakdown

Danh sách này chia nhỏ lộ trình từ file `ROADMAP.md` và quá trình phân tích dự án Todo List hiện tại thành các **Task cụ thể** có thể bắt đầu làm ngay. 

**Tổng cộng có 24 Tasks** trải dài từ việc refactor code cũ cho đến lúc hoàn thiện Phase 4.

---

## Phase 0: Tái cấu trúc & Nền tảng (Refactoring)
Bắt đầu bằng việc dọn dẹp và tổ chức lại dự án Todo hiện tại.
- [x] **Task 0.1:** Tổ chức lại cấu trúc thư mục chuẩn (tạo `services/`, `composables/`, `utils/`, đổi `store` -> `stores`).
- [x] **Task 0.2:** Tái cấu trúc các component Todo (đổi tên và tách thành `Goal base` & `Habit base`).
- [x] **Task 0.3:** Xây dựng Layout hệ thống mới (Sidebar/Navbar cơ bản cho việc điều hướng).
- [x] **Task 0.4:** Thiết lập Service Layer (Mock API bằng LocalStorage) để mô phỏng backend.

---

## Phase 1: Minimum Viable Product (MVP)
Hoàn thành các luồng chức năng tối thiểu để ứng dụng chạy được.
- [x] **Task 1.1:** Phát triển tính năng Authentication (Đăng ký, Đăng nhập, Đăng xuất - xử lý Mock/Local).
- [x] **Task 1.2:** Xây dựng module Quản lý Mục tiêu - Goals (View, Create, Edit, Delete).
- [x] **Task 1.3:** Xây dựng module Quản lý Thói quen - Habits (View, Create, Nút Check hoàn thành hàng ngày).
- [x] **Task 1.4:** Thiết kế và xây dựng trang `DashboardView` (Hiển thị list Habits hôm nay, tổng quan 1 vài Goals).
- [x] **Task 1.5:** Cấu hình và kết nối hệ thống Vue Router liên kết tất cả các trang của Phase 1.

---

## Phase 2: Core Product
Nâng cấp để ứng dụng thực sự trở thành công cụ phát triển bản thân.
- [ ] **Task 2.1:** Thêm tính năng **Milestones** cho Goals (Chia nhỏ mục tiêu lớn thành các chặng nhỏ).
- [ ] **Task 2.2:** Xây dựng **Habit Calendar** (Lịch trực quan hiển thị lịch sử check một thói quen trong tháng).
- [ ] **Task 2.3:** Xây dựng module **Nhật ký (Journal / Reflection)** (Ghi chép log cảm xúc/phản tư mỗi ngày).
- [ ] **Task 2.4:** Xây dựng module **Analytics / Thống kê** sơ bộ (Biểu đồ tròn/tiến độ đơn giản cho Goals/Habits).

---

## Phase 3: UX Improvements
Đánh bóng, cải thiện trải nghiệm người dùng (UX) và giao diện (UI).
- [ ] **Task 3.1:** Viết logic hệ thống đếm chuỗi Habit (Streak counter) và hiển thị lên UI.
- [ ] **Task 3.2:** Thêm bộ lọc & phân loại Mục tiêu (Goal Categories/Tags).
- [ ] **Task 3.3:** Tích hợp tính năng **Drag & Drop** (Kéo thả sắp xếp nhiệm vụ hoặc đổi trạng thái milestone).
- [ ] **Task 3.4:** Hoàn thiện chế độ **Dark/Light Mode** từ settingStore sẵn có.
- [ ] **Task 3.5:** Tích hợp thư viện đồ thị mạnh mẽ (như `Chart.js` hoặc `ApexCharts`) vào module Analytics.

---

## Phase 4: Advanced Features & Backend 
Tính năng mở rộng hoặc đưa app lên môi trường thực tế (Production).
- [ ] **Task 4.1:** Tích hợp RESTful API thật sự (Thay thế Mock LocalStorage bằng kết nối backend Node.js).
- [ ] **Task 4.2:** Tích hợp **AI Goal Coach** (Kết nối OpenAI/Gemini API để gợi ý thói quen/mục tiêu tự động).
- [ ] **Task 4.3:** Xây dựng hệ thống Game hóa - **Gamification** (Cấp độ/Levels, Điểm XP, Huy hiệu Badges).
- [ ] **Task 4.4:** Advanced Analytics (Tính điểm năng suất tổng quát, nhận định xu hướng dài hạn).
- [ ] **Task 4.5:** Tính năng Thông báo (Web Push Notifications hẹn giờ nhắc nhở check thói quen).
- [ ] **Task 4.6:** Tính năng Cộng đồng/Xã hội (Chia sẻ mục tiêu, Friend challenges - Optional).

---
*Tiến độ dự án có thể được theo dõi và đánh dấu `[x]` vào các mục khi hoàn thành!*
