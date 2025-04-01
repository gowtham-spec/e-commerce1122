
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Timer, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';

// Sample deal data with discounts
const sampleDeals = [
  {
    id: 'deal1',
    name: 'iPhone 14 Pro Max (512GB)',
    originalPrice: 1299,
    discountedPrice: 1099,
    image: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGlwaG9uZXxlbnwwfHwwfHx8MA%3D%3D',
    discount: 15,
    category: 'Smartphones',
    endsAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
  },
  {
    id: 'deal2',
    name: 'Samsung Galaxy Book Pro',
    originalPrice: 1199,
    discountedPrice: 899,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D',
    discount: 25,
    category: 'Laptops',
    endsAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
  },
  {
    id: 'deal3',
    name: 'Sony WH-1000XM5 Headphones',
    originalPrice: 399,
    discountedPrice: 299,
    image: 'https://images.unsplash.com/photo-1600086827875-a63b01f1335c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D',
    discount: 25,
    category: 'Audio',
    endsAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
  },
  {
    id: 'deal4',
    name: 'MacBook Air M2',
    originalPrice: 1299,
    discountedPrice: 1099,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFjYm9va3xlbnwwfHwwfHx8MA%3D%3D',
    discount: 15,
    category: 'Laptops',
    endsAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
  }
];

const TodayDeals = () => {
  const [timeLeft, setTimeLeft] = useState('');
  const { addItem } = useCart();
  const navigate = useNavigate();
  
  // Calculate time remaining until midnight
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      
      const difference = midnight.getTime() - now.getTime();
      
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };
    
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const handleAddToCart = (deal: any) => {
    addItem({
      id: deal.id,
      name: deal.name,
      price: deal.discountedPrice,
      image: deal.image,
      quantity: 1,
      category: deal.category
    });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <section className="my-12">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold mr-3">Today's Deals</h2>
          <Badge variant="outline" className="flex items-center gap-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-700">
            <Timer className="h-3 w-3" /> Ends in: {timeLeft}
          </Badge>
        </div>
        <Button variant="link" onClick={() => navigate('/deals')}>View All Deals</Button>
      </div>
      
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {sampleDeals.map((deal) => (
          <motion.div key={deal.id} variants={item}>
            <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 border-purple-200 dark:border-purple-800/40 group">
              <div className="relative pt-[75%] overflow-hidden">
                <img
                  src={deal.image}
                  alt={deal.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <Badge className="absolute top-2 right-2 bg-purple-gradient text-white flex items-center gap-1">
                  <Sparkles className="h-3 w-3" /> {deal.discount}% OFF
                </Badge>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-medium line-clamp-2 h-12 mb-1">{deal.name}</h3>
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
                  onClick={() => handleAddToCart(deal)}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default TodayDeals;
