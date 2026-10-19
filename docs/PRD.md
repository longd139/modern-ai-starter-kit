# Product Requirements Document (PRD)

## 1. Product Overview
- **Project Name:** Team Task Board
- **Target Audience:** Sinh viên và nhóm phát triển phần mềm cần quản lý công việc và tích hợp AI.
- **Problem Statement:** Các công cụ quản lý tác vụ hiện tại thường rườm rà hoặc thiếu khả năng tương tác nhanh với AI assistant. Ứng dụng này cung cấp bảng công việc linh hoạt, nhẹ và có API chuẩn cho AI agent tương tác.

## 2. Core User Stories (Must-Have for MVP)
1. **US1 - Xem danh sách công việc:** Là người dùng, tôi muốn xem các thẻ công việc được phân nhóm theo trạng thái (`todo`, `in_progress`, `done`).
2. **US2 - Tạo công việc mới:** Là người dùng, tôi có thể nhập tiêu đề, mô tả và độ ưu tiên (`low`, `medium`, `high`) để tạo thẻ mới.
3. **US3 - Chuyển trạng thái công việc:** Là người dùng, tôi có thể cập nhật trạng thái của một công việc sang cột tiếp theo.
4. **US4 - Xóa công việc:** Là người dùng, tôi có thể xóa các công việc đã hoàn thành hoặc không còn cần thiết.

## 3. Data Schema
### Task Entity
```typescript
interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
}
```

## 4. API Endpoints
- `GET /health` -> `{ status: "ok", uptime: number }`
- `GET /api/tasks` -> Danh sách tất cả tasks
- `POST /api/tasks` -> Tạo task mới `{ title, description, priority? }`
- `PATCH /api/tasks/:id` -> Cập nhật task `{ status?, title?, description?, priority? }`
- `DELETE /api/tasks/:id` -> Xóa task
