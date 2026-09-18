# 📚 UET Study Hub

Nền tảng website ôn tập và tổng hợp bài giảng môn học dành cho sinh viên UET.  
Được thiết kế tối giản, trực quan, giải thích bản chất theo phương pháp Feynman, tích hợp công thức toán học KaTeX, sơ đồ thuật toán Mermaid và triển khai hoàn toàn tự động lên **GitHub Pages**.

---

## 🚀 Hướng Dẫn Chạy Thử Trên Máy Cá Nhân (Localhost)

1. **Cài đặt thư viện (chỉ cần chạy lần đầu):**
   ```bash
   npm install
   ```

2. **Khởi chạy môi trường phát triển (Dev Server):**
   ```bash
   npm run docs:dev
   ```
   Mở trình duyệt truy cập: `http://localhost:5173` để xem website trực tiếp với tính năng cập nhật tức thì (Hot Module Replacement).

3. **Build thử bản tĩnh (Production Build):**
   ```bash
   npm run docs:build
   ```

---

## 🌐 Hướng Dẫn Đưa Lên GitHub Pages Để Chia Sẻ Cho Bạn Bè

Để website tự động xuất bản lên địa chỉ `https://<ten_tai_khoan_github>.github.io/Study_UET/`:

1. **Tạo Repository mới trên GitHub:**
   - Đặt tên repository là `Study_UET` (hoặc tên tùy thích).
   - Để chế độ **Public**.

2. **Đẩy mã nguồn từ máy lên GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Khởi tạo UET Study Hub"
   git branch -M main
   git remote add origin https://github.com/<ten_tai_khoan_cua_ban>/Study_UET.git
   git push -u origin main
   ```

3. **Kích hoạt GitHub Pages:**
   - Vào repository trên GitHub $\rightarrow$ chọn tab **Settings**.
   - Ở cột bên trái, chọn mục **Pages**.
   - Tại phần **Build and deployment > Source**, chọn: **GitHub Actions**.
   - Sau đó chỉ cần đợi 1–2 phút, GitHub Actions sẽ tự động build và cung cấp cho bạn đường link website hoàn chỉnh!

---

## 📂 Cấu Trúc Thư Mục

```text
Study_UET/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions tự động build & deploy Pages
├── docs/                       # Toàn bộ nội dung bài học (Markdown)
│   ├── .vitepress/
│   │   └── config.mjs          # Cấu hình thanh điều hướng, tìm kiếm, KaTeX, Mermaid
│   ├── public/                 # Logo, favicon, ảnh tài liệu
│   ├── dsa/                    # Chuyên đề Cấu trúc dữ liệu & Giải thuật
│   ├── discrete-math/          # Chuyên đề Toán rời rạc
│   ├── guide/                  # Hướng dẫn ôn tập & đóng góp
│   └── index.md                # Trang chủ website
├── raw_materials/              # Nơi thả slide PPTX, PDF, Word, links bài giảng gốc
├── scripts/
│   └── extract_text.py         # Script Python bóc tách text từ file tài liệu
├── package.json
└── README.md
```
