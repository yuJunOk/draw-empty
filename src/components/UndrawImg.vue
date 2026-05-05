<script setup lang="ts">
/** 中文名：内联插图 · UndrawImg — 从 assets 加载原始 SVG 并可替换主色 */
import { computed, inject } from 'vue'
import { drawEmptyDefaultAccentKey } from '../injection'

const props = withDefaults(
  defineProps<{
    /** undraw-illustrations 下文件名（不含 .svg），与官网英文标题一致（可含空格，如 Signed Document） */
    name: string
    width?: string | number
    height?: string | number
    alt?: string
    /**
     * 插图主色（HEX，如 #2563EB）。传入时将替换资源中的常见 unDraw / 演示蓝紫色；
     * 不传则保持 SVG 文件原有配色。
     */
    accentColor?: string
  }>(),
  {
    width: '160px',
    height: 'auto',
    alt: '',
    accentColor: undefined,
  },
)

const injectedAccent = inject(drawEmptyDefaultAccentKey, undefined)
const effectiveAccent = computed(() => props.accentColor ?? injectedAccent)

const rawModules = import.meta.glob('../assets/undraw-illustrations/*.svg', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

function hexToRgbCss(hex: string): string | null {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.trim())
  if (!m) return null
  return `rgb(${parseInt(m[1], 16)}, ${parseInt(m[2], 16)}, ${parseInt(m[3], 16)})`
}

/** 将演示与 unDraw 默认主色替换为 accentColor */
function applyAccent(svg: string, hex: string): string {
  const trimmed = hex.trim()
  const rgb = hexToRgbCss(trimmed)
  let out = svg
  out = out.replace(/#2563eb/gi, trimmed)
  out = out.replace(/#6c63ff/gi, trimmed)
  if (rgb) {
    out = out.replace(/rgb\(\s*37\s*,\s*99\s*,\s*235\s*\)/gi, rgb)
    out = out.replace(/rgb\(\s*108\s*,\s*99\s*,\s*255\s*\)/gi, rgb)
  }
  return out
}

const svgHtml = computed(() => {
  const key = `../assets/undraw-illustrations/${props.name}.svg`
  let raw = rawModules[key] ?? ''
  if (!raw) return ''
  const hex = effectiveAccent.value
  if (hex) {
    raw = applyAccent(raw, hex)
  }
  return raw
})

const altText = computed(() => props.alt || props.name)
</script>

<template>
  <div
    v-if="svgHtml"
    class="undraw-img"
    :style="{ width, height }"
    role="img"
    :aria-label="altText"
    v-html="svgHtml"
  />
</template>

<style scoped>
.undraw-img {
  display: block;
  max-width: 100%;
}

.undraw-img :deep(svg) {
  display: block;
  width: 100%;
  height: auto;
}
</style>
