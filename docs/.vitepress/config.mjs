import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

const base = process.env.BASE_PATH || (process.env.GITHUB_ACTIONS ? '/Study_UET/' : '/')

export default withMermaid(
  defineConfig({
    base,
    title: 'UET Study Hub',
    description: 'Kho kiến thức ôn tập các môn học UET - Tối giản, trực quan, dễ hiểu',
    lang: 'vi-VN',
    head: [
      ['link', { rel: 'icon', href: '/favicon.ico' }],
      ['meta', { name: 'theme-color', content: '#3eaf7c' }]
    ],
    markdown: {
      math: true,
      lineNumbers: true
    },
    mermaid: {
      theme: 'neutral'
    },
    themeConfig: {
      siteTitle: '📚 UET Study Hub',
      logo: '/logo.svg',
      nav: [
        { text: 'Trang chủ', link: '/' },
        {
          text: 'Học kỳ Hiện tại (5 Môn)',
          items: [
            { text: '🧠 Biểu diễn tri thức & Tìm kiếm nâng cao', link: '/bieu-dien-tri-thuc/' },
            { text: '🤖 Cơ sở toán cho AI', link: '/toan-cho-ai/' },
            { text: '🎲 Xác suất thống kê', link: '/xac-suat-thong-ke/' },
            { text: '🐍 Lập trình xử lý dữ liệu', link: '/xu-ly-du-lieu/' },
            { text: '⚡ Vật lý đại cương 2', link: '/vat-ly-2/' }
          ]
        },
        {
          text: 'Môn học khác',
          items: [
            { text: '⚡ Cấu trúc dữ liệu & Giải thuật', link: '/dsa/' },
            { text: '📐 Toán rời rạc', link: '/discrete-math/' }
          ]
        },
        { text: 'Hướng dẫn học', link: '/guide/' }
      ],
      sidebar: {
        '/bieu-dien-tri-thuc/': [
          {
            text: 'Biểu diễn Tri thức & Tìm kiếm Nâng cao',
            items: [
              { text: '1. Tổng quan & Lộ trình môn học', link: '/bieu-dien-tri-thuc/' },
              { text: '2. Chuyên đề: Tìm kiếm Heuristic, A*, Minimax & FOL', link: '/bieu-dien-tri-thuc/bieu-dien-tri-thuc-va-tim-kiem-nang-cao' }
            ]
          }
        ],
        '/toan-cho-ai/': [
          {
            text: 'Cơ sở Toán cho AI',
            items: [
              { text: '1. Tổng quan & Lộ trình môn học', link: '/toan-cho-ai/' }
            ]
          }
        ],
        '/xac-suat-thong-ke/': [
          {
            text: 'Xác suất Thống kê',
            items: [
              { text: '1. Tổng quan & Lộ trình môn học', link: '/xac-suat-thong-ke/' }
            ]
          }
        ],
        '/xu-ly-du-lieu/': [
          {
            text: 'Lập trình Xử lý Dữ liệu',
            items: [
              { text: '1. Tổng quan & Lộ trình môn học', link: '/xu-ly-du-lieu/' }
            ]
          }
        ],
        '/vat-ly-2/': [
          {
            text: 'Vật lý Đại cương 2',
            items: [
              { text: '1. Tổng quan & Lộ trình môn học', link: '/vat-ly-2/' }
            ]
          }
        ],
        '/dsa/': [
          {
            text: 'Cấu trúc dữ liệu & Giải thuật',
            items: [
              { text: '1. Giới thiệu & Lộ trình học', link: '/dsa/' },
              { text: '2. Phân tích độ phức tạp thuật toán', link: '/dsa/complexity' },
              { text: '3. Thuật toán Sắp xếp (Sorting)', link: '/dsa/sorting' },
              { text: '4. Thuật toán Tìm kiếm (Searching)', link: '/dsa/searching' },
              { text: '5. Cấu trúc Cây & Cây nhị phân', link: '/dsa/trees' },
              { text: '6. Đồ thị & Các thuật toán duyệt', link: '/dsa/graphs' }
            ]
          }
        ],
        '/discrete-math/': [
          {
            text: 'Toán rời rạc',
            items: [
              { text: '1. Tổng quan & Lộ trình', link: '/discrete-math/' },
              { text: '2. Logic mệnh đề & Vị từ', link: '/discrete-math/logic' },
              { text: '3. Quan hệ & Ánh xạ', link: '/discrete-math/relations' },
              { text: '4. Lý thuyết Đồ thị cơ bản', link: '/discrete-math/graph-theory' }
            ]
          }
        ],
        '/guide/': [
          {
            text: 'Hướng dẫn sử dụng Hub',
            items: [
              { text: 'Phương pháp học hiệu quả', link: '/guide/' },
              { text: 'Cách đóng góp & Thêm môn học', link: '/guide/contribute' }
            ]
          }
        ]
      },
      search: {
        provider: 'local',
        options: {
          locales: {
            root: {
              translations: {
                button: {
                  buttonText: 'Tìm kiếm bài học...',
                  buttonAriaLabel: 'Tìm kiếm tài liệu'
                },
                modal: {
                  noResultsText: 'Không tìm thấy kết quả cho',
                  resetButtonTitle: 'Xóa tìm kiếm',
                  footer: {
                    selectText: 'để chọn',
                    navigateText: 'để điều hướng',
                    closeText: 'để đóng'
                  }
                }
              }
            }
          }
        }
      },
      outline: {
        level: [2, 3],
        label: 'Mục lục bài viết'
      },
      docFooter: {
        prev: 'Bài trước',
        next: 'Bài tiếp theo'
      },
      lastUpdated: {
        text: 'Cập nhật lần cuối'
      },
      footer: {
        message: 'Xây dựng với tâm huyết dành cho sinh viên UET 🎓',
        copyright: 'Bản quyền nội dung © 2026 UET Study Hub'
      }
    }
  })
)
