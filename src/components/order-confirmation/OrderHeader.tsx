
import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const OrderHeader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center mb-6"
    >
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
        className="rounded-full bg-green-100 dark:bg-green-900/30 p-4 w-24 h-24 mx-auto mb-6 flex items-center justify-center"
      >
        <Check className="h-12 w-12 text-green-600 dark:text-green-400" />
      </motion.div>
      <motion.h1 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-3xl font-bold mb-2"
      >
        Order Confirmed!
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-muted-foreground"
      >
        Thanks for shopping with us. Your order has been received and is being processed.
      </motion.p>
    </motion.div>
  );
};

export default OrderHeader;
