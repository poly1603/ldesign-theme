import { ref, computed, onUnmounted, inject, watchEffect } from 'vue'
import { ThemeManager } from '@ldesign/theme-core'
import type { ThemeMode, DesignTokens } from '@ldesign/theme-core'

export function useTheme(config?: { mode?: ThemeMode; autoApply?: boolean }) {
  const injected = inject<ThemeManager>('ldesign-theme', undefined)
  const manager = injected || new ThemeManager({ mode: config?.mode ?? 'light' })

  const mode = ref<ThemeMode>(manager.getMode())
  const resolvedMode = ref(manager.getResolvedMode())
  const tokens = ref(manager.getTokens())
  const isDark = computed(() => resolvedMode.value === 'dark')

  const unsub = manager.onChange((event) => {
    mode.value = event.mode; resolvedMode.value = event.resolvedMode; tokens.value = event.tokens
  })

  function setMode(m: ThemeMode) { manager.setMode(m) }
  function toggleMode() { setMode(resolvedMode.value === 'light' ? 'dark' : 'light') }
  function setPrimaryColor(color: string) { manager.setPrimaryColor(color) }
  function setTokens(partial: Partial<DesignTokens>) { manager.setTokens(partial) }

  if (config?.autoApply !== false) { watchEffect(() => manager.apply()) }
  onUnmounted(() => unsub())

  return { mode, resolvedMode, tokens, isDark, setMode, toggleMode, setPrimaryColor, setTokens, manager }
}
