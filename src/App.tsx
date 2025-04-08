
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import { AnimatePresence } from "framer-motion";
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
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";
import AIAssistantChat from "./components/AIAssistantChat";
import FaqPage from "./pages/FaqPage";
import ShippingPage from "./pages/ShippingPage";
import ReturnsPage from "./pages/ReturnsPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import ContactPage from "./pages/ContactPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AddProductForm from "./components/seller/AddProductForm";
import ProductsList from "./components/seller/ProductsList";
import SalesDashboard from "./components/seller/SalesDashboard";

const queryClient = new QueryClient();

// AnimatedRoutes component to handle page transitions
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Authentication Routes (available only when not logged in) */}
        <Route path="/login" element={
          <ProtectedRoute requireAuth={false}>
            <LoginPage />
          </ProtectedRoute>
        } />
        <Route path="/register" element={
          <ProtectedRoute requireAuth={false}>
            <RegisterPage />
          </ProtectedRoute>
        } />
        <Route path="/forgot-password" element={
          <ProtectedRoute requireAuth={false}>
            <ForgotPasswordPage />
          </ProtectedRoute>
        } />
        <Route path="/reset-password" element={
          <ProtectedRoute requireAuth={false}>
            <ResetPasswordPage />
          </ProtectedRoute>
        } />

        {/* Protected Routes (require authentication) */}
        <Route path="/" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
        <Route path="/product/:productId" element={
          <ProductPage />
        } />
        <Route path="/products" element={
          <ProtectedRoute>
            <CategoryPage />
          </ProtectedRoute>
        } />
        <Route path="/category" element={
          <ProtectedRoute>
            <CategoryPage />
          </ProtectedRoute>
        } />
        <Route path="/category/:categoryId" element={
          <ProtectedRoute>
            <CategoryPage />
          </ProtectedRoute>
        } />
        <Route path="/category/:categoryId/:subcategoryId" element={
          <ProtectedRoute>
            <CategoryPage />
          </ProtectedRoute>
        } />
        <Route path="/search" element={
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        } />
        <Route path="/wishlist" element={
          <ProtectedRoute>
            <WishlistPage />
          </ProtectedRoute>
        } />
        <Route path="/deals" element={
          <ProtectedRoute>
            <DealsPage />
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        } />
        {/* Seller routes */}
        <Route path="/seller/add-product" element={
          <ProtectedRoute>
            <AddProductForm />
          </ProtectedRoute>
        } />
        <Route path="/seller/products" element={
          <ProtectedRoute>
            <ProductsList />
          </ProtectedRoute>
        } />
        <Route path="/seller/dashboard" element={
          <ProtectedRoute>
            <SalesDashboard />
          </ProtectedRoute>
        } />

        {/* Checkout routes (no authentication required) */}
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
        
        {/* Public information pages */}
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/returns" element={<ReturnsPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/contact" element={<ContactPage />} />
        
        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <BrowserRouter>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <div className="flex flex-col min-h-screen">
                  <Header />
                  <ShoppingCart />
                  <main className="flex-1">
                    <AnimatedRoutes />
                  </main>
                  <Footer />
                  <AIAssistantChat />
                </div>
                <Toaster />
                <Sonner />
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
