
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DealItem } from '@/data/dealsData';

interface DealCardProps {
  deal: DealItem;
  onAddToCart: (deal: DealItem) => void;
}

const DealCard: React.FC<DealCardProps> = ({ deal, onAddToCart }) => {
  return (
    <motion.div variants={{
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0 }
    }}>
      <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 border-purple-200 dark:border-purple-800/40 group">
        <div className="relative pt-[75%] overflow-hidden">
          <img
            src={deal.image}
            alt={deal.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <Badge className="absolute top-2 right-2 bg-purple-gradient text-white">
            {deal.discount}% OFF
          </Badge>
        </div>
        
        <CardContent className="p-4">
          <div className="text-sm text-muted-foreground mb-1">{deal.brand}</div>
          <h3 className="font-medium line-clamp-2 h-12 mb-1">{deal.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{deal.description}</p>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-purple-600 dark:text-purple-400">
              ${deal.discountedPrice}
            </span>
            <span className="text-sm text-gray-500 line-through">
              ${deal.originalPrice}
            </span>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0">
          <Button 
            className="w-full bg-purple-gradient hover:shadow-purple-lg"
            onClick={() => onAddToCart(deal)}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default DealCard;
