export interface User {
  id: string; // Changed to string for Firebase UID
  name: string;
  email: string;
  password?: string; // Optional for security, not always sent from backend
  role: "vendor" | "customer";
  createdAt?: {
    seconds: number;
    nanoseconds: number;
  }; // Firestore Timestamp
}

export interface Product {
  id: string; // Changed to string for Firestore document ID
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  partNumber: string;
  compatibility: string[];
  inStock: boolean;
  vendorId: string; // Changed to string for Firebase UID
  specs?: Record<string, string>;
  createdAt?: {
    seconds: number;
    nanoseconds: number;
  }; // Firestore Timestamp
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string; // Changed to string for Firestore document ID
  customerId: string; // Changed to string for Firebase UID
  items: Array<{
    productId: string; // Changed to string
    title: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered";
  createdAt: {
    seconds: number;
    nanoseconds: number;
  }; // Firestore Timestamp
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    notes?: string;
  };
  paymentMethod?: string; // Add payment method
  mpesaNumber?: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCVC?: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
}
