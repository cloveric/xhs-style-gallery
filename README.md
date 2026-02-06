<div align="center">

# XHS Style Gallery

### 小红书风格模板库

**115种AI生成风格Prompt，助力 Nano Banana Pro (Google Gemini) 图文创作**

[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646cff?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-06b6d4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Styles](https://img.shields.io/badge/Styles-115-22c55e?style=flat-square)](#风格分类)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

[功能特性](#功能特性) · [快速开始](#快速开始) · [风格分类](#风格分类) · [技术栈](#技术栈) · [预览图生成](#预览图生成)

</div>

---

## 预览

<table>
<tr>
<td width="50%">

**Light Mode**

<img src="public/screenshots/gallery-light.png" alt="Gallery Light Mode" width="100%">

</td>
<td width="50%">

**Dark Mode**

<img src="public/screenshots/gallery-dark.png" alt="Gallery Dark Mode" width="100%">

</td>
</tr>
</table>

## 功能特性

| | 特性 | 描述 |
|---|---|---|
| **115** | 风格模板 | 覆盖小红书爆款、AI艺术、排版模板三大分类 |
| **18** | 子分类筛选 | 极简设计、动漫、赛博朋克、卡片排版... |
| **14** | 场景标签 | 美食、穿搭、教程、旅行、产品展示... |
| **1-click** | 复制Prompt | 每种风格附带详细的AI生图提示词 |
| **AI** | 真实预览图 | 每种风格均有 Gemini 3 Pro 生成的示例图 |

**更多**: 模糊搜索(中英文) · 本地收藏 · 深色模式 · 响应式瀑布流布局

## 快速开始

```bash
git clone https://github.com/cloveric/xhs-style-gallery.git
cd xhs-style-gallery
npm install
npm run dev
```

## 风格分类

<table>
<tr>
<td>

### 小红书爆款 `30种`
极简 · 静奢 · 莫兰迪 · 3D立体 · 粘土3D · 孟菲斯 · 多巴胺 · 美拉德 · 杂志风 · 复古胶片 · 韩系简约 · 贴纸合集...

</td>
<td>

### AI艺术风格 `64种`
吉卜力 · 新海诚 · 赛博朋克 · 蒸汽波 · 手办盒装 · 乐高 · 皮克斯3D · 双重曝光 · 水墨 · 浮世绘 · Funko Pop · 定格动画...

</td>
<td>

### 排版模板 `21种`
单卡片 · 金句卡片 · 清单步骤 · 教程How-to · 对比VS · 数据高亮 · 旅行行程 · 读书笔记 · 情绪板...

</td>
</tr>
</table>

<details>
<summary><b>18个子分类详情</b></summary>

| 主分类 | 子分类 |
|--------|--------|
| **小红书爆款** | 极简设计 · 色彩系 · 3D/立体 · 信息展示 · 摄影氛围 · 潮流风格 |
| **AI艺术风格** | 动漫 · 摄影风格 · 绘画 · 数字艺术 · 经典艺术 · 风格化 · 玩具/手办 |
| **排版模板** | 卡片排版 · 清单/步骤 · 对比/展示 · 社交/互动 · 内容组织 |

</details>

## 技术栈

```
React 19          — 最新版React，无状态管理库（useState + custom hooks）
TypeScript 5.6    — 严格模式，零any
Vite 6            — 极速开发服务器和构建
Tailwind CSS v4   — 原子化CSS，@theme块定义设计token
Fuse.js           — 客户端模糊搜索，支持中英文加权搜索
react-masonry-css — Pinterest风格瀑布流布局
lucide-react      — 轻量图标库
```

## 项目结构

```
xhs-style-gallery/
├── public/images/previews/    # 115张 Gemini 3 Pro 生成的预览图
├── src/
│   ├── types/style.ts         # TypeScript 类型定义
│   ├── data/
│   │   ├── categories.ts      # 分类和子分类元数据
│   │   └── styles.json        # 115条风格完整数据
│   ├── hooks/                 # 自定义 hooks (5个)
│   ├── components/            # UI 组件 (15个)
│   └── App.tsx                # 根组件
├── scripts/
│   ├── awe-gemini-web/        # Gemini Web 图片生成技能
│   ├── batch-generate.js      # 批量生成预览图
│   └── retry-failed.js        # 重试失败生成
└── CLAUDE.md                  # Claude Code 项目指南
```

## 预览图生成

所有115张预览图均由 **Google Gemini 3 Pro** 通过 `awe-gemini-web` 技能生成。生成工具已包含在 `scripts/` 目录中。

```bash
# 1. 安装 bun (如果未安装)
npm install -g bun

# 2. 首次使用需登录 Google 账号（会打开 Chrome 浏览器）
bun scripts/awe-gemini-web/scripts/main.ts --login

# 3. 生成单张图片
bun scripts/awe-gemini-web/scripts/main.ts -p "你的提示词" \
    --image public/images/previews/style-name.png -m gemini-3-pro

# 4. 批量生成所有缺失的预览图
node scripts/batch-generate.js

# 5. 重试失败的生成
node scripts/retry-failed.js
```

> **注意**: `awe-gemini-web` 使用反向工程的 Gemini Web API，非 Google 官方 API。需要 Google 账号登录，cookies 缓存在本地，不会上传到仓库。

## 常用命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | TypeScript 类型检查 + 生产构建 |
| `npm run preview` | 预览生产构建 |

## Star History

<a href="https://star-history.com/#cloveric/xhs-style-gallery&Date">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=cloveric/xhs-style-gallery&type=Date&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=cloveric/xhs-style-gallery&type=Date" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=cloveric/xhs-style-gallery&type=Date" />
 </picture>
</a>

---

<div align="center">

**Made with React + Gemini 3 Pro**

[Report Bug](https://github.com/cloveric/xhs-style-gallery/issues) · [Request Feature](https://github.com/cloveric/xhs-style-gallery/issues)

</div>
