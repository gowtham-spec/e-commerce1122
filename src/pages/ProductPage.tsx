
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { ShoppingCart, Heart, ArrowLeft, Star, Sparkles } from 'lucide-react';

const fetchProduct = async (productId: string) => {
  const { data, error } = await supabase
    .from('products')
    .select('*, product_images(*)')
    .eq('id', productId)
    .single();
  
  if (error) throw error;
  return data;
};

const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const [selectedImage, setSelectedImage] = useState(0);
  
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProduct(productId!),
    enabled: !!productId,
  });
  
  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.product_images?.[0]?.url || '',
      });
      
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart`,
      });
    }
  };
  
  const handleToggleWishlist = () => {
    if (!product) return;
    
    const inWishlist = isInWishlist(product.id);
    
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist`,
      });
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.product_images?.[0]?.url || '',
      });
      
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist`,
      });
    }
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3 mx-auto mb-4"></div>
          <div className="h-80 bg-muted rounded mb-4"></div>
          <div className="h-4 bg-muted rounded w-2/3 mx-auto mb-2"></div>
          <div className="h-4 bg-muted rounded w-1/2 mx-auto mb-2"></div>
        </div>
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-red-500 mb-4">Failed to load product details</p>
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Go Back
        </Button>
      </div>
    );
  }
  
  const productImages = product.product_images || [];
  const mainImage = productImages[selectedImage]?.url || '';
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <Button 
        variant="ghost" 
        className="mb-6"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Products
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <motion.div 
            className="aspect-square rounded-lg overflow-hidden bg-muted"
            layoutId={`product-${product.id}-image`}
          >
            {mainImage ? (
              <motion.img 
                src={mainImage} 
                alt={product.name}
                className="w-full h-full object-cover"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
                No image available
              </div>
            )}
          </motion.div>
          
          {productImages.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {productImages.map((image, index) => (
                <motion.button
                  key={image.id}
                  className={`relative rounded-md overflow-hidden w-16 h-16 flex-shrink-0 ${
                    selectedImage === index ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedImage(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img 
                    src={image.url} 
                    alt={`${product.name} - view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>
          )}
        </div>
        
        <div className="space-y-6">
          <motion.h1 
            className="text-3xl font-bold"
            layoutId={`product-${product.id}-title`}
          >
            {product.name}
          </motion.h1>
          
          <motion.div 
            className="flex items-center gap-2"
            layoutId={`product-${product.id}-price`}
          >
            <span className="text-2xl font-semibold">${product.price.toFixed(2)}</span>
            {product.stock > 0 ? (
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                In Stock
              </span>
            ) : (
              <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                Out of Stock
              </span>
            )}
          </motion.div>
          
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-5 w-5 ${
                  i < (product.rating || 0) 
                    ? 'text-yellow-400 fill-yellow-400' 
                    : 'text-gray-300'
                }`} 
              />
            ))}
            <span className="text-sm text-muted-foreground ml-2">
              {product.rating} out of 5
            </span>
          </div>
          
          <motion.p 
            className="text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {product.description || 'No description available'}
          </motion.p>
          
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-medium">Colors</h3>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <motion.button
                    key={color}
                    className={`w-8 h-8 rounded-full border`}
                    style={{ backgroundColor: color }}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                  />
                ))}
              </div>
            </div>
          )}
          
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-medium">Sizes</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <motion.button
                    key={size}
                    className="border rounded px-3 py-1 text-sm"
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(var(--primary), 0.1)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button 
              className="flex-1 gap-2"
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </Button>
            
            <Button 
              variant="outline" 
              className="flex-1 gap-2"
              onClick={handleToggleWishlist}
            >
              <Heart 
                className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`} 
              />
              {isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </Button>
          </div>
          
          <motion.div 
            className="border rounded-lg p-4 mt-6 bg-muted/30 flex items-start gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Sparkles className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-sm">AI Recommendation</h3>
              <p className="text-sm text-muted-foreground">
                Based on your browsing history, you might also like products in the {product.category} category.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductPage;
