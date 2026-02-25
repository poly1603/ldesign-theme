import { inject, computed } from 'vue'
import { ThemeManager, defaultTokens } from '@ldesign/theme-core'
import type { DesignTokens } from '@ldesign/theme-core'

export function useDesignTokens() {
  const manager = inject<ThemeManager>('ldesign-theme', undefined)
  const tokens = computed<DesignTokens>(() => manager?.getTokens() ?? defaultTokens)
  const colors = computed(() => tokens.value.colors)
  const sizes = computed(() => tokens.value.sizes)
  const spacing = computed(() => tokens.value.spacing)
  const radius = computed(() => tokens.value.radius)
  const shadows = computed(() => tokens.value.shadows)
  const typography = computed(() => tokens.value.typography)

  return { tokens, colors, sizes, spacing, radius, shadows, typography }
}
