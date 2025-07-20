// src/pages/Dashboard.tsx

import React, { useState, useEffect } from "react";
import {
  Package,
  Plus,
  Edit,
  Trash2,
  Eye,
  ShoppingBag,
  User,
  TrendingUp,
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
import { Badge } from "../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
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
import { Checkbox } from "../components/ui/checkbox"; // Import Checkbox
import { CATEGORIES, CAR_BRANDS } from "../data/mockData";
import { useAuth } from "../contexts/AuthContext";
import { useProducts } from "../contexts/ProductContext";
import { useToast } from "../hooks/use-toast";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Product, Order } from "../types";
import { getAuth } from "firebase/auth"; // Import getAuth

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { products: allProducts, fetchProducts } = useProducts();
  const { toast } = useToast();
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [userOrders, setUserOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState<string | null>(null);

  const API_BASE_URL = "http://localhost:5000/api";

  const userProducts =
    user?.role === "vendor"
      ? allProducts.filter((p) => p.vendorId === user.id)
      : [];

  const [newProduct, setNewProduct] = useState<
    Omit<
      Product,
      "id" | "vendorId" | "specs" | "compatibility" | "inStock" | "image"
    >
  >({
    title: "",
    description: "",
    price: 0,
    category: "",
    brand: "",
    partNumber: "",
  });
  const [newProductImage, setNewProductImage] = useState(
    "https://placehold.co/400x400/cccccc/333333?text=Product+Image"
  );
  const [newProductInStock, setNewProductInStock] = useState(true);

  const handleAddProduct = async () => {
    const auth = getAuth(); // Get auth instance
    const currentUser = auth.currentUser; // Get current Firebase User

    if (!currentUser) {
      // Check for Firebase User
      toast({
        title: "Error",
        description: "User not authenticated.",
        variant: "destructive",
      });
      return;
    }

    // Basic validation for new product
    if (
      !newProduct.title ||
      !newProduct.description ||
      newProduct.price <= 0 ||
      !newProductImage ||
      !newProduct.category ||
      !newProduct.brand ||
      !newProduct.partNumber
    ) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields for the new product.",
        variant: "destructive",
      });
      return;
    }

    try {
      const idToken = await currentUser.getIdToken(); // Call getIdToken on currentUser
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          ...newProduct,
          image: newProductImage,
          inStock: newProductInStock,
          vendorId: currentUser.uid, // Use currentUser.uid as vendorId
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      toast({
        title: "Product Added",
        description: `${newProduct.title} has been added to your inventory.`,
      });
      setIsAddProductOpen(false);
      setNewProduct({
        title: "",
        description: "",
        price: 0,
        category: "",
        brand: "",
        partNumber: "",
      });
      setNewProductImage(
        "https://placehold.co/400x400/cccccc/333333?text=Product+Image"
      );
      setNewProductInStock(true);
      fetchProducts();
    } catch (error: any) {
      console.error("Error adding product:", error);
      toast({
        title: "Error adding product",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const fetchUserOrders = async () => {
      const auth = getAuth(); // Get auth instance
      const currentUser = auth.currentUser; // Get current Firebase User

      if (!currentUser) {
        // Check for Firebase User
        setOrdersLoading(false);
        return;
      }

      setOrdersLoading(true);
      setOrdersError(null);
      try {
        const idToken = await currentUser.getIdToken(); // Call getIdToken on currentUser
        const response = await fetch(
          `${API_BASE_URL}/orders/${currentUser.uid}`,
          {
            // Use currentUser.uid
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Order[] = await response.json();
        setUserOrders(data);
      } catch (err: any) {
        console.error("Failed to fetch orders:", err);
        setOrdersError(err.message || "Failed to fetch orders.");
        toast({
          title: "Error",
          description: err.message || "Failed to fetch orders.",
          variant: "destructive",
        });
      } finally {
        setOrdersLoading(false);
      }
    };

    fetchUserOrders();
  }, [user]); // Keep user in dependency array to re-fetch when user changes

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      delivered: "default",
      shipped: "secondary",
      processing: "outline",
      pending: "destructive",
    };
    return <Badge variant={variants[status] || "outline"}>{status}</Badge>;
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">
            Please log in to access your dashboard
          </h1>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    // ... (rest of the Dashboard component remains the same)
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}</h1>
          <p className="text-muted-foreground">
            {user.role === "vendor"
              ? "Manage your products and orders"
              : "Track your orders and account"}
          </p>
          <p className="text-sm text-muted-foreground">
            Your User ID:{" "}
            <span className="font-mono text-primary">{user.id}</span>
          </p>
        </div>

        <Tabs
          defaultValue={user.role === "vendor" ? "products" : "orders"}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            {user.role === "vendor" && (
              <TabsTrigger value="products">My Products</TabsTrigger>
            )}
            {user.role === "customer" && (
              <TabsTrigger value="account">Account</TabsTrigger>
            )}
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Orders
                  </CardTitle>
                  <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userOrders.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {/* Dynamic data for last month would require more complex filtering */}
                    Based on your order history
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Spent
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    Ksh.
                    {userOrders
                      .reduce((sum, order) => sum + order.total, 0)
                      .toFixed(2)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Across all your orders
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Items Ordered
                  </CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {userOrders.reduce(
                      (sum, order) => sum + order.items.length,
                      0
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Total items across all orders
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Your order history and status</CardDescription>
              </CardHeader>
              <CardContent>
                {ordersLoading ? (
                  <div className="text-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-primary mx-auto" />
                    <p className="text-muted-foreground mt-2">
                      Loading orders...
                    </p>
                  </div>
                ) : ordersError ? (
                  <div className="text-center py-8 text-destructive">
                    <p>Error: {ordersError}</p>
                  </div>
                ) : userOrders.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>You have no orders yet.</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {userOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">
                            {order.id}
                          </TableCell>
                          <TableCell>
                            {new Date(
                              order.createdAt.seconds * 1000
                            ).toLocaleDateString()}
                          </TableCell>
                          <TableCell>{order.items.length} items</TableCell>
                          <TableCell>Ksh.{order.total.toFixed(2)}</TableCell>
                          <TableCell>{getStatusBadge(order.status)}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab (Vendor Only) */}
          {user.role === "vendor" && (
            <TabsContent value="products" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">My Products</h2>
                  <p className="text-muted-foreground">
                    Manage your product inventory
                  </p>
                </div>

                <Dialog
                  open={isAddProductOpen}
                  onOpenChange={setIsAddProductOpen}
                >
                  <DialogTrigger asChild>
                    <Button variant="hero">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Product
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Add New Product</DialogTitle>
                      <DialogDescription>
                        Add a new spare part to your inventory
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Product Title</Label>
                        <Input
                          id="title"
                          value={newProduct.title}
                          onChange={(e) =>
                            setNewProduct((prev) => ({
                              ...prev,
                              title: e.target.value,
                            }))
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={newProduct.description}
                          onChange={(e) =>
                            setNewProduct((prev) => ({
                              ...prev,
                              description: e.target.value,
                            }))
                          }
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="price">Price</Label>
                          <Input
                            id="price"
                            type="number"
                            step="0.01"
                            value={newProduct.price}
                            onChange={(e) =>
                              setNewProduct((prev) => ({
                                ...prev,
                                price: parseFloat(e.target.value),
                              }))
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="brand">Brand</Label>
                          <Input
                            id="brand"
                            value={newProduct.brand}
                            onChange={(e) =>
                              setNewProduct((prev) => ({
                                ...prev,
                                brand: e.target.value,
                              }))
                            }
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="category">Category</Label>
                          <Select
                            value={newProduct.category}
                            onValueChange={(value) =>
                              setNewProduct((prev) => ({
                                ...prev,
                                category: value,
                              }))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {CATEGORIES.map((category) => (
                                <SelectItem
                                  key={category.id}
                                  value={category.id}
                                >
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="partNumber">Part Number</Label>
                          <Input
                            id="partNumber"
                            value={newProduct.partNumber}
                            onChange={(e) =>
                              setNewProduct((prev) => ({
                                ...prev,
                                partNumber: e.target.value,
                              }))
                            }
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newProductImage">Image URL</Label>
                        <Input
                          id="newProductImage"
                          type="url"
                          value={newProductImage}
                          onChange={(e) => setNewProductImage(e.target.value)}
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="newProductInStock"
                          checked={newProductInStock}
                          onCheckedChange={(checked) =>
                            setNewProductInStock(Boolean(checked))
                          }
                        />
                        <Label htmlFor="newProductInStock">In Stock</Label>
                      </div>

                      <Button onClick={handleAddProduct} className="w-full">
                        Add Product
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <Card>
                <CardContent>
                  {userProducts.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>You have not listed any products yet.</p>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead>Brand</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {userProducts.map((product) => (
                          <TableRow key={product.id}>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <img
                                  src={product.image}
                                  alt={product.title}
                                  className="w-12 h-12 object-cover rounded"
                                  onError={(e) => {
                                    e.currentTarget.src =
                                      "https://placehold.co/400x400/cccccc/333333?text=No+Image";
                                  }}
                                />
                                <div>
                                  <p className="font-medium">{product.title}</p>
                                  <p className="text-sm text-muted-foreground">
                                    #{product.partNumber}
                                  </p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{product.brand}</TableCell>
                            <TableCell>Ksh.{product.price}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  product.inStock ? "default" : "destructive"
                                }
                              >
                                {product.inStock ? "In Stock" : "Out of Stock"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Account Tab (Customer Only) */}
          {user.role === "customer" && (
            <TabsContent value="account" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="mr-2 h-5 w-5" />
                    Account Information
                  </CardTitle>
                  <CardDescription>Manage your account details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" value={user.name} readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" value={user.email} readOnly />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This is a demo application. In a real app, you would be able
                    to edit these details.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
