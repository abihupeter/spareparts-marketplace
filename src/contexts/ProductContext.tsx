// src/contexts/ProductContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Product } from "../types";
import { getAuth } from "firebase/auth"; // Import getAuth from firebase/auth
import { toast } from "../hooks/use-toast"; // Assuming you have a useToast hook

interface ProductContextType {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  addNewProduct: (
    productData: Omit<Product, "id" | "vendorId">
  ) => Promise<boolean>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get Firebase Auth instance
  const auth = getAuth();

  const API_BASE_URL = "http://localhost:5000/api"; // Ensure this matches your backend URL

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

      const idToken = await user.getIdToken(); // Get the ID token for authentication

      const response = await fetch(`${API_BASE_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`, // Send the ID token
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      // After successful addition, refetch products to update the list
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

  useEffect(() => {
    fetchProducts();
  }, []); // Fetch products on initial mount

  const value = { products, isLoading, error, fetchProducts, addNewProduct };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
