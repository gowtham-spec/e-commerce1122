
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from "@/components/ui/use-toast";

export type User = {
  id: string;
  email: string;
  name: string;
  avatar?: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Check if user is logged in
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulating API call
    try {
      // In a real app, this would be a fetch call to your auth API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user for demo purposes
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        avatar: 'https://ui-avatars.com/api/?name=' + email.split('@')[0],
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${mockUser.name}!`,
      });
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    // Simulating API call
    try {
      // In a real app, this would be a fetch call to your auth API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user for demo purposes
      const mockUser: User = {
        id: Date.now().toString(),
        email,
        name,
        avatar: 'https://ui-avatars.com/api/?name=' + name,
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      toast({
        title: "Registration Successful",
        description: `Welcome to TradeMarket, ${name}!`,
      });
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "There was an error registering your account. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        register,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
