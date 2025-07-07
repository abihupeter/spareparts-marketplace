import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, MapPin, Phone, User } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Separator } from '../components/ui/separator';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/use-toast';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const Checkout: React.FC = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    notes: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const totalPrice = getTotalPrice();
  const shippingCost = totalPrice > 100 ? 0 : 9.99;
  const finalTotal = totalPrice + shippingCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate order processing
    setTimeout(() => {
      const orderId = Math.random().toString(36).substr(2, 9).toUpperCase();
      
      toast({
        title: "Order Placed Successfully!",
        description: `Your order #${orderId} has been confirmed. You'll receive a confirmation email shortly.`,
      });

      clearCart();
      navigate('/dashboard');
      setIsProcessing(false);
    }, 2000);
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Checkout Form */}
            <div className="space-y-6">
              {/* Shipping Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Truck className="mr-2 h-5 w-5" />
                    Shipping Information
                  </CardTitle>
                  <CardDescription>Where should we deliver your order?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">
                          <User className="inline mr-1 h-4 w-4" />
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">
                          <Phone className="inline mr-1 h-4 w-4" />
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">
                        <MapPin className="inline mr-1 h-4 w-4" />
                        Street Address
                      </Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Delivery Notes (Optional)</Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        placeholder="Any special delivery instructions..."
                        value={formData.notes}
                        onChange={handleInputChange}
                        rows={3}
                      />
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="mr-2 h-5 w-5" />
                    Payment Method
                  </CardTitle>
                  <CardDescription>This is a demo - no real payment processing</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-6 border-2 border-dashed border-muted-foreground/25 rounded-lg text-center">
                    <CreditCard className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      Demo Mode - No payment required
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      In a real application, payment gateway integration would be here
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                  <CardDescription>{items.length} items in your order</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{item.product.title}</p>
                          <p className="text-xs text-muted-foreground">{item.product.brand}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">×{item.quantity}</p>
                          <p className="text-sm text-primary font-semibold">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Order Totals */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
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
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>Calculated at delivery</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>

                  <Button
                    onClick={handleSubmit}
                    disabled={isProcessing}
                    className="w-full"
                    size="lg"
                    variant="hero"
                  >
                    {isProcessing ? 'Processing Order...' : 'Place Order'}
                  </Button>

                  {/* Order Features */}
                  <div className="space-y-2 pt-4 border-t">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>🔒 Secure & encrypted checkout</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>📦 Fast processing & shipping</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>🔄 Easy returns within 30 days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;