import type { App, Plugin } from 'vue'
import DrawEmpty from './components/DrawEmpty.vue'
import UndrawImg from './components/UndrawImg.vue'
import { drawEmptyDefaultAccentKey } from './injection'

export interface DrawEmptyPluginOptions {
  /**
   * 全局默认插图主色（HEX）。
   * 各组件仍可通过 `accent-color` / `accentColor` 单独覆盖；不传则保持 SVG 原始配色。
   */
  accentColor?: string
}

/**
 * Vue 3 插件：全局注册 `DrawEmpty`、`UndrawImg`，并可注入默认 `accentColor`。
 *
 * ```ts
 * app.use(createDrawEmptyPlugin({ accentColor: '#2563EB' }))
 * ```
 */
export function createDrawEmptyPlugin(options: DrawEmptyPluginOptions = {}): Plugin {
  return {
    install(app: App) {
      app.component('DrawEmpty', DrawEmpty)
      app.component('UndrawImg', UndrawImg)
      const accent = options.accentColor?.trim()
      if (accent) {
        app.provide(drawEmptyDefaultAccentKey, accent)
      }
    },
  }
}

export default createDrawEmptyPlugin
