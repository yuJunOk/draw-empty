<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{
    code: string
    title?: string
  }>(),
  { title: '示例代码' },
)

const copied = ref(false)
let t: ReturnType<typeof setTimeout> | undefined

async function copy() {
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    clearTimeout(t)
    t = setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch {
    copied.value = false
  }
}
</script>

<template>
  <div class="cb">
    <div class="cb__bar">
      <span class="cb__title">{{ title }}</span>
      <button type="button" class="cb__btn" @click="copy">
        {{ copied ? '已复制' : '复制' }}
      </button>
    </div>
    <pre class="cb__pre"><code>{{ code }}</code></pre>
  </div>
</template>

<style scoped>
.cb {
  margin: 12px 0 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-code-block-bg);
}

.cb__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 6px 10px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.cb__title {
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.cb__btn {
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 6px;
  border: 1px solid var(--vp-button-alt-border);
  background: var(--vp-button-alt-bg);
  color: var(--vp-button-alt-text);
  cursor: pointer;
}

.cb__btn:hover {
  background: var(--vp-button-alt-hover-bg);
}

.cb__pre {
  margin: 0;
  padding: 14px 16px;
  overflow-x: auto;
  font-size: 13px;
  line-height: 1.55;
}

.cb__pre code {
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-text-1);
  white-space: pre;
}
</style>
