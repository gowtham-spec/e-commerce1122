
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Timer, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import dealsData, { DealItem } from '@/data/dealsData';

const TodayDeals = () => {
  const [timeLeft, setTimeLeft] = useState('');
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [displayedDeals, setDisplayedDeals] = useState<DealItem[]>([]);
  
  // On component mount, randomly select 3 deals to display
  useEffect(() => {
    // Shuffle array and take first 3
    const shuffled = [...dealsData].sort(() => 0.5 - Math.random());
    setDisplayedDeals(shuffled.slice(0, 3));
  }, []);
  
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
  
  const handleAddToCart = (deal: DealItem) => {
    addItem({
      id: deal.id,
      name: deal.name,
      price: deal.discountedPrice,
      image: deal.image,
      quantity: 1,
      category: deal.category
    });
  };

  // Format price to Indian Rupees
  const formatPriceToINR = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price * 83); // Approximate conversion rate from USD to INR
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
    <section className="my-12 font-poppins">
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
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {displayedDeals.map((deal) => (
          <motion.div key={deal.id} variants={item}>
            <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 border-purple-200 dark:border-purple-800/40 group">
              <div className="relative pt-[75%] overflow-hidden">
                <img
                  src={deal.image}
                  alt={deal.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onClick={() => navigate(`/product/${deal.id}`)}
                  style={{ cursor: 'pointer' }}
                />
                <Badge className="absolute top-2 right-2 bg-purple-gradient text-white flex items-center gap-1">
                  <Sparkles className="h-3 w-3" /> {deal.discount}% OFF
                </Badge>
              </div>
              
              <CardContent className="p-4">
                <div className="text-xs text-purple-600 dark:text-purple-400 font-medium mb-1">{deal.brand}</div>
                <h3 className="font-medium line-clamp-2 h-12 mb-1 cursor-pointer" onClick={() => navigate(`/product/${deal.id}`)}>{deal.name}</h3>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-2">{deal.description}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-purple-600 dark:text-purple-400">
                    {formatPriceToINR(deal.discountedPrice)}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    {formatPriceToINR(deal.originalPrice)}
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
