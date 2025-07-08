import { User, Product, Category } from '../types';

export const USERS: User[] = [
  { 
    id: 1, 
    name: "Vendor One", 
    email: "vendor@example.com", 
    password: "vendor123", 
    role: "vendor" 
  },
  { 
    id: 2, 
    name: "abihu", 
    email: "customer@example.com", 
    password: "customer123", 
    role: "customer" 
  },
  { 
    id: 3, 
    name: "peter", 
    email: "peter@example.com", 
    password: "customer12345", 
    role: "customer" 
  },
];

export const CATEGORIES: Category[] = [
  {
    id: 'engine',
    name: 'Engine Parts',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400',
    description: 'Engine components and replacement parts'
  },
  {
    id: 'brake',
    name: 'Brake System',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    description: 'Brake pads, discs, and brake system components'
  },
  {
    id: 'filters',
    name: 'Filters',
    image: 'https://media.istockphoto.com/id/652660336/photo/auto-mechanic-service-and-repair.webp?a=1&b=1&s=612x612&w=0&k=20&c=TK7MS-oJwc87KKNpJB9NW4IUMmrypmdmrvl8GUcorKA=',
    description: 'Air, oil, and fuel filters for all vehicles'
  },
  {
    id: 'electrical',
    name: 'Electrical',
    image: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=400',
    description: 'Electrical components and wiring systems'
  },
  {
    id: 'suspension',
    name: 'Suspension',
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=400',
    description: 'Shock absorbers, springs, and suspension parts'
  },
  {
    id: 'transmission',
    name: 'Transmission',
    image: 'https://media.istockphoto.com/id/626235228/photo/spare-part-of-transmission-car-system.webp?a=1&b=1&s=612x612&w=0&k=20&c=5GE-1q9KBUNgMYaEGFTZM520cc5jNFDbgnGzQzFt6vc=',
    description: 'Transmission parts and drivetrain components'
  },
  {
    id: 'headlight',
    name: 'headlights',
    image: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGhlYWRsaWdodHN8ZW58MHx8MHx8fDA%3D',
    description: 'Transmission parts and drivetrain components'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Premium Engine Oil Filter",
    description: "High-quality oil filter designed for maximum engine protection and performance.",
    price: 29.99,
    image: "https://media.istockphoto.com/id/1074469344/photo/oil-filter-change.webp?a=1&b=1&s=612x612&w=0&k=20&c=RmxZir8cG68vpywj6G78igAfZ9qaIo2RdfvZaphB39A=",
    category: "filters",
    brand: "Toyota",
    partNumber: "90915-YZZD4",
    compatibility: ["Toyota Camry", "Toyota Corolla", "Toyota RAV4"],
    inStock: true,
    vendorId: 1,
    specs: {
      "Filter Type": "Spin-on",
      "Thread Size": "3/4-16 UNF",
      "Height": "96mm",
      "Diameter": "93mm"
    }
  },
  {
    id: 2,
    title: "Ceramic Brake Pads Set",
    description: "Premium ceramic brake pads offering superior stopping power and reduced noise.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
    category: "brake",
    brand: "Nissan",
    partNumber: "D1060-1AA0A",
    compatibility: ["Nissan Altima", "Nissan Sentra", "Nissan Maxima"],
    inStock: true,
    vendorId: 1,
    specs: {
      "Material": "Ceramic",
      "Position": "Front",
      "Pad Thickness": "12mm",
      "Wear Indicator": "Yes"
    }
  },
  {
    id: 3,
    title: "Air Intake Filter",
    description: "High-flow air filter for improved engine performance and fuel efficiency.",
    price: 24.99,
    image: "https://media.istockphoto.com/id/845260026/photo/air-filter-in-a-car.webp?a=1&b=1&s=612x612&w=0&k=20&c=Byw0WbwtWy1qvnSZjxHr0fYrVzW52D69aTp3TInt9jo=",
    category: "filters",
    brand: "Honda",
    partNumber: "17220-5AA-A00",
    compatibility: ["Honda Civic", "Honda Accord", "Honda CR-V"],
    inStock: true,
    vendorId: 1,
    specs: {
      "Filter Type": "Panel",
      "Material": "Paper",
      "Length": "290mm",
      "Width": "235mm"
    }
  },
  {
    id: 4,
    title: "Spark Plug Set (4-Pack)",
    description: "Premium iridium spark plugs for enhanced ignition and fuel economy.",
    price: 45.99,
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=500",
    category: "engine",
    brand: "Toyota",
    partNumber: "90919-01253",
    compatibility: ["Toyota Camry", "Toyota Corolla", "Honda Civic"],
    inStock: true,
    vendorId: 1,
    specs: {
      "Material": "Iridium",
      "Thread Size": "14mm",
      "Gap": "0.043",
      "Heat Range": "6"
    }
  },
  {
    id: 5,
    title: "Shock Absorber - Front",
    description: "Heavy-duty shock absorber for smooth ride and vehicle stability.",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=500",
    category: "suspension",
    brand: "Ford",
    partNumber: "F65Z-18124-A",
    compatibility: ["Ford F-150", "Ford Explorer", "Ford Expedition"],
    inStock: false,
    vendorId: 1,
    specs: {
      "Type": "Gas-Charged",
      "Position": "Front",
      "Compressed Length": "350mm",
      "Extended Length": "590mm"
    }
  },
  {
    id: 6,
    title: "Transmission Filter Kit",
    description: "Complete transmission filter kit with gasket for smooth shifting.",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1646687078585-3a243a532de9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dHJhbnNtaXNzaW9uJTIwZmlsdGVyJTIwa2l0fGVufDB8fDB8fHww",
    category: "transmission",
    brand: "Chevrolet",
    partNumber: "24208576",
    compatibility: ["Chevrolet Silverado", "GMC Sierra", "Cadillac Escalade"],
    inStock: true,
    vendorId: 1,
    specs: {
      "Filter Type": "Internal",
      "Includes": "Filter + Gasket",
      "Fluid Capacity": "4.5L",
      "Service Interval": "60,000 miles"
    }
  }
];

export const CAR_BRANDS = [
  "Toyota", "Honda", "Nissan", "Ford", "Chevrolet", "BMW", "Mercedes-Benz", 
  "Audi", "Volkswagen", "Hyundai", "Kia", "Mazda", "Subaru", "Lexus"
];