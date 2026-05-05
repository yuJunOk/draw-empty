# DrawE（draw-empty）

**插画空状态** **`<DrawEmpty>`**：unDraw 风格 SVG + 标题 + 说明 + 操作区；底层 **`<UndrawImg>`** 加载本地 SVG，支持 **`accentColor`**。npm 包 **`draw-empty`**。  
业务接入（`main.ts`、全局主色等）→ [**docs/guide/npm.md**](./docs/guide/npm.md)。组件 API 与 Demo → [**docs/components/draw-empty.md**](./docs/components/draw-empty.md)。

[![Vue 3](https://img.shields.io/badge/Vue-3-42b883?style=flat-square)](https://vuejs.org/)
[![VitePress](https://img.shields.io/badge/VitePress-docs-646CFF?style=flat-square)](https://vitepress.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node](https://img.shields.io/badge/Node-%3E%3D18-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![License MIT](https://img.shields.io/badge/License-MIT-9cf?style=flat-square)](https://opensource.org/licenses/MIT)

**当前版本：0.1.0** · [更新日志](./docs/guide/changelog.md) · [Releases](https://github.com/yuJunOk/draw-empty/releases)

业务项目可直接用 **GitHub Release** 上的 `.tgz`（无需先发 npm）：

```bash
npm install https://github.com/yuJunOk/draw-empty/releases/download/v0.1.0/draw-empty-0.1.0.tgz
```

（换版本时把 URL 里的 **`v0.1.0`** 和 **`draw-empty-0.1.0.tgz`** 改成对应 Release。）

## 预览

| 基础 | 操作区 + extra | accent | UndrawImg |
|------|----------------|--------|-----------|
| ![](./assets/readme/empty-state-basic.png) | ![](./assets/readme/empty-state-action.png) | ![](./assets/readme/empty-state-accent.png) | ![](./assets/readme/undraw-img-only.png) |

插图同步与文档站日常改动 → [**DEV_HELPER.md**](./DEV_HELPER.md)。

## 快速开始

需要 **Node.js 18+**，`prepare:undraw` 需访问 **https://undraw.co/**。

```bash
git clone <仓库地址> draw-empty
cd draw-empty
npm install
npm run prepare:undraw
npm run dev
```

静态构建：`npm run build`，预览：`npm run preview`（产物 **`docs/.vitepress/dist/`**）。

## 脚本

| 命令 | 说明 |
|------|------|
| `dev` | VitePress 开发 |
| `build` / `preview` | 构建 / 预览静态站 |
| `prepare:undraw` | 演示用 SVG → `src/assets/undraw-illustrations/` |
| `prepare:undraw:all` | 尽量拉全库（量大、耗时） |
| `typecheck` | `src/` 组件类型检查 |
| `pack` | 打 **npm 安装包** → **`releases/draw-empty-*.tgz`**（须先手动建 **`releases/`**）；检查列表：**`npm pack --dry-run --pack-destination releases`** |

## 更多文档

- 指南：`docs/guide/`
- 维护与架构：[**DEVELOPMENT.md**](./DEVELOPMENT.md)
- 插图同步、改文档站：[**DEV_HELPER.md**](./DEV_HELPER.md)

## 许可

MIT（仓库模板代码）。插图著作权遵循 [unDraw 许可](https://undraw.co/license)。
