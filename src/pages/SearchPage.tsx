
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import ProductCard from '@/components/ProductCard';
import { searchProducts } from '@/data/products';
import { Search, ChevronRight } from 'lucide-react';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [products, setProducts] = useState(searchProducts(searchQuery));
  const [sortOption, setSortOption] = useState('');
  
  // Update products when search query changes
  useEffect(() => {
    setProducts(searchProducts(searchQuery));
    setLocalQuery(searchQuery);
  }, [searchQuery]);
  
  // Apply sorting
  useEffect(() => {
    if (sortOption) {
      let sortedProducts = [...products];
      
      switch (sortOption) {
        case 'price-asc':
          sortedProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          sortedProducts.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          sortedProducts.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          sortedProducts.sort((a, b) => b.id.localeCompare(a.id));
          break;
      }
      
      setProducts(sortedProducts);
    }
  }, [sortOption]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (localQuery.trim()) {
      setSearchParams({ q: localQuery.trim() });
    }
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-muted-foreground mb-8">
        <Link to="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span>Search</span>
        {searchQuery && (
          <>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span>"{searchQuery}"</span>
          </>
        )}
      </div>
      
      {/* Search header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">
          {searchQuery 
            ? `Search results for "${searchQuery}"` 
            : 'Search our products'}
        </h1>
        
        <form onSubmit={handleSearch} className="flex w-full max-w-lg gap-2">
          <Input
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            placeholder="Search for products..."
            className="flex-1"
          />
          <Button type="submit">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </form>
      </div>
      
      {/* Results */}
      <div className="mb-8">
        {searchQuery && (
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {products.length} results for "{searchQuery}"
            </p>
            
            {/* Sort dropdown */}
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="rating">Best Rating</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
        
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="h-16 w-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No products found</h3>
            <p className="text-muted-foreground mb-6">
              We couldn't find any products matching "{searchQuery}".
            </p>
            <div className="space-y-2">
              <p className="text-sm">Try:</p>
              <ul className="text-sm list-disc list-inside">
                <li>Checking your spelling</li>
                <li>Using fewer keywords</li>
                <li>Using more general terms</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
