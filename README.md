# XHS Style Gallery

> 小红书风格模板库 — 115种AI生成风格Prompt，助力 Nano Banana Pro (Google Gemini) 图文创作

![React](https://img.shields.io/badge/React-19-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4.0-blue) ![Styles](https://img.shields.io/badge/Styles-115-green)

## 功能特性

- **115种风格模板** — 覆盖小红书爆款、AI艺术、排版模板三大分类
- **多维度筛选** — 3主分类 + 18子分类 + 14场景标签 + 标签筛选 + 模糊搜索
- **一键复制Prompt** — 每种风格附带详细的AI生图提示词
- **Gemini 3 Pro预览图** — 每种风格均有真实AI生成的示例图
- **收藏功能** — 本地收藏常用风格，快速访问
- **深色模式** — 完整的明暗主题切换
- **响应式设计** — 桌面瀑布流 + 移动端自适应

## 风格分类

| 分类 | 数量 | 包含 |
|------|------|------|
| **小红书爆款** | 30 | 极简、静奢、莫兰迪、3D立体、孟菲斯、贴纸合集... |
| **AI艺术风格** | 64 | 吉卜力、赛博朋克、手办盒装、乐高、皮克斯3D、双重曝光... |
| **排版模板** | 21 | 单卡片、清单步骤、对比VS、视觉笔记... |

### 子分类一览

- **小红书**: 极简设计、色彩系、3D/立体、信息展示、摄影氛围、潮流风格
- **AI艺术**: 动漫、摄影风格、绘画、数字艺术、经典艺术、风格化、玩具/手办
- **排版**: 卡片排版、清单/步骤、对比/展示、社交/互动、内容组织

## 快速开始

```bash
git clone https://github.com/cloveric/xhs-style-gallery.git
cd xhs-style-gallery
npm install
npm run dev
```

## 技术栈

- **React 19** — 最新版React，无状态管理库（useState + custom hooks）
- **TypeScript 5.6** — 严格模式，零any
- **Vite 6** — 极速开发服务器和构建
- **Tailwind CSS v4** — 原子化CSS，`@theme`块定义设计token
- **Fuse.js** — 客户端模糊搜索，支持中英文加权搜索
- **react-masonry-css** — Pinterest风格瀑布流布局
- **lucide-react** — 轻量图标

## 项目结构

```
xhs-style-gallery/
├── public/images/previews/    # 115张Gemini 3 Pro生成的预览图
├── src/
│   ├── types/style.ts         # TypeScript类型定义
│   ├── data/
│   │   ├── categories.ts      # 分类和子分类元数据
│   │   └── styles.json        # 115条风格完整数据
│   ├── hooks/                 # 自定义hooks (5个)
│   ├── components/            # UI组件 (15个)
│   └── App.tsx                # 根组件
├── scripts/
│   ├── awe-gemini-web/       # Gemini Web图片生成技能
│   ├── batch-generate.js     # 批量生成预览图
│   └── retry-failed.js       # 重试失败生成
├── CLAUDE.md                  # Claude Code项目指南
└── TODO.md                    # 待办事项和优化计划
```

## 预览图生成

所有115张预览图均由 **Google Gemini 3 Pro** 通过 `awe-gemini-web` 技能生成。生成工具已包含在 `scripts/` 目录中。

### 生成新风格的预览图

```bash
# 1. 安装 bun (如果未安装)
npm install -g bun

# 2. 首次使用需登录 Google 账号（会打开 Chrome 浏览器）
bun scripts/awe-gemini-web/scripts/main.ts --login

# 3. 生成单张图片
bun scripts/awe-gemini-web/scripts/main.ts -p "你的提示词" --image public/images/previews/style-name.png -m gemini-3-pro

# 4. 批量生成所有缺失的预览图
node scripts/batch-generate.js

# 5. 重试失败的生成（编辑 retry-failed.js 中的列表）
node scripts/retry-failed.js
```

### scripts/ 目录说明

| 文件 | 用途 |
|------|------|
| `awe-gemini-web/` | Gemini Web API 图片生成技能（反向工程，非官方API） |
| `batch-generate.js` | 批量为 styles.json 中的风格生成预览图 |
| `retry-failed.js` | 用简化prompt重试失败的图片生成 |

> **注意**: `awe-gemini-web` 使用反向工程的 Gemini Web API，非 Google 官方 API。需要 Google 账号登录，cookies 缓存在本地 `%APPDATA%` 目录中（不会上传到仓库）。

## 常用命令

```bash
npm run dev      # 启动开发服务器
npm run build    # TypeScript 类型检查 + 生产构建
npm run preview  # 预览生产构建
```

## License

MIT
