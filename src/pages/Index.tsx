import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Shield, ShoppingCart, Star, Truck, Wrench } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { CATEGORIES, PRODUCTS } from '../data/mockData';
import { useCart } from '../contexts/CartContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();

  const featuredProducts = PRODUCTS.slice(0, 4);

  const handleAddToCart = (product: any) => {
    addToCart(product);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative gradient-hero text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Quality Spare Parts for Every Vehicle
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">
              Find genuine automotive parts from trusted brands. Fast delivery, competitive prices.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Search for parts, brands, or models..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-base bg-background/90 backdrop-blur-sm"
                />
              </div>
              <Link to="/shop">
                <Button variant="automotive" size="lg" className="h-12 px-8">
                  <Search className="mr-2 h-5 w-5" />
                  Search
                </Button>
              </Link>
            </div>
            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="flex items-center justify-center space-x-3 text-muted-foreground">
                <Shield className="h-5 w-5 text-primary" />
                <span>Verified Vendors</span>
              </div>
              <div className="flex items-center justify-center space-x-3 text-muted-foreground">
                <Truck className="h-5 w-5 text-primary" />
                <span>Fast Delivery</span>
              </div>
              <div className="flex items-center justify-center space-x-3 text-muted-foreground">
                <Star className="h-5 w-5 text-primary" />
                <span>Quality Guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

  

      {/* Featured Products */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-xl text-muted-foreground">Top-selling spare parts this month</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-feature transition-all duration-300">
                <div className="aspect-square relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {!product.inStock && (
                    <Badge variant="destructive" className="absolute top-2 right-2">
                      Out of Stock
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4 space-y-3">
                  <div>
                    <h3 className="font-semibold line-clamp-2">{product.title}</h3>
                    <p className="text-sm text-muted-foreground">{product.brand}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">${product.price}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-muted-foreground">4.8</span>
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.inStock}
                    className="w-full"
                    variant={product.inStock ? "default" : "secondary"}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/shop">
              <Button variant="hero" size="lg">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

        {/* Categories Section */}
        <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
            <p className="text-xl text-muted-foreground">Find the right parts for your vehicle</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((category) => (
              <Link key={category.id} to={`/shop?category=${category.id}`}>
                <Card className="group hover:shadow-feature transition-all duration-300 cursor-pointer overflow-hidden">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-semibold">{category.name}</h3>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-muted-foreground">{category.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="gradient-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Wrench className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Genuine Parts</h3>
              <p className="text-muted-foreground">All parts are genuine and sourced directly from manufacturers</p>
            </div>
            
            <div className="text-center">
              <div className="gradient-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-muted-foreground">Quick and reliable shipping to get you back on the road</p>
            </div>
            
            <div className="text-center">
              <div className="gradient-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
              <p className="text-muted-foreground">Professional assistance to help you find the right parts</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
