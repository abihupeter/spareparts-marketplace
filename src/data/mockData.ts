// src/data/mockData.ts
import { User, Product, Category } from "../types";

export const USERS: User[] = [
  {
    id: "1",
    name: "Vendor One",
    email: "vendor@example.com",
    password: "vendor123",
    role: "vendor",
  },
  {
    id: "2",
    name: "abihu",
    email: "customer@example.com",
    password: "customer@example.com", // Changed to match Firebase Auth
    role: "customer",
  },
  {
    id: "3",
    name: "peter",
    email: "peter@example.com",
    password: "customer12345",
    role: "customer",
  },
];

export const CATEGORIES: Category[] = [
  {
    id: "engine",
    name: "Engine Parts",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400",
    description: "Engine components and replacement parts",
  },
  {
    id: "brake",
    name: "Brake System",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    description: "Brake pads, discs, and brake system components",
  },
  {
    id: "filters",
    name: "Filters",
    image:
      "https://media.istockphoto.com/id/652660336/photo/auto-mechanic-service-and-repair.webp?a=1&b=1&s=612x612&w=0&k=20&c=TK7MS-oJwc87KKNpJB9NW4IUMmrypmdmrvl8GUcorKA=",
    description: "Air, oil, and fuel filters for all vehicles",
  },
  {
    id: "electrical",
    name: "Electrical",
    image: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=400",
    description: "Electrical components and wiring systems",
  },
  {
    id: "suspension",
    name: "Suspension",
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=400",
    description: "Shock absorbers, springs, and suspension parts",
  },
  {
    id: "transmission",
    name: "Transmission",
    image:
      "https://media.istockphoto.com/id/626235228/photo/spare-part-of-transmission-car-system.webp?a=1&b=1&s=612x612&w=0&k=20&c=5GE-1q9KBUNgMYaEGFTZM520cc5jNFDbgnGzQzFt6vc=",
    description: "Transmission parts and drivetrain components",
  },
  {
    id: "headlights",
    name: "headlights",
    image:
      "https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGhlYWRsaWdodHN8ZW58MHx8MHx8fDA%3D",
    description: "Transmission parts and drivetrain components",
  },
  {
    id: "interior",
    name: "interior",
    image:
      "https://images.unsplash.com/photo-1549064233-945d7063292f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyJTIwaW50ZXJpb3J8ZW58MHx8MHx8fDA%3D",
    description: "inside of the car",
  },
];

// PRODUCTS and addProduct are removed as data will now come from Firestore
// export let PRODUCTS: Product[] = [ ... ];
// export const addProduct = (newProduct: Product) => { ... };

export const CAR_BRANDS = [
  "Toyota",
  "Honda",
  "Nissan",
  "Ford",
  "Chevrolet",
  "BMW",
  "Mercedes-Benz",
  "Audi",
  "Volkswagen",
  "Hyundai",
  "Kia",
  "Mazda",
  "Subaru",
  "Lexus",
];
