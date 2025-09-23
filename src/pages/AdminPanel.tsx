// src/pages/AdminPanel.tsx
import React, { useState } from "react";
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

const AdminPanel = () => {
  const [accessCode, setAccessCode] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const correctCode = "987654321";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode === correctCode) {
      setIsAuthorized(true);
    } else {
      alert("Incorrect access code.");
    }
  };

  const renderProductsTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Products</h2>
        <Button>Add New Product</Button>
      </div>
      <p>
        Here, you can view, edit, and delete product details from the database.
      </p>
      <div className="border rounded-md p-4">
        <h3 className="text-lg font-medium">Product List</h3>
        <p className="text-sm text-muted-foreground">
          (Placeholder for product table with edit/delete actions)
        </p>
      </div>
    </div>
  );

  const renderOrdersTab = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Orders</h2>
      <p>You can edit and manage existing orders here.</p>
      <div className="border rounded-md p-4">
        <h3 className="text-lg font-medium">Order List</h3>
        <p className="text-sm text-muted-foreground">
          (Placeholder for orders table with edit actions)
        </p>
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
      <div className="border rounded-md p-4">
        <h3 className="text-lg font-medium">User List</h3>
        <p className="text-sm text-muted-foreground">
          (Placeholder for user table with delete/add actions)
        </p>
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
