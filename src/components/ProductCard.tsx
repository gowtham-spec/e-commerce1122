
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useToast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  category: string;
  subcategory?: string;
  featured?: boolean;
  brand: string;
  stock: number;
  rating: number;
  reviewCount: number;
};

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();
  const [imageError, setImageError] = React.useState(false);
  const [heartAnimation, setHeartAnimation] = React.useState(false);
  const [addedToCart, setAddedToCart] = React.useState(false);

  // Check for image loading errors
  const handleImageError = () => {
    setImageError(true);
  };

  // Format price to INR
  const formatPriceToINR = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price * 83); // Approximate conversion rate from USD to INR
  };

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
      category: product.category,
    });
    
    // Set animation state for cart
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1000);
    
    // Add animation to the button
    const button = document.getElementById(`add-to-cart-${product.id}`);
    if (button) {
      button.classList.add('add-to-cart-animation');
      setTimeout(() => {
        button.classList.remove('add-to-cart-animation');
      }, 500);
    }
  };

  const handleWishlistToggle = () => {
    // Enhanced heart animation
    setHeartAnimation(true);
    setTimeout(() => setHeartAnimation(false), 800);

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast({
        description: "Removed from wishlist",
      });
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        category: product.category,
      });
      toast({
        description: "Added to wishlist",
      });
    }
  };

  const fallbackImage = "/placeholder.svg";
  const currentImage = imageError ? fallbackImage : product.images[0]; // Use only the first image, no more cycling through images

  return (
    <div className="product-card rounded-lg overflow-hidden border shadow-sm transition-all duration-300 flex flex-col h-full relative">
      <div 
        className="product-image-container h-56 relative product-image-hover-effect"
      >
        <Link to={`/product/${product.id}`} className="block h-full">
          <img
            src={currentImage}
            alt={product.name}
            onError={handleImageError}
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
          />
        </Link>
        
        {product.stock <= 5 && product.stock > 0 && (
          <Badge variant="destructive" className="absolute top-2 left-2">
            Only {product.stock} left
          </Badge>
        )}
        
        {product.featured && (
          <Badge className="absolute top-2 right-2 bg-purple-600">
            Featured
          </Badge>
        )}
        
        <Button
          size="icon"
          variant="ghost"
          className={`absolute top-2 right-2 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-700 rounded-full h-8 w-8 ${
            isInWishlist(product.id) ? "text-red-500" : "text-gray-500"
          } ${heartAnimation ? "heart-beat-animation" : ""}`}
          onClick={handleWishlistToggle}
        >
          <Heart
            className={`h-5 w-5 transition-all ${isInWishlist(product.id) ? "fill-current" : ""} ${
              heartAnimation ? "heart-pulse" : ""
            }`}
          />
        </Button>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/product/${product.id}`} className="block group">
          <h3 className="font-medium text-base line-clamp-2 group-hover:text-purple-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{product.brand}</p>
        </Link>

        <div className="flex items-center mt-2">
          <div className="flex-1">
            <span className="font-semibold text-lg">{formatPriceToINR(product.price)}</span>
          </div>
          <div className="flex items-center">
            <span className="text-amber-500">★</span>
            <span className="text-sm ml-1">{product.rating}</span>
          </div>
        </div>

        <Button
          id={`add-to-cart-${product.id}`}
          onClick={handleAddToCart}
          className="mt-4 bg-purple-gradient hover:shadow-purple-lg transition-all"
          disabled={product.stock <= 0}
        >
          {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
        </Button>

        {/* Cart animation overlay */}
        <AnimatePresence>
          {addedToCart && (
            <motion.div 
              className="absolute inset-0 bg-purple-500 bg-opacity-30 flex items-center justify-center backdrop-blur-sm z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.5, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="bg-white dark:bg-gray-800 rounded-full p-4 shadow-lg"
              >
                <motion.svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-green-500"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <path d="M20 6L9 17l-5-5"></path>
                </motion.svg>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductCard;
