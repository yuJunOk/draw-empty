# 介绍

**draw-empty**（DrawE）提供 Vue 组件与演示 SVG，帮助你在后台、工具类产品里快速落地「空列表」「搜索无结果」「网络异常」「提交成功」等常见留白界面。

## 「使用指南」是什么？

本站左侧 **「使用指南」** 指的是：**如何使用本组件、如何在本仓库里跑起来文档站**——面向「用这个库 / 这个示例」的人，和 Element、Ant Design Vue 文档里的「指南 / 快速上手」是同一类东西。

如果你关心的是 **仓库目录、为何用 VitePress、如何加文档页与 Demo**，那是 **工程维护** 范畴，请看仓库根目录的 **`DEVELOPMENT.md`**，而不是「使用指南」正文。

## 包含内容

| 模块 | 说明 |
|------|------|
| **插画空状态**（`DrawEmpty`） | 主组件：标题、描述、插图与插槽（主按钮、`extra`、`image`）；插图由内置 **内联插图**（`UndrawImg`）从 `undraw-illustrations` 加载 |
| `prepare:undraw` | Node 脚本从 unDraw API 拉取演示用 SVG |

仅需「一幅可换色 SVG」、不要整块留白编排时，可直接用底层 **内联插图**（`UndrawImg`），见 [组件文档](/components/draw-empty#inline-undraw) 末节。

插图著作权请遵循 [unDraw 许可](https://undraw.co/license)。

## 下一步

- [快速开始](./quickstart.md)：安装依赖、拉取插图、本地打开文档站。
- [npm 依赖接入](./npm.md)：在 Vue 3 项目的 `main.ts` 全局注册、配置全局主色（accent）。
- [更新日志](./changelog.md)：版本号与能力摘要（与 `package.json` 的 `version` 一致）。
