
import React, { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import sampleDeals, { DealItem } from '@/data/dealsData';
import useCountdownTimer from '@/hooks/useCountdownTimer';
import DealsHeader from '@/components/deals/DealsHeader';
import CategoryFilters from '@/components/deals/CategoryFilters';
import DealsGrid from '@/components/deals/DealsGrid';
import { formatPriceToINR } from '@/utils/priceFormatter';

const DealsPage = () => {
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const { addItem } = useCart();
  const timeLeft = useCountdownTimer();
  
  const handleAddToCart = (deal: DealItem) => {
    addItem({
      id: deal.id,
      name: deal.name,
      price: deal.discountedPrice,
      image: deal.image,
      quantity: 1,
      category: deal.category
    });
  };

  const filteredDeals = filterCategory 
    ? sampleDeals.filter(deal => deal.category === filterCategory)
    : sampleDeals;
    
  const uniqueCategories = Array.from(new Set(sampleDeals.map(deal => deal.category)));
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <DealsHeader timeLeft={timeLeft} />
        
        <div className="mt-4 md:mt-0">
          <CategoryFilters 
            categories={uniqueCategories} 
            activeCategory={filterCategory}
            onCategoryChange={setFilterCategory}
          />
        </div>
      </div>
      
      <Separator className="mb-8 bg-purple-100 dark:bg-purple-800/40" />
      
      <DealsGrid deals={filteredDeals} onAddToCart={handleAddToCart} />
    </div>
  );
};

export default DealsPage;
