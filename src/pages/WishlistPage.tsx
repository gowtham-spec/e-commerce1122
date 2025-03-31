
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { Heart, ShoppingCart, Trash, ChevronRight } from 'lucide-react';

const WishlistPage = () => {
  const { items, removeItem, clearWishlist } = useWishlist();
  const { addItem: addToCart } = useCart();
  
  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
      category: item.category
    });
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-muted-foreground mb-8">
        <Link to="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span>Wishlist</span>
      </div>
      
      {/* Wishlist header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Wishlist</h1>
        
        {items.length > 0 && (
          <Button 
            variant="outline"
            onClick={clearWishlist}
            className="text-red-500"
          >
            <Trash className="h-4 w-4 mr-2" />
            Clear Wishlist
          </Button>
        )}
      </div>
      
      {/* Wishlist items */}
      {items.length === 0 ? (
        <div className="text-center py-12">
          <div className="h-16 w-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
            <Heart className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
          <p className="text-muted-foreground mb-6">
            Add items to your wishlist by clicking the heart icon on any product.
          </p>
          <Button asChild>
            <Link to="/products">Browse Products</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map(item => (
            <Card key={item.id} className="overflow-hidden">
              <div className="relative pt-[100%] overflow-hidden bg-gray-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item.id)}
                  className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white hover:bg-gray-100"
                >
                  <Trash className="h-4 w-4 text-red-500" />
                </Button>
              </div>
              
              <CardContent className="p-4">
                <Link to={`/product/${item.id}`} className="font-medium hover:text-primary">
                  {item.name}
                </Link>
                <p className="text-muted-foreground text-sm mt-1">
                  Category: <span className="capitalize">{item.category}</span>
                </p>
              </CardContent>
              
              <CardFooter className="p-4 pt-0 flex justify-between items-center">
                <div className="text-lg font-bold">${item.price.toFixed(2)}</div>
                
                <Button
                  size="sm"
                  onClick={() => handleAddToCart(item)}
                >
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
