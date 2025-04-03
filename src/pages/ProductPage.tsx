
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Star, ChevronRight, ShoppingCart, Heart, Truck, Calendar, Clock } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { getProductById, Product, getProductsByCategory } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

// Ensure every product has at least 3 images
const ensureMultipleImages = (product: Product) => {
  if (product.images.length < 3) {
    // If the product has fewer than 3 images, duplicate the first image
    const images = [...product.images];
    while (images.length < 3) {
      const nextIndex = images.length % product.images.length;
      images.push(product.images[nextIndex]);
    }
    return { ...product, images };
  }
  return product;
};

const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const { addItem } = useCart();
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist();

  // Sample delivery dates
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 4);
  const fastDeliveryDate = new Date();
  fastDeliveryDate.setDate(fastDeliveryDate.getDate() + 2);

  useEffect(() => {
    if (productId) {
      const foundProduct = getProductById(productId);
      
      if (foundProduct) {
        // Ensure the product has multiple images
        const enhancedProduct = ensureMultipleImages(foundProduct);
        setProduct(enhancedProduct);
        setSelectedImage(enhancedProduct.images[0]);
        
        // Set default size and color if available
        if (enhancedProduct.sizes && enhancedProduct.sizes.length > 0) {
          setSelectedSize(enhancedProduct.sizes[0]);
        }
        
        if (enhancedProduct.colors && enhancedProduct.colors.length > 0) {
          setSelectedColor(enhancedProduct.colors[0]);
        }
        
        // Get related products from the same category
        const related = getProductsByCategory(enhancedProduct.category)
          .filter(p => p.id !== enhancedProduct.id)
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

  // Format price to Indian Rupees
  const formatPriceToINR = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price * 83); // Approximate conversion rate from USD to INR
  };

  if (!product) {
    return (
      <div className="container mx-auto py-12 px-4">
        <p>Product not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 font-poppins">
      <div className="md:flex md:gap-8">
        <div className="md:w-1/2">
          <div className="relative mb-4 border border-gray-200 rounded-lg overflow-hidden">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-auto rounded-md aspect-square object-contain p-8"
            />
            {product.stock <= 5 && product.stock > 0 && (
              <Badge className="absolute top-4 left-4 bg-orange-500">Limited Stock</Badge>
            )}
            
            {product.stock === 0 && (
              <Badge variant="destructive" className="absolute top-4 left-4">Out of Stock</Badge>
            )}
            
            {product.featured && (
              <Badge className="absolute top-4 right-4 bg-primary">Featured</Badge>
            )}
          </div>
          <div className="flex gap-3 overflow-x-auto">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} - Image ${index + 1}`}
                className={`w-20 h-20 rounded-md object-contain cursor-pointer transition-opacity p-2 ${selectedImage === image ? 'opacity-100 ring-2 ring-primary' : 'opacity-70 hover:opacity-100'}`}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </div>

        <div className="md:w-1/2 mt-6 md:mt-0">
          <h1 className="text-2xl font-bold mb-2 font-poppins">{product.name}</h1>
          <p className="text-sm text-muted-foreground mb-4">{product.brand}</p>

          <div className="flex items-center mb-4">
            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
            <span className="text-gray-600">
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>

          <div className="space-y-2 mb-4">
            <p className="text-2xl font-semibold text-purple-600 dark:text-purple-400">{formatPriceToINR(product.price)}</p>
            <p className="text-gray-600">{product.description}</p>
          </div>

          <Separator className="my-4" />
          
          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-4">
              <h3 className="font-medium mb-2">Select Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSize(size)}
                    className="min-w-[60px]"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-4">
              <h3 className="font-medium mb-2">Select Color</h3>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? 'border-primary' : 'border-transparent'}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Delivery Information */}
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg mb-4">
            <div className="flex items-center mb-2">
              <Truck className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2" />
              <h3 className="font-medium">Delivery Information</h3>
            </div>
            <div className="ml-7 space-y-2 text-sm">
              <p className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-purple-600 dark:text-purple-400" />
                Standard Delivery: {deliveryDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })}
              </p>
              <p className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-purple-600 dark:text-purple-400" />
                Fast Delivery: {fastDeliveryDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })} (+₹100)
              </p>
              <p className="text-green-600 dark:text-green-400 font-medium mt-1">Free delivery on orders above ₹500</p>
            </div>
          </div>

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

            <Button className="flex-1 bg-purple-gradient hover:shadow-purple-lg" onClick={handleAddToCart}>
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
                  <p className="italic text-muted-foreground">Sample review: This product exceeded my expectations! Great value for money and fast delivery.</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Separator className="my-8" />

      <div>
        <h2 className="text-2xl font-semibold mb-4 font-poppins">Related Products</h2>
        {relatedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={ensureMultipleImages(relatedProduct)} />
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
