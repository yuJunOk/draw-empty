/// <reference types="vite/client" />

declare module '*.vue?raw' {
  const src: string
  export default src
}

interface ImportMetaEnv {
  /** 可选：页脚「DrawE 外链」完整 URL（未配置则使用 site-meta 回退逻辑） */
  readonly VITE_ILLUS_SITE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
