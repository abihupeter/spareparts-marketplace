import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const Cart: React.FC = () => {
  const { items, updateQuantity, removeFromCart, getTotalPrice, getTotalItems } = useCart();
  const { user } = useAuth();

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();
  const shippingCost = totalPrice > 100 ? 0 : 9.99;
  const finalTotal = totalPrice + shippingCost;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">Add some spare parts to get started!</p>
            <Link to="/shop">
              <Button variant="hero" size="lg">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link 
            to="/shop" 
            className="flex items-center text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold">Shopping Cart</h1>
              <span className="text-muted-foreground">{totalItems} items</span>
            </div>

            {items.map((item) => (
              <Card key={item.product.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Product Image */}
                    <div className="w-full md:w-24 h-24 flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                        <div className="space-y-1">
                          <Link 
                            to={`/product/${item.product.id}`}
                            className="font-semibold hover:text-primary transition-colors"
                          >
                            {item.product.title}
                          </Link>
                          <p className="text-sm text-muted-foreground">{item.product.brand}</p>
                          <p className="text-xs text-muted-foreground">Part #: {item.product.partNumber}</p>
                        </div>
                        
                        <div className="text-right mt-2 md:mt-0">
                          <p className="text-lg font-bold text-primary">${item.product.price}</p>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-12 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center space-x-4">
                          <span className="font-semibold">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => removeFromCart(item.product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>Review your order details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal ({totalItems} items)</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>
                      {shippingCost === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `$${shippingCost.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  {totalPrice < 100 && (
                    <p className="text-xs text-muted-foreground">
                      Add ${(100 - totalPrice).toFixed(2)} more for free shipping
                    </p>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>

                <div className="space-y-3">
                  {user ? (
                    <Link to="/checkout" className="block">
                      <Button className="w-full" size="lg" variant="hero">
                        Proceed to Checkout
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/login" className="block">
                      <Button className="w-full" size="lg" variant="hero">
                        Login to Checkout
                      </Button>
                    </Link>
                  )}
                  
                  <Link to="/shop" className="block">
                    <Button variant="outline" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>

                {/* Security Features */}
                <div className="space-y-2 pt-4 border-t">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>🔒 Secure checkout</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>📞 24/7 customer support</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>🚚 Fast & reliable shipping</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;