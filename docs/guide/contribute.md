# Quy Trình Thêm Môn Học & Cập Nhật Bài Mới 🛠️

Mỗi khi bạn có một môn học mới hoặc tài liệu mới, bạn chỉ cần thực hiện quy trình 3 bước cực kỳ đơn giản sau:

---

## Bước 1: Thả File Tài Liệu vào `raw_materials/`
Bạn có thể thả bất kỳ tài liệu nào vào thư mục `raw_materials/`:
- **Slide bài giảng:** `Slide_Chuong1.pptx`, `Slide_Chuong2.pptx`
- **Tài liệu Word / PDF:** Giáo trình, đề cương môn học, bài tập lớn.
- **Link website bài giảng:** Ghi danh sách link vào file `raw_materials/links.txt`.

---

## Bước 2: Nhờ Trợ lý AI Bóc Tách & Viết Bài
Bạn chỉ cần nhắn với Trợ lý AI:
> *"Tôi vừa bỏ file `Slide_KienTrucMayTinh.pptx` vào thư mục `raw_materials/`, hãy bóc tách thành các chuyên đề học phần dễ hiểu, tìm nguồn tham khảo uy tín và tạo thành môn mới trên website."*

Hệ thống sẽ:
1. Đọc nội dung tự động bằng script trích xuất `scripts/extract_text.py`.
2. Đối chiếu và tìm kiếm tài nguyên chuẩn trên thế giới.
3. Soạn bài viết tiếng Việt chuẩn xác kèm sơ đồ Mermaid và bảng so sánh.
4. Cập nhật Sidebar và Navbar trong `docs/.vitepress/config.mjs`.

---

## Bước 3: Đẩy lên GitHub Pages
Sau khi bài viết được tạo xong, bạn chỉ cần gõ lệnh git:

```bash
git add .
git commit -m "Thêm môn học mới: Kiến trúc máy tính"
git push origin main
```

**GitHub Actions** sẽ tự động kích hoạt, build website và cập nhật trực tiếp lên địa chỉ `https://<ten_tai_khoan>.github.io/Study_UET/` trong vòng 1-2 phút! Bạn bè của bạn chỉ cần mở link trên điện thoại hoặc máy tính là học được ngay.
