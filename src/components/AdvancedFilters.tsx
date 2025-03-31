
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { 
  SortAsc, 
  SortDesc, 
  Calendar, 
  Sparkles, 
  Star,
  Zap,
  Filter
} from 'lucide-react';

interface AdvancedFiltersProps {
  onApplyFilters: (filters: any) => void;
}

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({ onApplyFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('relevance');
  const [useAI, setUseAI] = useState(true);
  const [inStock, setInStock] = useState(false);
  
  const handleApplyFilters = () => {
    onApplyFilters({
      priceRange,
      sortBy,
      useAI,
      inStock
    });
  };
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <Button 
          variant="outline" 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Advanced Filters
        </Button>
        
        <div className="flex items-center gap-2">
          <Button 
            variant={sortBy === 'relevance' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setSortBy('relevance')}
            className="flex items-center gap-1"
          >
            <Star className="h-4 w-4" />
            <span className="hidden sm:inline">Relevance</span>
          </Button>
          <Button 
            variant={sortBy === 'newest' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setSortBy('newest')}
            className="flex items-center gap-1"
          >
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Newest</span>
          </Button>
          <Button 
            variant={sortBy === 'price-asc' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setSortBy('price-asc')}
            className="flex items-center"
          >
            <SortAsc className="h-4 w-4" />
          </Button>
          <Button 
            variant={sortBy === 'price-desc' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setSortBy('price-desc')}
            className="flex items-center"
          >
            <SortDesc className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="bg-background border rounded-lg p-4 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium">Price Range</h3>
              <Slider
                defaultValue={[0, 1000]}
                max={1000}
                step={10}
                value={priceRange}
                onValueChange={setPriceRange}
                className="my-6"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium">Options</h3>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <Label htmlFor="ai-toggle" className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    AI-powered recommendations
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Use AI to improve your search results
                  </p>
                </div>
                <Switch
                  id="ai-toggle"
                  checked={useAI}
                  onCheckedChange={setUseAI}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <Label htmlFor="stock-toggle" className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-amber-500" />
                    In-stock items only
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Show only products that are currently available
                  </p>
                </div>
                <Switch
                  id="stock-toggle"
                  checked={inStock}
                  onCheckedChange={setInStock}
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <Button onClick={handleApplyFilters}>
              Apply Filters
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdvancedFilters;
