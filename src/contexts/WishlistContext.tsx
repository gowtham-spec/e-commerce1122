
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from "@/components/ui/use-toast";

export type WishlistItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

type WishlistContextType = {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (itemId: string) => void;
  clearWishlist: () => void;
  isInWishlist: (itemId: string) => boolean;
  itemCount: number;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const { toast } = useToast();

  // Initialize wishlist from localStorage
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        setItems(JSON.parse(savedWishlist));
      } catch (error) {
        console.error('Failed to parse wishlist from localStorage:', error);
      }
    }
  }, []);

  // Save wishlist to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(items));
  }, [items]);

  const addItem = (item: WishlistItem) => {
    if (!isInWishlist(item.id)) {
      setItems(prevItems => [...prevItems, item]);
      toast({
        title: "Added to Wishlist",
        description: `${item.name} has been added to your wishlist`,
      });
    }
  };

  const removeItem = (itemId: string) => {
    setItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.id === itemId);
      if (itemToRemove) {
        toast({
          title: "Removed from Wishlist",
          description: `${itemToRemove.name} has been removed from your wishlist`,
        });
      }
      return prevItems.filter(item => item.id !== itemId);
    });
  };

  const clearWishlist = () => {
    setItems([]);
    toast({
      title: "Wishlist Cleared",
      description: "All items have been removed from your wishlist",
    });
  };

  const isInWishlist = (itemId: string) => {
    return items.some(item => item.id === itemId);
  };

  const itemCount = items.length;

  return (
    <WishlistContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearWishlist,
        isInWishlist,
        itemCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
