
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { getProductById, searchProducts } from '@/data/products';
import { Heart, ShoppingCart, Truck, Shield, RotateCcw, Star, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';

const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist();
  
  const product = productId ? getProductById(productId) : null;
  
  if (!product) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-6">The product you are looking for does not exist or has been removed.</p>
        <Button asChild>
          <Link to="/products">Browse Products</Link>
        </Button>
      </div>
    );
  }
  
  const isWishlisted = isInWishlist(product.id);
  
  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity,
      category: product.category
    });
  };
  
  const handleWishlistToggle = () => {
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

  // Get related products (for demo we'll just use products in the same category)
  const relatedProducts = searchProducts(product.subcategory)
    .filter(p => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-muted-foreground mb-8">
        <Link to="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link to={`/category/${product.category}`} className="hover:text-primary capitalize">
          {product.category}
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link to={`/category/${product.category}/${product.subcategory}`} className="hover:text-primary capitalize">
          {product.subcategory}
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="truncate max-w-[150px]">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Product Images */}
        <div className="relative">
          <Carousel className="w-full">
            <CarouselContent>
              {product.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={image}
                      alt={`${product.name} - Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
          
          {product.stock <= 5 && product.stock > 0 && (
            <Badge variant="secondary" className="absolute top-4 left-4">
              Low Stock
            </Badge>
          )}
          
          {product.stock === 0 && (
            <Badge variant="destructive" className="absolute top-4 left-4">
              Out of Stock
            </Badge>
          )}
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-muted-foreground">
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>
          
          <div className="text-2xl font-bold mb-6">${product.price.toFixed(2)}</div>
          
          <p className="text-muted-foreground mb-6">{product.description}</p>
          
          <div className="mb-6">
            <div className="font-semibold mb-2">Brand: <span className="font-normal">{product.brand}</span></div>
            <div className="font-semibold mb-2">Category: <span className="font-normal capitalize">{product.category}</span></div>
            <div className="font-semibold mb-2">
              Availability: 
              <span className={`font-normal ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                {product.stock > 0 ? ` In Stock (${product.stock} available)` : ' Out of Stock'}
              </span>
            </div>
          </div>
          
          {product.stock > 0 && (
            <div className="flex items-center mb-6">
              <div className="mr-4">
                <label htmlFor="quantity" className="block text-sm font-medium mb-1">
                  Quantity
                </label>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    className="px-3 py-2 bg-gray-100 border-r border-gray-300 rounded-l-md"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.min(product.stock, Math.max(1, parseInt(e.target.value) || 1)))}
                    className="w-12 p-2 text-center border-none focus:outline-none focus:ring-0"
                  />
                  <button
                    className="px-3 py-2 bg-gray-100 border-l border-gray-300 rounded-r-md"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex flex-wrap gap-4 mb-8">
            <Button 
              onClick={handleAddToCart} 
              disabled={product.stock === 0}
              className="flex-1"
              size="lg"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
            
            <Button 
              variant={isWishlisted ? "secondary" : "outline"} 
              onClick={handleWishlistToggle}
              size="lg"
            >
              <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
              <span className="ml-2 hidden sm:inline">{isWishlisted ? 'Added to Wishlist' : 'Add to Wishlist'}</span>
            </Button>
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="flex items-center text-muted-foreground">
              <Truck className="h-5 w-5 mr-2" />
              <span>Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Shield className="h-5 w-5 mr-2" />
              <span>2 year extended warranty</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <RotateCcw className="h-5 w-5 mr-2" />
              <span>30 day money back guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product tabs */}
      <Tabs defaultValue="description" className="mb-16">
        <TabsList className="w-full grid grid-cols-3 mb-8">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="description" className="prose max-w-none">
          <p>{product.description}</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.
          </p>
          <p>
            Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam.
          </p>
        </TabsContent>
        
        <TabsContent value="specifications">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Product Specifications</h3>
              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Brand</span>
                  <span>{product.brand}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Model</span>
                  <span>{product.id.split('-').slice(-1)[0].toUpperCase()}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Category</span>
                  <span className="capitalize">{product.category}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Subcategory</span>
                  <span className="capitalize">{product.subcategory}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Warranty</span>
                  <span>2 Years</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Return Policy</span>
                  <span>30 Days</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Shipping</span>
                  <span>Free over $50</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Origin</span>
                  <span>United States</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="reviews">
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3 bg-gray-50 p-6 rounded-lg">
                <div className="text-center mb-4">
                  <div className="text-5xl font-bold">{product.rating}</div>
                  <div className="flex items-center justify-center my-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">Based on {product.reviewCount} reviews</div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => {
                    // Mock percentage for each star rating
                    const percentage = star === 5 ? 65 : 
                                      star === 4 ? 20 : 
                                      star === 3 ? 10 : 
                                      star === 2 ? 3 : 2;
                    return (
                      <div key={star} className="flex items-center">
                        <div className="w-8 text-sm font-medium">{star} star</div>
                        <div className="flex-1 mx-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-yellow-400" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <div className="w-8 text-sm text-right">{percentage}%</div>
                      </div>
                    );
                  })}
                </div>
                
                <Button className="w-full mt-6">Write a Review</Button>
              </div>
              
              <div className="md:w-2/3 space-y-6">
                {/* Mock reviews */}
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="border-b pb-6">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium">John Doe</h4>
                      <span className="text-sm text-muted-foreground">
                        {new Date(Date.now() - index * 86400000 * 7).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < (5 - index % 2) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <p>
                      {index === 0 ? 
                        "This product exceeded my expectations. The quality is outstanding and it looks even better in person. Would definitely recommend!" : 
                        index === 1 ? 
                        "Great product for the price. Shipping was fast and the item was well-packaged. Very satisfied with my purchase." : 
                        "I've been using this for a few weeks now and it's holding up well. The design is sleek and functional. Only giving 4 stars because the instructions could be clearer."}
                    </p>
                  </div>
                ))}
                
                <Button variant="outline">Load More Reviews</Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
