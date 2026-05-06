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

依赖包内 **`src/assets/undraw-illustrations/`** 下的 SVG（随 Release / Git 安装一并提供）。文件名可在 **[插图资源浏览](./illustration-gallery)** 检索并复制用法；维护仓库时拉取插图见 **[仓库与文档站维护](/guide/maintainer-note)**。

## Props

| 属性 | 类型 | 说明 |
|------|------|------|
| `title` | `string` | 主标题 |
| `description` | `string` | 说明文案 |
| `illustration` | `string` | 对应包内 `src/assets/undraw-illustrations/<标题>.svg`（不含后缀；**与官网 Illustrations 英文标题一致**，可含空格，如 `Signed Document`） |
| `imageWidth` / `imageHeight` | `string \| number` | 插图尺寸 |
| `accentColor` | `string` | 可选，**`#` + 六位颜色**。统一插图配色（替换 SVG 里默认的蓝 / 紫）；与 CSS 的 **`accent-color`** 不是同一概念 |

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

## 插图主色（`accent-color`）

通过属性 **`accent-color`**（或 **`accentColor`**）传入 **`#RRGGBB`**，即可把插图里的默认配色改成你的产品主色；也可用插件对全站设默认值，详见 [安装与接入 · 插图主色](/guide/install#illustration-accent)。

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
| `accentColor` | `string` | 可选，**`#` + 六位颜色**，含义同 **`DrawEmpty`** 的插图主色 |

底层实现见源码 **`UndrawImg.vue`**（构建时扫描插图目录并读取 SVG 文本）。
