---
outline: deep
title: 插图资源浏览
---

# 插图资源浏览

当前仓库 `src/assets/undraw-illustrations/` 下已有 SVG 的 **一览**。每项使用 **无标题、无描述** 的 `<DrawEmpty>` 仅展示插图；可按 **文件名（与官网英文标题一致，可含空格）** 搜索，并一键复制用法代码。为避免一次挂载上千张 SVG 造成卡顿，列表采用 **分页**（每页 48 张），搜索后会自动回到第 1 页。

<script setup>
import IllustrationGallery from '../demos/IllustrationGallery.vue'
</script>

<IllustrationGallery />

## 说明

- 列表随本地文件变化：执行 `npm run prepare:undraw` / `prepare:undraw:all` 后刷新页面即可。
- 复制内容为最小用法：`<DrawEmpty illustration="<slug>" />`，在你的项目中需自行配置 `@draw-empty` 别名或相对路径引入组件（见 [插画空状态](./draw-empty)）。
