
import React from 'react';
import { Truck, Calendar, Clock } from 'lucide-react';

const DeliveryInfo: React.FC = () => {
  // Sample delivery dates
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 4);
  const fastDeliveryDate = new Date();
  fastDeliveryDate.setDate(fastDeliveryDate.getDate() + 2);
  
  return (
    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg mb-4">
      <div className="flex items-center mb-2">
        <Truck className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2" />
        <h3 className="font-medium">Delivery Information</h3>
      </div>
      <div className="ml-7 space-y-2 text-sm">
        <p className="flex items-center">
          <Calendar className="h-4 w-4 mr-2 text-purple-600 dark:text-purple-400" />
          Standard Delivery: {deliveryDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })}
        </p>
        <p className="flex items-center">
          <Clock className="h-4 w-4 mr-2 text-purple-600 dark:text-purple-400" />
          Fast Delivery: {fastDeliveryDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })} (+₹100)
        </p>
        <p className="text-green-600 dark:text-green-400 font-medium mt-1">Free delivery on orders above ₹500</p>
      </div>
    </div>
  );
};

export default DeliveryInfo;
