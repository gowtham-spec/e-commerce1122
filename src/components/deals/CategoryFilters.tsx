
import React from 'react';
import { Button } from '@/components/ui/button';
import { Filter, ChevronDown } from 'lucide-react';

interface CategoryFiltersProps {
  categories: string[];
  activeCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

const CategoryFilters: React.FC<CategoryFiltersProps> = ({ 
  categories, 
  activeCategory, 
  onCategoryChange 
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Button 
        variant={activeCategory === null ? "default" : "outline"} 
        size="sm"
        onClick={() => onCategoryChange(null)}
        className={activeCategory === null ? "bg-purple-gradient" : "border-purple-200 dark:border-purple-800/40"}
      >
        All
      </Button>
      
      {categories.map(category => (
        <Button 
          key={category} 
          variant={activeCategory === category ? "default" : "outline"} 
          size="sm"
          onClick={() => onCategoryChange(category)}
          className={activeCategory === category ? "bg-purple-gradient" : "border-purple-200 dark:border-purple-800/40"}
        >
          {category}
        </Button>
      ))}
      
      <Button variant="outline" size="sm" className="gap-1 border-purple-200 dark:border-purple-800/40">
        <Filter className="h-4 w-4" /> 
        More Filters
        <ChevronDown className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default CategoryFilters;
