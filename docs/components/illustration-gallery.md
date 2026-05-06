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

- 列表反映当前包内的 SVG；**维护仓库**时拉取或更新插图后刷新即可，脚本说明见 [仓库与文档站维护](/guide/maintainer-note)。
- 复制内容为最小用法：`<DrawEmpty illustration="<文件名不含后缀>" />`，业务项目中通过 **`draw-empty`** 包引入组件（见 [安装与接入](/guide/install) 与 [插画空状态](./draw-empty)）。
