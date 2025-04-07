
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import OrderHeader from '@/components/order-confirmation/OrderHeader';
import OrderSummary from '@/components/order-confirmation/OrderSummary';
import TrackOrderCard from '@/components/order-confirmation/TrackOrderCard';
import OrderActions from '@/components/order-confirmation/OrderActions';
import { formatPriceToINR } from '@/utils/priceFormatter';

const OrderConfirmationPage = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  
  // Generate random order number
  const orderNumber = React.useMemo(() => 
    Math.floor(100000 + Math.random() * 900000).toString(), 
    []
  );

  // Estimated delivery date (5-7 days from now)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 5 + Math.floor(Math.random() * 3));
  
  const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Clear cart and go to home when "Continue Shopping" is clicked
  const handleContinueShopping = () => {
    clearCart();
    navigate('/');
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <OrderHeader />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <OrderSummary 
          orderNumber={orderNumber} 
          formattedDeliveryDate={formattedDeliveryDate}
          formatPriceToINR={formatPriceToINR}
          items={items}
          totalPrice={totalPrice}
          itemVariants={itemVariants}
        />
        
        <TrackOrderCard itemVariants={itemVariants} />
        
        <OrderActions 
          itemVariants={itemVariants}
          handleContinueShopping={handleContinueShopping}
        />
      </motion.div>
    </div>
  );
};

export default OrderConfirmationPage;
