---
title: 快速开始
---

# 快速开始

面向：**在自有 Vue 3 业务项目中使用 DrawE**。若你是克隆本仓库做维护或改文档站，请直接看 **[仓库与文档站维护](./maintainer-note.md)**。

## 1. 安装

在业务项目目录执行（示例为 Release 直链，版本请与当前 Release 一致）：

```bash
npm install https://github.com/yuJunOk/draw-empty/releases/download/v0.1.0/draw-empty-0.1.0.tgz
```

更多安装方式（Git、`file:`、本地 `.tgz`）见 **[安装与接入](./install.md)**。

## 2. 注册插件

在 **`main.ts`**：

```ts
import { createApp } from 'vue'
import App from './App.vue'
import { createDrawEmptyPlugin } from 'draw-empty'

const app = createApp(App)
app.use(createDrawEmptyPlugin({ accentColor: '#2563EB' }))
app.mount('#app')
```

## 3. 在页面中使用

```vue
<template>
  <DrawEmpty
    title="暂无数据"
    description="可以尝试更换筛选条件或稍后再试。"
    illustration="Empty"
  />
</template>
```

## 接下来

| 需求 | 文档 |
|------|------|
| Props / 插槽 / 更多 Demo | [插画空状态](/components/draw-empty) |
| 按需引入、全局主色、Vite | [安装与接入](./install.md) |
| 浏览可用插图文件名 | [插图资源浏览](/components/illustration-gallery) |
