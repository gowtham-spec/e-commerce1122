
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const carouselItems = [
  {
    id: 1,
    title: "Stationery & Office Supplies",
    description: "Discover premium pens, notebooks, and office essentials for work and study",
    bgColor: "from-blue-600 to-violet-600",
    textColor: "text-white",
    image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFydGlmaWNpYWwlMjBpbnRlbGxpZ2VuY2V8ZW58MHx8MHx8fDA%3D",
    path: "/category/stationery"
  },
  {
    id: 2,
    title: "Furniture & Home Appliances",
    description: "Browse stylish furniture and high-quality appliances for your modern home",
    bgColor: "from-emerald-600 to-teal-600",
    textColor: "text-white",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNlYXJjaHxlbnwwfHwwfHx8MA%3D%3D",
    path: "/category/furniture"
  },
  {
    id: 3,
    title: "Today's Limited Deals",
    description: "Get amazing discounts on top products with our special time-limited offers",
    bgColor: "from-amber-500 to-orange-600",
    textColor: "text-white",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dHJlbmRpbmd8ZW58MHx8MHx8fDA%3D",
    path: "/deals"
  }
];

const FeaturedCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const slideVariants = {
    initial: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 }
      }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 }
      }
    })
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + carouselItems.length) % carouselItems.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
  };

  const handleGetStarted = (path: string) => {
    navigate(path);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-lg h-80 md:h-96">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={carouselItems[currentIndex].id}
          custom={direction}
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0 overflow-hidden"
        >
          {/* Background image that fills entire container */}
          <img 
            src={carouselItems[currentIndex].image} 
            alt={carouselItems[currentIndex].title}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          
          {/* Overlay for better text visibility */}
          <div className="absolute inset-0 bg-black/50"></div>
          
          {/* Content positioned at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 font-poppins">{carouselItems[currentIndex].title}</h2>
            <p className="text-lg opacity-90 max-w-md mb-4">{carouselItems[currentIndex].description}</p>
            <Button 
              onClick={() => handleGetStarted(carouselItems[currentIndex].path)}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white group"
            >
              Get Started
              <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
      
      <Button 
        variant="ghost" 
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 z-10"
        onClick={handlePrevious}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 z-10"
        onClick={handleNext}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
      
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-white/40'
            }`}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedCarousel;
