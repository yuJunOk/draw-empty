<template>
  <div class="readme-undraw-only">
    <UndrawImg name="Empty Mailbox" :width="220" alt="Empty Mailbox" />
    <p class="readme-undraw-caption">底层组件 · 仅展示 SVG 插图（UndrawImg）</p>
  </div>
</template>

<script setup lang="ts">
import UndrawImg from '@draw-empty/components/UndrawImg.vue'
</script>

<style scoped>
.readme-undraw-only {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.readme-undraw-caption {
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  color: #909399;
  text-align: center;
  max-width: 280px;
}
</style>
