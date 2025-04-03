
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
  Filter,
  ArrowUpDown
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AdvancedFiltersProps {
  onApplyFilters: (filters: any) => void;
}

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({ onApplyFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100000]);
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
  
  const formatPriceToINR = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };
  
  return (
    <div className="mb-6 font-poppins">
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4" />
                <span>Sort</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Sort By</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className={sortBy === 'relevance' ? 'bg-muted' : ''} 
                onClick={() => setSortBy('relevance')}
              >
                <Star className="h-4 w-4 mr-2" />
                Relevance
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={sortBy === 'newest' ? 'bg-muted' : ''} 
                onClick={() => setSortBy('newest')}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Newest
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={sortBy === 'price-asc' ? 'bg-muted' : ''} 
                onClick={() => setSortBy('price-asc')}
              >
                <SortAsc className="h-4 w-4 mr-2" />
                Price: Low to High
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={sortBy === 'price-desc' ? 'bg-muted' : ''} 
                onClick={() => setSortBy('price-desc')}
              >
                <SortDesc className="h-4 w-4 mr-2" />
                Price: High to Low
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
              <h3 className="font-medium">Price Range (₹)</h3>
              <Slider
                defaultValue={[0, 100000]}
                max={100000}
                step={1000}
                value={priceRange}
                onValueChange={setPriceRange}
                className="my-6"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{formatPriceToINR(priceRange[0])}</span>
                <span>{formatPriceToINR(priceRange[1])}</span>
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
            <Button onClick={handleApplyFilters} className="bg-purple-gradient">
              Apply Filters
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdvancedFilters;
