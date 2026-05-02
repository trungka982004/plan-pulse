# 🚀 Lộ Trình Phát Triển & Mở Rộng PlanPulse (Expansion Roadmap)

Tài liệu này phác thảo kế hoạch nâng cấp và mở rộng hệ thống **PlanPulse** nhằm tối ưu hóa trải nghiệm người dùng, quản lý năng suất chuyên sâu và xây dựng các tính năng cộng đồng, **không bao gồm việc nâng cấp hay tích hợp thêm các yếu tố AI**.

---

## 🎯 Tổng Quan (Overview)

Mục tiêu của lộ trình này là biến PlanPulse từ một ứng dụng theo dõi cá nhân tiêu chuẩn thành một **hệ sinh thái quản lý năng suất chuyên nghiệp** (Professional Productivity Ecosystem). 

Các trọng tâm chính:
1. **Linh hoạt hóa** hệ thống theo dõi thói quen.
2. **Trực quan hóa** tiến độ thực hiện mục tiêu.
3. **Tích hợp sâu** với các công cụ làm việc khác.
4. **Trò chơi hóa (Gamification)** để tăng cường động lực.

---

## 🛣️ Phương Án Triển Khai Từng Giai Đoạn

### 🟢 Giai Đoạn 1: Nâng Cấp Trải Nghiệm Cốt Lõi (Core Experience)
*Tập trung hoàn thiện và làm sâu sắc thêm các tính năng hiện có.*

*   **Quản lý Thói quen Nâng cao (Advanced Habits):**
    *   Hỗ trợ theo dõi thói quen theo định lượng (ví dụ: *uống 2 lít nước*, *đọc 20 trang sách*).
    *   Hỗ trợ tần suất linh hoạt (ví dụ: *3 lần/tuần* thay vì cố định ngày).
    *   Thêm chế độ **Tạm dừng (Pause/Vacation Mode)** để bảo vệ chuỗi (streak) khi người dùng vắng mặt hợp lý.
*   **Trực quan hóa Mục tiêu (Visual Goals):**
    *   Bổ sung góc nhìn **Kanban Board** cho các Milestones (To-Do, In Progress, Done).
    *   Hiển thị **Mini-Gantt Chart / Timeline** cho tiến độ thời gian của các mục tiêu lớn.
*   **Nhật ký Đa phương tiện (Rich Media Journal):**
    *   Tích hợp Rich Text Editor (Định dạng chữ, danh sách).
    *   Hỗ trợ tải lên hình ảnh đính kèm và gắn thẻ (Tags) cho từng mục nhật ký.

### 🟡 Giai Đoạn 2: Tích Hợp Hệ Sinh Thái (Ecosystem Integrations)
*Kết nối PlanPulse với các thói quen làm việc hàng ngày của người dùng.*

*   **Đồng bộ Lịch (Calendar Sync):**
    *   Kết nối 1 chiều/2 chiều với **Google Calendar** & **Apple Calendar**.
    *   Tự động đẩy các Milestones có hạn chót (Deadline) lên lịch.
*   **Công cụ Tập trung (Focus Mode):**
    *   Tích hợp sẵn **Pomodoro Timer** trên giao diện chính.
    *   Liên kết trực tiếp phiên Pomodoro với các Task/Milestone cụ thể để thống kê thời gian làm việc thực tế (Time Tracking).
*   **Chế độ Ngoại tuyến (Offline Capabilities):**
    *   Ứng dụng PWA (Progressive Web App) với Service Workers được tối ưu.
    *   Cho phép tick hoàn thành thói quen, viết nhật ký khi không có mạng và tự động đồng bộ khi online.

### 🟠 Giai Đoạn 3: Trò Chơi Hóa & Báo Cáo Chuyên Sâu (Gamification & Analytics)
*Tạo động lực duy trì và cung cấp góc nhìn sâu sắc về bản thân.*

*   **Hệ thống Gamification:**
    *   **Huy hiệu (Badges) & Thành tựu (Achievements):** Ví dụ như "Chiến thần 30 ngày Streak", "Người hoàn thành 5 Mục tiêu lớn".
    *   Mở khóa các **Theme** Giao diện độc quyền (Màu sắc, Background) dựa trên Điểm Năng suất (Productivity Score) cao.
*   **Báo Cáo Nâng Cao (Advanced Analytics):**
    *   **Báo Cáo Tương Quan:** Biểu đồ hiển thị sự liên hệ giữa *Tâm trạng (Mood)* và *Tỷ lệ hoàn thành thói quen*.
    *   **Year in Review:** Báo cáo tổng kết năm với phong cách Story/Wrapped sinh động.
    *   Hỗ trợ xuất dữ liệu (Export Data) ra file PDF/CSV.

### 🔴 Giai Đoạn 4: Tính Năng Xã Hội (Social & Accountability)
*Mở rộng không gian cá nhân thành môi trường có sự đồng hành.*

*   **Đối tác Trách nhiệm (Accountability Partners):**
    *   Cho phép người dùng chia sẻ riêng một "Mục tiêu" hoặc "Thói quen" cụ thể cho bạn bè để cùng giám sát và nhắc nhở nhau. (Vẫn giữ tính riêng tư cho các mục khác).
*   **Bảng Xếp Hạng (Leaderboards) Nhóm:**
    *   Tạo các "Group/Nhóm" nhỏ giữa bạn bè/đồng nghiệp để thi đua Điểm Năng suất hàng tuần.

---

## 🛠️ Kiến Trúc Công Nghệ Đề Xuất (Technical Stack Updates)

Để phục vụ lộ trình trên, hệ thống cần bổ sung một số kỹ thuật (vẫn dựa trên Stack hiện tại):
*   **UI/UX:** Tích hợp thêm thư viện Drag & Drop (như `vuedraggable`) cho Kanban Board.
*   **Lịch:** Sử dụng Google Calendar API / iCal.
*   **PWA:** Nâng cấp cấu hình Vite PWA plugin.
*   **Rich Text:** Sử dụng thư viện Editor gọn nhẹ như `Quill.js` hoặc `TiTap` cho Vue 3.

---

*Lưu ý: Lộ trình này được thiết kế theo hướng linh hoạt (Agile). Các giai đoạn có thể được thay đổi thứ tự ưu tiên tùy theo nhu cầu thực tế của người dùng và nguồn lực phát triển.*
