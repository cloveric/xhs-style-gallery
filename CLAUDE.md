# XHS Style Gallery - Claude Code 项目指南

## 项目概述

小红书风格模板库 — 帮助用户在使用 Nano Banana Pro (Google Gemini) 生成小红书图文内容时，快速找到合适的风格 Prompt。125种AI生成风格模板，含预览图、中英文描述、可复制Prompt。

## 技术栈

- **React 19** + **TypeScript 5.6** + **Vite 6**
- **Tailwind CSS v4** — 使用 `@tailwindcss/vite` 插件，无 tailwind.config.js，主题在 `src/index.css` 的 `@theme` 块中定义
- **Fuse.js** — 客户端模糊搜索（加权字段，支持中英文）
- **react-masonry-css** — 瀑布流网格布局
- **lucide-react** — 图标库

## 项目结构

```
src/
├── App.tsx                    # 根组件，状态管理
├── main.tsx                   # 入口
├── index.css                  # Tailwind主题 + 自定义CSS
├── types/style.ts             # 核心类型定义
├── data/
│   ├── categories.ts          # 3主分类 + 18子分类元数据
│   └── styles.json            # 125条风格数据（286KB）
├── hooks/
│   ├── useStyles.ts           # 过滤/搜索核心逻辑
│   ├── useFavorites.ts        # localStorage收藏
│   ├── useTheme.ts            # 深色/浅色主题
│   ├── useClipboard.ts        # 剪贴板操作
│   └── useMediaQuery.ts       # 响应式断点
└── components/
    ├── common/                # Badge, CopyButton, EmptyState, Modal, ThemeToggle
    ├── detail/                # StyleDetailModal, PromptBlock, ColorPalette, ImageCarousel
    ├── filters/               # FilterBar, SearchInput, TagChip
    ├── gallery/               # GalleryGrid, StyleCard
    └── layout/                # Header, Footer
```

## 数据模型

每条风格 (`StyleTemplate`) 包含:
- `id` — 唯一标识 (kebab-case)
- `category` — `'xiaohongshu' | 'ai-art' | 'layout'`
- `subcategory` — 18种子分类之一
- `use_cases` — 受控枚举，14种场景标签
- `prompt` — 含 `[YOUR TOPIC]` 占位符的生成提示词
- `preview_image` — `/images/previews/{id}.png`
- `reference_images` — 目前全部为空 `[]`

## 关键约定

- **Tailwind v4**: 不要创建 tailwind.config.js，主题变量在 `index.css` 的 `@theme` 块定义
- **深色模式**: 通过 `<html>` 上的 `.dark` class 切换，组件用 `dark:` 前缀
- **ESLint v9**: 使用 `eslint.config.js` (flat config)，默认忽略 `scripts/`（避免把生成脚本当应用代码检查）
- **类型安全**: 项目零 `any`，JSON导入用 `as StyleTemplate[]` 断言
- **过滤器流水线**: Favorites → Search (Fuse.js) → Category → Subcategory → UseCase → Tags
- **子分类有效值**: 见 `categories.ts` 中的 `subcategories` 数组
- **use_cases有效值**: 美食、穿搭、教程、科普知识、产品展示、旅行、美妆护肤、生活方式、科技数码、读书笔记、ACG/二次元、职场效率、家居装修、健身运动

## 常用命令

```bash
npm run dev      # 开发服务器
npm run lint     # ESLint 检查
npm run build    # TypeScript检查 + 生产构建
npm run preview  # 预览生产构建
```

## 添加新风格的流程

1. 在 `styles.json` 中添加新条目（遵循 `StyleTemplate` 类型）
2. 确保 `category` 和 `subcategory` 匹配 `categories.ts` 中的定义
3. `use_cases` 只能使用上述14个有效值
4. `prompt` 必须包含 `[YOUR TOPIC]` 占位符
5. 生成预览图放入 `public/images/previews/{id}.png`
6. 运行 `npm run build` 验证零错误

## 已知问题

详见 `TODO.md`，主要包括：
- 图片未压缩（179MB PNG），需转WebP+缩略图
- styles.json内联在JS bundle中（占44.8%），需分包
- Modal缺少焦点陷阱
- reference_images全部为空
