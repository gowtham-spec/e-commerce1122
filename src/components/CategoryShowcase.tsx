
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shirt, Laptop, ToyBrick, Tools } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Category } from '@/data/products';
import { getProductsByCategory } from '@/data/products';
import ProductCard from '@/components/ProductCard';

type CategoryIconProps = {
  categoryId: string;
  className?: string;
};

// Component to display the appropriate icon based on category ID
const CategoryIcon = ({ categoryId, className = "h-5 w-5" }: CategoryIconProps) => {
  switch (categoryId) {
    case 'clothing':
      return <Shirt className={className} />;
    case 'electronics':
      return <Laptop className={className} />;
    case 'toys':
      return <ToyBrick className={className} />;
    case 'tools':
      return <Tools className={className} />;
    default:
      return <ArrowRight className={className} />;
  }
};

type CategoryShowcaseProps = {
  category: Category;
};

const CategoryShowcase = ({ category }: CategoryShowcaseProps) => {
  const categoryProducts = getProductsByCategory(category.id).slice(0, 4);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="my-12">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <CategoryIcon categoryId={category.id} className="mr-2 h-6 w-6" />
          <h2 className="text-2xl font-bold">{category.name}</h2>
        </div>
        <Button variant="link" asChild>
          <Link to={`/category/${category.id}`}>View All</Link>
        </Button>
      </div>

      <p className="text-muted-foreground mb-6">{category.description}</p>

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {categoryProducts.map((product) => (
          <motion.div key={product.id} variants={item}>
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-4 flex flex-wrap gap-3">
        {category.subcategories.map((subcategory) => (
          <Link 
            key={subcategory.id} 
            to={`/category/${category.id}/${subcategory.id}`}
            className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 hover:bg-purple-200 dark:hover:bg-purple-800/50 text-purple-800 dark:text-purple-300 rounded-full text-sm font-medium transition-colors"
          >
            {subcategory.name}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryShowcase;
