
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown, ShoppingCart, Timer, ArrowLeft, Filter } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';

// Sample deals data (expanded from TodayDeals)
const sampleDeals = [
  {
    id: 'deal1',
    name: 'iPhone 14 Pro Max (512GB)',
    originalPrice: 1299,
    discountedPrice: 1099,
    image: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGlwaG9uZXxlbnwwfHwwfHx8MA%3D%3D',
    discount: 15,
    category: 'Smartphones',
    brand: 'Apple',
    endsAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    description: 'Experience the power of Apple's latest flagship phone with stunning camera and incredible performance.'
  },
  {
    id: 'deal2',
    name: 'Samsung Galaxy Book Pro',
    originalPrice: 1199,
    discountedPrice: 899,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D',
    discount: 25,
    category: 'Laptops',
    brand: 'Samsung',
    endsAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    description: 'Ultra-thin and powerful laptop with AMOLED display and all-day battery life.'
  },
  {
    id: 'deal3',
    name: 'Sony WH-1000XM5 Headphones',
    originalPrice: 399,
    discountedPrice: 299,
    image: 'https://images.unsplash.com/photo-1600086827875-a63b01f1335c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D',
    discount: 25,
    category: 'Audio',
    brand: 'Sony',
    endsAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    description: 'Industry-leading noise cancellation with premium sound quality and comfort.'
  },
  {
    id: 'deal4',
    name: 'MacBook Air M2',
    originalPrice: 1299,
    discountedPrice: 1099,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFjYm9va3xlbnwwfHwwfHx8MA%3D%3D',
    discount: 15,
    category: 'Laptops',
    brand: 'Apple',
    endsAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    description: 'Ultra-fast M2 chip with incredible battery life in a thin and light design.'
  },
  {
    id: 'deal5',
    name: 'Samsung Galaxy S23 Ultra',
    originalPrice: 1199,
    discountedPrice: 949,
    image: 'https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2Ftc3VuZ3xlbnwwfHwwfHx8MA%3D%3D',
    discount: 20,
    category: 'Smartphones',
    brand: 'Samsung',
    endsAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    description: 'Flagship smartphone with 200MP camera and powerful Snapdragon processor.'
  },
  {
    id: 'deal6',
    name: 'iPad Pro 12.9" M2',
    originalPrice: 1099,
    discountedPrice: 949,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aXBhZHxlbnwwfHwwfHx8MA%3D%3D',
    discount: 14,
    category: 'Tablets',
    brand: 'Apple',
    endsAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    description: 'Pro-level tablet with stunning Liquid Retina XDR display and powerful M2 chip.'
  },
  {
    id: 'deal7',
    name: 'Google Pixel 7 Pro',
    originalPrice: 899,
    discountedPrice: 699,
    image: 'https://images.unsplash.com/photo-1635870723802-e88d76ae324e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl4ZWwlMjBwaG9uZXxlbnwwfHwwfHx8MA%3D%3D',
    discount: 22,
    category: 'Smartphones',
    brand: 'Google',
    endsAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    description: 'Google's flagship phone with amazing camera capabilities and pure Android experience.'
  },
  {
    id: 'deal8',
    name: 'Dell XPS 15',
    originalPrice: 1799,
    discountedPrice: 1499,
    image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D',
    discount: 17,
    category: 'Laptops',
    brand: 'Dell',
    endsAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    description: 'Premium Windows laptop with incredible 4K display and powerful performance.'
  }
];

const DealsPage = () => {
  const [timeLeft, setTimeLeft] = useState('');
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
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

  const filteredDeals = filterCategory 
    ? sampleDeals.filter(deal => deal.category === filterCategory)
    : sampleDeals;
    
  const uniqueCategories = Array.from(new Set(sampleDeals.map(deal => deal.category)));

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
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div className="flex flex-col">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="mr-2"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-3xl font-bold purple-gradient-text">Today's Deals</h1>
          </div>
          <div className="flex items-center mt-2">
            <Badge variant="outline" className="flex items-center gap-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-700 animate-pulse-purple">
              <Timer className="h-3 w-3" /> Ends in: {timeLeft}
            </Badge>
          </div>
        </div>
        
        <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
          <Button 
            variant={filterCategory === null ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilterCategory(null)}
            className={filterCategory === null ? "bg-purple-gradient" : "border-purple-200 dark:border-purple-800/40"}
          >
            All
          </Button>
          
          {uniqueCategories.map(category => (
            <Button 
              key={category} 
              variant={filterCategory === category ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilterCategory(category)}
              className={filterCategory === category ? "bg-purple-gradient" : "border-purple-200 dark:border-purple-800/40"}
            >
              {category}
            </Button>
          ))}
          
          <Button variant="outline" size="sm" className="gap-1 border-purple-200 dark:border-purple-800/40">
            <Filter className="h-4 w-4" /> 
            More Filters
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Separator className="mb-8 bg-purple-100 dark:bg-purple-800/40" />
      
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {filteredDeals.map((deal) => (
          <motion.div key={deal.id} variants={item}>
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
      
      {filteredDeals.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No deals found for this category. Try another filter or check back later.</p>
        </div>
      )}
    </div>
  );
};

export default DealsPage;
