
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Check, ChevronRight, Download, ShoppingBag } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';

const OrderConfirmationPage = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
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

  // Format price to Indian Rupees
  const formatPriceToINR = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price * 83); // Approximate conversion rate from USD to INR
  };

  // Clear cart and go to home when "Continue Shopping" is clicked
  const handleContinueShopping = () => {
    clearCart();
    navigate('/');
  };

  // Container animation
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
  
  // Item animation
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

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.div variants={itemVariants}>
          <Card className="border-purple-200 dark:border-purple-800/40">
            <CardHeader className="bg-purple-50 dark:bg-purple-900/20 border-b border-purple-100 dark:border-purple-800/30">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Order Summary</CardTitle>
                <span className="text-sm text-muted-foreground">#{orderNumber}</span>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Order Date</span>
                  <span className="text-sm">{new Date().toLocaleDateString('en-IN')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Expected Delivery</span>
                  <span className="text-sm">{formattedDeliveryDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Payment Method</span>
                  <span className="text-sm">Cash on Delivery</span>
                </div>
                <Separator />
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between py-2">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded overflow-hidden bg-white border">
                          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="text-sm">{formatPriceToINR(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Subtotal</span>
                    <span className="text-sm">{formatPriceToINR(totalPrice)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Shipping</span>
                    <span className="text-sm">{formatPriceToINR(totalPrice > 500/83 ? 0 : 100/83)}</span>
                  </div>
                  <div className="flex items-center justify-between font-medium">
                    <span>Total</span>
                    <span className="text-lg text-purple-600 dark:text-purple-400">
                      {formatPriceToINR(totalPrice > 500/83 ? totalPrice : totalPrice + 100/83)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-purple-gradient text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold mb-1">Track your order</h3>
                  <p className="text-sm text-white/80">
                    Get updates about your order status
                  </p>
                </div>
                <Button variant="secondary" size="sm" className="text-purple-600">
                  Track Order <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

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
      </motion.div>
    </div>
  );
};

export default OrderConfirmationPage;
