
import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, X, Send, Sparkles, Search, ShoppingCart, Tag, Clock, User, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { searchProducts, filterProducts, products } from '@/data/products';
import { useAuth } from '@/contexts/AuthContext';

interface Message {
  id: string;
  type: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

const AIAssistantChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      text: 'Hi there! I\'m your shopping assistant. How can I help you find the perfect product today?',
      timestamp: new Date()
    }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    
    // Scroll to the bottom when messages update
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }

    // Add personalized greeting if user is logged in and it's their first time opening the chat
    if (isOpen && user && messages.length === 1) {
      const greeting = {
        id: Date.now().toString(),
        type: 'bot' as const,
        text: `Hello ${user.name || 'there'}! I'm your shopping assistant. What can I help you find today?`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, greeting]);
    }
  }, [isOpen, messages, user]);

  // Toggle chat open/close on icon click
  const toggleChat = () => {
    setIsOpen(prev => !prev);
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        text: inputValue.trim(),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      // Process user query and generate response
      processUserQuery(inputValue.trim());
      
      setInputValue('');
    }
  };
  
  const processUserQuery = (query: string) => {
    const lowerQuery = query.toLowerCase();
    
    // Simulate AI thinking time
    setTimeout(() => {
      let response = '';
      let action: (() => void) | null = null;
      
      // Budget recommendation
      if (lowerQuery.includes('budget') || lowerQuery.includes('under') || (lowerQuery.includes('best') && lowerQuery.includes('price'))) {
        const priceMatch = lowerQuery.match(/(\d+)/);
        const budget = priceMatch ? parseInt(priceMatch[0]) : 0;
        
        if (budget > 0) {
          // Find products under budget
          const affordableProducts = products.filter(p => p.price <= budget);
          
          if (affordableProducts.length > 0) {
            // Sort by rating
            const recommended = [...affordableProducts].sort((a, b) => b.rating - a.rating).slice(0, 3);
            
            response = `I found ${affordableProducts.length} products under $${budget}. Here are the top recommendations:\n\n`;
            
            recommended.forEach((product, index) => {
              response += `${index + 1}. ${product.name} - ₹${Math.round(product.price * 83)} (Rating: ${product.rating}/5)\n`;
            });
            
            response += `\nWould you like to see more options under $${budget}?`;
            
            action = () => navigate(`/search?maxPrice=${budget}`);
          } else {
            response = `I couldn't find any products under $${budget}. Would you like to explore options in a slightly higher price range?`;
          }
        } else {
          response = "What's your budget? I can help you find the best products within your price range.";
        }
      }
      // Shirt recommendation and outfit matching
      else if (lowerQuery.includes('shirt')) {
        let color = '';
        if (lowerQuery.includes('black shirt')) color = 'black';
        else if (lowerQuery.includes('blue shirt')) color = 'blue';
        else if (lowerQuery.includes('white shirt')) color = 'white';
        else color = 'any';
        
        response = `I've found some great shirts for you! ${color !== 'any' ? `For a ${color} shirt, ` : ''}Here are some matching outfit suggestions:\n\n`;
        
        if (color === 'black' || color === 'any') {
          response += "• Black shirts pair well with gray or khaki chinos for a casual look, or dark blue jeans\n";
          response += "• For footwear, consider brown or black leather shoes for formal occasions, white sneakers for casual\n";
          response += "• Complete the look with a silver watch and brown leather belt\n\n";
        }
        
        if (color === 'blue' || color === 'any') {
          response += "• Blue shirts look great with navy, khaki or gray pants\n";
          response += "• Brown loafers or white sneakers would complement this style\n";
          response += "• Add a brown leather belt and a silver or gold watch to complete the outfit\n\n";
        }
        
        if (color === 'white' || color === 'any') {
          response += "• White shirts are versatile and work with almost any color pants - navy, black, gray, or khaki\n";
          response += "• Choose brown or black formal shoes, or any color sneakers for casual wear\n";
          response += "• Accessorize with a belt that matches your shoes\n\n";
        }
        
        response += "Would you like to see our shirt collection or matching accessories to complete your outfit?";
        
        action = () => navigate(`/category/clothing`);
      }
      // Check for category-specific queries
      else if (lowerQuery.includes('deal') || lowerQuery.includes('discount') || lowerQuery.includes('offer')) {
        response = "I've found some amazing deals for you! Our today's special offers include discounts up to 25%. Would you like to see these limited-time deals?";
        action = () => navigate('/deals');
      } 
      else if (lowerQuery.includes('cloth') || lowerQuery.includes('shirt') || lowerQuery.includes('pant') || lowerQuery.includes('wear')) {
        response = "We have a wide selection of clothing items. From casual to formal wear, we've got you covered. Let me show you our clothing collection.";
        action = () => navigate('/category/clothing');
      }
      else if (lowerQuery.includes('electronic') || lowerQuery.includes('laptop') || lowerQuery.includes('phone')) {
        response = "Looking for electronics? We have the latest gadgets and devices. From smartphones to laptops and accessories, I can help you find exactly what you need.";
        action = () => navigate('/category/electronics');
      }
      else if (lowerQuery.includes('toy') || lowerQuery.includes('game') || lowerQuery.includes('kid')) {
        response = "Check out our toys and games collection for all ages! We have educational toys, board games, and fun activities for children of all ages.";
        action = () => navigate('/category/toys');
      }
      else if (lowerQuery.includes('furniture') || lowerQuery.includes('sofa') || lowerQuery.includes('chair') || lowerQuery.includes('table')) {
        response = "We have stylish furniture for every room. From comfortable sofas to ergonomic chairs and elegant tables. Let me show you our furniture collection.";
        action = () => navigate('/category/furniture');
      }
      else if (lowerQuery.includes('stationary') || lowerQuery.includes('office supplies') || lowerQuery.includes('pen')) {
        response = "Looking for stationery or office supplies? We have everything from premium pens to notebooks and organizational tools. Let me help you find what you need.";
        action = () => navigate('/category/stationary');
      }
      else if (lowerQuery.includes('accessory') || lowerQuery.includes('accessories') || lowerQuery.includes('watch') || lowerQuery.includes('bag') || lowerQuery.includes('belt')) {
        response = "Our accessories collection includes watches, bags, belts, and more. These items can complete your outfit and add a touch of style. Would you like to see our collection?";
        action = () => navigate('/category/accessories');
      }
      else if (lowerQuery.includes('search') || lowerQuery.includes('find') || lowerQuery.includes('looking for')) {
        // Extract what they're searching for
        const searchTerms = lowerQuery.replace(/search for|find|looking for|search|find me/gi, '').trim();
        if (searchTerms) {
          const results = searchProducts(searchTerms);
          if (results.length > 0) {
            response = `Great news! I found ${results.length} products matching "${searchTerms}". Would you like to see the results? I can also help you refine your search if needed.`;
            action = () => navigate(`/search?q=${encodeURIComponent(searchTerms)}`);
          } else {
            response = `I couldn't find any products matching "${searchTerms}". Would you like to browse our categories instead? Or perhaps I can help you find something similar?`;
          }
        } else {
          response = "What would you like to search for? You can tell me a product name, category, or even describe what you're looking for, and I'll help you find it.";
        }
      }
      else if (lowerQuery.includes('hello') || lowerQuery.includes('hi ') || lowerQuery === 'hi' || lowerQuery.includes('hey')) {
        const greetings = [
          `Hi there! How can I help with your shopping today?`,
          `Hello! I'm your shopping assistant. What are you looking for today?`,
          `Hey! I'm here to help you find the perfect products. What do you need?`,
          `Hi! How can I assist with your shopping experience today?`
        ];
        
        response = greetings[Math.floor(Math.random() * greetings.length)];
        
        if (user) {
          response += ` It's great to see you${user.name ? ', ' + user.name : ''}!`;
        }
      }
      else if (lowerQuery.includes('thank') || lowerQuery.includes('thanks')) {
        response = "You're welcome! I'm happy to help. Is there anything else you'd like to know about our products?";
      }
      else {
        // Generic responses for other queries
        const genericResponses = [
          "How can I help with your shopping today? Are you looking for something specific?",
          "Would you like me to recommend some of our popular items or help you find something in particular?",
          "I can show you our best deals or help you search for specific products. What would you prefer?",
          "I'm here to assist with your shopping. Let me know if you're looking for a particular item or category.",
          "Can I help you find specific products or suggest items based on your preferences?"
        ];
        
        response = genericResponses[Math.floor(Math.random() * genericResponses.length)];
      }
      
      // Add bot response
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      
      // Execute action if any (navigation)
      if (action) {
        setTimeout(() => {
          setIsOpen(false);
          action!();
        }, 1500);
      }
    }, 600);
  };

  return (
    <>
      {/* Chat button */}
      <motion.button
        className={cn(
          "fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center z-50",
          "bg-primary text-primary-foreground shadow-lg hover:shadow-xl",
          "transition-all duration-300 ease-in-out"
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleChat}
      >
        <MessageCircle className="h-6 w-6" />
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "fixed bottom-24 right-6 w-[350px] max-w-[calc(100vw-3rem)]",
              "bg-background border rounded-lg shadow-xl z-50",
              "flex flex-col overflow-hidden"
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Shopping Assistant</h3>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* User info if logged in */}
            {user && (
              <div className="flex items-center px-4 py-2 bg-muted/30">
                <User className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Assisting: {user.name}</span>
              </div>
            )}
            
            {/* Quick Actions */}
            <div className="flex items-center gap-2 p-3 bg-muted/50 overflow-x-auto">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1 whitespace-nowrap"
                onClick={() => processUserQuery("Show me today's deals")}
              >
                <Tag className="h-3 w-3" />
                Today's Deals
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1 whitespace-nowrap"
                onClick={() => processUserQuery("Show all products")}
              >
                <ShoppingBag className="h-3 w-3" />
                All Products
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1 whitespace-nowrap"
                onClick={() => processUserQuery("Help me find a shirt")}
              >
                <Search className="h-3 w-3" />
                Find Shirts
              </Button>
            </div>
            
            {/* Messages */}
            <ScrollArea className="flex-1 p-4 h-[300px] max-h-[400px] overflow-y-auto" ref={scrollAreaRef as any}>
              <div className="flex flex-col gap-3">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "max-w-[80%] p-3 rounded-lg",
                      message.type === 'user' 
                        ? "bg-primary text-primary-foreground ml-auto" 
                        : "bg-muted self-start"
                    )}
                  >
                    {message.text.split('\n').map((line, i) => (
                      <div key={i}>
                        {line}
                        {i < message.text.split('\n').length - 1 && <br />}
                      </div>
                    ))}
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
            
            {/* Input */}
            <div className="p-4 border-t">
              <form 
                className="flex gap-2" 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
              >
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about products, styles, deals..."
                  className="flex-1"
                />
                <Button type="submit" size="icon" disabled={!inputValue.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistantChat;
