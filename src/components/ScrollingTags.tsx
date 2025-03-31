
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const tags = [
  'AI-Powered Recommendations',
  'Smart Search',
  'Real-Time Data Analysis',
  'Personalized Experience',
  'Advanced Filtering',
  'Machine Learning Integration'
];

const ScrollingTags = () => {
  const [activeTagIndex, setActiveTagIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTagIndex((prevIndex) => (prevIndex + 1) % tags.length);
    }, 5000); // Change every 5 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-10 my-4 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTagIndex}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-purple-gradient px-3 py-1 text-sm font-medium text-white shadow-md ring-1 ring-inset ring-purple-400/20">
              {tags[activeTagIndex]}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ScrollingTags;
