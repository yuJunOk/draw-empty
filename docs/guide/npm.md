# 作为 npm 依赖使用

整体顺序可以理解为：**先在 `draw-empty` 仓库里准备好可分发产物（打包或发布）**，**再在 Vue 3 业务项目里安装依赖并接入**。下面分两块写：

| 读者 | 你在做什么 | 从哪一节开始看 |
|------|------------|----------------|
| **维护者** | 在本仓库安装开发依赖、拉插图、`npm pack` / `npm publish` | [维护者：如何打包](#maintainer-pack) |
| **使用者** | 在业务项目 `npm install draw-empty`（或 `.tgz` / Git），再在 `main.ts` 注册 | [在业务项目中安装](#consumer-install) |

---

## 适用场景与形态

- **运行时依赖**：仅 **Vue 3**（建议 `^3.4`）。
- **分发形态**：当前包以 **`src/` 源码**（`.vue` + `.ts` + SVG 资源）形式发布；业务侧需使用 **Vite / webpack + vue-loader** 等能编译 SFC 的构建工具（常见 Vue 3 脚手架均可）。
- **插图文件**：`UndrawImg` / `DrawEmpty` 通过构建期 `import.meta.glob` 加载 **`src/assets/undraw-illustrations/*.svg`**。打包或发布前请在 **本仓库** 执行一次 `npm run prepare:undraw`（或自备同名 SVG），确保该目录非空并随包一起出现在 `node_modules/draw-empty/src/assets/undraw-illustrations/`。

---

## 维护者：如何打包（`npm pack`） {#maintainer-pack}

在 **`draw-empty` 仓库根目录**（与 `package.json` 同级），先安装 **本仓库** 的开发依赖（和你在别的项目里「安装业务依赖」不是同一件事）：

```bash
cd draw-empty
npm install
npm run prepare:undraw
```

`prepare:undraw` 需要能访问 `https://undraw.co/`；若插图已在仓库里提交，可跳过。

**先看会打进包里的文件（不落盘压缩包）：**

打包前请在仓库根目录**手动创建文件夹 `releases`**（资源管理器或 `mkdir releases` 均可）；**`npm pack --pack-destination`** 不会自动建目录，缺失时会报错 **`ENOENT`**。

```bash
npm pack --dry-run --pack-destination releases
```

确认列表里主要是 `src/` 下的 `.vue`、`.ts` 和 `src/assets/undraw-illustrations/*.svg`（由 `package.json` 的 **`files`** 字段控制）。

**生成可分发的 `.tgz`（同上，须先有 `releases/`）：**

```bash
npm run pack
```

等价于 **`npm pack --pack-destination releases`**（**`npm run pack`** 只是封装这一行）。生成 **`releases/draw-empty-0.1.0.tgz`**（版本号与 **`package.json`** 的 **`version`** 一致）。**升级版本再打包不会删旧包**，可多份 `.tgz` 并存。**`releases/`** 默认 **`.gitignore`**（若要提交历史包可去掉忽略）。

**本地验证：** 在任意 Vue 3 **业务项目**里再执行安装（这才是「业务侧安装依赖」）：

```bash
npm install /绝对或相对路径/draw-empty/releases/draw-empty-0.1.0.tgz
```

然后在业务项目里按下文 [**在 `main.ts` 中全局引入**](#main-ts-global) 使用即可。

---

## 维护者：如何发布到 npm（`npm publish`） {#maintainer-publish}

1. **取消私有标记**：根目录 `package.json` 里若有 **`"private": true`**，npm 会拒绝发布；需要公开发布时请 **删掉该字段** 或改为 **`"private": false`**。
2. **登录 npm**（仅首次或换账号）：`npm login`
3. **更新版本号**（任选其一）：
   - 手动改 `package.json` 的 **`version`**
   - 或使用：`npm version patch`（补丁号 +1） / `minor` / `major`
4. **发布**：

```bash
npm publish
```

若包名是 **`@你的作用域/包名`** 这种私有域格式，首次公开往往需要：

```bash
npm publish --access public
```

发布后，使用者即可在业务项目执行：`npm install draw-empty`（具体名称以 `package.json` 的 **`name`** 为准）。

---

## 发布检查清单（维护者） {#maintainer-checklist}

1. **`npm pack --dry-run --pack-destination releases`**（或 **`npm run pack`** 前先 dry-run）确认 **`files`** 只包含需要发布的目录（当前为 **`src`**）。
2. **`exports`** / **`types`** / **`main`** 指向入口 **`./src/index.ts`**，`import 'draw-empty'` 可解析。
3. **`peerDependencies.vue`** 已声明，避免与业务重复安装 Vue。
4. 发包前已 **`npm run prepare:undraw`**（或插图已随仓库提交），否则使用者可能缺少 SVG。

---

## 在业务项目中安装 {#consumer-install}

**前提：** 已由维护者完成 **打包**（得到 `.tgz`）或 **发布到 npm**（见上文）；下面是在 **你的 Vue 3 业务项目** 里安装 **draw-empty** 本身。

正式发包后（`package.json` 中 `name` 为 `draw-empty`）：

```bash
npm install draw-empty
```

在发包前，可用 **Git 依赖**、**本地路径** 或 **`.tgz`** 验证：

```bash
npm install git+https://github.com/<org>/<repo>.git#main
# 或
npm install file:../draw-empty
# 或（维护者 npm run pack 生成的文件）
npm install ./releases/draw-empty-0.1.0.tgz
```

---

## 在 `main.ts` 中全局引入 {#main-ts-global}

使用 **`createDrawEmptyPlugin`**（或包默认导出，二者等价）注册全局组件，并可选传入 **`accentColor`**：

```ts
import { createApp } from 'vue'
import App from './App.vue'
import { createDrawEmptyPlugin } from 'draw-empty'

const app = createApp(App)

app.use(
  createDrawEmptyPlugin({
    // 全局默认插图主色（HEX）；与站点主色对齐即可，例如 Tailwind blue-600
    accentColor: '#2563EB',
  }),
)

app.mount('#app')
```

等价写法（默认导出即为 `createDrawEmptyPlugin`）：

```ts
import drawEmpty from 'draw-empty'

app.use(drawEmpty({ accentColor: '#2563EB' }))
```

注册完成后，任意 SFC 模板中可直接使用：

```vue
<template>
  <DrawEmpty
    title="暂无数据"
    description="请稍后再试或更换筛选条件"
    illustration="Empty"
  />
</template>
```

底层单图组件：

```vue
<UndrawImg name="Empty" width="200" />
```

---

## 配置全局主色调

插件选项 **`accentColor`**（可选）会在应用根部 **`provide`** 默认值；**`DrawEmpty`**、**`UndrawImg`** 内部通过 **`inject`** 读取，并与 props 合并：

- **全局**：`app.use(createDrawEmptyPlugin({ accentColor: '#2563EB' }))`
- **单次覆盖**：在组件上设置 `accent-color`（或 `accentColor`）即可覆盖全局值；不传则沿用全局；插件也未传则保留 SVG 原始配色。

组件级示例：

```vue
<DrawEmpty illustration="Offline" accent-color="#059669" />
<UndrawImg name="Offline" accent-color="#059669" />
```

如需在应用其它位置读取同一注入键（高级用法），可从包中导入 **`drawEmptyDefaultAccentKey`**（`InjectionKey<string | undefined>`），与插件配套使用。

---

## 按需引入组件（不全局注册）

若不想 `app.use`，可仅导入组件并在局部注册：

```vue
<script setup lang="ts">
import { DrawEmpty, UndrawImg } from 'draw-empty'
</script>
```

注意：未调用插件时，没有全局 `provide`，除非你在上层自行 `provide(drawEmptyDefaultAccentKey, '#2563EB')`，否则不会出现全局默认主色。

---

## Vite 项目提示

多数情况下 **无需额外配置**。若遇到预构建缓存异常，可在 `vite.config.ts` 中将依赖加入优化列表后再试：

```ts
export default defineConfig({
  optimizeDeps: {
    include: ['draw-empty'],
  },
})
```

---

更详细的插图命名与脚本说明见 [快速开始](./quickstart.md) 与组件文档 [插画空状态（DrawEmpty）](/components/draw-empty)。
