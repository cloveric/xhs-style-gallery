import type { CategoryMeta, SubcategoryMeta, UseCase } from '@/types/style';

export const categories: CategoryMeta[] = [
  {
    id: 'all',
    label_zh: '全部',
    label_en: 'All',
    color: '#6b7280',
  },
  {
    id: 'xiaohongshu',
    label_zh: '小红书爆款',
    label_en: 'Xiaohongshu Hits',
    color: '#ff2442',
  },
  {
    id: 'ai-art',
    label_zh: 'AI艺术风格',
    label_en: 'AI Art Styles',
    color: '#6366f1',
  },
  {
    id: 'layout',
    label_zh: '排版模板',
    label_en: 'Layout Templates',
    color: '#10b981',
  },
];

export const subcategories: SubcategoryMeta[] = [
  // xiaohongshu subcategories
  { id: 'minimal-design', label_zh: '极简设计', label_en: 'Minimal Design', parentCategory: 'xiaohongshu' },
  { id: 'color-palette', label_zh: '色彩系', label_en: 'Color Palette', parentCategory: 'xiaohongshu' },
  { id: '3d-effects', label_zh: '3D/立体', label_en: '3D Effects', parentCategory: 'xiaohongshu' },
  { id: 'info-display', label_zh: '信息展示', label_en: 'Info Display', parentCategory: 'xiaohongshu' },
  { id: 'photo-mood', label_zh: '摄影氛围', label_en: 'Photo Mood', parentCategory: 'xiaohongshu' },
  { id: 'trending', label_zh: '潮流风格', label_en: 'Trending', parentCategory: 'xiaohongshu' },
  // ai-art subcategories
  { id: 'anime', label_zh: '动漫/Anime', label_en: 'Anime', parentCategory: 'ai-art' },
  { id: 'photography-style', label_zh: '摄影风格', label_en: 'Photography Style', parentCategory: 'ai-art' },
  { id: 'painting', label_zh: '绘画/Painting', label_en: 'Painting', parentCategory: 'ai-art' },
  { id: 'digital-art', label_zh: '数字艺术', label_en: 'Digital Art', parentCategory: 'ai-art' },
  { id: 'classic-art', label_zh: '经典艺术', label_en: 'Classic Art', parentCategory: 'ai-art' },
  { id: 'stylized', label_zh: '风格化', label_en: 'Stylized', parentCategory: 'ai-art' },
  { id: 'toy-figure', label_zh: '玩具/手办', label_en: 'Toy & Figure', parentCategory: 'ai-art' },
  // layout subcategories
  { id: 'card-layout', label_zh: '卡片排版', label_en: 'Card Layout', parentCategory: 'layout' },
  { id: 'list-step', label_zh: '清单/步骤', label_en: 'List & Steps', parentCategory: 'layout' },
  { id: 'compare-display', label_zh: '对比/展示', label_en: 'Compare & Display', parentCategory: 'layout' },
  { id: 'social-interactive', label_zh: '社交/互动', label_en: 'Social & Interactive', parentCategory: 'layout' },
  { id: 'content-org', label_zh: '内容组织', label_en: 'Content Organization', parentCategory: 'layout' },
];

export function getCategoryMeta(id: string): CategoryMeta {
  return categories.find((c) => c.id === id) ?? categories[0];
}

export function getSubcategoriesForCategory(category: string): SubcategoryMeta[] {
  return subcategories.filter((s) => s.parentCategory === category);
}

export function getSubcategoryMeta(id: string): SubcategoryMeta | undefined {
  return subcategories.find((s) => s.id === id);
}

export const useCaseOptions: { value: UseCase; label: string }[] = [
  { value: '美食', label: '美食' },
  { value: '穿搭', label: '穿搭' },
  { value: '教程', label: '教程' },
  { value: '科普知识', label: '科普知识' },
  { value: '产品展示', label: '产品展示' },
  { value: '旅行', label: '旅行' },
  { value: '美妆护肤', label: '美妆护肤' },
  { value: '生活方式', label: '生活方式' },
  { value: '科技数码', label: '科技数码' },
  { value: '读书笔记', label: '读书笔记' },
  { value: 'ACG/二次元', label: 'ACG/二次元' },
  { value: '职场效率', label: '职场效率' },
  { value: '家居装修', label: '家居装修' },
  { value: '健身运动', label: '健身运动' },
];
