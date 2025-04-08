
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { Product } from '@/data/products';

interface ProductActionsProps {
  product: Product;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  selectedSize: string;
  selectedColor: string;
}

const ProductActions: React.FC<ProductActionsProps> = ({
  product,
  quantity,
  setQuantity,
  selectedSize,
  selectedColor
}) => {
  const { addItem } = useCart();
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist();

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity: quantity,
        category: product.category,
        size: selectedSize,
        color: selectedColor
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

  return (
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
  );
};

export default ProductActions;
