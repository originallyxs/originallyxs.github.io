(function () {
  // 1. 强制注入 Tailwind CSS
  const tailwindScript = document.createElement('script')
  tailwindScript.src = 'https://cdn.tailwindcss.com'
  tailwindScript.async = true
  document.head.appendChild(tailwindScript)

  // 2. 等 Tailwind 加载完，立刻配置主题：Open Color / Green 全色系
  tailwindScript.onload = function () {
    tailwind.config = {
      theme: {
        // 强制把颜色体系全部换成 Open Color Green
        colors: {
          // Open Color Green 标准色阶
          green: {
            50: '#F0FDF4',
            100: '#D3F9E4',
            200: '#A6F2CE',
            300: '#6CEAAD',
            400: '#36D399',
            500: '#10B981',
            600: '#059669',
            700: '#047857',
            800: '#065F46',
            900: '#064E3B'
          },
          // 把基础色也强制绑定到 green 系
          primary: '#10B981',
          secondary: '#36D399',
          accent: '#059669',
          neutral: '#064E3B',
          white: '#ffffff',
          black: '#000000',
          transparent: 'transparent'
        }
      }
    }

    // 3. 强制全局使用 Tailwind 样式（覆盖原有样式）
    const style = document.createElement('style')
    style.textContent = `
      * {
        @apply box-border m-0 p-0;
      }
      html, body {
        @apply font-sans text-green-900 bg-green-50;
      }
      /* 强制按钮、边框、状态都用 green 色系 */
      button {
        @apply bg-green-600 hover:bg-green-700 text-white rounded transition-colors;
      }
    `
    document.head.appendChild(style)
  }
})()

