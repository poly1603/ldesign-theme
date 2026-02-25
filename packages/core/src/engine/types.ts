import type { ThemeConfig } from '../types'

export interface ThemeEnginePluginOptions extends Partial<ThemeConfig> {
  autoApply?: boolean
  dependencies?: string[]
}
