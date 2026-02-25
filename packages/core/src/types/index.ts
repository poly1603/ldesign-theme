export type ThemeMode = 'light' | 'dark' | 'auto'

export interface ColorTokens {
  primary: string; primaryLight: string; primaryDark: string
  secondary: string; success: string; warning: string; error: string; info: string
  background: string; surface: string; text: string; textSecondary: string
  border: string; divider: string
}

export interface SizeTokens { xs: string; sm: string; md: string; lg: string; xl: string }
export interface SpacingTokens { xs: string; sm: string; md: string; lg: string; xl: string; '2xl': string }
export interface RadiusTokens { none: string; sm: string; md: string; lg: string; xl: string; full: string }
export interface ShadowTokens { none: string; sm: string; md: string; lg: string; xl: string }

export interface TypographyTokens {
  fontFamily: string; fontFamilyMono: string
  fontSizeXs: string; fontSizeSm: string; fontSizeMd: string
  fontSizeLg: string; fontSizeXl: string; fontSize2xl: string
  fontWeightNormal: string; fontWeightMedium: string; fontWeightBold: string
  lineHeightTight: string; lineHeightNormal: string; lineHeightRelaxed: string
}

export interface DesignTokens {
  colors: ColorTokens; sizes: SizeTokens; spacing: SpacingTokens
  radius: RadiusTokens; shadows: ShadowTokens; typography: TypographyTokens
}

export interface ThemeConfig { mode: ThemeMode; tokens: DesignTokens; darkTokens?: Partial<DesignTokens> }
export interface ThemePreset { name: string; light: DesignTokens; dark: Partial<DesignTokens> }
export interface ThemeChangeEvent { mode: ThemeMode; resolvedMode: 'light' | 'dark'; tokens: DesignTokens }
