import { Category } from '@/types/product';
import categoriesData from '@/data/mock-categories.json';

export async function getCategories(): Promise<Category[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return categoriesData.categories as Category[];
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  
  const findCategory = (categories: Category[]): Category | null => {
    for (const category of categories) {
      if (category.slug === slug) {
        return category;
      }
      if (category.children) {
        const found = findCategory(category.children);
        if (found) return found;
      }
    }
    return null;
  };

  return findCategory(categoriesData.categories as Category[]);
}

