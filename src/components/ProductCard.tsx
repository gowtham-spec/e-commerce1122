
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist();
  
  const isWishlisted = isInWishlist(product.id);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
      category: product.category
    });
  };
  
  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
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

  return (
    <Card className="h-full overflow-hidden transition-all hover:shadow-md group font-poppins">
      <Link to={`/product/${product.id}`} className="block h-full">
        <div className="relative pt-[100%] overflow-hidden bg-gray-100">
          <img
            src={product.images[0]}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
          
          {product.stock <= 5 && product.stock > 0 && (
            <Badge variant="secondary" className="absolute top-2 left-2">
              Low Stock
            </Badge>
          )}
          
          {product.stock === 0 && (
            <Badge variant="destructive" className="absolute top-2 left-2">
              Out of Stock
            </Badge>
          )}
          
          {product.featured && (
            <Badge className="absolute top-2 right-2 bg-primary">
              Featured
            </Badge>
          )}
          
          <div className="absolute bottom-0 left-0 right-0 p-3 flex justify-between items-center bg-gradient-to-t from-black/70 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
              onClick={handleWishlistToggle}
            >
              <Heart
                className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`}
              />
            </Button>
            
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <CardContent className="p-4">
          <div className="flex items-center mb-1">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm ml-1 text-gray-600">
              {product.rating} ({product.reviewCount})
            </span>
          </div>
          
          <h3 className="font-medium line-clamp-2 h-12">{product.name}</h3>
          
          <p className="text-sm text-muted-foreground mt-1">{product.brand}</p>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <div className="text-lg font-bold text-purple-600 dark:text-purple-400">{formatPriceToINR(product.price)}</div>
          
          <Button
            size="sm"
            variant="outline"
            className="h-8"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            {product.stock === 0 ? 'Sold out' : 'Add'}
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default ProductCard;
