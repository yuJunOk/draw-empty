<script setup lang="ts">
/**
 * 文档站专用：列出 src/assets/undraw-illustrations 下当前存在的全部 SVG，
 * 以无标题、无描述的 DrawEmpty 预览；支持搜索与复制用法代码。
 */
import { computed, ref, watch } from 'vue'
import DrawEmpty from '@draw-empty/components/DrawEmpty.vue'

/** 单页卡片数：减小可同时挂载的 SVG DOM，缓解大图鉴卡顿 */
const PAGE_SIZE = 48

const globKeys = Object.keys(
  import.meta.glob('../../src/assets/undraw-illustrations/*.svg'),
)

const allSlugs = computed(() =>
  globKeys
    .map((p) => {
      const m = p.match(/([^/]+)\.svg$/)
      return m ? m[1] : ''
    })
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b)),
)

const query = ref('')
const page = ref(1)
const iglRoot = ref<HTMLElement | null>(null)

const filteredSlugs = computed(() => {
  const s = query.value.trim().toLowerCase()
  if (!s) return allSlugs.value
  return allSlugs.value.filter((slug) => slug.toLowerCase().includes(s))
})

const totalFiltered = computed(() => filteredSlugs.value.length)
const totalPages = computed(() =>
  totalFiltered.value === 0 ? 0 : Math.ceil(totalFiltered.value / PAGE_SIZE),
)

const pagedNames = computed(() => {
  const list = filteredSlugs.value
  const start = (page.value - 1) * PAGE_SIZE
  return list.slice(start, start + PAGE_SIZE)
})

const pageRangeText = computed(() => {
  if (totalFiltered.value === 0) return ''
  const start = (page.value - 1) * PAGE_SIZE + 1
  const end = Math.min(page.value * PAGE_SIZE, totalFiltered.value)
  return `第 ${start}–${end} 张`
})

watch(query, () => {
  page.value = 1
})

watch([totalPages, totalFiltered], () => {
  if (totalPages.value > 0 && page.value > totalPages.value) {
    page.value = totalPages.value
  }
})

watch(page, () => {
  iglRoot.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
})

function goPrev() {
  page.value = Math.max(1, page.value - 1)
}

function goNext() {
  if (totalPages.value <= 0) return
  page.value = Math.min(totalPages.value, page.value + 1)
}

const copiedSlug = ref<string | null>(null)
let copyTimer: ReturnType<typeof setTimeout> | undefined

function usageCode(name: string) {
  const esc = name.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
  return `<DrawEmpty illustration="${esc}" />`
}

async function copyCode(name: string) {
  try {
    await navigator.clipboard.writeText(usageCode(name))
    copiedSlug.value = name
    clearTimeout(copyTimer)
    copyTimer = setTimeout(() => {
      copiedSlug.value = null
    }, 2000)
  } catch {
    copiedSlug.value = null
  }
}
</script>

<template>
  <div ref="iglRoot" class="igl">
    <div class="igl__toolbar">
      <label class="igl__label" for="igl-search">按官网标题 / 文件名搜索</label>
      <input
        id="igl-search"
        v-model="query"
        class="igl__input"
        type="search"
        placeholder="例如 Empty Mailbox 或 Signed Document"
        autocomplete="off"
        spellcheck="false"
      />
      <p class="igl__meta">
        仓库内共 <strong>{{ allSlugs.length }}</strong> 张；匹配
        <strong>{{ totalFiltered }}</strong> 张；
        <template v-if="totalFiltered > 0">
          本页 {{ pageRangeText }}（每页 {{ PAGE_SIZE }} 张，共
          <strong>{{ totalPages }}</strong> 页）。
        </template>
      </p>
    </div>

    <p v-if="allSlugs.length === 0" class="igl__empty-hint">
      暂无插图文件。请在项目根目录执行 <code>npm run prepare:undraw</code> 或
      <code>npm run prepare:undraw:all</code> 后再打开本页。
    </p>

    <p v-else-if="filteredSlugs.length === 0" class="igl__empty-hint">
      没有匹配的插图文件名，请换个关键词。
    </p>

    <nav
      v-if="totalPages > 1"
      class="igl__pager"
      aria-label="插图分页"
    >
      <button
        type="button"
        class="igl__pager-btn"
        :disabled="page <= 1"
        @click="goPrev"
      >
        上一页
      </button>
      <span class="igl__pager-info">第 {{ page }} / {{ totalPages }} 页</span>
      <button
        type="button"
        class="igl__pager-btn"
        :disabled="page >= totalPages"
        @click="goNext"
      >
        下一页
      </button>
    </nav>

    <ul v-if="totalFiltered > 0" class="igl__grid">
      <li v-for="name in pagedNames" :key="name" class="igl__card">
        <div class="igl__preview">
          <DrawEmpty
            :illustration="name"
            title=""
            description=""
            image-width="128px"
            image-height="auto"
          />
        </div>
        <code class="igl__slug" :title="name">{{ name }}</code>
        <button type="button" class="igl__copy" @click="copyCode(name)">
          {{ copiedSlug === name ? '已复制' : '复制代码' }}
        </button>
      </li>
    </ul>

    <nav
      v-if="totalPages > 1"
      class="igl__pager igl__pager--bottom"
      aria-label="插图分页"
    >
      <button
        type="button"
        class="igl__pager-btn"
        :disabled="page <= 1"
        @click="goPrev"
      >
        上一页
      </button>
      <span class="igl__pager-info">第 {{ page }} / {{ totalPages }} 页</span>
      <button
        type="button"
        class="igl__pager-btn"
        :disabled="page >= totalPages"
        @click="goNext"
      >
        下一页
      </button>
    </nav>
  </div>
</template>

<style scoped>
.igl {
  margin-top: 1rem;
}

.igl__toolbar {
  margin-bottom: 1.25rem;
}

.igl__label {
  display: block;
  margin-bottom: 0.35rem;
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.igl__input {
  box-sizing: border-box;
  width: 100%;
  max-width: 420px;
  padding: 8px 12px;
  font-size: 14px;
  line-height: 1.4;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.igl__input:focus {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 1px;
  border-color: var(--vp-c-brand-1);
}

.igl__meta {
  margin: 0.65rem 0 0;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.igl__pager {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin: 0 0 1rem;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.igl__pager--bottom {
  margin: 1.25rem 0 0;
}

.igl__pager-info {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  min-width: 7rem;
  text-align: center;
}

.igl__pager-btn {
  padding: 6px 14px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 6px;
  border: 1px solid var(--vp-button-alt-border);
  background: var(--vp-button-alt-bg);
  color: var(--vp-button-alt-text);
  cursor: pointer;
}

.igl__pager-btn:hover:not(:disabled) {
  background: var(--vp-button-alt-hover-bg);
}

.igl__pager-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.igl__empty-hint {
  padding: 1rem 1rem;
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.igl__empty-hint code {
  font-size: 12px;
  padding: 0.12em 0.35em;
  border-radius: 4px;
  background: var(--vp-code-bg);
}

.igl__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.igl__card {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 8px;
  padding: 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
}

.igl__preview {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 140px;
  border-radius: 8px;
  background: var(--vp-c-bg);
}

.igl__preview :deep(.draw-empty) {
  padding: 12px 8px;
}

.igl__preview :deep(.draw-empty__image) {
  margin-bottom: 0;
}

.igl__slug {
  display: block;
  font-size: 11px;
  line-height: 1.35;
  word-break: break-all;
  padding: 6px 8px;
  border-radius: 6px;
  background: var(--vp-code-bg);
  color: var(--vp-c-text-2);
}

.igl__copy {
  align-self: flex-start;
  padding: 5px 12px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 6px;
  border: 1px solid var(--vp-button-alt-border);
  background: var(--vp-button-alt-bg);
  color: var(--vp-button-alt-text);
  cursor: pointer;
}

.igl__copy:hover {
  background: var(--vp-button-alt-hover-bg);
}
</style>
