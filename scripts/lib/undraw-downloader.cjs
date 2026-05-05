/**
 * unDraw.co API：搜索（offset/limit）、SVG 下载（无外部 npm 依赖）
 *
 * 注意：官方 `/api/search` 的 `page` 参数无效，分页必须用 `offset`；
 * 搭配 `limit=100` 可减少请求次数。单一关键词最多约返回 ~1000 条，
 * 集齐全库需多个关键词搜索结果并集（见 setup-undraw-demos.cjs）。
 */

const https = require('https')
const fs = require('fs')
const path = require('path')

const UA = { 'User-Agent': 'draw-empty-prepare-undraw/1.0 (local dev script)' }

function httpsGetJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: UA }, (res) => {
        let data = ''
        res.on('data', (chunk) => {
          data += chunk
        })
        res.on('end', () => {
          if (res.statusCode !== 200) {
            reject(new Error(`HTTP ${res.statusCode}: ${data.slice(0, 120)}`))
            return
          }
          try {
            resolve(JSON.parse(data))
          } catch {
            reject(new Error('解析 JSON 失败'))
          }
        })
      })
      .on('error', reject)
  })
}

/**
 * @param {string} keyword
 * @param {number} offset
 * @param {number} limit 最大单次拉取建议 100（再大无效）
 */
function searchIllustrationsOffset(keyword, offset = 0, limit = 100) {
  const url = `https://undraw.co/api/search?q=${encodeURIComponent(keyword)}&offset=${offset}&limit=${limit}`
  return httpsGetJson(url)
}

/** 仅第一页（最多 limit 条），供预设关键词搜索 */
async function searchIllustrations(keyword, limit = 100) {
  const body = await searchIllustrationsOffset(keyword, 0, limit)
  return body.results || []
}

function downloadSVG(mediaUrl, outputPath, primaryColor = '#6c63ff') {
  return new Promise((resolve, reject) => {
    https
      .get(mediaUrl, { headers: UA }, (res) => {
        if (res.statusCode !== 200) {
          reject(new Error(`下载失败，状态码: ${res.statusCode}`))
          return
        }
        let svgData = ''
        res.on('data', (chunk) => {
          svgData += chunk
        })
        res.on('end', () => {
          const coloredSvg = svgData.replace(/#6c63ff/gi, primaryColor)
          const dir = path.dirname(outputPath)
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true })
          }
          fs.writeFileSync(outputPath, coloredSvg)
          resolve(outputPath)
        })
      })
      .on('error', reject)
  })
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

/** Windows 等设备非法 / 保留文件名 */
const WIN_RESERVED = new Set([
  'con',
  'prn',
  'aux',
  'nul',
  'com1',
  'com2',
  'com3',
  'com4',
  'com5',
  'com6',
  'com7',
  'com8',
  'com9',
  'lpt1',
  'lpt2',
  'lpt3',
  'lpt4',
  'lpt5',
  'lpt6',
  'lpt7',
  'lpt8',
  'lpt9',
])

/**
 * 文件名主干（无 .svg）= 官网 Illustrations 卡片英文标题原文，保留空格与大小写。
 * 例：`Signed Document` → `Signed Document.svg`
 * 仅移除 Windows/Unix 非法字符；标题为空时回退自 newSlug 可读部分。
 * 同一标题多张图：后者覆盖前者（由调用方在最后合并 Map 或顺序写入实现）。
 */
function fileStemFromOfficialTitle(title, fallbackNewSlug) {
  let s = String(title || '').trim()
  if (!s) {
    const fb = String(fallbackNewSlug || '')
      .replace(/\.svg$/i, '')
      .replace(/_[a-zA-Z0-9]+$/, '')
    s = fb.replace(/-/g, ' ').trim()
  }
  s = s.replace(/[<>:"/\\|?*\u0000-\u001f]/g, '')
  s = s.replace(/[. ]+$/g, '').trim()
  if (!s) s = 'Illustration'
  const lower = s.toLowerCase()
  if (WIN_RESERVED.has(lower)) {
    s = `${s} illustration`
  }
  return s
}

module.exports = {
  searchIllustrations,
  searchIllustrationsOffset,
  downloadSVG,
  sleep,
  fileStemFromOfficialTitle,
}
