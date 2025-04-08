
import productsData from './productsData';
import categoriesData from './categoriesData';
import subcategoriesData from './subcategoriesData';
import additionalProducts from './additionalProducts';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  subcategory?: string;
  brand: string;
  rating: number;
  reviewCount: number;
  stock: number;
  featured: boolean;
  colors?: string[];
  sizes?: string[];
  specifications?: {
    [key: string]: string;
  };
}

export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
  subcategories?: Subcategory[];
}

export interface Subcategory {
  id: string;
  categoryId: string;
  name: string;
}

// Combine the regular products with additional products
const allProducts = [...productsData, ...additionalProducts];
export const products = allProducts;
export const categories = categoriesData;
export const subcategories = subcategoriesData;

// We need to enhance the categories with subcategories
const categoriesWithSubcategories = categories.map(category => {
  const categorySubcategories = subcategories.filter(
    subcategory => subcategory.categoryId === category.id
  );
  
  return {
    ...category,
    subcategories: categorySubcategories
  };
});

// Replace our reference with the enhanced version
export const categoriesEnhanced = categoriesWithSubcategories;

export const getProductById = (productId: string): Product | undefined => {
  return products.find(product => product.id === productId);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => product.category === categoryId);
};

export const getProductsBySubcategory = (subcategoryId: string): Product[] => {
  return products.filter(product => product.subcategory === subcategoryId);
};

export const getFeaturedProducts = (limit: number = 8): Product[] => {
  return products
    .filter(product => product.featured)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};

export const getNewArrivals = (limit: number = 8): Product[] => {
  // In a real app, this would sort by date added
  return [...products]
    .sort((a, b) => b.stock - a.stock)
    .slice(0, limit);
};

export const getBestSellers = (limit: number = 8): Product[] => {
  return [...products]
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, limit);
};

export const getRelatedProducts = (product: Product, limit: number = 4): Product[] => {
  // First try to find products with similar name keywords
  const keywords = product.name.toLowerCase().split(' ').filter(word => word.length > 3);
  
  let relatedByName = products.filter(p => 
    p.id !== product.id && 
    keywords.some(keyword => 
      p.name.toLowerCase().includes(keyword) || 
      p.description.toLowerCase().includes(keyword)
    )
  );
  
  // If we have enough matches by name, return these
  if (relatedByName.length >= limit) {
    return relatedByName.slice(0, limit);
  }
  
  // Otherwise, add products from the same category/subcategory
  let relatedByCategory = products.filter(p => 
    p.id !== product.id && 
    p.category === product.category &&
    !relatedByName.some(r => r.id === p.id)
  );
  
  // Prioritize same subcategory if available
  if (product.subcategory) {
    const sameSubcategory = relatedByCategory.filter(p => p.subcategory === product.subcategory);
    
    // Sort by rating and add them first
    sameSubcategory.sort((a, b) => b.rating - a.rating);
    relatedByName = [...relatedByName, ...sameSubcategory];
    
    // Filter out products already added by subcategory
    relatedByCategory = relatedByCategory.filter(p => p.subcategory !== product.subcategory);
  }
  
  // Sort remaining by rating
  relatedByCategory.sort((a, b) => b.rating - a.rating);
  
  // Combine both lists, prioritizing name matches
  const combined = [...relatedByName, ...relatedByCategory];
  
  return combined.slice(0, limit);
};

export const searchProducts = (query: string): Product[] => {
  const normalizedQuery = query.toLowerCase().trim();
  
  return products.filter(product => {
    // Search in product name, description, brand, category
    return (
      product.name.toLowerCase().includes(normalizedQuery) ||
      product.description.toLowerCase().includes(normalizedQuery) ||
      product.brand.toLowerCase().includes(normalizedQuery) ||
      product.category.toLowerCase().includes(normalizedQuery) ||
      (product.subcategory && product.subcategory.toLowerCase().includes(normalizedQuery))
    );
  });
};

export const filterProducts = (options: {
  category?: string;
  subcategory?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  brands?: string[];
  inStock?: boolean;
  sortBy?: 'price-low-high' | 'price-high-low' | 'rating' | 'popularity';
}): Product[] => {
  let filteredProducts = products.filter(product => {
    // Category filter
    if (options.category && product.category !== options.category) {
      return false;
    }
    
    // Subcategory filter
    if (options.subcategory && product.subcategory !== options.subcategory) {
      return false;
    }
    
    // Price filters
    if (options.minPrice && product.price < options.minPrice) {
      return false;
    }
    if (options.maxPrice && product.price > options.maxPrice) {
      return false;
    }
    
    // Rating filter
    if (options.minRating && product.rating < options.minRating) {
      return false;
    }
    
    // Brand filter
    if (options.brands && options.brands.length > 0 && !options.brands.includes(product.brand)) {
      return false;
    }
    
    // Stock filter
    if (options.inStock && product.stock <= 0) {
      return false;
    }
    
    return true;
  });

  // Apply sorting
  if (options.sortBy) {
    switch (options.sortBy) {
      case 'price-low-high':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'popularity':
        filteredProducts.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }
  }
  
  return filteredProducts;
};
