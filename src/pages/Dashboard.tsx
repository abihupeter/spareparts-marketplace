import React, { useState } from 'react';
import { Package, Plus, Edit, Trash2, Eye, ShoppingBag, User, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { PRODUCTS, CATEGORIES } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/use-toast';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  
  // Mock data for orders (in real app, this would come from an API)
  const mockOrders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      total: 156.47,
      status: 'delivered',
      items: 3
    },
    {
      id: 'ORD-002',
      date: '2024-01-12',
      total: 89.99,
      status: 'shipped',
      items: 1
    },
    {
      id: 'ORD-003',
      date: '2024-01-08',
      total: 245.00,
      status: 'processing',
      items: 2
    }
  ];

  // Filter products by vendor if user is a vendor
  const userProducts = user?.role === 'vendor' ? PRODUCTS.filter(p => p.vendorId === user.id) : [];

  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    brand: '',
    partNumber: '',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500'
  });

  const handleAddProduct = () => {
    toast({
      title: "Product Added",
      description: `${newProduct.title} has been added to your inventory.`,
    });
    setIsAddProductOpen(false);
    setNewProduct({
      title: '',
      description: '',
      price: '',
      category: '',
      brand: '',
      partNumber: '',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500'
    });
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      delivered: "default",
      shipped: "secondary",
      processing: "outline",
      pending: "destructive"
    };
    return <Badge variant={variants[status] || "outline"}>{status}</Badge>;
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Please log in to access your dashboard</h1>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user.name}
          </h1>
          <p className="text-muted-foreground">
            {user.role === 'vendor' ? 'Manage your products and orders' : 'Track your orders and account'}
          </p>
        </div>

        <Tabs defaultValue={user.role === 'vendor' ? 'products' : 'orders'} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            {user.role === 'vendor' && <TabsTrigger value="products">My Products</TabsTrigger>}
            {user.role === 'customer' && <TabsTrigger value="account">Account</TabsTrigger>}
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                  <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockOrders.length}</div>
                  <p className="text-xs text-muted-foreground">
                    +2 from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${mockOrders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +12% from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Items Ordered</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {mockOrders.reduce((sum, order) => sum + order.items, 0)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Across all orders
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
                    {mockOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.items} items</TableCell>
                        <TableCell>${order.total.toFixed(2)}</TableCell>
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
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab (Vendor Only) */}
          {user.role === 'vendor' && (
            <TabsContent value="products" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">My Products</h2>
                  <p className="text-muted-foreground">Manage your product inventory</p>
                </div>
                
                <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
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
                          onChange={(e) => setNewProduct(prev => ({ ...prev, title: e.target.value }))}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={newProduct.description}
                          onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
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
                            onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="brand">Brand</Label>
                          <Input
                            id="brand"
                            value={newProduct.brand}
                            onChange={(e) => setNewProduct(prev => ({ ...prev, brand: e.target.value }))}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="category">Category</Label>
                          <Select
                            value={newProduct.category}
                            onValueChange={(value) => setNewProduct(prev => ({ ...prev, category: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {CATEGORIES.map(category => (
                                <SelectItem key={category.id} value={category.id}>
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
                            onChange={(e) => setNewProduct(prev => ({ ...prev, partNumber: e.target.value }))}
                          />
                        </div>
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
                              />
                              <div>
                                <p className="font-medium">{product.title}</p>
                                <p className="text-sm text-muted-foreground">#{product.partNumber}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{product.brand}</TableCell>
                          <TableCell>${product.price}</TableCell>
                          <TableCell>
                            <Badge variant={product.inStock ? "default" : "destructive"}>
                              {product.inStock ? 'In Stock' : 'Out of Stock'}
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
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Account Tab (Customer Only) */}
          {user.role === 'customer' && (
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
                    This is a demo application. In a real app, you would be able to edit these details.
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