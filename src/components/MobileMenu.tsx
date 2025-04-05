
import React from 'react';
import { Link } from 'react-router-dom';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { categoriesEnhanced } from '@/data/products';
import { useAuth } from '@/contexts/AuthContext';
import { Home, PackageOpen, HeartIcon, Settings, HelpCircle, LogOut } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-[280px] sm:w-[350px] p-0">
        <div className="h-full flex flex-col overflow-auto">
          {/* User info */}
          <div className="p-4 border-b">
            {isAuthenticated && user ? (
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link to="/login" onClick={onClose}>
                  <Button className="w-full">Login</Button>
                </Link>
                <Link to="/register" onClick={onClose}>
                  <Button variant="outline" className="w-full">Register</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="p-4 flex-1">
            <nav className="space-y-2">
              <Link 
                to="/" 
                className="flex items-center p-2 hover:bg-gray-100 rounded-md"
                onClick={onClose}
              >
                <Home className="mr-2 h-5 w-5" />
                <span>Home</span>
              </Link>

              <Accordion type="single" collapsible className="w-full">
                {categoriesEnhanced.map((category) => (
                  <AccordionItem key={category.id} value={category.id} className="border-none">
                    <AccordionTrigger className="py-2 px-0 hover:no-underline">
                      <div className="flex items-center">
                        <span>{category.name}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="ml-4 space-y-1">
                        <Link 
                          to={`/category/${category.id}`} 
                          className="block p-2 hover:bg-gray-100 rounded-md"
                          onClick={onClose}
                        >
                          All {category.name}
                        </Link>
                        {category.subcategories.map((subcategory) => (
                          <Link 
                            key={subcategory.id} 
                            to={`/category/${category.id}/${subcategory.id}`}
                            className="block p-2 hover:bg-gray-100 rounded-md"
                            onClick={onClose}
                          >
                            {subcategory.name}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <Link 
                to="/deals" 
                className="flex items-center p-2 hover:bg-gray-100 rounded-md text-secondary"
                onClick={onClose}
              >
                <PackageOpen className="mr-2 h-5 w-5" />
                <span>Today's Deals</span>
              </Link>

              <Link 
                to="/wishlist" 
                className="flex items-center p-2 hover:bg-gray-100 rounded-md"
                onClick={onClose}
              >
                <HeartIcon className="mr-2 h-5 w-5" />
                <span>Wishlist</span>
              </Link>
            </nav>
          </div>

          {/* Footer links */}
          {isAuthenticated && (
            <div className="p-4 border-t">
              <div className="space-y-2">
                <Link 
                  to="/account" 
                  className="flex items-center p-2 hover:bg-gray-100 rounded-md"
                  onClick={onClose}
                >
                  <Settings className="mr-2 h-5 w-5" />
                  <span>Settings</span>
                </Link>
                <Link 
                  to="/help" 
                  className="flex items-center p-2 hover:bg-gray-100 rounded-md"
                  onClick={onClose}
                >
                  <HelpCircle className="mr-2 h-5 w-5" />
                  <span>Help</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center p-2 text-red-500 hover:bg-gray-100 rounded-md w-full"
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
