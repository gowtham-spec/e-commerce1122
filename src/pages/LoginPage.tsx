
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { Facebook, Github, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Alert, AlertDescription } from '@/components/ui/alert';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, isAuthenticated, socialLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the redirect path from state or default to home
  const from = location.state?.from || '/';
  
  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from);
    }
  }, [isAuthenticated, navigate, from]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    try {
      setError('');
      setIsLoading(true);
      await login(email, password);
      // No need to navigate here as the auth state listener will trigger the redirect
    } catch (error: any) {
      // Check if the error message contains "email not confirmed"
      if (error.message.toLowerCase().includes("email not confirmed") || 
          error.message.toLowerCase().includes("email confirmation")) {
        setError('Please check your email to confirm your account before signing in.');
      } else {
        setError(error.message || 'Username or password is incorrect');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSocialLogin = (provider: string) => {
    try {
      socialLogin(provider);
    } catch (error: any) {
      setError(`${provider} login failed: ${error.message}`);
    }
  };

  return (
    <motion.div 
      className="container mx-auto py-6 md:py-12 px-4 max-w-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 purple-gradient-text">Sign In to ValueMarket</h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Welcome back! Please login to continue shopping
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-lg border border-purple-100 dark:border-purple-900/30">
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <Alert variant="destructive" className="text-sm">
                <AlertCircle className="h-4 w-4 mr-2" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-purple-100 dark:border-purple-800/40 dark:bg-gray-700 dark:text-white focus-visible:ring-purple-500"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                Forgot Password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border-purple-100 dark:border-purple-800/40 dark:bg-gray-700 dark:text-white focus-visible:ring-purple-500"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-purple-gradient hover:shadow-purple-lg group"
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
            <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
          </Button>
        </form>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="dark:bg-purple-800/40" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white dark:bg-gray-800 px-2 text-muted-foreground text-sm">
                Or continue with
              </span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 md:gap-3 mt-6">
            <Button variant="outline" className="flex-1 border-purple-100 dark:border-purple-800/40 dark:text-gray-200" onClick={() => handleSocialLogin('facebook')}>
              <Facebook className="h-4 w-4 mr-2" />
              <span className="text-xs md:text-sm">Facebook</span>
            </Button>
            <Button variant="outline" className="flex-1 border-purple-100 dark:border-purple-800/40 dark:text-gray-200" onClick={() => handleSocialLogin('github')}>
              <Github className="h-4 w-4 mr-2" />
              <span className="text-xs md:text-sm">GitHub</span>
            </Button>
            <Button variant="outline" className="flex-1 border-purple-100 dark:border-purple-800/40 dark:text-gray-200" onClick={() => handleSocialLogin('google')}>
              <Mail className="h-4 w-4 mr-2" />
              <span className="text-xs md:text-sm">Google</span>
            </Button>
          </div>
        </div>
      </div>
      
      <p className="text-center mt-6 md:mt-8 text-sm text-muted-foreground">
        Don't have an account?{' '}
        <Link to="/register" className="text-primary font-medium hover:underline">
          Sign up
        </Link>
      </p>
    </motion.div>
  );
};

export default LoginPage;
