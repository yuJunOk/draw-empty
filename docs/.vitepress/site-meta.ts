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
