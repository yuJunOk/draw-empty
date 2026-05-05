---
title: 更新日志
outline: deep
---

# 更新日志

版本号与 **`package.json`** 中 **`version`** 一致。npm 包名 **`draw-empty`**；文档站品牌 **DrawE**。

---

## 0.1.0

**发布日期：** 2026-05-05（文档记录；以仓库标签 / npm 为准可自行调整）

### 当前产品能力摘要

**组件（Vue 3）**

- **`DrawEmpty`**：插画空状态——插图（unDraw 风格 SVG）、标题、描述、默认插槽（主操作）、**`#extra`**、**`#image`** 完全自定义。
- **`UndrawImg`**：按需加载 **`src/assets/undraw-illustrations/*.svg`**（`import.meta.glob` + `?raw`），可单独使用。
- **`accentColor` / `accent-color`**：HEX 替换 SVG 中常见演示色；可通过 **`createDrawEmptyPlugin({ accentColor })`** 全局注入。

**插件与导出**

- **`createDrawEmptyPlugin`**：全局注册 **`DrawEmpty`**、**`UndrawImg`**；可选 **`accentColor`**。
- **`drawEmptyDefaultAccentKey`**：与插件配套的 `provide` / `inject` 键（进阶用法）。
- 入口：**`src/index.ts`**（`exports` 指向源码；业务侧需能编译 `.vue`）。

**资源与工具**

- **`npm run prepare:undraw`**：从 unDraw API 拉取预设演示 SVG。
- **`npm run prepare:undraw:all`**：尽量拉全库插图（体积与时耗大）。
- **`npm run pack`**：生成 **`releases/draw-empty-*.tgz`**（**`files`** 当前为 **`src`**；目录内可保留历史版本）。

**文档站（VitePress）**

- 指南（介绍、快速开始、**npm 接入**）、组件文档（API + Demo + **`?raw`** 同源示例）、插图资源浏览页。

**分发说明**

- **`peerDependencies`**：**`vue ^3.4.0`**。
- 仓库 **`private: true`** 时不适合 **`npm publish`**；对外发包前需解除 **`private`** 并遵循 [**npm 指南](./npm.md)**。

### 破坏性变更

无（首个归档版本）。
