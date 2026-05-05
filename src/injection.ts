import type { InjectionKey } from 'vue'

/** 插件 `accentColor` 注入键；按需可在业务里 `inject` 做扩展组件对齐 */
export const drawEmptyDefaultAccentKey: InjectionKey<string | undefined> = Symbol(
  'draw-empty-default-accent',
)
