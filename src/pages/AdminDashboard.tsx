// src/pages/AdminDashboard.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  Loader2,
  Users,
  Package,
  PlusCircle,
  Trash2,
  Edit,
  X,
} from "lucide-react";
import { toast } from "../hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Checkbox } from "../components/ui/checkbox";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { CATEGORIES, CAR_BRANDS } from "../data/mockData";
import { Product } from "../types";
import { getAuth } from "firebase/auth"; // Import getAuth for direct Firebase Auth access

const API_BASE_URL = "http://localhost:5000/api";

// Admin-specific component for managing users
const UserManagement: React.FC = () => {
  const { user } = useAuth(); // Our custom User interface from AuthContext
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [errorUsers, setErrorUsers] = useState<string | null>(null);
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  const [newUserData, setNewUserData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "customer",
    isAdmin: false,
  });
  const [addingUser, setAddingUser] = useState(false);

  const fetchUsers = async () => {
    setLoadingUsers(true);
    setErrorUsers(null);
    try {
      const auth = getAuth(); // Get Firebase Auth instance
      const idToken = await auth.currentUser?.getIdToken(); // Get token from Firebase Auth currentUser

      if (!idToken) {
        throw new Error("User not authenticated. Please log in.");
      }

      const response = await fetch(`${API_BASE_URL}/admin/users`, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch users.");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error: any) {
      console.error("Error fetching users:", error);
      setErrorUsers(error.message);
      toast({
        title: "Error",
        description: `Failed to load users: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    if (user?.id === userId) {
      toast({
        title: "Error",
        description: "You cannot delete your own admin account.",
        variant: "destructive",
      });
      return;
    }

    setLoadingUsers(true);
    try {
      const auth = getAuth(); // Get Firebase Auth instance
      const idToken = await auth.currentUser?.getIdToken(); // Get token from Firebase Auth currentUser

      if (!idToken) {
        throw new Error("User not authenticated. Please log in.");
      }

      const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete user.");
      }
      toast({
        title: "Success",
        description: "User deleted successfully.",
      });
      fetchUsers(); // Refresh the list
    } catch (error: any) {
      console.error("Error deleting user:", error);
      toast({
        title: "Error",
        description: `Failed to delete user: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleNewUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewUserData((prev) => ({ ...prev, [id]: value }));
  };

  const handleNewUserRoleChange = (value: string) => {
    setNewUserData((prev) => ({
      ...prev,
      role: value as "vendor" | "customer",
    }));
  };

  const handleNewUserIsAdminChange = (checked: boolean) => {
    setNewUserData((prev) => ({ ...prev, isAdmin: Boolean(checked) }));
  };

  const handleAddNewUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddingUser(true);
    try {
      const auth = getAuth(); // Get Firebase Auth instance
      const idToken = await auth.currentUser?.getIdToken(); // Get token from Firebase Auth currentUser

      if (!idToken) {
        throw new Error("User not authenticated. Please log in.");
      }

      const response = await fetch(`${API_BASE_URL}/admin/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(newUserData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add user.");
      }

      toast({
        title: "Success",
        description: "New user added successfully!",
      });
      setShowAddUserDialog(false);
      setNewUserData({
        fullName: "",
        email: "",
        password: "",
        role: "customer",
        isAdmin: false,
      }); // Reset form
      fetchUsers(); // Refresh user list
    } catch (error: any) {
      console.error("Error adding new user:", error);
      toast({
        title: "Error",
        description: `Failed to add user: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setAddingUser(false);
    }
  };

  useEffect(() => {
    if (user && user.isAdmin) {
      fetchUsers();
    }
  }, [user]);

  if (loadingUsers)
    return <Loader2 className="h-8 w-8 animate-spin mx-auto my-4" />;
  if (errorUsers)
    return <p className="text-red-500 text-center">{errorUsers}</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" /> User Management
          <Button
            size="sm"
            className="ml-auto"
            onClick={() => setShowAddUserDialog(true)}
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add New User
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Role
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Admin
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
                  >
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((u: any) => (
                  <tr key={u.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {u.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {u.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {u.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {u.isAdmin ? "Yes" : "No"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDeleteUser(u.id)}
                        disabled={u.id === user?.id}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>

      {/* Add New User Dialog */}
      <Dialog open={showAddUserDialog} onOpenChange={setShowAddUserDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddNewUserSubmit} className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={newUserData.fullName}
                onChange={handleNewUserChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={newUserData.email}
                onChange={handleNewUserChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={newUserData.password}
                onChange={handleNewUserChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select
                value={newUserData.role}
                onValueChange={handleNewUserRoleChange}
              >
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer">Customer</SelectItem>
                  <SelectItem value="vendor">Vendor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isAdmin"
                checked={newUserData.isAdmin}
                onCheckedChange={handleNewUserIsAdminChange}
              />
              <Label htmlFor="isAdmin">Is Admin?</Label>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={addingUser}>
                {addingUser ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding User...
                  </>
                ) : (
                  "Add User"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

// Add Product Dialog Component
interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProductAdded: () => void;
  currentAdminUser: any; // The current logged-in admin user object
}

const AddProductDialog: React.FC<AddProductDialogProps> = ({
  open,
  onOpenChange,
  onProductAdded,
  currentAdminUser,
}) => {
  const [formData, setFormData] = useState<Omit<Product, "id" | "createdAt">>({
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
    vendorId: currentAdminUser?.id || "", // Default to current admin's ID
  });
  const [newCompatibility, setNewCompatibility] = useState("");
  const [newSpecKey, setNewSpecKey] = useState("");
  const [newSpecValue, setNewSpecValue] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Update vendorId if currentAdminUser changes (e.g., after initial load)
    setFormData((prev) => ({ ...prev, vendorId: currentAdminUser?.id || "" }));
  }, [currentAdminUser]);

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

    if (
      !formData.title ||
      !formData.description ||
      formData.price <= 0 ||
      !formData.image ||
      !formData.category ||
      !formData.brand ||
      !formData.partNumber ||
      !formData.vendorId
    ) {
      toast({
        title: "Validation Error",
        description:
          "Please fill in all required fields (including Vendor ID).",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      const auth = getAuth(); // Get Firebase Auth instance
      const idToken = await auth.currentUser?.getIdToken(); // Get token from Firebase Auth currentUser

      if (!idToken) {
        throw new Error("User not authenticated. Please log in.");
      }

      const response = await fetch(`${API_BASE_URL}/admin/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add product.");
      }

      toast({
        title: "Success",
        description: "Product added successfully by admin!",
      });
      onOpenChange(false); // Close dialog
      onProductAdded(); // Notify parent to refresh list
      // Reset form data
      setFormData({
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
        vendorId: currentAdminUser?.id || "",
      });
    } catch (error: any) {
      console.error("Error adding product by admin:", error);
      toast({
        title: "Error",
        description: `Failed to add product: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
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
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
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

          <div className="grid grid-cols-2 gap-4">
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

          <div className="space-y-2">
            <Label htmlFor="vendorId">Vendor ID</Label>
            <Input
              id="vendorId"
              value={formData.vendorId}
              onChange={handleChange}
              required
              placeholder="Enter vendor's Firebase UID"
            />
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

          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding Product...
                </>
              ) : (
                "Add Product"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Edit Product Dialog Component
interface EditProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProductUpdated: () => void;
  productToEdit: Product | null;
  currentAdminUser: any;
}

const EditProductDialog: React.FC<EditProductDialogProps> = ({
  open,
  onOpenChange,
  onProductUpdated,
  productToEdit,
  currentAdminUser,
}) => {
  const [formData, setFormData] = useState<Omit<Product, "id" | "createdAt">>(
    productToEdit || {
      // Initialize with productToEdit or empty structure
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
      vendorId: "",
    }
  );
  const [newCompatibility, setNewCompatibility] = useState("");
  const [newSpecKey, setNewSpecKey] = useState("");
  const [newSpecValue, setNewSpecValue] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        ...productToEdit,
        // Ensure price is a number, not string if it comes from Firestore
        price:
          typeof productToEdit.price === "number"
            ? productToEdit.price
            : parseFloat(productToEdit.price),
        // Ensure specs and compatibility are correctly initialized if they were undefined
        specs: productToEdit.specs || {},
        compatibility: productToEdit.compatibility || [],
        // createdAt and id are not part of the form data
      });
    }
  }, [productToEdit]);

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

    if (!productToEdit?.id) {
      toast({
        title: "Error",
        description: "No product selected for editing.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    if (
      !formData.title ||
      !formData.description ||
      formData.price <= 0 ||
      !formData.image ||
      !formData.category ||
      !formData.brand ||
      !formData.partNumber ||
      !formData.vendorId
    ) {
      toast({
        title: "Validation Error",
        description:
          "Please fill in all required fields (including Vendor ID).",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      const auth = getAuth(); // Get Firebase Auth instance
      const idToken = await auth.currentUser?.getIdToken(); // Get token from Firebase Auth currentUser

      if (!idToken) {
        throw new Error("User not authenticated. Please log in.");
      }

      const response = await fetch(
        `${API_BASE_URL}/admin/products/${productToEdit.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update product.");
      }

      toast({
        title: "Success",
        description: "Product updated successfully by admin!",
      });
      onOpenChange(false); // Close dialog
      onProductUpdated(); // Notify parent to refresh list
    } catch (error: any) {
      console.error("Error updating product by admin:", error);
      toast({
        title: "Error",
        description: `Failed to update product: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Product: {productToEdit?.title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
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
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
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

          <div className="grid grid-cols-2 gap-4">
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

          <div className="space-y-2">
            <Label htmlFor="vendorId">Vendor ID</Label>
            <Input
              id="vendorId"
              value={formData.vendorId}
              onChange={handleChange}
              required
              placeholder="Enter vendor's Firebase UID"
            />
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

          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating Product...
                </>
              ) : (
                "Update Product"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Admin-specific component for managing products
const ProductManagement: React.FC = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [errorProducts, setErrorProducts] = useState<string | null>(null);
  const [showAddProductDialog, setShowAddProductDialog] = useState(false);
  const [showEditProductDialog, setShowEditProductDialog] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  const fetchProducts = async () => {
    setLoadingProducts(true);
    setErrorProducts(null);
    try {
      const auth = getAuth(); // Get Firebase Auth instance
      const idToken = await auth.currentUser?.getIdToken(); // Get token from Firebase Auth currentUser

      if (!idToken) {
        throw new Error("User not authenticated. Please log in.");
      }

      const response = await fetch(`${API_BASE_URL}/admin/products`, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch products.");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error: any) {
      console.error("Error fetching products:", error);
      setErrorProducts(error.message);
      toast({
        title: "Error",
        description: `Failed to load products: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    setLoadingProducts(true);
    try {
      const auth = getAuth(); // Get Firebase Auth instance
      const idToken = await auth.currentUser?.getIdToken(); // Get token from Firebase Auth currentUser

      if (!idToken) {
        throw new Error("User not authenticated. Please log in.");
      }

      const response = await fetch(
        `${API_BASE_URL}/admin/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete product.");
      }
      toast({
        title: "Success",
        description: "Product deleted successfully.",
      });
      fetchProducts(); // Refresh the list
    } catch (error: any) {
      console.error("Error deleting product:", error);
      toast({
        title: "Error",
        description: `Failed to delete product: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleEditProduct = (product: Product) => {
    setProductToEdit(product);
    setShowEditProductDialog(true);
  };

  useEffect(() => {
    if (user && user.isAdmin) {
      fetchProducts();
    }
  }, [user]);

  if (loadingProducts)
    return <Loader2 className="h-8 w-8 animate-spin mx-auto my-4" />;
  if (errorProducts)
    return <p className="text-red-500 text-center">{errorProducts}</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" /> Product Management
          <Button
            size="sm"
            className="ml-auto"
            onClick={() => setShowAddProductDialog(true)}
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Product
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Vendor ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  In Stock
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
                  >
                    No products found.
                  </td>
                </tr>
              ) : (
                products.map(
                  (
                    p: Product // Use Product type here
                  ) => (
                    <tr key={p.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {p.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {p.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {p.vendorId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {p.inStock ? "Yes" : "No"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-900 mr-2"
                          onClick={() => handleEditProduct(p)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleDeleteProduct(p.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>
        </div>
      </CardContent>

      {/* Add New Product Dialog */}
      <AddProductDialog
        open={showAddProductDialog}
        onOpenChange={setShowAddProductDialog}
        onProductAdded={fetchProducts} // Refresh products list after adding
        currentAdminUser={user}
      />

      {/* Edit Product Dialog */}
      {productToEdit && (
        <EditProductDialog
          open={showEditProductDialog}
          onOpenChange={setShowEditProductDialog}
          onProductUpdated={fetchProducts} // Refresh products list after updating
          productToEdit={productToEdit}
          currentAdminUser={user}
        />
      )}
    </Card>
  );
};

const AdminDashboard: React.FC = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && (!user || !user.isAdmin)) {
      toast({
        title: "Access Denied",
        description:
          "You must be logged in as an administrator to view this page.",
        variant: "destructive",
      });
      navigate("/login"); // Redirect to login or a different page
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="ml-2 text-lg">Loading admin data...</p>
      </div>
    );
  }

  // Only render content if user is an admin
  if (!user || !user.isAdmin) {
    return null; // Or a simple "Access Denied" message
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UserManagement />
          <ProductManagement />
          {/* Future sections for Orders, Analytics etc. */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
