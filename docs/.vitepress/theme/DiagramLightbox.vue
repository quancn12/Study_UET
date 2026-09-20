<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const isOpen = ref(false)
const mediaType = ref('svg') // 'svg' or 'img'
const svgContent = ref('')
const imgSrc = ref('')
const scale = ref(1)
const translateX = ref(0)
const translateY = ref(0)
const isDragging = ref(false)
const dragStart = { x: 0, y: 0 }

// Open lightbox with SVG or Image
const openWithSvg = (svgHtml) => {
  mediaType.value = 'svg'
  // Remove restricting inline width / max-width so the SVG can scale freely in lightbox
  const cleanSvg = svgHtml.replace(/style="[^"]*"/i, '')
  svgContent.value = cleanSvg
  resetTransform()
  isOpen.value = true
  document.body.style.overflow = 'hidden'
}

const openWithImg = (src) => {
  mediaType.value = 'img'
  imgSrc.value = src
  resetTransform()
  isOpen.value = true
  document.body.style.overflow = 'hidden'
}

const close = () => {
  isOpen.value = false
  document.body.style.overflow = ''
}

const resetTransform = () => {
  scale.value = 1
  translateX.value = 0
  translateY.value = 0
}

const zoomIn = () => {
  scale.value = Math.min(scale.value * 1.25, 4)
}

const zoomOut = () => {
  scale.value = Math.max(scale.value / 1.25, 0.4)
}

// Wheel zoom
const handleWheel = (e) => {
  e.preventDefault()
  if (e.deltaY < 0) {
    zoomIn()
  } else {
    zoomOut()
  }
}

// Drag / Pan handlers
const handleMouseDown = (e) => {
  if (e.target.closest('.lightbox-controls')) return
  isDragging.value = true
  dragStart.x = e.clientX - translateX.value
  dragStart.y = e.clientY - translateY.value
}

const handleMouseMove = (e) => {
  if (!isDragging.value) return
  translateX.value = e.clientX - dragStart.x
  translateY.value = e.clientY - dragStart.y
}

const handleMouseUp = () => {
  isDragging.value = false
}

// Keyboard navigation (Esc to close, + / - to zoom)
const handleKeyDown = (e) => {
  if (!isOpen.value) return
  if (e.key === 'Escape') close()
  if (e.key === '+' || e.key === '=') zoomIn()
  if (e.key === '-') zoomOut()
  if (e.key === '0') resetTransform()
}

// Attach click handlers to all .mermaid containers and .vp-doc images
const attachListeners = () => {
  nextTick(() => {
    // 1. Mermaid diagrams
    const mermaidContainers = document.querySelectorAll('.mermaid')
    mermaidContainers.forEach((container) => {
      if (container.dataset.zoomBound) return
      container.dataset.zoomBound = 'true'

      // Add badge
      if (!container.querySelector('.mermaid-zoom-btn')) {
        const btn = document.createElement('button')
        btn.className = 'mermaid-zoom-btn'
        btn.innerHTML = '🔍 <span>Phóng to</span>'
        btn.title = 'Nhấp để mở chế độ xem toàn màn hình và thu phóng'
        btn.onclick = (e) => {
          e.stopPropagation()
          const svg = container.querySelector('svg')
          if (svg) openWithSvg(svg.outerHTML)
        }
        container.appendChild(btn)
      }

      container.onclick = (e) => {
        // don't trigger if clicked a link inside diagram
        if (e.target.closest('a')) return
        const svg = container.querySelector('svg')
        if (svg) openWithSvg(svg.outerHTML)
      }
    })

    // 2. Images in document
    const images = document.querySelectorAll('.vp-doc img:not(.no-zoom)')
    images.forEach((img) => {
      if (img.dataset.zoomBound) return
      img.dataset.zoomBound = 'true'
      img.style.cursor = 'zoom-in'
      img.onclick = () => openWithImg(img.src)
    })
  })
}

let observer = null

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  attachListeners()

  // Observe dynamically rendered mermaid SVGs or page content
  observer = new MutationObserver(() => {
    attachListeners()
  })
  observer.observe(document.body, { childList: true, subtree: true })
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  if (observer) observer.disconnect()
})
</script>

<template>
  <Teleport to="body">
    <Transition name="lightbox-fade">
      <div
        v-if="isOpen"
        class="diagram-lightbox-backdrop"
        @click.self="close"
        @wheel="handleWheel"
        @mousedown="handleMouseDown"
        @mousemove="handleMouseMove"
        @mouseup="handleMouseUp"
        @mouseleave="handleMouseUp"
      >
        <!-- Top Toolbar -->
        <div class="lightbox-controls" @click.stop>
          <div class="lightbox-hint">
            <span>💡 Cuộn chuột / phím +/- để phóng to • Kéo chuột để di chuyển</span>
          </div>
          <div class="lightbox-actions">
            <button class="ctrl-btn" title="Thu nhỏ (-)" @click="zoomOut">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
            </button>
            <span class="zoom-level">{{ Math.round(scale * 100) }}%</span>
            <button class="ctrl-btn" title="Phóng to (+)" @click="zoomIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="11" y1="8" x2="11" y2="14"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
            </button>
            <button class="ctrl-btn" title="Kích thước gốc (0)" @click="resetTransform">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                <path d="M3 3v5h5"></path>
              </svg>
            </button>
            <button class="ctrl-btn close-btn" title="Đóng (Esc)" @click="close">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        <!-- Canvas Area -->
        <div
          class="lightbox-canvas"
          :style="{
            transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
            cursor: isDragging ? 'grabbing' : 'grab'
          }"
        >
          <div
            v-if="mediaType === 'svg'"
            class="lightbox-svg-wrapper"
            v-html="svgContent"
          ></div>
          <img
            v-else-if="mediaType === 'img'"
            :src="imgSrc"
            class="lightbox-img"
            alt="Phóng to ảnh"
          />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.diagram-lightbox-backdrop {
  position: fixed;
  inset: 0;
  z-index: 99999;
  background-color: rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  user-select: none;
}

.lightbox-controls {
  position: absolute;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100000;
  display: flex;
  align-items: center;
  gap: 16px;
  background: rgba(30, 41, 59, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
  padding: 8px 16px;
  border-radius: 9999px;
  color: #f8fafc;
}

.lightbox-hint {
  font-size: 13px;
  color: #cbd5e1;
  padding-right: 8px;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
}

@media (max-width: 768px) {
  .lightbox-hint {
    display: none;
  }
}

.lightbox-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.ctrl-btn {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #f8fafc;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
}

.ctrl-btn:hover {
  background: rgba(255, 255, 255, 0.25);
  color: #ffffff;
  transform: scale(1.05);
}

.ctrl-btn.close-btn {
  background: rgba(239, 68, 68, 0.2);
  color: #fca5a5;
  margin-left: 4px;
}

.ctrl-btn.close-btn:hover {
  background: rgba(239, 68, 68, 0.6);
  color: #ffffff;
}

.zoom-level {
  font-size: 13px;
  font-weight: 600;
  min-width: 44px;
  text-align: center;
  color: #93c5fd;
}

.lightbox-canvas {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 90vw;
  max-height: 85vh;
  transition: transform 0.05s linear;
}

.lightbox-svg-wrapper {
  background: #ffffff;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 88vw;
  max-height: 82vh;
  overflow: visible;
}

.dark .lightbox-svg-wrapper {
  background: #1e293b;
  border: 1px solid #334155;
}

.lightbox-svg-wrapper :deep(svg) {
  display: block !important;
  min-width: min(80vw, 850px) !important;
  max-width: 85vw !important;
  max-height: 75vh !important;
  width: auto !important;
  height: auto !important;
}

.lightbox-img {
  max-width: 88vw;
  max-height: 82vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

/* Transitions */
.lightbox-fade-enter-active,
.lightbox-fade-leave-active {
  transition: opacity 0.2s ease;
}

.lightbox-fade-enter-from,
.lightbox-fade-leave-to {
  opacity: 0;
}
</style>
