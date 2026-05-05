# 快速开始

## 环境

- Node.js **18+**
- 执行插图脚本时需访问 `https://undraw.co/`

## 安装

```bash
git clone <你的仓库> draw-empty
cd draw-empty
npm install
```

## 拉取演示插图

首次克隆或修改 `scripts/lib/undraw-catalog-queries.cjs` 中的 **`PRESET_DEMO_QUERIES`** 后，拉取**演示用**插图：

```bash
npm run prepare:undraw
```

若需要把官网搜索索引下的插图**几乎全部**下载到本地（通常 **1600+** 张，耗时长、磁盘占用大；脚本用多关键词分页并集，不是单一的「svg」搜索）：

```bash
npm run prepare:undraw:all
```

可选参数（直接调 node）：`--force` 覆盖已有文件，`--concurrency 8` 并发数，`--limit 100` 仅下载合并列表里的前 N 条（调试）。关键词可在 `scripts/lib/undraw-catalog-queries.cjs` 扩充。

SVG 输出目录：`src/assets/undraw-illustrations/`。  
本地文件名为 **`官网英文标题 + .svg`**（保留空格与大小写），例如 `Signed Document.svg`；组件里 `illustration` / `UndrawImg` 的 `name` 填不带后缀的标题字符串即可。**标题相同则后者覆盖前者**（非法路径字符会被剔除）。

## 启动文档站（含 Demo）

```bash
npm run dev
```

浏览器访问终端提示的本地地址（一般为 `http://localhost:5173`）。

## 构建静态站点

```bash
npm run build
npm run preview
```

产物目录：`docs/.vitepress/dist/`。

维护者如需了解「为何选 VitePress、目录含义、如何加 Demo」等，请阅读仓库根目录的 **`DEVELOPMENT.md`**（该文件不纳入文档站路由，仅供克隆后的仓库阅读）。
