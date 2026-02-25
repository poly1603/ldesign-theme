import type { DesignTokens } from '../types'

export function generateCSSVariables(tokens: DesignTokens, prefix = 'ld'): Record<string, string> {
  const vars: Record<string, string> = {}
  function flatten(obj: any, path: string) {
    for (const [key, value] of Object.entries(obj)) {
      const varName = path ? `--${path}-${camelToKebab(key)}` : `--${prefix}-${camelToKebab(key)}`
      if (typeof value === 'object' && value !== null) {
        flatten(value, path ? `${path}-${camelToKebab(key)}` : `${prefix}-${camelToKebab(key)}`)
      } else vars[varName] = String(value)
    }
  }
  flatten(tokens, '')
  return vars
}

export function applyTheme(tokens: DesignTokens, target?: HTMLElement, prefix?: string): void {
  const el = target || document.documentElement
  const vars = generateCSSVariables(tokens, prefix)
  for (const [key, value] of Object.entries(vars)) el.style.setProperty(key, value)
}

function camelToKebab(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').replace(/([A-Z])([A-Z][a-z])/g, '$1-$2').toLowerCase()
}
