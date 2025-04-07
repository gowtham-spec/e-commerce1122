
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CartItem } from '@/contexts/CartContext';
import { formatPriceToINR } from '@/utils/priceFormatter';

interface OrderSummaryProps {
  orderNumber: string;
  formattedDeliveryDate: string;
  items: CartItem[];
  totalPrice: number;
  itemVariants: any;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ 
  orderNumber, 
  formattedDeliveryDate, 
  items, 
  totalPrice,
  itemVariants 
}) => {
  return (
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
                <span className="text-sm">{formatPriceToINR(totalPrice > 500 ? 0 : 100)}</span>
              </div>
              <div className="flex items-center justify-between font-medium">
                <span>Total</span>
                <span className="text-lg text-purple-600 dark:text-purple-400">
                  {formatPriceToINR(totalPrice > 500 ? totalPrice : totalPrice + 100)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default OrderSummary;
