---
outline: deep
title: 插画空状态
---

# 插画空状态 `<DrawEmpty>`

组合式留白组件：上图下文，支持标题、描述、默认插槽（主操作）、`extra` 与 `image`。内置使用 **内联插图**（`UndrawImg`）加载 `undraw-illustrations` 下的 SVG。与英文简称 **DrawE**、npm 包 **draw-empty**、路由 **`/components/draw-empty`** 一致命名。

<script setup>
import Basic from '../demos/draw-empty-basic.vue'
import basicRaw from '../demos/draw-empty-basic.vue?raw'
import Action from '../demos/draw-empty-action.vue'
import actionRaw from '../demos/draw-empty-action.vue?raw'
import Accent from '../demos/draw-empty-accent.vue'
import accentRaw from '../demos/draw-empty-accent.vue?raw'
</script>

## 何时使用

- 列表、表格、搜索结果为空
- 网络错误、服务不可用
- 表单提交成功等轻量反馈（非复杂流程）

依赖 **`src/assets/undraw-illustrations/`** 下的 SVG，请先执行 `npm run prepare:undraw` 或自备同名资源。本地已有文件可在 **[插图资源浏览](./illustration-gallery)** 页检索与复制用法代码。

## Props

| 属性 | 类型 | 说明 |
|------|------|------|
| `title` | `string` | 主标题 |
| `description` | `string` | 说明文案 |
| `illustration` | `string` | 对应 `src/assets/undraw-illustrations/<标题>.svg`（不含后缀；**与官网 Illustrations 卡片英文标题一致**，可含空格，如 `Signed Document`，由 `prepare:undraw` 生成） |
| `imageWidth` / `imageHeight` | `string \| number` | 插图尺寸 |
| `accentColor` | `string` | 可选，HEX。替换 SVG 中常见主色（演示蓝 / unDraw 紫） |

## 插槽

| 插槽 | 说明 |
|------|------|
| 默认 | 主操作区（如按钮） |
| `#extra` | 次要链接或辅助操作 |
| `#image` | 完全自定义插图区域；不传则内部使用内联插图 |

## 基础用法

<ClientOnly>
  <Basic />
</ClientOnly>

<CodeBlock :code="basicRaw" title="draw-empty-basic.vue" />

## 操作区与 extra

<ClientOnly>
  <Action />
</ClientOnly>

<CodeBlock :code="actionRaw" title="draw-empty-action.vue" />

## 主题色 accent-color

<ClientOnly>
  <Accent />
</ClientOnly>

<CodeBlock :code="accentRaw" title="draw-empty-accent.vue" />

## 内联插图 `<UndrawImg>`（可选） {#inline-undraw}

多数场景只用 **插画空状态** 即可。若只需展示一幅 SVG、不要标题与操作区，再直接使用底层 **内联插图**（`UndrawImg.vue`）。

| 属性 | 类型 | 说明 |
|------|------|------|
| `name` | `string` | `undraw-illustrations` 目录下文件名（不含 `.svg`，与官网英文标题一致，可含空格） |
| `width` / `height` | `string \| number` | 尺寸 |
| `alt` | `string` | 无障碍说明 |
| `accentColor` | `string` | 可选，HEX，替换常见演示色 |

实现见 `src/components/UndrawImg.vue`（`import.meta.glob` + `?raw`）。
