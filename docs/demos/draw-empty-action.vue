<template>
  <DrawEmpty
    illustration="Going offline"
    title="网络异常"
    description="请检查网络连接后刷新页面。"
  >
    <button type="button" class="demo-btn">重试</button>
    <template #extra>
      <a class="demo-link" href="#" @click.prevent>联系客服</a>
    </template>
  </DrawEmpty>
</template>

<script setup lang="ts">
import DrawEmpty from '@draw-empty/components/DrawEmpty.vue'
</script>

<style scoped>
.demo-btn {
  padding: 8px 18px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 999px;
  border: 1px solid #cbd5e1;
  background: #fff;
  cursor: pointer;
}

.demo-btn:hover {
  border-color: #94a3b8;
}

.demo-link {
  margin-left: 12px;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.demo-link:hover {
  text-decoration: underline;
}
</style>
