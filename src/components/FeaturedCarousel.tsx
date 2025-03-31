
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const carouselItems = [
  {
    id: 1,
    title: "AI-Powered Product Recommendations",
    description: "Discover products tailored just for you with our advanced AI algorithms",
    bgColor: "from-blue-600 to-violet-600",
    textColor: "text-white"
  },
  {
    id: 2,
    title: "Smart Search Technology",
    description: "Find exactly what you're looking for across multiple categories instantly",
    bgColor: "from-emerald-600 to-teal-600",
    textColor: "text-white"
  },
  {
    id: 3,
    title: "Trending Products",
    description: "See what's popular right now based on real-time data analysis",
    bgColor: "from-amber-500 to-orange-600",
    textColor: "text-white"
  }
];

const FeaturedCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

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

  return (
    <div className="relative w-full overflow-hidden rounded-lg h-60 md:h-80">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={carouselItems[currentIndex].id}
          custom={direction}
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className={`absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-r ${carouselItems[currentIndex].bgColor} ${carouselItems[currentIndex].textColor}`}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3">{carouselItems[currentIndex].title}</h2>
          <p className="text-lg opacity-90 max-w-md">{carouselItems[currentIndex].description}</p>
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
