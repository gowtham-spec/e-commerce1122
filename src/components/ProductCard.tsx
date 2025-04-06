
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useToast } from '@/components/ui/use-toast';

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
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const { toast } = useToast();
  const [imageIndex, setImageIndex] = React.useState(0);
  const [imageError, setImageError] = React.useState(false);

  // Check for image loading errors
  const handleImageError = () => {
    if (imageIndex < product.images.length - 1) {
      // Try next image
      setImageIndex(imageIndex + 1);
    } else {
      // All images failed, show fallback
      setImageError(true);
    }
  };

  // Cycle through images on hover
  const startImageCycle = () => {
    if (product.images.length <= 1) return;
    
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % product.images.length;
        return nextIndex;
      });
    }, 1000);
    
    return () => clearInterval(interval);
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
  const currentImage = imageError ? fallbackImage : product.images[imageIndex];

  return (
    <div className="product-card rounded-lg overflow-hidden border shadow-sm transition-all duration-300 flex flex-col h-full">
      <div 
        className="product-image-container h-56 relative product-image-hover-effect"
        onMouseEnter={startImageCycle}
        onMouseLeave={() => setImageIndex(0)}
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
          }`}
          onClick={handleWishlistToggle}
        >
          <Heart
            className={`h-5 w-5 ${isInWishlist(product.id) ? "fill-current" : ""}`}
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
      </div>
    </div>
  );
};

export default ProductCard;
