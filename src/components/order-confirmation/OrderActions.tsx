
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Download, ShoppingBag } from 'lucide-react';

interface OrderActionsProps {
  itemVariants: any;
  handleContinueShopping: () => void;
}

const OrderActions: React.FC<OrderActionsProps> = ({ itemVariants, handleContinueShopping }) => {
  return (
    <motion.div variants={itemVariants} className="flex justify-center space-x-4">
      <Button 
        variant="outline"
        className="border-purple-200 dark:border-purple-800/40"
        onClick={() => window.print()}
      >
        <Download className="mr-2 h-4 w-4" />
        Download Invoice
      </Button>
      <Button 
        onClick={handleContinueShopping}
        className="bg-purple-gradient hover:shadow-purple-lg"
      >
        <ShoppingBag className="mr-2 h-4 w-4" />
        Continue Shopping
      </Button>
    </motion.div>
  );
};

export default OrderActions;
