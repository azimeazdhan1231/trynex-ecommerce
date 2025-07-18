import { Category } from '../types';
import categoriesData from '../data/categories.json';

export const getCategories = (): Category[] => {
  return categoriesData.categories;
};

export const getCategoryById = (id: string): Category | undefined => {
  return categoriesData.categories.find(category => category.id === id);
};

export const getCategoryByName = (name: string): Category | undefined => {
  return categoriesData.categories.find(category => 
    category.name.toLowerCase() === name.toLowerCase()
  );
};

export const getCategoriesWithProducts = (): Category[] => {
  return categoriesData.categories.filter(category => category.productCount > 0);
};

export const getTopCategories = (limit: number = 6): Category[] => {
  return categoriesData.categories
    .sort((a, b) => b.productCount - a.productCount)
    .slice(0, limit);
};

export const searchCategories = (query: string): Category[] => {
  const searchTerm = query.toLowerCase();
  return categoriesData.categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm) ||
    category.namebn.toLowerCase().includes(searchTerm) ||
    category.description.toLowerCase().includes(searchTerm)
  );
};
