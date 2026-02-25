import { defineConfig } from '@ldesign/builder'

export default defineConfig({
  input: 'src/index.ts',
  output: [
    { format: 'esm', dir: 'es', preserveModules: true, preserveModulesRoot: 'src' },
    { format: 'cjs', dir: 'lib', preserveModules: true, preserveModulesRoot: 'src' },
    { format: 'umd', dir: 'dist', name: 'LDesignThemeVue' },
  ],
  external: ['vue', '@ldesign/theme-core'],
  dts: true,
  clean: true,
})
