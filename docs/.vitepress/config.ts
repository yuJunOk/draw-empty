import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '../..')
const pkg = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf-8')) as { version: string }
const siteVersion = pkg.version

/**
 * GitHub Pages 项目站：`https://<user>.github.io/<repo>/`
 * CI 中设置 `VITEPRESS_BASE=/<repo>/`（须首尾 `/`，末位可为仓库名后的 `/`）。
 */
function vitepressBase(): string {
  const raw = process.env.VITEPRESS_BASE?.trim()
  if (!raw || raw === '/') return '/'
  let b = raw.startsWith('/') ? raw : `/${raw}`
  if (!b.endsWith('/')) b = `${b}/`
  return b
}

const base = vitepressBase()

export default defineConfig({
  base,
  lang: 'zh-CN',
  title: 'DrawE',
  description: 'DrawE（draw-empty）：基于 Vue 3 与 unDraw 的插画空状态组件与文档',
  srcDir: '.',
  cleanUrls: true,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}favicon.svg` }],
    ['link', { rel: 'alternate icon', href: `${base}favicon.svg` }],
  ],
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/introduction' },
      { text: '组件', link: '/components/draw-empty' },
      { text: '资源', link: '/components/illustration-gallery' },
      { text: `更新日志 v${siteVersion}`, link: '/guide/changelog' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '介绍', link: '/guide/introduction' },
            { text: '快速开始', link: '/guide/quickstart' },
            { text: '安装与接入', link: '/guide/install' },
            { text: '更新日志', link: '/guide/changelog' },
          ],
        },
        {
          text: '维护说明',
          collapsed: true,
          items: [{ text: '仓库与文档站维护', link: '/guide/maintainer-note' }],
        },
      ],
      '/components/': [
        { text: '插画空状态（DrawEmpty）', link: '/components/draw-empty' },
        { text: '插图资源浏览', link: '/components/illustration-gallery' },
      ],
    },
    socialLinks: [],
    footer: {
      message: `MIT License · 插图遵循 unDraw 许可 · 当前文档对应 v${siteVersion}`,
      copyright: `DrawE · draw-empty`,
    },
    outline: {
      label: '本页目录',
      level: [2, 3],
    },
    docFooter: {
      prev: false,
      next: false,
    },
    search: {
      provider: 'local',
    },

    /** 首页页脚等客户端可读（自定义字段） */
    drawEmptyVersion: siteVersion,
  },
  vite: {
    resolve: {
      alias: {
        '@draw-empty': path.join(projectRoot, 'src'),
      },
    },
  },
})
