import { ref, onMounted, onUnmounted } from 'vue'
import type { ThemeMode } from '@ldesign/theme-core'

export function useThemeMode(initialMode: ThemeMode = 'auto') {
  const mode = ref<ThemeMode>(initialMode)
  const resolvedMode = ref<'light' | 'dark'>('light')
  let mq: MediaQueryList | null = null

  function resolve() {
    resolvedMode.value = mode.value === 'auto'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : mode.value
    document.documentElement.setAttribute('data-theme', resolvedMode.value)
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(resolvedMode.value)
  }

  function setMode(m: ThemeMode) { mode.value = m; resolve() }
  function toggle() { setMode(resolvedMode.value === 'light' ? 'dark' : 'light') }

  onMounted(() => {
    resolve()
    if (mode.value === 'auto') { mq = window.matchMedia('(prefers-color-scheme: dark)'); mq.addEventListener('change', resolve) }
  })
  onUnmounted(() => mq?.removeEventListener('change', resolve))

  return { mode, resolvedMode, setMode, toggle, isDark: () => resolvedMode.value === 'dark' }
}
