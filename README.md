# 🚀 Fullstack Starter Kit – The Modern AI Software Developer (modern-ai-starter-kit)

> Bộ khung mẫu chuẩn (Fullstack Starter Template) phục vụ học phần **Course 4: The Modern AI Software Developer (ADLC01)**.
> Cấu trúc tối ưu cho quy trình lập trình cặp cùng **Claude Code**, tích hợp sẵn React 18, Vite, Node.js Express, TypeScript, Vitest, Zod, Prisma SQLite và GitHub Actions CI.

---

## 🎯 Mục tiêu học tập (Sau khi dùng repo này bạn làm được gì?)
* **Buổi 1–2:** Biết cách đọc và cấu hình file `CLAUDE.md` + `docs/PRD.md` để cung cấp ngữ cảnh chuẩn xác cho AI Agent; dựng khung CRUD.
* **Buổi 3–4:** Áp dụng vòng lặp **Plan → Build → Verify**; viết test tự động trước (TDD) bằng Vitest & Supertest; kích hoạt CI pipeline.
* **Buổi 5–6:** Mở rộng Agent với custom commands (`.claude/commands/test-and-fix.md`) và subagents (`.claude/agents/code-reviewer.md`); tích hợp nhanh giao diện MVP.
* **Buổi 7–10:** Rà soát lỗ hổng bảo mật với Semgrep; deploy lên Render/Vercel; thực hành diễn tập sự cố (Incident Drill) qua endpoint `/health`.

---

## ⚡ Bắt đầu nhanh trong 2 phút (Quickstart)

### 1. Yêu cầu môi trường
* **Node.js**: Phiên bản 22 LTS trở lên (`node -v`)
* **Git**: Đã cài đặt (`git -v`)

### 2. Cài đặt tất cả thư viện (Client + Server)
Từ thư mục gốc dự án:
```bash
npm install
```

### 3. Khởi động môi trường phát triển (Dev Server)
Lệnh sau sẽ khởi động đồng thời cả Backend và Frontend:
```bash
npm run dev
```
* **Frontend**: [http://localhost:5173](http://localhost:5173)
* **Backend API**: [http://localhost:3000/api/tasks](http://localhost:3000/api/tasks)
* **Healthcheck**: [http://localhost:3000/health](http://localhost:3000/health)

---

## 🌊 Dòng chảy một Request (Request Flow)
Dành cho các bạn sinh viên mới làm quen với mô hình Full-stack:
```
[Trình duyệt React: 5173]
       │
       ▼ (gọi fetch(`${API_BASE}/api/tasks`))
[Vite Dev Proxy: /api/*] ──► [Express Server: 3000]
                                     │
                                     ▼
                            [routes/tasks.ts] (Xác thực dữ liệu bằng Zod)
                                     │
                                     ▼
                            [db.ts / SQLite] (Tầng dữ liệu lưu trữ)
```

---

## 🧪 Kiểm thử tự động (Testing)

Khóa học yêu cầu văn hóa viết test và TDD (Test-Driven Development):
```bash
# Chạy toàn bộ Unit & API Tests (Vitest + Supertest)
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
File [CLAUDE.md](CLAUDE.md) đã được cấu hình sẵn để Claude Code tự động nhận diện kiến trúc dự án, quy ước TypeScript strict mode và quy tắc *"Lập kế hoạch trước khi sửa code"*.

### Ví dụ prompt chuẩn:
> *"Tôi muốn thêm thuộc tính `dueDate` (kiểu chuỗi YYYY-MM-DD) vào mỗi Task. Hãy đề xuất một Kế hoạch (Plan) từng bước để cập nhật Zod schema trong `server/src/routes/tasks.ts`, kiểu dữ liệu trong `db.ts`, bổ sung test trong `server/tests/tasks.test.ts`, và cập nhật UI React."*

---

## 📁 Cấu trúc dự án

```
modern-ai-starter-kit/
├── .github/
│   ├── workflows/ci.yml     # GitHub Actions CI tự động kiểm tra lint, test, build (Session 4)
│   └── pull_request_template.md # Mẫu mô tả PR chuẩn công nghiệp (Session 3 & 8)
├── .claude/
│   ├── commands/test-and-fix.md # Lệnh tự động chạy test và sửa lỗi (Session 5)
│   └── agents/code-reviewer.md  # Subagent chuyên review code đối chiếu với main
├── client/                  # Ứng dụng Frontend (React 18 + Vite + TypeScript)
│   ├── src/
│   │   ├── components/      # UI Components (TaskBoard.tsx, ...)
│   │   ├── pages/           # Page views (BoardPage.tsx)
│   │   ├── App.tsx          # Component chính kết nối healthcheck
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts       # Cấu hình proxy tự động sang port 3000
├── server/                  # Ứng dụng Backend (Node.js + Express + TypeScript)
│   ├── prisma/              # Schema SQLite database (Session 2 & 9)
│   ├── src/
│   │   ├── routes/          # API route handlers xác thực bằng Zod (health.ts, tasks.ts)
│   │   ├── app.ts           # Cấu hình Express app và middleware
│   │   ├── db.ts            # Tầng lưu trữ dữ liệu (sử dụng crypto.randomUUID)
│   │   └── index.ts         # Điểm khởi chạy server
│   ├── tests/               # Bộ test Vitest + Supertest
│   └── package.json
├── e2e/                     # Kịch bản kiểm thử Playwright (Session 4)
├── docs/
│   └── PRD.md               # Bản đặc tả yêu cầu sản phẩm mẫu
├── CLAUDE.md                # File ngữ cảnh chuẩn cho Claude Code
├── .env.example             # Biến môi trường mẫu
└── package.json             # Root npm workspace quản lý cả client & server
```

---

## 🛠️ Lệnh thường dùng cho Sinh viên & Trợ giảng

| Lệnh | Ý nghĩa |
| :--- | :--- |
| `npm run dev` | Khởi động đồng thời cả frontend (5173) và backend (3000). |
| `npm test` | Chạy bộ test backend bằng Vitest. |
| `npm run lint` | Quét kiểm tra lỗi kiểu dữ liệu TypeScript. |
| `npm run build` | Kiểm tra compile TypeScript và đóng gói cả 2 phía. |

---

## 🚑 Khi bị kẹt (Troubleshooting)

* **Lỗi trùng cổng 3000 / 5173:** Mở PowerShell gõ `netstat -ano | findstr :3000` rồi `taskkill /PID <số_PID> /F`.
* **Lỗi PowerShell không cho chạy script:** Mở PowerShell với quyền User gõ `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass`.
* **Frontend báo Disconnected:** Kiểm tra xem backend đã chạy chưa bằng cách mở `http://localhost:3000/health`. Nếu chưa, kiểm tra log terminal của server.
* **Hoàn tác nhanh khi AI sửa hỏng code:** Gõ `git restore .` để hủy các thay đổi chưa commit, hoặc `git clean -fd` để xóa file lạ.
