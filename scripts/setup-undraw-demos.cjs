/**
 * 拉取 unDraw 插图到 src/assets/undraw-illustrations（供 DrawEmpty / UndrawImg）
 *
 * 本地文件名 = 官网英文标题原文 + .svg（如 Signed Document.svg）；非法字符会剔除。
 * 标题相同则后者覆盖前者（全量下载前按标题去重，保留列表中最后一次出现的条目）。
 *
 *   node scripts/setup-undraw-demos.cjs              # 仅预设（演示包，体积小）
 *   node scripts/setup-undraw-demos.cjs --all        # 官网搜索索引下的几乎全部插图（多关键词并集）
 *   node scripts/setup-undraw-demos.cjs --all --force  # 已存在也覆盖重下
 *   node scripts/setup-undraw-demos.cjs --all --limit 50   # 只处理前 50 条（调试）
 *
 * 全量说明：官方 search API 单关键词分页有上限，且 `page` 无效，须使用 `offset` + `limit`；
 * 脚本读取 `scripts/lib/undraw-catalog-queries.cjs` 中的多组关键词，分页抓取后按 slug 去重合并。
 */

const path = require('path')
const fs = require('fs')
const readline = require('readline')
const {
  searchIllustrations,
  searchIllustrationsOffset,
  downloadSVG,
  sleep,
  fileStemFromOfficialTitle,
} = require('./lib/undraw-downloader.cjs')
const {
  CATALOG_SEARCH_QUERIES,
  PRESET_DEMO_QUERIES,
} = require('./lib/undraw-catalog-queries.cjs')

/**
 * 日志前缀：经典 Windows CMD 对彩色 Emoji 常显示为「问号块」，此处一律用 ASCII。
 * （正文仍可用中文；若中文乱码请在 CMD 执行 chcp 65001 或使用 Windows Terminal。）
 */
const M = {
  ok: '[OK]',
  warn: '[!]',
  err: '[x]',
  idx: '[index]',
  prog: '[..]',
  dl: '[dl]',
  out: '[out]',
  sum: '[sum]',
}

/** Windows / 部分终端仅用 \\r 重写无法擦除尾部字符，会导致「张」等重复显示 */
function writeProgressLine(text) {
  readline.cursorTo(process.stdout, 0)
  readline.clearLine(process.stdout, 1)
  process.stdout.write(text)
}

function endProgressLine() {
  readline.cursorTo(process.stdout, 0)
  readline.clearLine(process.stdout, 1)
}

const ROOT = path.join(__dirname, '..')
const OUT = path.join(ROOT, 'src', 'assets', 'undraw-illustrations')
const COLOR = '#2563EB'

const PAGE_LIMIT = 100

function parseArgs(argv) {
  const all = argv.includes('--all')
  const force = argv.includes('--force')
  let limit = null
  const li = argv.indexOf('--limit')
  if (li !== -1 && argv[li + 1]) {
    const n = parseInt(argv[li + 1], 10)
    if (!Number.isNaN(n) && n > 0) limit = n
  }
  let concurrency = 8
  const ci = argv.indexOf('--concurrency')
  if (ci !== -1 && argv[ci + 1]) {
    const n = parseInt(argv[ci + 1], 10)
    if (!Number.isNaN(n) && n >= 1 && n <= 32) concurrency = n
  }
  return { all, force, limit, concurrency }
}

async function runPresets() {
  fs.mkdirSync(OUT, { recursive: true })

  for (const raw of PRESET_DEMO_QUERIES) {
    const keyword = typeof raw === 'string' ? raw : raw.keyword
    const pick = typeof raw === 'string' ? 0 : (raw.pick ?? 0)
    try {
      const results = await searchIllustrations(keyword)
      if (!results.length) {
        console.warn(`${M.warn} 无结果: ${keyword}`)
        continue
      }
      const hit = results[pick]
      if (!hit) {
        console.warn(`${M.warn} 结果不足 (pick=${pick}): ${keyword}`)
        continue
      }
      const slug = hit.newSlug
      if (!slug || !hit.media) {
        console.warn(`${M.warn} 缺少 slug 或 media: ${keyword}`)
        continue
      }
      const stem = fileStemFromOfficialTitle(hit.title, slug)
      const dest = path.join(OUT, `${stem}.svg`)
      await downloadSVG(hit.media, dest, COLOR)
      console.log(
        `${M.ok} ${stem}.svg <- "${hit.title}" (api: ${slug}; 搜: "${keyword}"${pick ? `, #${pick}` : ''})`,
      )
    } catch (e) {
      console.error(`${M.err} ${keyword}:`, e.message)
    }
  }
}

/** 单个关键词：offset 递增直到无结果 */
async function fetchAllForKeyword(keyword, bySlug) {
  let offset = 0
  let pages = 0
  for (;;) {
    const body = await searchIllustrationsOffset(keyword, offset, PAGE_LIMIT)
    const batch = body.results || []
    if (!batch.length) break
    for (const hit of batch) {
      if (hit.newSlug && hit.media) bySlug.set(hit.newSlug, hit)
    }
    offset += batch.length
    pages += 1
    await sleep(55)
    if (batch.length < PAGE_LIMIT) break
    if (pages > 500) {
      console.warn(`\n${M.warn} 关键词「${keyword}」分页过多，已中止该词（防死循环）`)
      break
    }
  }
}

async function fetchCatalogMerged() {
  const bySlug = new Map()
  const queries = CATALOG_SEARCH_QUERIES

  console.log(
    `${M.idx} 多关键词并集索引（共 ${queries.length} 个搜索词，每页最多 ${PAGE_LIMIT} 条）...`,
  )

  for (let i = 0; i < queries.length; i++) {
    const q = queries[i]
    writeProgressLine(`${M.prog} [${i + 1}/${queries.length}] 「${q}」... 累计 ${bySlug.size} 张`)
    try {
      await fetchAllForKeyword(q, bySlug)
    } catch (e) {
      endProgressLine()
      console.warn(`${M.warn} 「${q}」请求失败: ${e.message}`)
    }
  }

  endProgressLine()
  console.log('')

  const list = [...bySlug.values()].sort((a, b) =>
    (a.title || '').localeCompare(b.title || ''),
  )

  if (list.length < 1650) {
    console.warn(
      `${M.warn} 合并仅 ${list.length} 张，低于官网常见 total≈1676；可在 undraw-catalog-queries.cjs 增补英文关键词后重跑。`,
    )
  } else {
    console.log(`${M.sum} 合并完成：${list.length} 张（与官网索引量级一致即可）`)
  }

  return list
}

async function mapPool(limit, items, worker) {
  let index = 0
  const runners = Array(Math.min(limit, Math.max(items.length, 1)))
    .fill(null)
    .map(async () => {
      while (true) {
        const i = index++
        if (i >= items.length) break
        await worker(items[i], i)
      }
    })
  await Promise.all(runners)
}

async function runAll({ force, limit, concurrency }) {
  fs.mkdirSync(OUT, { recursive: true })

  let list = await fetchCatalogMerged()

  if (limit != null) list = list.slice(0, limit)

  /** 同标题只保留最后一次（后者覆盖） */
  const byStem = new Map()
  for (const hit of list) {
    const stem = fileStemFromOfficialTitle(hit.title, hit.newSlug)
    byStem.set(stem, hit)
  }
  const jobs = [...byStem.entries()].map(([stem, hit]) => ({ stem, hit }))
  const total = jobs.length
  let done = 0
  let skipped = 0
  let failed = 0

  if (jobs.length < list.length) {
    console.log(
      `${M.sum} 按官网标题去重：${list.length} 条索引 → ${jobs.length} 个文件名（同名将覆盖）`,
    )
  }

  console.log(`${M.dl} 开始下载 ${total} 个 SVG（并发 ${concurrency}）...`)

  await mapPool(concurrency, jobs, async ({ hit, stem }) => {
    const dest = path.join(OUT, `${stem}.svg`)
    try {
      if (!force && fs.existsSync(dest)) {
        skipped += 1
      } else {
        await downloadSVG(hit.media, dest, COLOR)
      }
    } catch (e) {
      failed += 1
      console.error(`\n${M.err} ${stem}.svg (${hit.newSlug}): ${e.message}`)
    }
    done += 1
    if (done % 50 === 0 || done === total) {
      writeProgressLine(`${M.prog} ${done}/${total} 已完成（跳过 ${skipped}，失败 ${failed}）`)
    }
  })

  endProgressLine()
  console.log('')
  console.log(`${M.out} 输出目录: ${OUT}`)
  console.log(`${M.sum} 合计 ${total} 个文件；跳过已有 ${skipped}；失败 ${failed}`)
}

async function main() {
  const argv = process.argv.slice(2)
  const opts = parseArgs(argv)

  if (opts.all) {
    await runAll(opts)
  } else {
    await runPresets()
  }

  console.log('')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
