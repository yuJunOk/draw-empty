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
import { withBase } from 'vitepress'
import {
  BRAND_EN_ABBR,
  BRAND_PKG_NAME,
  SITE_PACKAGE_VERSION,
  getIllusOfficialSite,
  isRemoteIllusOfficialSite,
} from './.vitepress/site-meta'

/** 首页页脚等处展示的版本号（与根目录 package.json 一致） */
const siteVersion = SITE_PACKAGE_VERSION

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
        — 面向设计与开发的 Vue 3 插画空状态组件：插图、标题、说明与操作区一体编排；插图颜色可与品牌对齐（属性
        <code>accent-color</code>），素材为本地 unDraw 风格 SVG。
      </p>
      <div class="ep-hero__actions">
        <a class="ep-btn ep-btn--primary" :href="withBase('/guide/quickstart')">快速开始</a>
        <a class="ep-btn ep-btn--default" :href="withBase('/components/draw-empty')">组件文档</a>
      </div>
    </div>
    <div class="ep-hero__visual" aria-hidden="true">
      <div class="ep-hero__visual-ring"></div>
      <div class="ep-hero__visual-panel">
        <div class="ep-hero__visual-deco" aria-hidden="true"></div>
        <img
          class="ep-hero__logo ep-hero__logo--feature"
          :src="withBase('/logo.svg')"
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
  <a class="ep-tile" :href="withBase('/guide/introduction')">
    <span class="ep-tile__icon" aria-hidden="true">📘</span>
    <h2 class="ep-tile__title">指南</h2>
    <p class="ep-tile__desc">了解适用场景、快速接入步骤与安装方式（对标常见组件库文档结构）。</p>
    <span class="ep-tile__more">查看详情</span>
  </a>
  <a class="ep-tile" :href="withBase('/components/draw-empty')">
    <span class="ep-tile__icon" aria-hidden="true">🧩</span>
    <h2 class="ep-tile__title">组件</h2>
    <p class="ep-tile__desc">通过 Demo 查看交互与 API：DrawEmpty、UndrawImg、插槽与示例代码。</p>
    <span class="ep-tile__more">查看详情</span>
  </a>
  <div class="ep-tile ep-tile--panel">
    <span class="ep-tile__icon" aria-hidden="true">⚡</span>
    <h2 class="ep-tile__title">资源</h2>
    <p class="ep-tile__desc">
      浏览包内已带的插图文件名、搜索并复制用法；也可前往 unDraw 获取更多素材。
    </p>
    <div class="ep-tile__actions">
      <a class="ep-tile__action ep-tile__action--primary" :href="withBase('/components/illustration-gallery')">
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
    以下为站内真实渲染；完整源码见 <a :href="withBase('/components/draw-empty')">组件文档</a>。若在<strong>本地</strong>运行文档站且插图为空，请查看 <a :href="withBase('/guide/maintainer-note')">仓库与文档站维护</a> 中的插图脚本说明。
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
      <header class="ep-demo-card__head">插图主色</header>
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
        <li><a :href="withBase('/guide/introduction')">介绍</a></li>
        <li><a :href="withBase('/guide/quickstart')">快速开始</a></li>
        <li v-if="illusSiteRemote">
          <a :href="illusSiteHref" target="_blank" rel="noopener noreferrer">DrawE 外链</a>
        </li>
      </ul>
    </div>
    <div class="ep-site-footer__col">
      <h3 class="ep-site-footer__heading">组件</h3>
      <ul class="ep-site-footer__list">
        <li><a :href="withBase('/components/draw-empty')">插画空状态</a></li>
      </ul>
    </div>
    <div class="ep-site-footer__col">
      <h3 class="ep-site-footer__heading">许可与维护</h3>
      <ul class="ep-site-footer__list">
        <li>MIT License</li>
        <li>插图遵循 unDraw 许可</li>
        <li class="ep-site-footer__note">
          维护文档站与打包见
          <a :href="withBase('/guide/maintainer-note')">仓库与文档站维护</a>
          ；完整架构说明见 GitHub 仓库内 <strong>DEVELOPMENT.md</strong>
        </li>
      </ul>
    </div>
  </div>
  <div class="ep-site-footer__bottom">
    <span class="ep-site-footer__brand">{{ BRAND_EN_ABBR }} · {{ BRAND_PKG_NAME }} · v{{ siteVersion }}</span>
  </div>
</footer>

</div>
