export type StyleCategory = 'xiaohongshu' | 'ai-art' | 'layout';

export type UseCase =
  | '美食'
  | '穿搭'
  | '教程'
  | '科普知识'
  | '产品展示'
  | '旅行'
  | '美妆护肤'
  | '生活方式'
  | '科技数码'
  | '读书笔记'
  | 'ACG/二次元'
  | '职场效率'
  | '家居装修'
  | '健身运动';

export interface StyleTemplate {
  id: string;
  name_zh: string;
  name_en: string;
  category: StyleCategory;
  subcategory: string;
  tags: string[];
  description_zh: string;
  description_en: string;
  prompt: string;
  prompt_tips: string;
  best_for: string[];
  use_cases: UseCase[];
  color_palette: string[];
  preview_image: string;
  reference_images: string[];
  difficulty?: 'easy' | 'medium' | 'advanced';
}

export type FilterState = {
  category: StyleCategory | 'all';
  subcategory: string | 'all';
  useCase: UseCase | 'all';
  searchQuery: string;
  selectedTags: string[];
  showFavoritesOnly: boolean;
};

export interface CategoryMeta {
  id: StyleCategory | 'all';
  label_zh: string;
  label_en: string;
  color: string;
}

export interface SubcategoryMeta {
  id: string;
  label_zh: string;
  label_en: string;
  parentCategory: StyleCategory;
}
