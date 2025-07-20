// src/pages/SellItem.tsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { PlusCircle, Loader2, ArrowLeft, X } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Checkbox } from "../components/ui/checkbox";
import { Badge } from "../components/ui/badge"; // Import Badge
import { useAuth } from "../contexts/AuthContext";
import { useProducts } from "../contexts/ProductContext"; // Import useProducts
import { useToast } from "../hooks/use-toast";
import { CATEGORIES, CAR_BRANDS } from "../data/mockData"; // Keep these for dropdown options
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Product } from "../types";

export default function SellItem() {
  const { user } = useAuth();
  const { addNewProduct } = useProducts(); // Use addNewProduct from context
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Omit<Product, "id" | "vendorId">>({
    title: "",
    description: "",
    price: 0,
    image: "",
    category: "",
    brand: "",
    partNumber: "",
    compatibility: [],
    inStock: true,
    specs: {},
  });
  const [newCompatibility, setNewCompatibility] = useState("");
  const [newSpecKey, setNewSpecKey] = useState("");
  const [newSpecValue, setNewSpecValue] = useState("");

  // Redirect if not logged in or not a vendor
  if (!user) {
    navigate("/login");
    toast({
      title: "Authentication Required",
      description: "Please log in to sell items.",
      variant: "destructive",
    });
    return null;
  }
  if (user.role !== "vendor") {
    navigate("/dashboard");
    toast({
      title: "Unauthorized Access",
      description: "Only sellers can add new items.",
      variant: "destructive",
    });
    return null;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [id]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? parseFloat(value)
          : value,
    }));
  };

  const handleSelectChange = (id: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleAddCompatibility = () => {
    if (
      newCompatibility.trim() &&
      !formData.compatibility.includes(newCompatibility.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        compatibility: [...prev.compatibility, newCompatibility.trim()],
      }));
      setNewCompatibility("");
    }
  };

  const handleRemoveCompatibility = (itemToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      compatibility: prev.compatibility.filter((item) => item !== itemToRemove),
    }));
  };

  const handleAddSpec = () => {
    if (newSpecKey.trim() && newSpecValue.trim()) {
      setFormData((prev) => ({
        ...prev,
        specs: { ...prev.specs, [newSpecKey.trim()]: newSpecValue.trim() },
      }));
      setNewSpecKey("");
      setNewSpecValue("");
    }
  };

  const handleRemoveSpec = (keyToRemove: string) => {
    setFormData((prev) => {
      const newSpecs = { ...prev.specs };
      delete newSpecs[keyToRemove];
      return { ...prev, specs: newSpecs };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Basic validation
    if (
      !formData.title ||
      !formData.description ||
      formData.price <= 0 ||
      !formData.image ||
      !formData.category ||
      !formData.brand ||
      !formData.partNumber
    ) {
      toast({
        title: "Validation Error",
        description:
          "Please fill in all required fields (Title, Description, Price, Image URL, Category, Brand, Part Number).",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    const success = await addNewProduct(formData); // Call the context function

    if (success) {
      toast({
        title: "Product Added Successfully!",
        description: `${formData.title} is now listed in the shop.`,
      });
      setFormData({
        // Reset form after successful submission
        title: "",
        description: "",
        price: 0,
        image: "",
        category: "",
        brand: "",
        partNumber: "",
        compatibility: [],
        inStock: true,
        specs: {},
      });
      navigate("/shop"); // Redirect to shop page
    } else {
      toast({
        title: "Failed to Add Product",
        description:
          "There was an error adding your product. Please try again.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            to="/dashboard"
            className="flex items-center text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
        <Card className="max-w-3xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <PlusCircle className="h-6 w-6" /> List a New Item
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Product Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brand">Brand</Label>
                  <Select
                    value={formData.brand}
                    onValueChange={(val) => handleSelectChange("brand", val)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Brand" />
                    </SelectTrigger>
                    <SelectContent>
                      {CAR_BRANDS.map((brand) => (
                        <SelectItem key={brand} value={brand}>
                          {brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (Ksh.)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    min="0.01"
                    step="0.01"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="partNumber">Part Number</Label>
                  <Input
                    id="partNumber"
                    value={formData.partNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    type="url"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(val) => handleSelectChange("category", val)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Compatibility */}
              <div className="space-y-2">
                <Label>Vehicle Compatibility</Label>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="e.g., Toyota Camry"
                    value={newCompatibility}
                    onChange={(e) => setNewCompatibility(e.target.value)}
                  />
                  <Button type="button" onClick={handleAddCompatibility}>
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.compatibility.map((item, index) => (
                    <Badge key={index} className="pr-1">
                      {item}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-auto px-1 py-0.5 ml-1"
                        onClick={() => handleRemoveCompatibility(item)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="space-y-2">
                <Label>Technical Specifications (Optional)</Label>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Spec Name (e.g., Material)"
                    value={newSpecKey}
                    onChange={(e) => setNewSpecKey(e.target.value)}
                    className="flex-1"
                  />
                  <Input
                    placeholder="Spec Value (e.g., Steel)"
                    value={newSpecValue}
                    onChange={(e) => setNewSpecValue(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="button" onClick={handleAddSpec}>
                    Add Spec
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {Object.entries(formData.specs || {}).map(([key, value]) => (
                    <Badge key={key} className="justify-between">
                      {key}: {value}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-auto px-1 py-0.5 ml-1"
                        onClick={() => handleRemoveSpec(key)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>

              {/* In Stock Checkbox */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="inStock"
                  checked={formData.inStock}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      inStock: Boolean(checked),
                    }))
                  }
                />
                <Label htmlFor="inStock">Item is in stock</Label>
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Listing Item...
                  </>
                ) : (
                  "List Item"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
