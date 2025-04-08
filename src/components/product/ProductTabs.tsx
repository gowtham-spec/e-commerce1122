
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Product } from '@/data/products';
import { useAuth } from '@/contexts/AuthContext';

interface ProductTabsProps {
  product: Product;
}

const ProductTabs: React.FC<ProductTabsProps> = ({ product }) => {
  const { isAuthenticated } = useAuth();
  
  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList>
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>
      <TabsContent value="description" className="mt-4">
        <p className="text-gray-600">{product.description}</p>
      </TabsContent>
      <TabsContent value="details" className="mt-4">
        <ul className="list-disc pl-5 space-y-1">
          <li>Category: {product.category}</li>
          <li>Subcategory: {product.subcategory}</li>
          <li>Brand: {product.brand}</li>
          <li>Rating: {product.rating} stars</li>
          <li>Stock: {product.stock} units available</li>
          {product.sizes && product.sizes.length > 0 && (
            <li>Available Sizes: {product.sizes.join(', ')}</li>
          )}
          {product.colors && product.colors.length > 0 && (
            <li>Available Colors: {product.colors.join(', ')}</li>
          )}
        </ul>
      </TabsContent>
      <TabsContent value="reviews" className="mt-4">
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">Based on {product.reviewCount} reviews</span>
          </div>
          
          <div className="bg-muted p-4 rounded-lg">
            <p className="font-medium">Verified Purchase</p>
            <p className="italic text-muted-foreground mt-1">This product exceeded my expectations! Great value for money and fast delivery.</p>
          </div>

          {isAuthenticated ? (
            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <p className="font-medium">Write a Review</p>
                <Badge>Purchased Product</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Share your experience with this product with other customers</p>
              <Button size="sm" variant="outline" className="mt-2">Write a Review</Button>
            </div>
          ) : (
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="font-medium">Want to share your opinion?</p>
              <p className="text-sm text-muted-foreground mt-1">
                <Link to="/login" className="text-primary hover:underline">Sign in</Link> to write a review
              </p>
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ProductTabs;
