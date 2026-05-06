import pkg from '../../package.json'

/** 与仓库根目录 `package.json` 的 `version` 同步（构建期打入包内，供首页页脚等客户端组件使用）。 */
export const SITE_PACKAGE_VERSION: string = pkg.version

/** 英文简称 DrawE；npm / 仓库包名 draw-empty（与组件 DrawEmpty、文档路由一致） */
export const BRAND_EN_ABBR = 'DrawE'
export const BRAND_PKG_NAME = 'draw-empty'

/**
 * 首页页脚「DrawE 外链」（可选）。
 * - 构建环境变量 `VITE_ILLUS_SITE`（优先级最高）
 * - 或填写下方 `illusOfficialSiteManual`
 * - 均未配置时回退为站内 `/guide/quickstart`
 */
export const illusOfficialSiteManual = ''

export function getIllusOfficialSite(): string {
  const env = (import.meta.env.VITE_ILLUS_SITE as string | undefined)?.trim()
  if (env) return env
  const manual = illusOfficialSiteManual.trim()
  if (manual) return manual
  return '/guide/quickstart'
}

export function isRemoteIllusOfficialSite(url: string): boolean {
  return /^https?:\/\//i.test(url)
}
