import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Home, Menu, X } from 'lucide-react';
import { Button } from '../ui/button';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { Badge } from '../ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const totalItems = getTotalItems();

  const navigationLinks = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="gradient-primary rounded-lg p-2">
              <Home className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">PartShop</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigationLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Cart */}
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="flex items-center space-x-2">
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button variant="automotive">Login</Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t py-4">
            <div className="flex flex-col space-y-4">
              {navigationLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-foreground hover:text-primary transition-colors font-medium px-2 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="flex items-center justify-between px-2 pt-4 border-t">
                <Link to="/cart" className="relative" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <ShoppingCart className="h-4 w-4" />
                    <span>Cart</span>
                    {totalItems > 0 && (
                      <Badge className="h-5 w-5 flex items-center justify-center p-0 text-xs">
                        {totalItems}
                      </Badge>
                    )}
                  </Button>
                </Link>

                {user ? (
                  <div className="flex items-center space-x-2">
                    <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="ghost" size="sm">Dashboard</Button>
                    </Link>
                    <Button variant="ghost" size="sm" onClick={handleLogout}>
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="automotive" size="sm">Login</Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;