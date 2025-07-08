import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { USERS } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  register: (fullName: string, email: string, password: string, role: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [localUsers, setLocalUsers] = useState<User[]>([]);

  useEffect(() => {
    // Load current user
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Load any locally registered users
    const storedLocalUsers = localStorage.getItem('registeredUsers');
    if (storedLocalUsers) {
      setLocalUsers(JSON.parse(storedLocalUsers));
    }

    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const allUsers = [...USERS, ...localUsers];
    const foundUser = allUsers.find(u => u.email === email && u.password === password);

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const handleRegister = async (
    
    fullName: string,
    email: string,
    password: string,
    role:  'vendor' | 'customer'
  ): Promise<boolean> => {
    const allUsers = [...USERS, ...localUsers];
    const existingUser = allUsers.find(u => u.email === email);
    if (existingUser) return false;

    const newUser: User = {
      id: Date.now(),
      name: fullName,
      email,
      password,
      role,
    };

    const updatedUsers = [...localUsers, newUser];
    setLocalUsers(updatedUsers);
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
    return true;
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
    register: handleRegister, // ✅ mapped to avoid name conflict
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
