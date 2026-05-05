---
sidebar: false
outline: false
footer: false
title: DrawE
pageClass: drawe-home
---

<script setup>
import Basic from './demos/draw-empty-basic.vue'
import Action from './demos/draw-empty-action.vue'
import Accent from './demos/draw-empty-accent.vue'
import { useData } from 'vitepress'
import {
  getIllusOfficialSite,
  isRemoteIllusOfficialSite,
} from './.vitepress/site-meta'
import { BRAND_EN_ABBR, BRAND_PKG_NAME } from './.vitepress/brand'

const { theme } = useData()
/** @type {string} */
const siteVersion = String(theme.drawEmptyVersion ?? '')

const illusSiteHref = getIllusOfficialSite()
const illusSiteRemote = isRemoteIllusOfficialSite(illusSiteHref)
</script>

<div class="home ep-home">

<section class="ep-hero">
  <div class="ep-hero__bg" aria-hidden="true"></div>
  <div class="ep-hero__inner">
    <div class="ep-hero__copy">
      <span class="ep-hero__badge">Vue 3 · TypeScript · unDraw</span>
      <div class="ep-hero__headline">
        <h1 class="ep-hero__title ep-hero__title--brand">{{ BRAND_EN_ABBR }}</h1>
        <code class="ep-hero__pkg ep-hero__pkg--hero">{{ BRAND_PKG_NAME }}</code>
      </div>
      <p class="ep-hero__lead">
        <strong>{{ BRAND_EN_ABBR }}</strong>
        <span class="ep-hero__lead-muted">（Drawing × Empty）</span>
        — Vue 3 插画空状态组件；npm 包 <code>{{ BRAND_PKG_NAME }}</code>。上图下文一体编排插图、标题、说明与操作区，支持
        <code>accent-color</code> 与 unDraw SVG。
      </p>
      <div class="ep-hero__actions">
        <a class="ep-btn ep-btn--primary" href="/guide/quickstart">快速开始</a>
        <a class="ep-btn ep-btn--default" href="/components/draw-empty">组件文档</a>
      </div>
    </div>
    <div class="ep-hero__visual" aria-hidden="true">
      <div class="ep-hero__visual-ring"></div>
      <div class="ep-hero__visual-panel">
        <div class="ep-hero__visual-deco" aria-hidden="true"></div>
        <img
          class="ep-hero__logo ep-hero__logo--feature"
          src="/logo.svg"
          width="160"
          height="160"
          :alt="`${BRAND_EN_ABBR} · ${BRAND_PKG_NAME}`"
          decoding="async"
        />
      </div>
    </div>
  </div>
</section>

<section class="ep-tiles" aria-label="文档入口">
  <a class="ep-tile" href="/guide/introduction">
    <span class="ep-tile__icon" aria-hidden="true">📘</span>
    <h2 class="ep-tile__title">指南</h2>
    <p class="ep-tile__desc">了解项目定位、包含内容与插图版权说明。</p>
    <span class="ep-tile__more">查看详情</span>
  </a>
  <a class="ep-tile" href="/components/draw-empty">
    <span class="ep-tile__icon" aria-hidden="true">🧩</span>
    <h2 class="ep-tile__title">组件</h2>
    <p class="ep-tile__desc">插画空状态（DrawEmpty）的 props、插槽与可运行 Demo。</p>
    <span class="ep-tile__more">查看详情</span>
  </a>
  <div class="ep-tile ep-tile--panel">
    <span class="ep-tile__icon" aria-hidden="true">⚡</span>
    <h2 class="ep-tile__title">插图资源</h2>
    <p class="ep-tile__desc">
      在站内按官网标题浏览本地已下载的 SVG，支持搜索与复制组件代码；也可前往 unDraw 浏览更多素材并配色下载。
    </p>
    <div class="ep-tile__actions">
      <a class="ep-tile__action ep-tile__action--primary" href="/components/illustration-gallery">
        浏览本地插图
      </a>
      <a
        class="ep-tile__action ep-tile__action--secondary"
        href="https://undraw.co/"
        target="_blank"
        rel="noopener noreferrer"
      >
        unDraw 官网
      </a>
    </div>
  </div>
</section>

<section class="ep-section" aria-labelledby="ep-demo-title">
  <h2 id="ep-demo-title" class="ep-section__title">在线示例</h2>
  <p class="ep-section__lead">
    以下为站内真实渲染；完整源码见
    <a href="/components/draw-empty">组件文档</a>。若插图未显示，请先执行 <code>npm run prepare:undraw</code>。
  </p>

  <div class="ep-demo-grid">
    <article class="ep-demo-card">
      <header class="ep-demo-card__head">基础用法</header>
      <div class="ep-demo-card__body">
        <ClientOnly>
          <Basic />
        </ClientOnly>
      </div>
    </article>
    <article class="ep-demo-card">
      <header class="ep-demo-card__head">插槽与操作区</header>
      <div class="ep-demo-card__body">
        <ClientOnly>
          <Action />
        </ClientOnly>
      </div>
    </article>
    <article class="ep-demo-card">
      <header class="ep-demo-card__head">accent-color</header>
      <div class="ep-demo-card__body">
        <ClientOnly>
          <Accent />
        </ClientOnly>
      </div>
    </article>
  </div>
</section>

<footer class="ep-site-footer">
  <div class="ep-site-footer__grid">
    <div class="ep-site-footer__col">
      <h3 class="ep-site-footer__heading">文档</h3>
      <ul class="ep-site-footer__list">
        <li><a href="/guide/introduction">介绍</a></li>
        <li><a href="/guide/quickstart">快速开始</a></li>
        <li v-if="illusSiteRemote">
          <a :href="illusSiteHref" target="_blank" rel="noopener noreferrer">DrawE 外链</a>
        </li>
      </ul>
    </div>
    <div class="ep-site-footer__col">
      <h3 class="ep-site-footer__heading">组件</h3>
      <ul class="ep-site-footer__list">
        <li><a href="/components/draw-empty">插画空状态</a></li>
      </ul>
    </div>
    <div class="ep-site-footer__col">
      <h3 class="ep-site-footer__heading">许可与维护</h3>
      <ul class="ep-site-footer__list">
        <li>MIT License</li>
        <li>插图遵循 unDraw 许可</li>
        <li class="ep-site-footer__note">工程说明见仓库根目录 <strong>DEVELOPMENT.md</strong></li>
      </ul>
    </div>
  </div>
  <div class="ep-site-footer__bottom">
    <span class="ep-site-footer__brand">{{ BRAND_EN_ABBR }} · {{ BRAND_PKG_NAME }} · v{{ siteVersion }}</span>
  </div>
</footer>

</div>
