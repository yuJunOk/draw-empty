---
title: 安装与接入
outline: deep
---

# 安装与接入

在 Vue 3 业务项目中安装 **draw-empty**，注册插件后即可使用 **`<DrawEmpty>`**、**`<UndrawImg>`**。本仓库以 **GitHub Release**、**Git**、**本地路径 / `.tgz`** 为主分发方式（见下文）。

## 环境与形态

- **Vue**：需要 **Vue 3.4+**（依赖关系里声明为 **`peerDependency`**，请确保业务项目已安装 Vue，勿重复装多份）。
- **构建**：包内是 **`src/` 源码**（`.vue` + `.ts` + SVG），业务项目需使用 **Vite**，或 **webpack + vue-loader** 等能编译 **Vue 单文件组件** 的脚手架。
- **插图**：打包时会自动收录 **`src/assets/undraw-illustrations/*.svg`**。请安装**已带上这些 SVG 文件**的包（Release / Git / 本地打包）；否则插图区域会空白。

## 安装依赖

在**业务项目根目录**执行（任选其一，版本号与文件名请与当前 Release 一致）：

```bash
npm install https://github.com/yuJunOk/draw-empty/releases/download/v0.1.0/draw-empty-0.1.0.tgz
```

```bash
npm install git+https://github.com/yuJunOk/draw-empty.git#main
```

```bash
npm install file:../draw-empty
```

本地验证维护者打好的包：

```bash
npm install ./releases/draw-empty-0.1.0.tgz
```

## 在 `main.ts` 中全局注册 {#main-ts-global}

使用 **`createDrawEmptyPlugin`**（或包**默认导出**，二者等价）。可选传入 **`accentColor`**：全局默认 **插图主色**（`#` + 六位颜色，如 `#2563EB`）。

```ts
import { createApp } from 'vue'
import App from './App.vue'
import { createDrawEmptyPlugin } from 'draw-empty'

const app = createApp(App)

app.use(
  createDrawEmptyPlugin({
    accentColor: '#2563EB',
  }),
)

app.mount('#app')
```

等价写法：

```ts
import drawEmpty from 'draw-empty'

app.use(drawEmpty({ accentColor: '#2563EB' }))
```

注册完成后，在任意 **`.vue`** 中直接使用：

```vue
<template>
  <DrawEmpty
    title="暂无数据"
    description="请稍后再试或更换筛选条件"
    illustration="Empty"
  />
</template>
```

仅插图：

```vue
<UndrawImg name="Empty" width="200" />
```

## 插图主色（`accent-color`） {#illustration-accent}

不是浏览器 CSS 里的 **`accent-color`**，而是本组件上的 **属性名**：把颜色写成 **`#RRGGBB`**，即可把插图里默认的蓝 / 紫等演示色换成你的 **品牌色**。

- **全局默认**：`app.use(createDrawEmptyPlugin({ accentColor: '#2563EB' }))` 会在整个应用里提供默认值（内部用 Vue 的 **`provide`**）。
- **单独覆盖**：在某个 **`DrawEmpty` / `UndrawImg` 上写 **`accent-color`** 或 **`accentColor`**；不写则用全局；连插件也没配时，保留 SVG 原本配色。

```vue
<DrawEmpty illustration="Offline" accent-color="#059669" />
<UndrawImg name="Offline" accent-color="#059669" />
```

**进阶**：可从包中导入 **`drawEmptyDefaultAccentKey`**，用 Vue 的 **`provide`** 自行注入与插件相同的主色键（一般不必用到）。

## 按需引入（不全局注册）

```vue
<script setup lang="ts">
import { DrawEmpty, UndrawImg } from 'draw-empty'
</script>
```

未使用插件时，没有上述全局默认值；除非你在上层组件里自行 **`provide(drawEmptyDefaultAccentKey, '#2563EB')`**。

## Vite 提示

多数情况无需配置。若预构建异常，可在 **`vite.config.ts`** 中：

```ts
export default defineConfig({
  optimizeDeps: {
    include: ['draw-empty'],
  },
})
```

## 插图文件名说明

`illustration` / **`UndrawImg` 的 `name`** 与 **`undraw-illustrations`** 目录中的 **文件名（不含 `.svg`）** 一致，通常对应 unDraw 官网 **Illustrations** 的英文标题（可含空格）。站内可按文件名检索与复制用法 → **[插图资源浏览](/components/illustration-gallery)**。

---

维护本仓库、拉取插图、打包 **`releases/*.tgz`**、本地跑文档站等，见 **[仓库与文档站维护](./maintainer-note.md)**（不占正文篇幅）。
