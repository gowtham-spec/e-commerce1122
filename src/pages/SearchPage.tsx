
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import ProductCard from '@/components/ProductCard';
import AdvancedFilters from '@/components/AdvancedFilters';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, Loader2 } from 'lucide-react';

const fetchSearchResults = async (query: string, filters: any) => {
  let supabaseQuery = supabase
    .from('products')
    .select('*, product_images(*)')
    .ilike('name', `%${query}%`);
  
  // Apply price filter
  if (filters.priceRange && filters.priceRange.length === 2) {
    supabaseQuery = supabaseQuery
      .gte('price', filters.priceRange[0])
      .lte('price', filters.priceRange[1]);
  }
  
  // Apply in-stock filter
  if (filters.inStock) {
    supabaseQuery = supabaseQuery.gt('stock', 0);
  }
  
  // Apply sorting
  if (filters.sortBy === 'price-asc') {
    supabaseQuery = supabaseQuery.order('price', { ascending: true });
  } else if (filters.sortBy === 'price-desc') {
    supabaseQuery = supabaseQuery.order('price', { ascending: false });
  } else if (filters.sortBy === 'newest') {
    supabaseQuery = supabaseQuery.order('created_at', { ascending: false });
  }
  
  const { data, error } = await supabaseQuery;
  
  if (error) throw error;
  return data;
};

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    sortBy: 'relevance',
    useAI: true,
    inStock: false
  });
  
  const { data: results, isLoading, error, refetch } = useQuery({
    queryKey: ['search-results', queryParam, filters],
    queryFn: () => fetchSearchResults(queryParam, filters),
    enabled: !!queryParam,
  });
  
  useEffect(() => {
    if (queryParam) {
      setSearchTerm(queryParam);
    }
  }, [queryParam]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearchParams({ q: searchTerm.trim() });
    }
  };
  
  const handleApplyFilters = (newFilters: any) => {
    setFilters(newFilters);
    refetch();
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Search Products</h1>
      
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <Input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" className="flex items-center gap-2">
          <Search className="h-4 w-4" />
          Search
        </Button>
      </form>
      
      {queryParam && (
        <>
          <AdvancedFilters onApplyFilters={handleApplyFilters} />
          
          {isLoading ? (
            <div className="py-12 text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
              <p className="mt-4 text-muted-foreground">Loading results...</p>
            </div>
          ) : error ? (
            <div className="py-12 text-center text-red-500">
              Failed to load search results. Please try again.
            </div>
          ) : results && results.length > 0 ? (
            <>
              <p className="text-muted-foreground mb-6">
                Found {results.length} results for "{queryParam}"
              </p>
              
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                variants={container}
                initial="hidden"
                animate="show"
              >
                <AnimatePresence>
                  {results.map((product) => (
                    <motion.div key={product.id} variants={item} layout>
                      <ProductCard 
                        product={product} 
                        layoutId={`search-product-${product.id}`}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </>
          ) : (
            <div className="py-12 text-center">
              <p className="text-xl">No results found for "{queryParam}"</p>
              <p className="text-muted-foreground mt-2">
                Try using different keywords or filters
              </p>
            </div>
          )}
        </>
      )}
      
      {!queryParam && (
        <div className="py-12 text-center">
          <p className="text-xl mb-2">Start searching to find products</p>
          <p className="text-muted-foreground">
            Use the search bar above to discover our products
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
