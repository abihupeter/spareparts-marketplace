import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CreditCard,
  Truck,
  MapPin,
  Phone,
  User,
  Wallet,
  DollarSign,
} from "lucide-react"; // Added Wallet and DollarSign icons
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Separator } from "../components/ui/separator";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"; // Import RadioGroup components
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../hooks/use-toast";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const Checkout: React.FC = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    notes: "",
  });

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>(""); // State for selected payment method
  const [mpesaNumber, setMpesaNumber] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVC, setCardCVC] = useState("");

  const [isProcessing, setIsProcessing] = useState(false);

  const totalPrice = getTotalPrice();
  const shippingCost = totalPrice > 1000 ? 0 : 9.99;
  const finalTotal = totalPrice + shippingCost;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Basic validation for payment method
    if (!selectedPaymentMethod) {
      toast({
        title: "Payment Method Required",
        description: "Please select a payment method to proceed.",
        variant: "destructive",
      });
      setIsProcessing(false);
      return;
    }

    // Additional validation based on selected method (simplified for demo)
    if (selectedPaymentMethod === "mpesa" && !mpesaNumber.trim()) {
      toast({
        title: "M-Pesa Number Required",
        description: "Please enter your M-Pesa number.",
        variant: "destructive",
      });
      setIsProcessing(false);
      return;
    }

    if (selectedPaymentMethod === "card") {
      if (!cardNumber.trim() || !cardExpiry.trim() || !cardCVC.trim()) {
        toast({
          title: "Card Details Required",
          description: "Please fill in all card details.",
          variant: "destructive",
        });
        setIsProcessing(false);
        return;
      }
    }

    // Simulate order processing
    setTimeout(() => {
      const orderId = Math.random().toString(36).substr(2, 9).toUpperCase();

      toast({
        title: "Order Placed Successfully!",
        description: `Your order #${orderId} has been confirmed. Payment method: ${selectedPaymentMethod}. You'll receive a confirmation email shortly.`,
      });

      clearCart();
      navigate("/dashboard");
      setIsProcessing(false);
    }, 2000);
  };

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  if (!user) {
    navigate("/login");
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
                  <CardDescription>
                    Where should we deliver your order?
                  </CardDescription>
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

              {/* Payment Method Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Wallet className="mr-2 h-5 w-5" />
                    Select Payment Method
                  </CardTitle>
                  <CardDescription>
                    Choose how you'd like to pay.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    onValueChange={setSelectedPaymentMethod}
                    value={selectedPaymentMethod}
                    className="space-y-4"
                  >
                    {/* M-Pesa Option */}
                    <Label
                      htmlFor="mpesa"
                      className="flex items-center space-x-3 cursor-pointer p-4 border rounded-md hover:bg-muted/50"
                    >
                      <RadioGroupItem value="mpesa" id="mpesa" />
                      <div>
                        <p className="font-medium">M-Pesa</p>
                        <p className="text-sm text-muted-foreground">
                          Pay securely via M-Pesa mobile money.
                        </p>
                      </div>
                    </Label>
                    {selectedPaymentMethod === "mpesa" && (
                      <div className="space-y-2 pl-8">
                        <Label htmlFor="mpesaNumber">M-Pesa Number</Label>
                        <Input
                          id="mpesaNumber"
                          name="mpesaNumber"
                          type="tel"
                          placeholder="e.g., 07XXXXXXXX"
                          value={mpesaNumber}
                          onChange={(e) => setMpesaNumber(e.target.value)}
                          required
                        />
                      </div>
                    )}

                    {/* Card Payment Option */}
                    <Label
                      htmlFor="card"
                      className="flex items-center space-x-3 cursor-pointer p-4 border rounded-md hover:bg-muted/50"
                    >
                      <RadioGroupItem value="card" id="card" />
                      <div>
                        <p className="font-medium">Card Payment</p>
                        <p className="text-sm text-muted-foreground">
                          Pay with Visa, MasterCard, etc. (Demo only)
                        </p>
                      </div>
                    </Label>
                    {selectedPaymentMethod === "card" && (
                      <div className="space-y-4 pl-8">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            name="cardNumber"
                            type="text"
                            placeholder="XXXX XXXX XXXX XXXX"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="cardExpiry">Expiry (MM/YY)</Label>
                            <Input
                              id="cardExpiry"
                              name="cardExpiry"
                              type="text"
                              placeholder="MM/YY"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cardCVC">CVC</Label>
                            <Input
                              id="cardCVC"
                              name="cardCVC"
                              type="text"
                              placeholder="XXX"
                              value={cardCVC}
                              onChange={(e) => setCardCVC(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          * This is a demo. No real card processing will occur.
                        </p>
                      </div>
                    )}

                    {/* Payment on Delivery Option */}
                    <Label
                      htmlFor="delivery"
                      className="flex items-center space-x-3 cursor-pointer p-4 border rounded-md hover:bg-muted/50"
                    >
                      <RadioGroupItem value="delivery" id="delivery" />
                      <div>
                        <p className="font-medium">Payment on Delivery</p>
                        <p className="text-sm text-muted-foreground">
                          Pay cash or M-Pesa when your order arrives.
                        </p>
                      </div>
                    </Label>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                  <CardDescription>
                    {items.length} items in your order
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {items.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex items-center space-x-3 p-3 border rounded-lg"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">
                            {item.product.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {item.product.brand}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            ×{item.quantity}
                          </p>
                          <p className="text-sm text-primary font-semibold">
                            KSh{" "}
                            {(item.product.price * item.quantity).toFixed(2)}
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
                      <span>KSh {totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>
                        {shippingCost === 0 ? (
                          <span className="text-green-600">FREE</span>
                        ) : (
                          `KSh ${shippingCost.toFixed(2)}`
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
                    <span>KSh {finalTotal.toFixed(2)}</span>
                  </div>

                  <Button
                    onClick={handleSubmit}
                    disabled={isProcessing}
                    className="w-full"
                    size="lg"
                    variant="hero"
                  >
                    {isProcessing ? "Processing Order..." : "Place Order"}
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
