import type { App } from 'vue'
import { inject } from 'vue'
import { ThemeManager } from '@ldesign/theme-core'
import type { ThemeConfig } from '@ldesign/theme-core'

export function createThemePlugin(config?: Partial<ThemeConfig>) {
  const manager = new ThemeManager(config)
  return {
    install(app: App) {
      app.provide('ldesign-theme', manager)
      app.config.globalProperties.$theme = manager
      if (typeof document !== 'undefined') manager.apply()
    },
    manager,
  }
}

export function useThemeManager(): ThemeManager {
  const manager = inject<ThemeManager>('ldesign-theme')
  if (!manager) throw new Error('ThemeManager not provided. Use createThemePlugin().')
  return manager
}
