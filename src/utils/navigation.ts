
import { NavigateFunction } from 'react-router-dom';

// Instead of directly using useNavigate, we'll create a function that accepts a navigate function
export const navigateTo = (navigate: NavigateFunction, path: string) => {
  navigate(path);
};

// Define seller navigation routes
export const sellerRoutes = [
  { path: "/seller/dashboard", name: "Sales Dashboard" },
  { path: "/seller/products", name: "My Products" },
  { path: "/seller/add-product", name: "Add Product" }
];

// Define settings navigation routes
export const settingsRoutes = [
  { path: "/settings", name: "Account", tab: "account" },
  { path: "/settings?tab=profile", name: "Profile", tab: "profile" },
  { path: "/settings?tab=billing", name: "Billing", tab: "billing" },
  { path: "/settings?tab=notifications", name: "Notifications", tab: "notifications" },
  { path: "/settings?tab=seller", name: "Seller Settings", tab: "seller" }
];
