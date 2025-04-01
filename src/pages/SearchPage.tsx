
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Search, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCart } from '@/contexts/CartContext';
import { searchProducts, Product } from '@/data/products';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { addItem } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const query = searchParams.get('q') || '';
    setSearchQuery(query);

    if (query) {
      // Use the local searchProducts function instead of simulating an API call
      const results = searchProducts(query);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: searchQuery });
  };

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
      category: product.category
    });
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <form onSubmit={handleSearch}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="search">Search Products</Label>
            <div className="relative">
              <Input
                id="search"
                type="text"
                placeholder="Enter your search query"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
              <Button 
                type="submit"
                variant="ghost" 
                size="icon" 
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </form>
      </div>

      {searchResults.length > 0 ? (
        <>
          <h2 className="text-2xl font-semibold mb-4">Search Results for "{searchQuery}"</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {searchResults.map((product) => (
              <Card key={product.id} className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative pt-[75%] overflow-hidden bg-gray-100">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                  {product.featured && (
                    <Badge className="absolute top-2 right-2 bg-primary">
                      Featured
                    </Badge>
                  )}
                </div>
                <CardHeader className="p-4 pb-0" onClick={() => handleProductClick(product.id)} style={{ cursor: 'pointer' }}>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{product.brand}</p>
                </CardHeader>
                <CardContent className="p-4 flex-grow" onClick={() => handleProductClick(product.id)} style={{ cursor: 'pointer' }}>
                  <CardDescription className="line-clamp-2">{product.description}</CardDescription>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                    {product.reviewCount > 0 && (
                      <span className="text-sm text-muted-foreground">
                        ({product.reviewCount} {product.reviewCount === 1 ? 'review' : 'reviews'})
                      </span>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button 
                    className="w-full" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </>
      ) : (
        searchQuery && <p className="text-center py-8">No results found for "{searchQuery}"</p>
      )}
    </div>
  );
};

export default SearchPage;
