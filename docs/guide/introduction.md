---
title: 介绍
---

# 介绍

**DrawE**（npm 包名 **draw-empty**）是一套面向 **Vue 3** 的 **插画空状态** 方案：用 **`<DrawEmpty>`** 快速拼出「上图 + 标题 + 说明 + 操作区」的常见留白界面；底层 **`<UndrawImg>`** 按需加载 **unDraw** 风格的本地 SVG。**插图主色**可用属性 **`accent-color`**（或 **`accentColor`**）配置，也可用 **`createDrawEmptyPlugin`** 在应用里设一次全局默认。

适用于后台、工具类产品中的 **空列表**、**搜索无结果**、**网络异常**、**引导占位** 等场景。

## 你能得到什么

| 能力 | 说明 |
|------|------|
| **`<DrawEmpty>`** | 标题、描述、插图、默认插槽（主操作）、**`#extra`**、**`#image`** |
| **`<UndrawImg>`** | 仅展示一幅可换色 SVG（不需要整块留白编排时） |
| **插图主色** | 传入 **`#` + 六位十六进制颜色**（如 `#2563EB`），替换 SVG 里的默认配色；可在插件 **`createDrawEmptyPlugin({ accentColor })`** 里设全局默认 |

仅需底层插图时，见 [插画空状态组件文档](/components/draw-empty#inline-undraw) 中的 **`<UndrawImg>`** 说明。

插图著作权请遵循 [unDraw 许可](https://undraw.co/license)。

## 下一步

- **[快速开始](./quickstart.md)**：最短路在业务项目里跑起来  
- **[安装与接入](./install.md)**：多种安装方式、`main.ts`、按需引入与 Vite 提示  
- **[插画空状态](/components/draw-empty)**：Props、插槽与 Demo  
- **[插图资源浏览](/components/illustration-gallery)**：按文件名检索已打包的 SVG  

参与维护本仓库（拉插图、跑文档站、打包 Release）→ **[仓库与文档站维护](./maintainer-note.md)**。
