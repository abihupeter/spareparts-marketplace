// src/pages/Checkout.tsx

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
  Loader2,
} from "lucide-react";
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
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../hooks/use-toast";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { getAuth } from "firebase/auth";

const Checkout: React.FC = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: "", // This is the shipping phone number
    address: "",
    city: "",
    state: "",
    zipCode: "",
    notes: "",
  });

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("");
  const [mpesaNumber, setMpesaNumber] = useState(""); // This is the M-Pesa phone number
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVC, setCardCVC] = useState("");

  const [isProcessing, setIsProcessing] = useState(false);

  const totalPrice = getTotalPrice();
  const shippingCost = totalPrice > 1000 ? 0 : 300;
  const finalTotal = totalPrice + shippingCost;

  const API_BASE_URL = "http://localhost:5000/api";

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const cleanedValue = value.replace(/\D/g, ""); // Remove non-digits
    if (cleanedValue.length <= 10) {
      setFormData((prev) => ({ ...prev, [name]: cleanedValue }));
    }
  };

  const handleMpesaNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const cleanedValue = value.replace(/\D/g, ""); // Remove non-digits
    if (cleanedValue.length <= 10) {
      setMpesaNumber(cleanedValue);
    }
  };

  // --- START: New Card Input Handlers ---
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    value = value.substring(0, 16); // Limit to 16 digits
    // Add spaces every 4 digits
    const formattedValue = value.match(/.{1,4}/g)?.join(" ") || "";
    setCardNumber(formattedValue);
  };

  const handleCardExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    if (value.length > 4) {
      // Max 4 digits for MMYY
      value = value.substring(0, 4);
    }

    if (value.length > 2) {
      // Automatically add '/' after MM
      setCardExpiry(`${value.substring(0, 2)}/${value.substring(2, 4)}`);
    } else {
      setCardExpiry(value);
    }
  };

  const handleCardCVCChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    if (value.length <= 3) {
      // Limit to 3 digits as requested (common for Visa/MC)
      setCardCVC(value);
    }
    // If you need 4 for Amex, change to `value.length <= 4`
  };
  // --- END: New Card Input Handlers ---

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      toast({
        title: "Authentication Required",
        description: "Please log in to place an order.",
        variant: "destructive",
      });
      setIsProcessing(false);
      return;
    }

    if (!selectedPaymentMethod) {
      toast({
        title: "Payment Method Required",
        description: "Please select a payment method to proceed.",
        variant: "destructive",
      });
      setIsProcessing(false);
      return;
    }

    if (selectedPaymentMethod === "mpesa") {
      if (!mpesaNumber.trim()) {
        toast({
          title: "M-Pesa Number Required",
          description: "Please enter your M-Pesa number.",
          variant: "destructive",
        });
        setIsProcessing(false);
        return;
      }
      if (!/^07\d{8}$/.test(mpesaNumber)) {
        toast({
          title: "Invalid M-Pesa Number",
          description:
            "Please enter a valid Kenyan M-Pesa number (e.g., 0712345678).",
          variant: "destructive",
        });
        setIsProcessing(false);
        return;
      }
    }

    if (selectedPaymentMethod === "card") {
      // Validate formatted lengths and patterns
      if (
        cardNumber.replace(/\s/g, "").length !== 16 ||
        !cardExpiry.match(/^\d{2}\/\d{2}$/) ||
        cardCVC.length !== 3
      ) {
        toast({
          title: "Invalid Card Details",
          description:
            "Please ensure card number is 16 digits, expiry is MM/YY, and CVC is 3 digits.",
          variant: "destructive",
        });
        setIsProcessing(false);
        return;
      }
    }

    try {
      const idToken = await currentUser.getIdToken();

      const orderPlacementResponse = await fetch(`${API_BASE_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          items: items,
          total: finalTotal,
          shippingAddress: {
            name: formData.name,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            notes: formData.notes,
          },
          paymentMethod: selectedPaymentMethod,
        }),
      });

      if (!orderPlacementResponse.ok) {
        const errorData = await orderPlacementResponse.json();
        throw new Error(
          errorData.message ||
            `HTTP error! status: ${orderPlacementResponse.status}`
        );
      }

      const orderResult = await orderPlacementResponse.json();
      const orderId = orderResult.id;

      if (selectedPaymentMethod === "mpesa") {
        const formattedMpesaNumber = `254${mpesaNumber.substring(1)}`;

        const mpesaResponse = await fetch(`${API_BASE_URL}/mpesa/stkpush`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({
            phoneNumber: formattedMpesaNumber,
            amount: finalTotal,
            orderId: orderId,
          }),
        });

        if (!mpesaResponse.ok) {
          const errorData = await mpesaResponse.json();
          throw new Error(
            errorData.error ||
              `M-Pesa STK Push error! status: ${mpesaResponse.status}`
          );
        }

        const mpesaResult = await mpesaResponse.json();
        toast({
          title: "M-Pesa Payment Initiated!",
          description:
            mpesaResult.customerMessage ||
            "Please check your phone for the M-Pesa prompt to complete the payment.",
          variant: "default",
        });

        clearCart();
        navigate("/dashboard");
      } else if (selectedPaymentMethod === "card") {
        toast({
          title: "Order Placed Successfully (Demo Card)",
          description: `Your order #${orderId} has been confirmed. Card payment simulated.`,
        });
        clearCart();
        navigate("/dashboard");
      } else if (selectedPaymentMethod === "delivery") {
        toast({
          title: "Order Placed Successfully!",
          description: `Your order #${orderId} has been confirmed. Payment on Delivery selected.`,
        });
        clearCart();
        navigate("/dashboard");
      }
    } catch (error: any) {
      console.error("Error placing order or initiating payment:", error);
      toast({
        title: "Order/Payment Failed",
        description:
          error.message ||
          "There was an error processing your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
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
                          onChange={handlePhoneNumberChange}
                          maxLength={10}
                          pattern="[0-9]{10}"
                          title="Phone number must be 10 digits (e.g., 07XXXXXXXX)"
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
                          placeholder="e.g., 0712345678"
                          value={mpesaNumber}
                          onChange={handleMpesaNumberChange}
                          maxLength={10}
                          pattern="07[0-9]{8}"
                          title="M-Pesa number must start with 07 and be 10 digits long."
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
                            onChange={handleCardNumberChange} // New handler
                            maxLength={19} // 16 digits + 3 spaces
                            pattern="[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}"
                            title="Card number must be 16 digits (e.g., 1234 5678 9012 3456)"
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
                              onChange={handleCardExpiryChange} // New handler
                              maxLength={5} // MM/YY (5 characters)
                              pattern="(0[1-9]|1[0-2])\/?([0-9]{2})"
                              title="Expiry date must be in MM/YY format (e.g., 12/25)"
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
                              onChange={handleCardCVCChange} // New handler
                              maxLength={3} // As per XXX request
                              pattern="[0-9]{3}"
                              title="CVC must be 3 digits"
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
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://placehold.co/400x400/cccccc/333333?text=No+Image";
                          }}
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
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing Order...
                      </>
                    ) : (
                      "Place Order"
                    )}
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
