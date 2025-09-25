//ProductContext2.tsx;
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Product, Order, User } from "../types";
import { getAuth } from "firebase/auth";
import { toast } from "../hooks/use-toast";

interface ProductContextType {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  addNewProduct: (
    productData: Omit<Product, "id" | "vendorId">
  ) => Promise<boolean>;
  updateProductPrice: (productId: string, newPrice: number) => Promise<boolean>;
}

interface OrderContextType {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
  fetchOrders: () => Promise<void>;
  updateOrderStatus: (orderId: string, newStatus: string) => Promise<boolean>;
}

interface UserContextType {
  users: User[];
  isLoading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  deleteUser: (userId: string) => Promise<boolean>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);
const OrderContext = createContext<OrderContextType | undefined>(undefined);
const UserContext = createContext<UserContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrders must be used within an OrderProvider");
  }
  return context;
};

export const useUsers = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUsers must be used within a UserProvider");
  }
  return context;
};

interface ProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const auth = getAuth();
  const API_BASE_URL = "http://localhost:5000/api";

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Product[] = await response.json();
      setProducts(data);
    } catch (err: any) {
      console.error("Failed to fetch products:", err);
      setError(err.message || "Failed to fetch products.");
      toast({
        title: "Error",
        description: err.message || "Failed to fetch products.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addNewProduct = async (
    productData: Omit<Product, "id" | "vendorId">
  ): Promise<boolean> => {
    try {
      const user = auth.currentUser;
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "You must be logged in to add products.",
          variant: "destructive",
        });
        return false;
      }
      const idToken = await user.getIdToken();
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }
      await fetchProducts();
      return true;
    } catch (err: any) {
      console.error("Failed to add product:", err);
      setError(err.message || "Failed to add product.");
      toast({
        title: "Error",
        description: err.message || "Failed to add product.",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateProductPrice = async (
    productId: string,
    newPrice: number
  ): Promise<boolean> => {
    try {
      const user = auth.currentUser;
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "You must be logged in to update products.",
          variant: "destructive",
        });
        return false;
      }
      const idToken = await user.getIdToken();
      const response = await fetch(
        `${API_BASE_URL}/products/${productId}/price`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({ price: newPrice }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }
      await fetchProducts();
      return true;
    } catch (err: any) {
      console.error("Failed to update product price:", err);
      setError(err.message || "Failed to update product price.");
      toast({
        title: "Error",
        description: err.message || "Failed to update product price.",
        variant: "destructive",
      });
      return false;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const value = {
    products,
    isLoading,
    error,
    fetchProducts,
    addNewProduct,
    updateProductPrice,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
