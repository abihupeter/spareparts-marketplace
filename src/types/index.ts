export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'vendor' | 'customer';
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  partNumber: string;
  compatibility: string[];
  inStock: boolean;
  vendorId: number;
  specs?: Record<string, string>;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: number;
  customerId: number;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
  };
}

export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
}