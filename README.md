# 🚀 Fullstack Starter Kit – The Modern AI Software Developer

> Bộ khung chuẩn (Fullstack Starter Template) phục vụ khóa học **Course 4: The Modern AI Software Developer**.
> Cấu trúc tối ưu cho làm việc cùng **Claude Code**, tích hợp sẵn TypeScript, React Vite, Express, Vitest và GitHub Actions CI.

---

## ⚡ Bắt đầu nhanh trong 2 phút (Quickstart)

### 1. Yêu cầu môi trường
- **Node.js**: Phiên bản 20 trở lên (`node -v`)
- **Git**: Đã cài đặt (`git -v`)

### 2. Cài đặt tất cả thư viện (Client + Server)
Từ thư mục gốc dự án:
```bash
npm install
```

### 3. Khởi động môi trường phát triển (Dev Server)
Lệnh này sẽ tự động khởi động đồng thời cả Backend và Frontend:
```bash
npm run dev
```
* **Frontend**: [http://localhost:5173](http://localhost:5173)
* **Backend API**: [http://localhost:3000/api/tasks](http://localhost:3000/api/tasks)
* **Healthcheck**: [http://localhost:3000/health](http://localhost:3000/health)

---

## 🧪 Kiểm thử (Testing)

Khóa học yêu cầu văn hóa viết test và TDD (Test-Driven Development):
```bash
# Chạy toàn bộ Unit & API Tests
npm test

# Chạy test và theo dõi thay đổi (Watch mode)
npm --workspace=server run test:watch

# Xem báo cáo độ bao phủ mã (Coverage)
npm run test:coverage
```

---

## 🤖 Sử dụng cùng Claude Code

Mở terminal tại thư mục gốc của dự án này và chạy:
```bash
claude
```
File [CLAUDE.md](file:///d:/FPT/project/Course4_ModernAISoftwareDeveloper_Materials/Starter_Kit_Template/CLAUDE.md) đã được cấu hình sẵn để Claude Code tự động nhận diện quy tắc kiến trúc, quy ước đặt tên và các lệnh chạy kiểm thử.

### Ví dụ prompt chuẩn cho Buổi 1 & 2:
> *"Tôi muốn thêm thuộc tính `dueDate` (kiểu ngày tháng YYYY-MM-DD) vào mỗi Task. Hãy lập kế hoạch (Plan) cập nhật backend types, db.ts, route validation, bổ sung unit test, và cập nhật giao diện React."*

---

## 📁 Cấu trúc dự án

```
Starter_Kit_Template/
├── .github/workflows/
│   └── ci.yml               # GitHub Actions CI tự động chạy test khi push code (Session 4)
├── client/                  # Ứng dụng Frontend (React + Vite + TypeScript)
│   ├── src/
│   │   ├── components/      # UI Components (TaskBoard.tsx, ...)
│   │   ├── App.tsx          # Component chính kết nối healthcheck
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts       # Cấu hình proxy tự động sang port 3000
├── server/                  # Ứng dụng Backend (Node.js + Express + TypeScript)
│   ├── src/
│   │   ├── routes/          # API route handlers (health.ts, tasks.ts)
│   │   ├── app.ts           # Cấu hình Express app và middleware
│   │   ├── db.ts            # Tầng lưu trữ dữ liệu
│   │   └── index.ts         # Điểm khởi chạy server
│   ├── tests/               # Bộ test Vitest + Supertest
│   └── package.json
├── docs/
│   └── PRD.md               # Bản đặc tả yêu cầu sản phẩm mẫu
├── CLAUDE.md                # File ngữ cảnh chuẩn cho Claude Code
├── .env.example             # Biến môi trường mẫu
└── package.json             # Root npm workspace quản lý cả client & server
```

---

## 🛠️ Lệnh thường dùng cho Trợ giảng & Học viên

| Lệnh | Ý nghĩa |
| :--- | :--- |
| `npm run dev` | Khởi động đồng thời cả frontend (5173) và backend (3000). |
| `npm test` | Chạy bộ test backend bằng Vitest. |
| `npm run build` | Kiểm tra compile TypeScript và đóng gói cả 2 phía. |
| `npm run lint` | Quét kiểm tra lỗi kiểu dữ liệu TypeScript không cần build. |
