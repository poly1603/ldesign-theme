<script setup lang="ts">
import { provide } from 'vue'
import { ThemeManager } from '@ldesign/theme-core'
import { useTheme } from '@ldesign/theme-vue'

const manager = new ThemeManager({ mode: 'light' })
provide('ldesign-theme', manager)

const { mode, resolvedMode, isDark, tokens, setMode, toggleMode, setPrimaryColor } = useTheme({ autoApply: true })

const colors = ['#1677ff', '#722ed1', '#13c2c2', '#52c41a', '#fa541c', '#eb2f96']
</script>

<template>
  <div style="max-width: 600px; margin: 40px auto; font-family: sans-serif; transition: all 0.3s;"
       :style="{ background: tokens.colors.background, color: tokens.colors.text }">
    <h1>@ldesign/theme Playground</h1>

    <section style="margin-bottom: 24px;">
      <h2>主题模式</h2>
      <p>当前: <strong>{{ mode }}</strong> (解析为: {{ resolvedMode }}) {{ isDark ? '🌙' : '☀️' }}</p>
      <button @click="setMode('light')" style="padding:8px 16px;margin-right:8px;">Light</button>
      <button @click="setMode('dark')" style="padding:8px 16px;margin-right:8px;">Dark</button>
      <button @click="setMode('auto')" style="padding:8px 16px;margin-right:8px;">Auto</button>
      <button @click="toggleMode" style="padding:8px 16px;">Toggle</button>
    </section>

    <section style="margin-bottom: 24px;">
      <h2>主色调</h2>
      <div style="display:flex;gap:8px;">
        <button v-for="c in colors" :key="c" @click="setPrimaryColor(c)"
          :style="{ width:'36px',height:'36px',borderRadius:'50%',background:c,border: tokens.colors.primary === c ? '3px solid #333' : '2px solid #ddd',cursor:'pointer' }" />
      </div>
      <p style="margin-top:8px;">Primary: <code>{{ tokens.colors.primary }}</code></p>
    </section>

    <section style="margin-bottom: 24px;">
      <h2>设计令牌预览</h2>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <div v-for="(val, key) in tokens.colors" :key="key"
          :style="{ width:'60px',height:'40px',background:val,borderRadius:'6px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'10px',color: key.includes('background') || key.includes('surface') || key.includes('divider') ? '#333' : '#fff' }">
          {{ key }}
        </div>
      </div>
    </section>

    <section>
      <h2>间距 &amp; 圆角</h2>
      <div style="display:flex;gap:12px;align-items:flex-end;">
        <div v-for="(val, key) in tokens.spacing" :key="key"
          :style="{ width:val,height:val,background:tokens.colors.primary,borderRadius:tokens.radius.md }">
        </div>
      </div>
      <p style="font-size:12px;color:#999;margin-top:8px;">尺寸: xs → 2xl</p>
    </section>
  </div>
</template>
