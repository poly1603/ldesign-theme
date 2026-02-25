import type { ThemeConfig, ThemeMode, DesignTokens, ThemePreset, ThemeChangeEvent } from '../types'
import { defaultTokens, defaultDarkOverrides, createDesignTokens } from './tokens'
import { applyTheme } from './css-vars'

type ThemeChangeHandler = (event: ThemeChangeEvent) => void

export class ThemeManager {
  private config: ThemeConfig
  private resolvedMode: 'light' | 'dark' = 'light'
  private mediaQuery: MediaQueryList | null = null
  private listeners: Set<ThemeChangeHandler> = new Set()
  private presets = new Map<string, ThemePreset>()

  constructor(config?: Partial<ThemeConfig>) {
    this.config = {
      mode: config?.mode ?? 'light',
      tokens: config?.tokens ?? { ...defaultTokens },
      darkTokens: config?.darkTokens ?? defaultDarkOverrides,
    }
    this.resolveMode()
  }

  getMode(): ThemeMode { return this.config.mode }
  getResolvedMode(): 'light' | 'dark' { return this.resolvedMode }

  getTokens(): DesignTokens {
    if (this.resolvedMode === 'dark' && this.config.darkTokens) {
      return createDesignTokens({ ...this.config.tokens, ...this.config.darkTokens } as any)
    }
    return this.config.tokens
  }

  setMode(mode: ThemeMode): void { this.config.mode = mode; this.resolveMode(); this.notify() }
  setTokens(tokens: Partial<DesignTokens>): void {
    this.config.tokens = createDesignTokens({ ...this.config.tokens, ...tokens } as any)
    this.notify()
  }
  setPrimaryColor(color: string): void { this.config.tokens.colors.primary = color; this.notify() }

  registerPreset(preset: ThemePreset): void { this.presets.set(preset.name, preset) }
  applyPreset(name: string): void {
    const preset = this.presets.get(name)
    if (!preset) throw new Error(`Theme preset "${name}" not found`)
    this.config.tokens = { ...preset.light }
    this.config.darkTokens = preset.dark
    this.notify()
  }

  apply(target?: HTMLElement): void {
    const tokens = this.getTokens()
    applyTheme(tokens, target)
    const el = target || document.documentElement
    el.setAttribute('data-theme', this.resolvedMode)
    el.classList.remove('light', 'dark')
    el.classList.add(this.resolvedMode)
  }

  onChange(handler: ThemeChangeHandler): () => void {
    this.listeners.add(handler)
    return () => this.listeners.delete(handler)
  }

  destroy(): void {
    this.listeners.clear()
    if (this.mediaQuery) this.mediaQuery.removeEventListener('change', this.handleMediaChange)
  }

  private resolveMode(): void {
    if (this.config.mode === 'auto') {
      if (typeof window !== 'undefined') {
        this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        this.resolvedMode = this.mediaQuery.matches ? 'dark' : 'light'
        this.mediaQuery.addEventListener('change', this.handleMediaChange)
      } else this.resolvedMode = 'light'
    } else this.resolvedMode = this.config.mode
  }

  private handleMediaChange = (e: MediaQueryListEvent): void => {
    this.resolvedMode = e.matches ? 'dark' : 'light'; this.notify()
  }

  private notify(): void {
    const event: ThemeChangeEvent = { mode: this.config.mode, resolvedMode: this.resolvedMode, tokens: this.getTokens() }
    this.listeners.forEach(h => h(event))
  }
}
