import type { ThemeEnginePluginOptions } from './types'
import { ThemeManager } from '../core/manager'

export const themeStateKeys = {
  MANAGER: 'theme:manager' as const,
  MODE: 'theme:mode' as const,
  TOKENS: 'theme:tokens' as const,
} as const

export const themeEventKeys = {
  INSTALLED: 'theme:installed' as const,
  UNINSTALLED: 'theme:uninstalled' as const,
  MODE_CHANGED: 'theme:modeChanged' as const,
  TOKENS_CHANGED: 'theme:tokensChanged' as const,
} as const

export function createThemeEnginePlugin(options: ThemeEnginePluginOptions = {}) {
  let manager: ThemeManager | null = null

  return {
    name: 'theme',
    version: '1.0.0',
    dependencies: options.dependencies ?? [],

    async install(context: any) {
      const engine = context.engine || context
      manager = new ThemeManager(options)

      manager.onChange((event) => {
        engine.state?.set(themeStateKeys.MODE, event.resolvedMode)
        engine.state?.set(themeStateKeys.TOKENS, event.tokens)
        engine.events?.emit(themeEventKeys.MODE_CHANGED, { mode: event.mode, resolvedMode: event.resolvedMode })
        engine.events?.emit(themeEventKeys.TOKENS_CHANGED, { tokens: event.tokens })
      })

      engine.state?.set(themeStateKeys.MANAGER, manager)
      engine.state?.set(themeStateKeys.MODE, manager.getResolvedMode())
      engine.state?.set(themeStateKeys.TOKENS, manager.getTokens())

      if (options.autoApply !== false && typeof document !== 'undefined') {
        manager.apply()
      }

      engine.events?.emit(themeEventKeys.INSTALLED, { name: 'theme', mode: manager.getResolvedMode() })
      engine.logger?.info('[Theme Plugin] installed')
    },

    async uninstall(context: any) {
      const engine = context.engine || context
      manager?.destroy()
      manager = null
      engine.state?.delete(themeStateKeys.MANAGER)
      engine.state?.delete(themeStateKeys.MODE)
      engine.state?.delete(themeStateKeys.TOKENS)
      engine.events?.emit(themeEventKeys.UNINSTALLED, {})
    },
  }
}
