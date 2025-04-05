
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { Facebook, Github, Mail, ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, isAuthenticated, socialLogin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (!agreedToTerms) {
      setError('You must agree to the terms and conditions');
      return;
    }
    
    try {
      setError('');
      setIsLoading(true);
      await register(name, email, password);
      // Auth state listener in AuthContext will handle the redirect and welcome message
    } catch (error: any) {
      setError(error.message || 'Failed to create an account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    try {
      setError('');
      await socialLogin(provider);
      // Auth state listener will handle redirect
    } catch (error: any) {
      setError(`${provider} login failed: ${error.message}`);
    }
  };

  return (
    <motion.div 
      className="container max-w-md mx-auto py-12 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 purple-gradient-text">Create an Account</h1>
        <p className="text-muted-foreground">
          Join ValueMarket and start shopping today
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-purple-100 dark:border-purple-900/30">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <motion.div 
              className="bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-300 p-3 rounded-md text-sm"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              {error}
            </motion.div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border-purple-100 dark:border-purple-800/40 focus-visible:ring-purple-500"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-purple-100 dark:border-purple-800/40 focus-visible:ring-purple-500"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border-purple-100 dark:border-purple-800/40 focus-visible:ring-purple-500"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="border-purple-100 dark:border-purple-800/40 focus-visible:ring-purple-500"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="terms" 
              checked={agreedToTerms}
              onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
            />
            <Label 
              htmlFor="terms"
              className="text-sm text-muted-foreground"
            >
              I agree to the{' '}
              <Link to="/terms" className="text-primary hover:underline">
                terms and conditions
              </Link>
            </Label>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-purple-gradient hover:shadow-purple-lg group"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
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
          
          <div className="flex gap-3 mt-6">
            <Button variant="outline" className="flex-1 border-purple-100 dark:border-purple-800/40" onClick={() => handleSocialLogin('facebook')}>
              <Facebook className="h-4 w-4 mr-2" />
              Facebook
            </Button>
            <Button variant="outline" className="flex-1 border-purple-100 dark:border-purple-800/40" onClick={() => handleSocialLogin('github')}>
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </Button>
            <Button variant="outline" className="flex-1 border-purple-100 dark:border-purple-800/40" onClick={() => handleSocialLogin('google')}>
              <Mail className="h-4 w-4 mr-2" />
              Google
            </Button>
          </div>
        </div>
      </div>
      
      <p className="text-center mt-8 text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link to="/login" className="text-primary font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </motion.div>
  );
};

export default RegisterPage;
