# 开发辅助

维护本仓库时常做的两件事：**同步插图资源**、**改文档站**。  
更细的架构与扩展步骤见 [**DEVELOPMENT.md**](./DEVELOPMENT.md)。

---

## 1. 怎么同步资源图（undraw SVG）

- **演示包（常用）**：联网执行 **`npm run prepare:undraw`**  
  - 输出目录：**`src/assets/undraw-illustrations/`**  
  - 文件名 = **官网 Illustrations 英文标题**（`.svg`，非法路径字符会被去掉）  
  - 下载列表来自 **`scripts/lib/undraw-catalog-queries.cjs`** 里的 **`PRESET_DEMO_QUERIES`**，可按需改关键词后再跑  
- **尽量拉全库（耗时长、体积大）**：**`npm run prepare:undraw:all`**（可加 **`--force`**、**`--concurrency N`** 等，脚本 `--help` 或见 DEVELOPMENT）  
- **自备 SVG**：直接放进 **`src/assets/undraw-illustrations/`**，命名规则同上，组件里 **`illustration` / UndrawImg `name`** 填**不带后缀**的标题字符串  

组件是从目录里 **`import.meta.glob`** 读图的；没有文件就会空白，所以文档站 / Demo 前先 **`prepare:undraw`** 至少跑一次。

---

## 2. 文档式网站怎么开发（当前技术栈）

| 项 | 说明 |
|----|------|
| 栈 | **Vue 3** + **TypeScript** + **VitePress 1.x**（内置 **Vite**）；组件在 **`src/`**，站点内容在 **`docs/`** |
| 本地开发 | **`npm run dev`**（一般是 `localhost:5173`） |
| 构建 / 预览 | **`npm run build`** → 产物 **`docs/.vitepress/dist/`**；**`npm run preview`** 看静态结果 |
| 类型检查 | **`npm run typecheck`**（只检查 **`src/`**，不含 Markdown） |
| 新文档页 | 在 **`docs/`** 下加 **`.md`**（如 **`docs/guide/xxx.md`** → 路由 **`/guide/xxx`**，`cleanUrls` 无 `.html`） |
| 导航与侧栏 | 改 **`docs/.vitepress/config.ts`** 里 **`themeConfig.nav`**、**`themeConfig.sidebar`** |
| 文档里写 Demo | **`docs/demos/*.vue`**，在 **`.md`** 里 **`import`** 渲染，并用 **`?raw`** 把同一份代码贴进 **`CodeBlock`**（范例：`docs/components/draw-empty.md`） |
| 引用库组件 | 别名 **`@draw-empty`** → 项目 **`src/`**，在 **`config.ts`** 的 **`vite.resolve.alias`** 已配好 |
| 全局样式 / 主题 | **`docs/.vitepress/theme/custom.css`**；扩展入口 **`theme/index.ts`**（含 **`CodeBlock`**） |

首页、脚注文案、插图外链等细节见 **DEVELOPMENT.md** 第 **5** 节及后文。

发版时同步 bump **`package.json` 的 `version`**，并写 **`docs/guide/changelog.md`**（导航「更新日志」与页脚文案会从该版本号读取）。
