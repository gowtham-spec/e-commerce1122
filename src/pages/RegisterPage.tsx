
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { Facebook, Github, Mail } from 'lucide-react';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get redirect path from state
  const from = location.state?.from || '/';
  
  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from);
    }
  }, [isAuthenticated, navigate, from]);
  
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
      // No need to navigate here as the auth state listener will trigger the redirect
    } catch (error: any) {
      setError(error.message || 'Failed to create an account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    setError(`${provider} registration is not implemented yet.`);
  };

  return (
    <div className="container max-w-md mx-auto py-12 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold valuemarket-text-gradient">Create a ValueMarket Account</h1>
        <p className="text-muted-foreground mt-2">
          {from === '/checkout' 
            ? 'Sign up to complete your purchase' 
            : 'Join ValueMarket and start shopping today'}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
            {error}
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
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
        
        <Button type="submit" className="w-full btn-gradient" disabled={isLoading}>
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </form>
      
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-2 text-muted-foreground text-sm">
              Or continue with
            </span>
          </div>
        </div>
        
        <div className="flex gap-3 mt-6">
          <Button variant="outline" className="flex-1" onClick={() => handleSocialLogin('Facebook')}>
            <Facebook className="h-4 w-4 mr-2" />
            Facebook
          </Button>
          <Button variant="outline" className="flex-1" onClick={() => handleSocialLogin('GitHub')}>
            <Github className="h-4 w-4 mr-2" />
            GitHub
          </Button>
          <Button variant="outline" className="flex-1" onClick={() => handleSocialLogin('Google')}>
            <Mail className="h-4 w-4 mr-2" />
            Google
          </Button>
        </div>
      </div>
      
      <p className="text-center mt-8 text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link to="/login" className="text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
