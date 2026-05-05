---
sidebar: false
outline: false
aside: false
footer: false
title: README 组件预览
pageClass: readme-showcase-page
---

<!-- 专供 README 截图：突出插画空状态与 UndrawImg，非文档框架 -->

<script setup>
import Basic from './demos/draw-empty-basic.vue'
import Action from './demos/draw-empty-action.vue'
import Accent from './demos/draw-empty-accent.vue'
import UndrawOnly from './demos/readme-undraw-only.vue'
</script>

<div class="readme-showcase-root">

<section class="readme-capture-section" aria-label="基础空状态">
  <h2 class="readme-capture-heading">基础空状态</h2>
  <p class="readme-capture-lead">插图 + 标题 + 说明</p>
  <ClientOnly>
    <div data-readme-capture="basic" class="readme-capture-frame">
      <Basic />
    </div>
  </ClientOnly>
</section>

<section class="readme-capture-section" aria-label="操作区与 extra">
  <h2 class="readme-capture-heading">操作区与额外链接</h2>
  <p class="readme-capture-lead">默认插槽主按钮 · <code>#extra</code> 次要操作</p>
  <ClientOnly>
    <div data-readme-capture="action" class="readme-capture-frame">
      <Action />
    </div>
  </ClientOnly>
</section>

<section class="readme-capture-section" aria-label="accent 换色">
  <h2 class="readme-capture-heading">主色替换</h2>
  <p class="readme-capture-lead"><code>accent-color</code>（HEX）统一插图主色</p>
  <ClientOnly>
    <div data-readme-capture="accent" class="readme-capture-frame">
      <Accent />
    </div>
  </ClientOnly>
</section>

<section class="readme-capture-section" aria-label="UndrawImg">
  <h2 class="readme-capture-heading">仅插图</h2>
  <p class="readme-capture-lead">无需整块空状态时，直接使用 <code>UndrawImg</code></p>
  <ClientOnly>
    <div data-readme-capture="undraw-only" class="readme-capture-frame">
      <UndrawOnly />
    </div>
  </ClientOnly>
</section>

</div>
