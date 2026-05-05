# draw-empty 开发文档

面向维护本站与组件的同学：**说明这套「产品介绍 + 文档 + Demo 源码」是如何搭起来的**，以及如何在不膨胀技术栈的前提下扩展内容。

插图同步与文档站日常改动见 [**DEV_HELPER.md**](./DEV_HELPER.md)。

---

## 1. 目标与原则

| 目标 | 做法 |
|------|------|
| 像 Element 一类产品有**文档 + 可运行 Demo + 示例代码** | 使用 **VitePress**：Markdown 写文档，Markdown 内嵌 Vue；示例代码与 Demo 共用同一个 `.vue` 文件，通过 `?raw` 展示源码 |
| **技术栈精简** | 运行时仅依赖 **Vue 3**；站点侧仅增加 **VitePress**（内置 Vite、Markdown、默认主题、本地搜索） |
| **样式与结构简化** | 默认主题 + 少量 CSS 变量；自定义仅 **`CodeBlock.vue`** 与 **`custom.css`** |
| **插图资源** | 继续用现有 **Node 脚本 + https**，无 CDN 组件库 |

未引入：Vue Router（由 VitePress 接管路由）、Tailwind、组件文档插件、独立语法高亮库等。

---

## 2. 技术栈一览

| 层级 | 技术 | 作用 |
|------|------|------|
| 运行时 | **Vue 3** | **插画空状态**（`DrawEmpty`）、**内联插图**（`UndrawImg`） |
| 文档与站点 | **VitePress 1.x** | 路由、侧边栏、Markdown → 静态页、全文搜索、默认主题 |
| 构建 | **Vite 8**（VitePress / `vue-tsc` 会用到） | 打包文档站与 `?raw` 处理 |
| 语言 | **TypeScript** | 组件与配置类型 |
| 工具 | **Node.js** | `prepare:undraw` 拉取 SVG |

---

## 3. 目录结构（与职责）

```
draw-empty/
├── docs/                          # VitePress 根目录（Markdown、静态资源）
│   ├── .vitepress/
│   │   ├── config.ts              # 站点标题、导航、侧边栏、Vite alias（@draw-empty）
│   │   └── theme/
│   │       ├── index.ts           # 扩展默认主题，全局注册 CodeBlock
│   │       ├── custom.css         # 极少全局样式
│   │       └── components/
│   │           └── CodeBlock.vue  # Demo 下方「示例代码」块 + 复制按钮
│   ├── public/                    # logo.svg、favicon.svg（构建后映射到站点根路径）
│   ├── guide/                     # 指南文档
│   ├── components/                # 组件文档（含内嵌 Vue）
│   ├── demos/                     # 可被文档 import 的 Demo SFC（预览 + ?raw）
│   └── index.md                   # 首页（drawe-home；footer: false 用自定义页脚；Hero + 三栏 + 示例；样式见 custom.css）
├── src/
│   ├── components/                # 插画空状态、内联插图（DrawEmpty.vue / UndrawImg.vue）
│   ├── assets/undraw-illustrations/
│   └── vite-env.d.ts              # 含 *.vue?raw 声明
├── scripts/                       # prepare:undraw 与 downloader
├── package.json
├── README.md                      # 面向用户的简要说明
└── DEVELOPMENT.md                 # 本文件（面向维护者）
```

构建产物目录：**`docs/.vitepress/dist/`**（已在 `.gitignore` 中忽略，可按部署习惯改为提交）。

---

## 4. 从零运行（逐步）

以下假设已安装 **Node.js 18+** 与 **npm**。

### 步骤 1：安装依赖

在项目根目录执行：

```bash
npm install
```

### 步骤 2：拉取演示用 SVG（需联网）

```bash
npm run prepare:undraw
```

成功后应在 `src/assets/undraw-illustrations/` 下看到与 **`PRESET_DEMO_QUERIES`**（见 `scripts/lib/undraw-catalog-queries.cjs`）条数一致的 `.svg`；**文件名与官网 Illustrations 英文标题一致**（仅剔除 `\ / : * ? " < > |` 等非法字符）；**同标题后者覆盖前者**。合并索引仍以 API `newSlug` 去重。  
脚本逻辑见 `scripts/setup-undraw-demos.cjs` 与 `scripts/lib/undraw-downloader.cjs`。

全量索引（与官网当前插图总数对齐）：官方 **`page` 查询无效**，须用 **`offset` + `limit`**；且单一关键词分页条数有上限，脚本使用 **`scripts/lib/undraw-catalog-queries.cjs`** 中多组英文关键词依次分页抓取，再按 **`newSlug` 去重并集**，最后并发下载 SVG。维护者执行：

```bash
npm run prepare:undraw:all
```

可选：`--force`（覆盖已存在）、`--concurrency N`、`--limit N`（仅下载前 N 条，调试）。合并结果通常为 **1600+** 文件；若明显偏少，可在 `undraw-catalog-queries.cjs` 中增补搜索词后重跑。是否纳入 Git 由仓库策略决定。

### 步骤 3：启动文档站（开发模式）

```bash
npm run dev
```

终端会打印本地 URL（通常为 `http://localhost:5173`）。  
此时可浏览：首页、`/guide/*`、`/components/draw-empty`（含 Demo 与源码）。

### 步骤 4：（可选）类型检查组件

```bash
npm run typecheck
```

仅检查 `src/` 下组件（`tsconfig.app.json`），不包含 Markdown。

### 步骤 5：构建静态站点

```bash
npm run build
```

### 步骤 6：本地预览构建结果

```bash
npm run preview
```

---

## 5. 文档站工作流程（VitePress）

1. **`npm run dev`** → 执行 `vitepress dev docs`  
   - 将 **`docs/`** 视为内容根目录  
   - 读取 **`docs/.vitepress/config.ts`**  

2. **路由与页面**  
   - `docs/index.md` → `/`  
   - `docs/guide/introduction.md` → `/guide/introduction`（`cleanUrls` 开启时无 `.html` 后缀）  
   - `docs/components/draw-empty.md` → `/components/draw-empty`  

3. **Markdown 中的 Vue**  
   - 在 `.md` 文件中使用 `<script setup>` 与模板，由 VitePress 编译为 Vue SFC 页面的一部分。

4. **`@draw-empty` 别名**  
   - 在 `docs/.vitepress/config.ts` 的 `vite.resolve.alias` 中指向 **`项目根/src`**  
   - Demo 中写：`import DrawEmpty from '@draw-empty/components/DrawEmpty.vue'`  

5. **默认主题**  
   - `docs/.vitepress/theme/index.ts` 使用 `extends: DefaultTheme`，只追加全局组件与少量 CSS。

6. **首页可选外链与「资源」卡片**  
   - 第三张卡片固定为 **[unDraw](https://undraw.co/)**（新标签打开），一句话说明插图来源。  
   - **`docs/.vitepress/site-meta.ts`** 与环境变量 **`VITE_ILLUS_SITE`** 仅用于页脚「DrawE 外链」链接（配置为 `http(s)://...` 时显示）。

---

## 6. 如何新增一篇指南文档

1. 在 `docs/guide/` 新建 `xxx.md`。  
2. 在 `docs/.vitepress/config.ts` 的 `themeConfig.sidebar['/guide/']` 里增加一项 `{ text: '标题', link: '/guide/xxx' }`。  
3. 如需出现在顶部导航，同步修改 `themeConfig.nav`。

---

## 7. 如何新增「Demo + 示例代码」（推荐流程）

目标：**页面上看到的效果**与**下方展示的代码**一致，且只维护一份 Vue 文件。

1. 在 **`docs/demos/`** 新建 `my-demo.vue`，内部正常 `import` `@draw-empty` 组件并写好模板。  
2. 在对应 `.md` 中：

```vue
<script setup>
import MyDemo from '../demos/my-demo.vue'
import myDemoRaw from '../demos/my-demo.vue?raw'
</script>

<ClientOnly>
  <MyDemo />
</ClientOnly>

<CodeBlock :code="myDemoRaw" title="my-demo.vue" />
```

说明：

- **`ClientOnly`** 由 VitePress **全局注册**，无需 import。  
- **`?raw`** 由 Vite 提供字符串源码；类型声明在 `src/vite-env.d.ts`。  
- **`CodeBlock`** 在主题 `enhanceApp` 里全局注册。

---

## 8. 组件与插图路径约定

- **`UndrawImg`** 使用 `import.meta.glob('../assets/undraw-illustrations/*.svg', { query: '?raw' })`，路径相对于 **`src/components/UndrawImg.vue`**。  
- 新增插图：放入 **`src/assets/undraw-illustrations/`**，**文件名（无 `.svg`）与官网英文标题一致**（可用脚本 `fileStemFromOfficialTitle` 对齐剔除非法字符），与 `illustration` / `UndrawImg` 的 `name` 相同。  
- 文档里的 Demo 只是一层包装，**真实组件仍在 `src/components`**，便于拷贝到业务项目。

---

## 9. 依赖刻意未引入的内容（维护取向）

- **Tailwind / UnoCSS**：减少构建链与类名约定，文档页依赖默认主题样式即可。  
- **vue-router**：路由由 VitePress 管理。  
- **独立 Demo 沙箱 iframe**：当前直接用 `<ClientOnly>` + SFC，足够轻量。  
- **Shiki / Prism**：代码块以纯 `<pre>` + 主题变量着色为主；若未来需要行号与高亮，可再评估 **仅文档侧** 增加插件。

---

## 10. 常见问题

**Q：`npm run build` 报与 Markdown 中组件相关的错？**  
先确认 Demo 里 `@draw-empty` 路径是否正确、`prepare:undraw` 是否已执行。

**Q：`vue-tsc` 为何不检查 `docs/`？**  
当前 `tsconfig.app.json` 仅包含 `src/`；文档页类型依赖 VitePress 编译期检查。若日后要严格类型化 Markdown，可再拆 `tsconfig.docs.json`。

**Q：能否恢复成「独立 SPA + 文档」双应用？**  
可以，但会增加两套 dev/build 与部署复杂度；现阶段刻意合并为 **单一 VitePress 站点**。

---

## 11. 小结

- **产品介绍首页**：`docs/index.md`（`sidebar: false`、`pageClass: drawe-home`；扁平 Hero、三栏文档入口、嵌入 Demo；视觉对齐 Element Plus 文档站主色与边框色，样式在 `custom.css` 的 `.ep-*`）。  
- **文档与 API 叙述**：`docs/guide/*`、`docs/components/*`。  
- **Demo 与源码同源**：`docs/demos/*.vue` + `*.vue?raw` + **`CodeBlock`**。  
- **可复用业务代码**：仍在 **`src/components`**，与文档解耦。

若你扩展多组件，建议为每个组件增加 `docs/components/<name>.md` 与对应 `docs/demos/` 文件，并在 `config.ts` 的 `sidebar['/components/']` 中注册链接。
