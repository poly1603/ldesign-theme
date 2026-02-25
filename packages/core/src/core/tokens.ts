import type { DesignTokens } from '../types'

export const defaultTokens: DesignTokens = {
  colors: {
    primary: '#1677ff', primaryLight: '#4096ff', primaryDark: '#0958d9',
    secondary: '#722ed1', success: '#52c41a', warning: '#faad14',
    error: '#ff4d4f', info: '#1677ff',
    background: '#ffffff', surface: '#fafafa',
    text: '#1f1f1f', textSecondary: '#8c8c8c',
    border: '#d9d9d9', divider: '#f0f0f0',
  },
  sizes: { xs: '24px', sm: '32px', md: '40px', lg: '48px', xl: '56px' },
  spacing: { xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '32px', '2xl': '48px' },
  radius: { none: '0', sm: '4px', md: '8px', lg: '12px', xl: '16px', full: '9999px' },
  shadows: {
    none: 'none', sm: '0 1px 2px 0 rgba(0,0,0,0.05)',
    md: '0 4px 6px -1px rgba(0,0,0,0.1)', lg: '0 10px 15px -3px rgba(0,0,0,0.1)',
    xl: '0 20px 25px -5px rgba(0,0,0,0.1)',
  },
  typography: {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    fontFamilyMono: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace",
    fontSizeXs: '12px', fontSizeSm: '14px', fontSizeMd: '16px',
    fontSizeLg: '18px', fontSizeXl: '20px', fontSize2xl: '24px',
    fontWeightNormal: '400', fontWeightMedium: '500', fontWeightBold: '600',
    lineHeightTight: '1.25', lineHeightNormal: '1.5', lineHeightRelaxed: '1.75',
  },
}

export const defaultDarkOverrides: Partial<DesignTokens> = {
  colors: {
    primary: '#4096ff', primaryLight: '#69b1ff', primaryDark: '#1677ff',
    secondary: '#9254de', success: '#73d13d', warning: '#ffc53d',
    error: '#ff7875', info: '#4096ff',
    background: '#141414', surface: '#1f1f1f',
    text: '#ffffffd9', textSecondary: '#ffffff73',
    border: '#424242', divider: '#303030',
  },
}

export function createDesignTokens(overrides?: Partial<DesignTokens>): DesignTokens {
  if (!overrides) return { ...defaultTokens }
  return deepMerge({ ...defaultTokens }, overrides) as DesignTokens
}

function deepMerge(target: any, source: any): any {
  const result = { ...target }
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(target[key] || {}, source[key])
    } else result[key] = source[key]
  }
  return result
}
