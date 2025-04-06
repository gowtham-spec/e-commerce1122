
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

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
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  isLoading: boolean;
  socialLogin: (provider: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Transform Supabase user to app user format
  const transformUser = (supabaseUser: SupabaseUser | null): User | null => {
    if (!supabaseUser) return null;
    
    return {
      id: supabaseUser.id,
      email: supabaseUser.email || '',
      name: supabaseUser.user_metadata.name || supabaseUser.email?.split('@')[0] || '',
      avatar: supabaseUser.user_metadata.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(supabaseUser.email?.split('@')[0] || '')}`
    };
  };

  // Set up auth state listener
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        const transformedUser = transformUser(session?.user ?? null);
        setUser(transformedUser);
        setIsLoading(false);
        
        // Display welcome toast for new sign-ins
        if (event === 'SIGNED_IN' && transformedUser) {
          toast({
            title: `Welcome, ${transformedUser.name}!`,
            description: "You have successfully signed in.",
          });
          navigate('/');
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(transformUser(session?.user ?? null));
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [toast, navigate]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        // More user-friendly error message
        if (error.message.includes('Invalid login credentials')) {
          throw new Error('Username or password is incorrect');
        }
        // Remove this condition to avoid showing email confirmation message when it's not needed
        // The Supabase auth will handle this automatically
        throw error;
      }
      
      // If login is successful but no session, something is wrong
      if (!data.session) {
        throw new Error('No session returned from login');
      }
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "Username or password is incorrect",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const socialLogin = async (provider: string) => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider as any,
        options: {
          redirectTo: window.location.origin
        }
      });
      
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || `Failed to login with ${provider}`,
        variant: "destructive",
      });
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            first_name: name.split(' ')[0],
            last_name: name.split(' ').slice(1).join(' '),
            avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`
          }
        }
      });
      
      if (error) throw error;
      
      toast({
        title: `Welcome to ValueMarket, ${name}!`,
        description: "Your account has been created successfully.",
      });
      
      // Navigate to home page on successful registration
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message || "There was an error creating your account. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
    } catch (error: any) {
      toast({
        title: "Logout Failed",
        description: error.message || "There was an error logging out.",
        variant: "destructive",
      });
    }
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
        socialLogin
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
