# Design: Add 10 Xiaohongshu Info-Display Styles (With Previews)

Date: 2026-02-06

## Goal

Increase the number of `xiaohongshu` styles by 10, focused on "information layout" covers (lists/steps/tables/frameworks) that tend to perform well on Xiaohongshu. For this iteration we also generate and commit preview images for each new style so the gallery remains fully visual and copy-ready.

## Non-goals

- Image optimization (WebP/AVIF, thumbnails) or repo size reduction
- Bundle splitting / performance work beyond keeping the app building cleanly
- New UI features or filtering behaviors (existing schema + UI should work unchanged)

## Data Changes

Add 10 new `StyleTemplate` entries in `src/data/styles.json` under:

- `category`: `xiaohongshu`
- `subcategory`: `info-display`

New style IDs:

- `pitfall-checklist` (避坑清单风)
- `key-takeaways` (重点高亮风)
- `step-by-step-cards` (步骤教程卡片)
- `comparison-table` (对比测评表格)
- `pros-cons-cards` (优缺点拆解卡)
- `framework-map` (方法论框架图)
- `decision-tree` (决策树流程图)
- `ranking-board` (排行榜数据卡)
- `myth-vs-fact` (辟谣真相卡)
- `formula-cheatsheet` (公式速记卡)

Each entry follows the existing schema: bilingual name/description, tags, `use_cases` from the existing controlled enum, a prompt containing `[YOUR TOPIC]`, and `preview_image` pointing to `/images/previews/{id}.png`.

## Preview Image Generation

Generate previews with `scripts/awe-gemini-web/scripts/main.ts` (`gemini-3-pro`), outputting:

- `public/images/previews/{id}.png`

Preview topics used (for image generation only):

- pitfall-checklist: 新手护肤避坑清单：7个常见误区
- key-takeaways: 读书笔记：原子习惯 5个关键要点
- step-by-step-cards: PPT 快速排版：4步搞定清爽封面
- comparison-table: iPhone 16 vs 16 Pro：到底怎么选？
- pros-cons-cards: AirPods Pro 2 优缺点拆解：值不值？
- framework-map: 时间管理 GTD：6大模块框架图
- decision-tree: 选防晒：油皮/干皮/敏感肌 决策树
- ranking-board: 2026 轻薄本推荐 TOP5（续航/重量/价格）
- myth-vs-fact: 辟谣：喝咖啡会脱水？误区 VS 真相
- formula-cheatsheet: 面试 STAR 法则速记卡（模板+例子）

## Documentation Updates

Update counts to reflect the new totals:

- Total styles: 125 (was 115)
- `xiaohongshu`: 40 (was 30)
- Previews: 125 PNG

## Validation

- `npm run lint`
- `npm run build`
- Data integrity check: ensure `use_cases` values are valid, ids are unique, and all referenced `preview_image` files exist.

