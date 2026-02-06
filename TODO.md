# TODO - 待办事项和优化计划

> 来自5人审查团队的分析报告，按优先级排列

---

## P0 - 必须修复

### 图片优化（最大性能瓶颈）
- [ ] PNG转WebP/AVIF — 当前119张PNG共179MB，转换后预计60-90MB
- [ ] 生成400px宽缩略图 — 卡片显示只需300-350px，当前用1080px原图，浪费9倍像素
- [ ] 卡片用缩略图，详情弹窗用原图
- [ ] img标签添加 width/height 属性防止CLS布局偏移

### Bundle优化
- [ ] styles.json 从JS bundle中分离 — 当前占bundle的44.8%（200KB/487KB）
- [ ] 方案：动态import或fetch()加载，首次渲染时异步获取
- [ ] Vite manualChunks 拆分vendor（React/Fuse.js）和数据

### Modal焦点陷阱
- [ ] 安装 focus-trap-react 或手动实现焦点管理
- [ ] 打开Modal时移动焦点到关闭按钮
- [ ] Tab/Shift+Tab限制在Modal内循环
- [ ] 关闭时恢复焦点到触发元素
- [ ] body scroll lock增加ref计数器防止泄漏

### 过滤器状态重置
- [ ] 切换分类时重置 useCase 为 'all' 和 selectedTags 为 []
- [ ] 当前只重置了 subcategory，useCase和tags会变成隐形过滤器

---

## P1 - 尽快修复

### 代码健壮性
- [ ] `useFavorites.ts:26` — localStorage.setItem 包裹 try/catch
- [ ] `useTheme.ts:8,25` — localStorage 操作包裹 try/catch
- [ ] `StyleCard` 添加 React.memo() + 稳定化回调props
- [ ] `App.tsx:30-34` selectedStyle 查找包裹 useMemo

### 移动端体验
- [ ] 收藏按钮触摸目标从26px增大到44px
- [ ] 触屏设备始终显示收藏按钮（不依赖hover）
- [ ] 5层过滤器在移动端折叠为"更多筛选"
- [ ] 各chip行添加区分性标签（目前只有"按场景"有标签）

### 视觉反馈
- [ ] 图片加载骨架屏 — skeleton类已定义但未使用
- [ ] dark mode检查 text-text-primary 在深色背景上的对比度
- [ ] dark mode @theme块添加深色模式颜色变量

### 构建配置
- [ ] Vite manualChunks 分离 vendor-react / vendor-fuse / data
- [ ] 添加 vite-plugin-compression 预压缩 gzip/brotli

---

## P2 - 建议改进

### 功能增强
- [ ] reference_images 填充 — 当前0/115有内容，ImageCarousel形同虚设
- [ ] Modal内左右箭头键切换风格
- [ ] prompt_tips 默认展开（或添加视觉提示）
- [ ] 颜色复制添加"已复制"视觉反馈
- [ ] 搜索+分类组合0结果时提示"其他分类中有N个匹配"
- [ ] ColorPalette tooltip添加键盘支持（focus-within）

### 代码清理
- [ ] ~~删除4个临时JSON文件~~ ✅ 已清理
- [ ] 删除 `useCaseOptions` 死代码（categories.ts:66-81）
- [ ] 删除 index.css 中未使用的 .snap-x/.snap-center 和 .skeleton（或启用skeleton）
- [ ] 自定义scrollbar添加Firefox支持（scrollbar-width/scrollbar-color）
- [ ] 删除52个废弃SVG文件

---

## P3 - 锦上添花

- [ ] 标签过滤改为OR逻辑（或添加AND/OR切换）
- [ ] 过滤状态同步到URL参数（支持分享和收藏筛选结果）
- [ ] 分类按钮显示双语标签
- [ ] "按场景"标签改为双语"按场景 / By Use Case"
- [ ] 收藏切换保留当前过滤器（或恢复之前的状态）
- [ ] Masonry添加768px断点优化平板体验
- [ ] 添加ESLint配置文件
- [ ] Fuse.js minMatchCharLength 改为 2

---

## 功能路线图

### 短期（1周）
- [ ] **[YOUR TOPIC] 一键替换** — 详情页添加主题输入框，复制时自动替换
- [ ] **"随机推荐"按钮** — Header或FilterBar中添加shuffle功能
- [ ] **排序选项** — 按难度/字母序/子分类排序
- [ ] **URL hash路由** — `#/style/minimalist` 支持分享和书签
- [ ] **最近浏览** — localStorage记录最近10个，快捷访问行

### 中期（1月）
- [ ] **相似风格推荐** — 详情页底部基于标签/子分类/场景计算相似度
- [ ] **reference_images批量生成** — 至少前30个风格各2-3张参考图
- [ ] **风格对比模式** — 选2个风格并排比较prompt/色板/描述
- [ ] **Prompt定制面板** — 比例、颜色偏好、语言、复杂度可调
- [ ] **PWA离线支持** — Service Worker + 离线缓存

### 长期（3月+）
- [ ] **Gemini API实时预览** — 输入主题+选风格→在线生成预览图
- [ ] **Chrome插件** — 直接注入Nano Banana Pro界面
- [ ] **用户账户+云同步** — 收藏和历史跨设备同步
- [ ] **社区风格提交** — 用户投稿+投票+审核
- [ ] **多页Prompt模板** — 支持小红书轮播图多页生成

---

## 数据统计

| 指标 | 数值 |
|------|------|
| 总风格数 | 115 |
| 小红书爆款 | 30 |
| AI艺术风格 | 64 |
| 排版模板 | 21 |
| 子分类 | 18 |
| 场景标签 | 14 |
| 预览图 | 115张PNG (179MB) |
| JS Bundle | 487KB (gzip 159KB) |
| CSS Bundle | 34KB (gzip 7KB) |
