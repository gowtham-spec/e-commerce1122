
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, Truck, ShoppingBag, Calendar } from 'lucide-react';

const OrderConfirmationPage = () => {
  // Generate random order number
  const orderNumber = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  
  // Generate estimated delivery date (7-10 days from now)
  const today = new Date();
  const deliveryDateMin = new Date(today);
  deliveryDateMin.setDate(today.getDate() + 7);
  const deliveryDateMax = new Date(today);
  deliveryDateMax.setDate(today.getDate() + 10);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="container max-w-3xl mx-auto py-12 px-4">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-6">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-muted-foreground text-lg">
          Thank you for your purchase. Your order has been received.
        </p>
      </div>
      
      <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold">Order #{orderNumber}</h2>
            <p className="text-muted-foreground">
              Placed on {formatDate(new Date())}
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/orders">View All Orders</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <ShoppingBag className="h-5 w-5 mr-2 text-primary" />
              <h3 className="font-medium">Order Details</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              You can track your order status and view details in your account.
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <Truck className="h-5 w-5 mr-2 text-primary" />
              <h3 className="font-medium">Shipping Info</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Your items will be shipped via express delivery.
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <Calendar className="h-5 w-5 mr-2 text-primary" />
              <h3 className="font-medium">Delivery Date</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Estimated between {formatDate(deliveryDateMin)} and {formatDate(deliveryDateMax)}
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-semibold">What's Next?</h3>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground ml-4">
            <li>You will receive an order confirmation email shortly.</li>
            <li>Once your order ships, you'll receive tracking information.</li>
            <li>You can check your order status in your account dashboard.</li>
          </ol>
        </div>
      </div>
      
      <div className="text-center space-y-4">
        <h3 className="font-semibold">Need Help?</h3>
        <p className="text-muted-foreground">
          If you have any questions or concerns about your order, please contact our customer support.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline">
            <Link to="/contact">Contact Support</Link>
          </Button>
          <Button asChild>
            <Link to="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
