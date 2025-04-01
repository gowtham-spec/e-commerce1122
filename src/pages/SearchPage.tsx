import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  images: string[];
  reviewCount: number;
  featured: boolean;
  brand: string;
  tags: string[];
}

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const query = searchParams.get('q') || '';
    setSearchQuery(query);

    if (query) {
      // Simulate fetching search results from an API
      const fetchSearchResults = async () => {
        try {
          // Replace this with your actual API endpoint
          const response = await fetch(`https://api.example.com/products?search=${query}`);
          const data = await response.json();

          // Map the API response to the Product type, providing default values for missing properties
          const products: Product[] = data.map((item: any) => ({
            id: item.id || 'default-id',
            name: item.name || 'Default Product',
            description: item.description || 'No description available',
            price: item.price || 0,
            imageUrl: item.imageUrl || 'default-image-url',
            images: item.images || [],
            reviewCount: item.reviewCount || 0,
            featured: item.featured || false,
            brand: item.brand || 'Default Brand',
            tags: item.tags || [],
          }));

          setSearchResults(products);
        } catch (error) {
          console.error('Error fetching search results:', error);
          setSearchResults([]);
        }
      };

      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [searchParams]);

  return (
    <div className="container mx-auto py-8">
      <div className="mb-4">
        <Label htmlFor="search">Search</Label>
        <div className="relative">
          <Input
            id="search"
            type="text"
            placeholder="Enter your search query"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {searchResults.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{product.description}</CardDescription>
                <p>Price: ${product.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p>No results found for "{searchQuery}"</p>
      )}
    </div>
  );
};

export default SearchPage;
