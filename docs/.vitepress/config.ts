import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '../..')
const pkg = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf-8')) as { version: string }
const siteVersion = pkg.version

export default defineConfig({
  lang: 'zh-CN',
  title: 'DrawE',
  description: 'DrawE（draw-empty）：基于 Vue 3 与 unDraw 的插画空状态组件与文档',
  srcDir: '.',
  cleanUrls: true,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'alternate icon', href: '/favicon.svg' }],
  ],
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: '首页', link: '/' },
      { text: '使用指南', link: '/guide/introduction' },
      { text: '组件', link: '/components/draw-empty' },
      { text: '插图浏览', link: '/components/illustration-gallery' },
      { text: `更新日志 v${siteVersion}`, link: '/guide/changelog' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '使用指南',
          items: [
            { text: '介绍', link: '/guide/introduction' },
            { text: '快速开始', link: '/guide/quickstart' },
            { text: 'npm 依赖接入', link: '/guide/npm' },
            { text: '更新日志', link: '/guide/changelog' },
          ],
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
