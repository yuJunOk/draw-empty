/**
 * 使用 Playwright 截取「插画空状态」组件本体（docs/readme-showcase.md），输出到 assets/readme/。
 * 用法：npm run build && npm run readme:capture
 */
import { chromium } from 'playwright'
import { execSync, spawn } from 'node:child_process'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const outDir = path.join(root, 'assets', 'readme')

/** 若已手动运行 `npm run preview`，可设 `README_PREVIEW_URL=http://127.0.0.1:4173` 跳过内置预览 */
const existingBase = process.env.README_PREVIEW_URL?.trim()
const previewPort = process.env.README_PREVIEW_PORT || '4174'
const base = existingBase || `http://127.0.0.1:${previewPort}`

/** 与 docs/readme-showcase.md 中 data-readme-capture 一致 */
const captures = [
  { selector: '[data-readme-capture="basic"]', file: 'empty-state-basic.png' },
  { selector: '[data-readme-capture="action"]', file: 'empty-state-action.png' },
  { selector: '[data-readme-capture="accent"]', file: 'empty-state-accent.png' },
  { selector: '[data-readme-capture="undraw-only"]', file: 'undraw-img-only.png' },
]

async function waitForServer(url, timeoutMs = 60_000) {
  const start = Date.now()
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url)
      if (res.ok) return
    } catch {
      /* retry */
    }
    await new Promise((r) => setTimeout(r, 400))
  }
  throw new Error(`Timed out waiting for ${url}`)
}

function runPreview(port) {
  const vp = path.join(root, 'node_modules', 'vitepress', 'bin', 'vitepress.js')
  return spawn(process.execPath, [vp, 'preview', 'docs', '--host', '127.0.0.1', '--port', String(port)], {
    cwd: root,
    stdio: 'pipe',
    detached: false,
  })
}

function killPreview(child) {
  if (!child?.pid) return
  if (process.platform === 'win32') {
    try {
      execSync(`taskkill /PID ${child.pid} /T /F`, { stdio: 'ignore' })
    } catch {
      /* ignore */
    }
  } else {
    try {
      child.kill('SIGTERM')
    } catch {
      /* ignore */
    }
  }
}

async function main() {
  await mkdir(outDir, { recursive: true })

  let preview = null
  if (!existingBase) {
    preview = runPreview(previewPort)
    preview.stderr?.on('data', (d) => process.stderr.write(d))
    preview.stdout?.on('data', (d) => process.stdout.write(d))
    preview.on('error', (err) => console.error('preview spawn:', err))
  }

  try {
    await waitForServer(`${base}/`)

    const browser = await chromium.launch()
    const context = await browser.newContext({
      viewport: { width: 720, height: 900 },
      deviceScaleFactor: 2,
    })
    const page = await context.newPage()

    await page.goto(`${base}/readme-showcase`, { waitUntil: 'load', timeout: 120_000 })
    await page.waitForTimeout(2500)

    for (const { selector, file } of captures) {
      const loc = page.locator(selector).first()
      await loc.waitFor({ state: 'visible', timeout: 60_000 })
      await loc.screenshot({ path: path.join(outDir, file), scale: 'css' })
    }

    await browser.close()
    console.log(`Screenshots written to ${outDir}`)
  } finally {
    if (preview) killPreview(preview)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
