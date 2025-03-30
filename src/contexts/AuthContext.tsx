
import { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isUsingPlaceholderCredentials: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check if using placeholder credentials
  const isUsingPlaceholderCredentials = 
    supabase.supabaseUrl === 'https://placeholder-project.supabase.co' || 
    supabase.supabaseKey === 'placeholder-key';

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      setIsLoading(true);
      
      // Skip the API call if we're using placeholder credentials
      if (isUsingPlaceholderCredentials) {
        setIsLoading(false);
        return;
      }
      
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
        }
        
        setSession(session);
        setUser(session?.user ?? null);
      } catch (error) {
        console.error('Failed to get session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getInitialSession();

    // Only set up auth state listener if we're not using placeholder credentials
    if (!isUsingPlaceholderCredentials) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setSession(session);
          setUser(session?.user ?? null);
          setIsLoading(false);
        }
      );

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [isUsingPlaceholderCredentials]);

  const signUp = async (email: string, password: string) => {
    // Check if using placeholder credentials before attempting API call
    if (isUsingPlaceholderCredentials) {
      throw new Error('Cannot create account: Supabase connection not properly configured. Please add your Supabase credentials to your .env file.');
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;
  };

  const signIn = async (email: string, password: string) => {
    // Check if using placeholder credentials before attempting API call
    if (isUsingPlaceholderCredentials) {
      throw new Error('Cannot sign in: Supabase connection not properly configured. Please add your Supabase credentials to your .env file.');
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
  };

  const signOut = async () => {
    // Check if using placeholder credentials before attempting API call
    if (isUsingPlaceholderCredentials) {
      throw new Error('Cannot sign out: Supabase connection not properly configured. Please add your Supabase credentials to your .env file.');
    }

    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const value = {
    user,
    session,
    isLoading,
    signUp,
    signIn,
    signOut,
    isUsingPlaceholderCredentials,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
