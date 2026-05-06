---
title: 仓库与文档站维护
outline: deep
---

# 仓库与文档站维护

本站正文以 **组件使用与 API** 为主（对齐常见开源组件库文档）；本节仅面向 **克隆本仓库、参与维护或自建文档站** 的贡献者，篇幅尽量短。

## 插图脚本

从 unDraw 拉取 SVG 到 **`src/assets/undraw-illustrations/`**：

```bash
npm install
npm run prepare:undraw
```

更多参数与日常改文档流程 → 仓库 [**DEV_HELPER.md**](https://github.com/yuJunOk/draw-empty/blob/main/DEV_HELPER.md)（根目录，不进入文档站路由）。

## 本地文档站（VitePress）

```bash
npm run dev
npm run build
npm run preview
```

架构、目录约定、扩展文档页与 Demo → [**DEVELOPMENT.md**](https://github.com/yuJunOk/draw-empty/blob/main/DEVELOPMENT.md)。

## 打包 `.tgz`（Release 附件）

```bash
mkdir releases   # 首次需要；npm pack 不会自动创建该目录
npm run prepare:undraw   # 若插图已提交可跳过
npm run pack
```

详情见 [**README.md**](https://github.com/yuJunOk/draw-empty/blob/main/README.md) 脚本表与仓库说明。

## GitHub Pages

CI 与 **GitHub Pages 子路径**（环境变量 **`VITEPRESS_BASE`**，即 `https://用户名.github.io/仓库名/` 里多出来的那段前缀）→ [**DEVELOPMENT.md**](https://github.com/yuJunOk/draw-empty/blob/main/DEVELOPMENT.md) **§5**。
