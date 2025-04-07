import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useTheme } from '@/contexts/ThemeContext';
import { formatPriceToINR } from '@/utils/priceFormatter';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/ModeToggle"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, ShoppingCart, Moon, Sun, Menu, User, Settings, HelpCircle } from 'lucide-react';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount, setIsCartOpen } = useCart();
  const { theme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error: any) {
      console.error("Logout failed:", error.message);
    }
  };

  const onClose = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-background sticky top-0 z-50 w-full border-b">
      <div className="container flex h-16 items-center justify-between py-4">
        <Link to="/" className="mr-4 flex items-center font-bold">
          ValueMarket
        </Link>
        <div className="flex items-center space-x-4">
          <Input type="search" placeholder="Search products..." className="max-w-md hidden md:block" />
          <ModeToggle />

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 font-normal md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr repeat(2,1fr)]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          to="/products"
                          className="focus:shadow-none flex h-full width-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:ring-2 focus:ring-ring disabled:pointer-events-none disabled:opacity-50"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            New Arrivals
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Explore our latest collection of trendy products.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/category/electronics"
                          className="group flex h-full select-none items-center rounded-md px-3 py-1.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:shadow-none focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                        >
                          Electronics
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/category/fashion"
                          className="group flex h-full select-none items-center rounded-md px-3 py-1.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:shadow-none focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                        >
                          Fashion
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/category/home-decor"
                          className="group flex h-full select-none items-center rounded-md px-3 py-1.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:shadow-none focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                        >
                          Home Decor
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/deals" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    Deals
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/settings" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    Settings
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Shopping Cart Icon */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCartOpen(true)}
            className="relative cart-icon"
          >
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Button>

          {/* Authentication Dropdown */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Avatar className="h-5 w-5">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex flex-col space-y-1.5 p-2">
                  <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                  <p className="text-sm text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Billing
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Settings
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Log out
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button>Sign In</Button>
            </Link>
          )}

          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:w-64">
              <SheetHeader className="text-left">
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>
                  Navigate through ValueMarket
                </SheetDescription>
              </SheetHeader>
              <div className="py-4">
                <Link
                  to="/"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-all hover:text-primary"
                  onClick={onClose}
                >
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </Link>
                <Link
                  to="/products"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-all hover:text-primary"
                  onClick={onClose}
                >
                  <List className="h-4 w-4" />
                  <span>Products</span>
                </Link>
                <Link
                  to="/deals"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-all hover:text-primary"
                  onClick={onClose}
                >
                  <Percent className="h-4 w-4" />
                  <span>Deals</span>
                </Link>
                <Link
                  to="/wishlist"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-all hover:text-primary"
                  onClick={onClose}
                >
                  <Heart className="h-4 w-4" />
                  <span>Wishlist</span>
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-all hover:text-primary"
                  onClick={onClose}
                >
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Link>
                <Button variant="ghost" size="sm" className="justify-start">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Help & Support
                </Button>
              </div>
              <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-auto">
                {!isAuthenticated && (
                  <Link to="/login">
                    <Button className="w-full">Sign In</Button>
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;

// Icons import
import {
  Home,
  List,
  Percent,
  Heart,
} from 'lucide-react';
