//AdminPanel2.tsx;
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Edit, Save, Trash2, Loader2 } from "lucide-react";
import { useProducts } from "@/contexts/ProductContext";
import { useToast } from "@/hooks/use-toast";
import { Order, User } from "../types";

const AdminPanel = () => {
  const [accessCode, setAccessCode] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const correctCode = "987654321";

  const { products, isLoading, error, updateProductPrice } = useProducts();
  const { toast } = useToast();

  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [usersLoading, setUsersLoading] = useState(false);

  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [newPrice, setNewPrice] = useState<number | string>("");

  const navigate = useNavigate();

  // Mock fetching for orders and users as per request
  const fetchOrders = async () => {
    setOrdersLoading(true);
    // Simulate API call
    setTimeout(() => {
      setOrders([
        {
          id: "o1",
          customerId: "u1",
          total: 65.5,
          status: "pending",
          createdAt: { seconds: Date.now() / 1000, nanoseconds: 0 },
          items: [
            {
              productId: "p1",
              title: "Product 1",
              price: 10,
              quantity: 1,
              image: "",
            },
          ],
          shippingAddress: {
            name: "",
            phone: "",
            address: "",
            city: "",
            state: "",
            zipCode: "",
            notes: "",
          },
        },
        {
          id: "o2",
          customerId: "u2",
          total: 25.0,
          status: "shipped",
          createdAt: { seconds: Date.now() / 1000, nanoseconds: 0 },
          items: [
            {
              productId: "p2",
              title: "Product 2",
              price: 10,
              quantity: 1,
              image: "",
            },
          ],
          shippingAddress: {
            name: "",
            phone: "",
            address: "",
            city: "",
            state: "",
            zipCode: "",
            notes: "",
          },
        },
      ]);
      setOrdersLoading(false);
    }, 1000);
  };

  const fetchUsers = async () => {
    setUsersLoading(true);
    // Simulate API call
    setTimeout(() => {
      setUsers([
        {
          id: "u1",
          name: "John Doe",
          email: "john.doe@example.com",
          role: "customer",
        },
        {
          id: "u2",
          name: "Jane Smith",
          email: "jane.smith@example.com",
          role: "vendor",
        },
      ]);
      setUsersLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (isAuthorized) {
      fetchOrders();
      fetchUsers();
    }
  }, [isAuthorized]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (accessCode === correctCode) {
      setIsAuthorized(true);
    } else {
      alert("Incorrect access code.");
    }
  };

  const handleEditPrice = (productId, currentPrice) => {
    setEditingPriceId(productId);
    setNewPrice(currentPrice);
  };

  const handleSavePrice = async (productId) => {
    const success = await updateProductPrice(productId, Number(newPrice));
    if (success) {
      toast({
        title: "Success",
        description: "Product price updated successfully.",
      });
      setEditingPriceId(null);
    } else {
      toast({
        title: "Failed to Update",
        description: "Could not update product price.",
        variant: "destructive",
      });
    }
  };

  const renderProductsTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Products</h2>
        <Button onClick={() => navigate("/dashboard/sell")}>
          Add New Product
        </Button>
      </div>
      <p>Here, you can view and edit product details from the database.</p>
      <div className="border rounded-md">
        {isLoading ? (
          <div className="flex justify-center items-center p-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : error ? (
          <div className="p-8 text-center text-destructive">
            <p>Error loading products: {error}</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>In Stock</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.title}</TableCell>
                  <TableCell>
                    {editingPriceId === product.id ? (
                      <Input
                        type="number"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        onBlur={() => setEditingPriceId(null)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleSavePrice(product.id);
                        }}
                      />
                    ) : (
                      `Ksh. ${product.price.toFixed(2)}`
                    )}
                  </TableCell>
                  <TableCell>{product.inStock ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    {editingPriceId === product.id ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSavePrice(product.id)}
                      >
                        <Save className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          handleEditPrice(product.id, product.price)
                        }
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" className="text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );

  const renderOrdersTab = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Orders</h2>
      <p>You can edit and manage existing orders here.</p>
      <div className="border rounded-md">
        {ordersLoading ? (
          <div className="flex justify-center items-center p-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customerId}</TableCell>
                  <TableCell>Ksh. {order.total.toFixed(2)}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );

  const renderUsersTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Users</h2>
        <Button>Add New User</Button>
      </div>
      <p>
        This section allows you to manage users, including adding and deleting
        them.
      </p>
      <div className="border rounded-md">
        {usersLoading ? (
          <div className="flex justify-center items-center p-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );

  if (!isAuthorized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Access</CardTitle>
            <CardDescription>
              Enter the access code to continue.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="access-code">Access Code</Label>
                <Input
                  id="access-code"
                  type="password"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  placeholder="Enter code"
                />
              </div>
              <Button type="submit" className="w-full">
                Authenticate
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <Tabs defaultValue="products" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        <TabsContent value="products" className="mt-6">
          {renderProductsTab()}
        </TabsContent>
        <TabsContent value="orders" className="mt-6">
          {renderOrdersTab()}
        </TabsContent>
        <TabsContent value="users" className="mt-6">
          {renderUsersTab()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;
