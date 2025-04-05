
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Category } from '@/data/products';

interface CategoryShowcaseProps {
  categories: Category[];
  className?: string;
}

const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({ categories, className = '' }) => {
  // Function to get a background color based on category name
  const getCategoryColor = (categoryName: string) => {
    const colorMap: Record<string, string> = {
      'electronics': 'bg-blue-100 dark:bg-blue-900/20',
      'clothing': 'bg-purple-100 dark:bg-purple-900/20',
      'home': 'bg-green-100 dark:bg-green-900/20',
      'kitchen': 'bg-yellow-100 dark:bg-yellow-900/20',
      'books': 'bg-red-100 dark:bg-red-900/20',
      'sports': 'bg-orange-100 dark:bg-orange-900/20',
      'toys': 'bg-pink-100 dark:bg-pink-900/20',
      'beauty': 'bg-teal-100 dark:bg-teal-900/20',
      'grocery': 'bg-lime-100 dark:bg-lime-900/20',
      'furniture': 'bg-amber-100 dark:bg-amber-900/20',
      'stationery': 'bg-cyan-100 dark:bg-cyan-900/20',
    };
    
    const lowerCaseName = categoryName.toLowerCase();
    
    for (const [key, value] of Object.entries(colorMap)) {
      if (lowerCaseName.includes(key)) {
        return value;
      }
    }
    
    // Default color if no match
    return 'bg-gray-100 dark:bg-gray-800/40';
  };

  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 ${className}`}>
      {categories.map((category) => (
        <Link to={`/category/${category.id}`} key={category.id}>
          <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
            <div className={`relative pt-[56.25%] ${getCategoryColor(category.name)}`}>
              <img 
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-contain p-4"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium text-center">{category.name}</h3>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default CategoryShowcase;
