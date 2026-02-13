(function () {
  // 1. 创建加载蒙版
  const mask = document.createElement('div')
  mask.id = 'loading-mask'
  mask.innerHTML = `<div class="loading-spinner"></div>`
  document.body.appendChild(mask)

  // 兜底基础样式
  mask.style.cssText = `
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.8s cubic-bezier(0.25, 0.1, 0.25, 1);
  `

  // 2. 加载 Tailwind
  const tw = document.createElement('script')
  tw.src = 'https://cdn.tailwindcss.com'
  tw.async = true
  document.head.appendChild(tw)

  tw.onload = function () {
    tailwind.config = {
      theme: {
        colors: {
          green: {
            50: '#F0FDF4', 100: '#D3F9E4', 200: '#A6F2CE',
            300: '#6CEAAD', 400: '#36D399', 500: '#10B981',
            600: '#059669', 700: '#047857', 800: '#065F46',
            900: '#064E3B'
          },
          white: '#fff', black: '#000', transparent: 'transparent'
        }
      }
    }

    // 蒙版：完全不透明 + 非线性动画
    const maskStyle = document.createElement('style')
    maskStyle.textContent = `
      /* 亮色模式 - 完全不透明 */
      #loading-mask {
        background: #F0FDF4;
        backdrop-filter: blur(6px);
      }
      /* 暗色模式 - 完全不透明 */
      @media (prefers-color-scheme: dark) {
        #loading-mask {
          background: #064E3B;
          backdrop-filter: blur(6px);
        }
      }
      /* 非线性旋转动画 */
      .loading-spinner {
        width: 40px;
        height: 40px;
        border: 3px solid #D3F9E4;
        border-top-color: #10B981;
        border-radius: 50%;
        animation: spin 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
      }
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
      /* 非线性淡出 */
      #loading-mask.fade-out {
        opacity: 0;
        pointer-events: none;
      }
    `
    document.head.appendChild(maskStyle)
  }

  // 3. 页面加载完成后渐隐
  window.addEventListener('load', function () {
    setTimeout(() => {
      mask.classList.add('fade-out')
      setTimeout(() => mask.remove(), 800)
    }, 200)
  })
})()
