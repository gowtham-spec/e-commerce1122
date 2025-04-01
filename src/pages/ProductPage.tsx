
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Star, ChevronRight, ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { getProductById, Product, getProductsByCategory } from '@/data/products';
import ProductCard from '@/components/ProductCard';

const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const { addItem } = useCart();
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist();

  useEffect(() => {
    if (productId) {
      const foundProduct = getProductById(productId);
      
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedImage(foundProduct.images[0]);
        
        // Get related products from the same category
        const related = getProductsByCategory(foundProduct.category)
          .filter(p => p.id !== foundProduct.id)
          .slice(0, 4);
        setRelatedProducts(related);
      }
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity: quantity,
        category: product.category
      });
    }
  };

  const handleWishlistToggle = () => {
    if (!product) return;
    
    const isWishlisted = isInWishlist(product.id);
    
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        category: product.category
      });
    }
  };

  if (!product) {
    return (
      <div className="container mx-auto py-12 px-4">
        <p>Product not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="md:flex md:gap-8">
        <div className="md:w-1/2">
          <div className="relative mb-4">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-auto rounded-md aspect-square object-cover"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} - Image ${index + 1}`}
                className={`w-20 h-20 rounded-md object-cover cursor-pointer transition-opacity ${selectedImage === image ? 'opacity-100 ring-2 ring-primary' : 'opacity-70 hover:opacity-100'}`}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </div>

        <div className="md:w-1/2">
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-sm text-muted-foreground mb-4">{product.brand}</p>

          <div className="flex items-center mb-4">
            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
            <span className="text-gray-600">
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>

          <div className="space-y-2 mb-4">
            <p className="text-gray-700">${product.price.toFixed(2)}</p>
            <p className="text-gray-600">{product.description}</p>
          </div>

          <Separator className="my-4" />

          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center border rounded-md overflow-hidden">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
              >
                -
              </Button>
              <span className="px-3">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                onClick={() => setQuantity(prev => prev + 1)}
              >
                +
              </Button>
            </div>

            <Button className="flex-1" onClick={handleAddToCart}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>

            <Button variant="outline" size="icon" onClick={handleWishlistToggle}>
              {isInWishlist(product.id) ? (
                <Heart className="h-4 w-4 fill-red-500 text-red-500" />
              ) : (
                <Heart className="h-4 w-4" />
              )}
            </Button>
          </div>

          <Separator className="my-4" />

          <Tabs defaultValue="description" className="w-full">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-4">
              <p className="text-gray-600">{product.description}</p>
            </TabsContent>
            <TabsContent value="details" className="mt-4">
              <ul className="list-disc pl-5">
                <li>Category: {product.category}</li>
                <li>Subcategory: {product.subcategory}</li>
                <li>Brand: {product.brand}</li>
                <li>Rating: {product.rating} stars</li>
                <li>Stock: {product.stock}</li>
              </ul>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Separator className="my-8" />

      <div>
        <h2 className="text-2xl font-semibold mb-4">Related Products</h2>
        {relatedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        ) : (
          <p>No related products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
