
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ShoppingCart from "./components/ShoppingCart";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";
import WishlistPage from "./pages/WishlistPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import DealsPage from "./pages/DealsPage";
import NotFound from "./pages/NotFound";
import AIAssistantChat from "./components/AIAssistantChat";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <BrowserRouter>
                <div className="flex flex-col min-h-screen">
                  <Header />
                  <ShoppingCart />
                  <main className="flex-1">
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/product/:productId" element={<ProductPage />} />
                      <Route path="/products" element={<CategoryPage />} />
                      <Route path="/category" element={<CategoryPage />} />
                      <Route path="/category/:categoryId" element={<CategoryPage />} />
                      <Route path="/category/:categoryId/:subcategoryId" element={<CategoryPage />} />
                      <Route path="/search" element={<SearchPage />} />
                      <Route path="/wishlist" element={<WishlistPage />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/register" element={<RegisterPage />} />
                      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                      <Route path="/reset-password" element={<ResetPasswordPage />} />
                      <Route path="/checkout" element={<CheckoutPage />} />
                      <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
                      <Route path="/deals" element={<DealsPage />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  <Footer />
                  <AIAssistantChat />
                </div>
              </BrowserRouter>
              <Toaster />
              <Sonner />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
