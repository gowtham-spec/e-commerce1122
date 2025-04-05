
import React from 'react';
import { motion } from 'framer-motion';
import DealCard from './DealCard';
import { DealItem } from '@/data/dealsData';

interface DealsGridProps {
  deals: DealItem[];
  onAddToCart: (deal: DealItem) => void;
}

const DealsGrid: React.FC<DealsGridProps> = ({ deals, onAddToCart }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <>
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {deals.map((deal) => (
          <DealCard key={deal.id} deal={deal} onAddToCart={onAddToCart} />
        ))}
      </motion.div>
      
      {deals.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No deals found for this category. Try another filter or check back later.</p>
        </div>
      )}
    </>
  );
};

export default DealsGrid;
