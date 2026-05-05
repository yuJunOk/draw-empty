<script setup lang="ts">
/** 插画空状态 · DrawEmpty（DrawE / npm：draw-empty） */
import { computed, inject } from 'vue'
import UndrawImg from './UndrawImg.vue'
import { drawEmptyDefaultAccentKey } from '../injection'

const props = withDefaults(
  defineProps<{
    title?: string
    description?: string
    /** 对应 src/assets/undraw-illustrations/<标题>.svg（与官网卡片英文标题一致，可含空格，如 Signed Document） */
    illustration?: string
    imageWidth?: string | number
    imageHeight?: string | number
    /**
     * 插图主色（HEX）。设置后会替换 SVG 中的演示蓝 / unDraw 默认紫；
     * 不传则使用资源文件原始配色。
     */
    accentColor?: string
  }>(),
  {
    title: '',
    description: '',
    illustration: 'Empty Mailbox',
    imageWidth: '200px',
    imageHeight: 'auto',
    accentColor: undefined,
  },
)

const injectedAccent = inject(drawEmptyDefaultAccentKey, undefined)
const resolvedAccent = computed(() => props.accentColor ?? injectedAccent)
</script>

<template>
  <div class="draw-empty">
    <div class="draw-empty__image">
      <slot name="image">
        <UndrawImg
          :name="illustration"
          :width="imageWidth"
          :height="imageHeight"
          :accent-color="resolvedAccent"
          :alt="title || illustration"
        />
      </slot>
    </div>
    <p v-if="title" class="draw-empty__title">{{ title }}</p>
    <p v-if="description" class="draw-empty__description">{{ description }}</p>
    <div v-if="$slots.default" class="draw-empty__bottom">
      <slot />
    </div>
    <div v-if="$slots.extra" class="draw-empty__extra">
      <slot name="extra" />
    </div>
  </div>
</template>

<style scoped>
.draw-empty {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 24px;
  text-align: center;
}

.draw-empty__image {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.draw-empty__title {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
  color: #303133;
}

.draw-empty__description {
  margin: 0;
  max-width: 320px;
  font-size: 14px;
  line-height: 1.5;
  color: #909399;
}

.draw-empty__bottom {
  margin-top: 20px;
}

.draw-empty__extra {
  margin-top: 12px;
}
</style>
