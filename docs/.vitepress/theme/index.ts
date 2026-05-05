import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import CodeBlock from './components/CodeBlock.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('CodeBlock', CodeBlock)
  },
} satisfies Theme
