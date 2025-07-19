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
    id: 'headlights',
    name: 'headlights',
    image: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGhlYWRsaWdodHN8ZW58MHx8MHx8fDA%3D',
    description: 'Transmission parts and drivetrain components'
  },
  {
    id: 'interior',
    name: 'interior',
    image: 'https://images.unsplash.com/photo-1549064233-945d7063292f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyJTIwaW50ZXJpb3J8ZW58MHx8MHx8fDA%3D',
    description: 'inside of the car'
  }
];

export let PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Premium Engine Oil Filter",
    description: "High-quality oil filter designed for maximum engine protection and performance.",
    price: 290.99,
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
    price: 890.99,
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
    price: 240.99,
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
    price: 450.99,
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
    price: 1290.99,
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
    price: 390.99,
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
  },
  {
    id: 7,
    title: "led headlights",
    description: "long distance view headlights. Fog resistant.",
    price: 1390.99,
    image: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGhlYWRsaWdodHN8ZW58MHx8MHx8fDA%3D",
    category: "headlights",
    brand: "Mercedes-Benz",
    partNumber: "F65Z-18124-A",
    compatibility: ["Mercedes-Benz c-180", "Mercedes-Benz e-250", "Mercedes-Benz gle 450"],
    inStock: true,
    vendorId: 1,
    specs: {
      "Type": "Gas-Charged",
      "Position": "Front",
      "Compressed Length": "350mm",
      "Extended Length": "590mm"
    }
  },
  {
    id: 8,
    title: "Radiator Coolant Reservoir",
    description: "High-quality reservoir tank for effective coolant management.",
    price: 590.99,
    image: "https://media.istockphoto.com/id/1167596457/photo/antifreeze-coolant-recovery-and-expansion-tank-for-radiator-cooling-system-with-low-level-of.webp?a=1&b=1&s=612x612&w=0&k=20&c=SXF7ff60IJtNB9DxYaZYQzCnWbeis2cgj0SZZBB-N70=",
    category: "engine",
    brand: "Nissan",
    partNumber: "25430-2G100",
    compatibility: ["Hyundai Elantra", "Hyundai Tucson", "Hyundai Sonata"],
    inStock: true,
    vendorId: 1,
    specs: {
      "Material": "Plastic",
      "Capacity": "1.5L",
      "Includes Cap": "Yes",
      "Position": "Engine Bay"
    }
  },
  {
    id: 9,
    title: "All-Weather Wiper Blades",
    description: "Durable wiper blades designed for all weather conditions.",
    price: 190.99,
    image: "https://media.istockphoto.com/id/2180435387/photo/windshield-wipers-in-action-on-a-wet-windshield.webp?a=1&b=1&s=612x612&w=0&k=20&c=lFPwqkkAq1jkkgIeJN7yaFcflvlqKrHqjs23rISYtdo=",
    category: "interior",
    brand: "Honda",
    partNumber: "A282H",
    compatibility: ["Toyota Corolla", "Honda Accord", "Mazda 3"],
    inStock: true,
    vendorId: 1,
    specs: {
      "Length": "28 inch",
      "Material": "Rubber + Steel",
      "Type": "Beam Blade",
      "Weather Resistant": "Yes"
    }
  },
  {
    id: 10,
    title: "Fuel Pump Assembly",
    description: "Reliable in-tank fuel pump for consistent fuel delivery.",
    price: 1490.99,
    image: "https://media.istockphoto.com/id/1136202339/photo/fuel-pump-for-car.webp?a=1&b=1&s=612x612&w=0&k=20&c=BZ-SIwIpTMyO6S3D7QBixBKrF-9BJ63lNM5aNVk4U7s=",
    category: "engine",
    brand: "BMW",
    partNumber: "31110-D4000",
    compatibility: ["Kia Sportage", "Kia Seltos", "Hyundai Kona"],
    inStock: false,
    vendorId: 1,
    specs: {
      "Fuel Type": "Gasoline",
      "Pump Type": "Electric",
      "Pressure": "58 PSI",
      "Flow Rate": "100 LPH"
    }
  },
  {
    id: 11,
    title: "Drive Belt Kit",
    description: "Complete serpentine belt kit with tensioner and pulleys.",
    price: 990.99,
    image: "https://media.istockphoto.com/id/2179774594/photo/tensioner-roller-and-poly-v-belt-in-hands-of-car-mechanic-concept-of-auto-parts-replacement.webp?a=1&b=1&s=612x612&w=0&k=20&c=SJQ4x9_4S1evyYWdgtU9zchMR5uerDL88-nJiKy-NFM=",
    category: "engine",
    brand: "Audi",
    partNumber: "23770-AA020",
    compatibility: ["Forester", "Subaru Outback", "Subaru Impreza"],
    inStock: true,
    vendorId: 1,
    specs: {
      "Belt Material": "EPDM",
      "Includes": "Belt + Tensioner + Idler",
      "Length": "2150mm",
      "Application": "Alternator/AC/Power Steering"
    }
  },
  {
    id: 12,
    title: "Engine Mount",
    description: "Heavy-duty engine mount for reduced vibration and noise.",
    price: 750.99,
    image: "https://media.istockphoto.com/id/1192710569/photo/engine-mount-replacement.webp?a=1&b=1&s=612x612&w=0&k=20&c=HRClQzZ9d6tBqatusqmQolBq0Wb2r48WkHnK4UeTgls=",
    category: "engine",
    brand: "Mercedes-Benz",
    partNumber: "BBM4-39-060",
    compatibility: ["Mazda CX-5", "Mazda 6", "Mazda 3"],
    inStock: true,
    vendorId: 1,
    specs: {
      "Material": "Steel + Rubber",
      "Mount Position": "Front Right",
      "Weight": "2.5kg",
      "Vibration Dampening": "Yes"
    }
  },
  {
    id: 13,
    title: "Alternator - 120 Amp",
    description: "High-output alternator for reliable charging.",
    price: 1790.99,
    image: "https://media.istockphoto.com/id/2191448944/photo/mechanic-is-repairing-and-replacing-a-battery-charger-at-car-service-center-mechanic-man.webp?a=1&b=1&s=612x612&w=0&k=20&c=Z3d99GxV1r9-95TtQl2LNa7reEW3JvSdxi8andMxnf0=",
    category: "electrical",
    brand: "Toyota",
    partNumber: "104210-6210",
    compatibility: ["Toyota Hilux", "Toyota Prado", "Toyota Tacoma"],
    inStock: true,
    vendorId: 1,
    specs: {
      "Voltage": "12V",
      "Amperage": "120A",
      "Pulley Type": "6 Groove",
      "Mounting": "Direct Fit"
    }
  },
  {
    id: 14,
    title: "Cabin Air Filter",
    description: "Anti-bacterial cabin filter for improved in-car air quality.",
    price: 190.49,
    image: "https://media.istockphoto.com/id/1270823213/photo/replacement-of-cabin-pollen-air-filter-for-a-car.webp?a=1&b=1&s=612x612&w=0&k=20&c=Ngs-zexTMYLiB-OipR8xydDDc6oHBsOnyOjcu2bS_Bg=",
    category: "filters",
    brand: "Mercedes-Benz",
    partNumber: "CF10709",
    compatibility: ["Honda Accord", "Toyota Camry", "Nissan Altima"],
    inStock: true,
    vendorId: 1,
    specs: {
      "Filter Media": "Activated Carbon",
      "Filter Type": "Rectangular",
      "Length": "235mm",
      "Width": "200mm"
    }
  },
  {
    id: 15,
    title: "Ignition Coil Set",
    description: "Set of 4 ignition coils for consistent spark and ignition performance.",
    price: 890.99,
    image: "https://media.istockphoto.com/id/2170518731/photo/turbocharged-internal-combustion-engine.webp?a=1&b=1&s=612x612&w=0&k=20&c=iDQqrCDelwgsj5_yFlNI4MV1gxGnFezsQHNIARRFl-0=",
    category: "engine",
    brand: "Ford",
    partNumber: "U5055",
    compatibility: ["Ford Focus", "Ford Escape", "Mazda Tribute"],
    inStock: false,
    vendorId: 1,
    specs: {
      "Coil Type": "Pencil",
      "Voltage": "12V",
      "Resistance": "0.5 ohms",
      "Pack": "4 pcs"
    }
  },
  {
    id: 16,
    title: "Wheel Bearing Hub Assembly",
    description: "Durable hub assembly with pre-installed bearing for easy installation.",
    price: 1190.99,
    image: "https://images.unsplash.com/photo-1609682932589-5ef2bd85980d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fFdoZWVsJTIwQmVhcmluZyUyMEh1YiUyMEFzc2VtYmx5fGVufDB8fDB8fHww",
    category: "suspension",
    brand: "Nissan",
    partNumber: "BR930473",
    compatibility: ["Chevrolet Malibu", "Buick Regal", "GMC Terrain"],
    inStock: true,
    vendorId: 1,
    specs: {
      "Bolt Pattern": "5-Lug",
      "ABS Sensor": "Included",
      "Position": "Front",
      "Material": "Steel"
    }
  },
  {
    id: 17,
    title: "Battery Terminal Set",
    description: "Corrosion-resistant battery terminal connectors for improved contact.",
    price: 140.99,
    image: "https://media.istockphoto.com/id/1346255736/photo/car-battery-measurement-digital-measuring-device-testing-the-car-battery.webp?a=1&b=1&s=612x612&w=0&k=20&c=_gHG7WvhwmxrM4j1B83_R3ImAG2srR6ZksfpGSo8fXI=",
    category: "electrical",
    brand: "BMW",
    partNumber: "BC06",
    compatibility: ["Universal Fit"],
    inStock: true,
    vendorId: 1,
    specs: {
      "Material": "Zinc Alloy",
      "Polarity": "Positive + Negative",
      "Includes": "2 terminals",
      "Clamp Type": "Screw"
    }
  },
  {
    id: 18,
    title: "Rear View Mirror (Auto Dimming)",
    description: "Smart rear-view mirror with automatic dimming feature.",
    price: 890.49,
    image: "https://media.istockphoto.com/id/2157963295/photo/interior-of-vehicle-driving-down-highway-in-portland-oregon.webp?a=1&b=1&s=612x612&w=0&k=20&c=-hNF0boRRZqe0h7_ZhxiCgZJyuPgTYpBriwYtopVuNI=",
    category: "interior",
    brand: "Chevrolet",
    partNumber: "50-GNTX-402",
    compatibility: ["Universal", "Honda CR-V", "Toyota RAV4"],
    inStock: true,
    vendorId: 1,
    specs: {
      "Type": "Auto-Dimming",
      "Power Supply": "12V",
      "Mounting": "Windshield",
      "Includes Wiring": "Yes"
    }
  },
  {
    id: 19,
    title: "Rear Brake Rotor (Pair)",
    description: "High-performance rear brake rotors for improved braking response.",
    price: 1290.49,
    image: "https://images.unsplash.com/photo-1696494561430-de087dd0bd69?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8QnJha2UlMjBSb3RvcnxlbnwwfHwwfHx8MA%3D%3D",
    category: "brake",
    brand: "BMW",
    partNumber: "09.7011.75",
    compatibility: ["BMW 3 Series", "BMW X1", "BMW Z4"],
    inStock: true,
    vendorId: 1,
    specs: {
      "Diameter": "300mm",
      "Vented": "Yes",
      "Bolt Pattern": "5-Lug",
      "Finish": "UV Coated"
    }
  },
  {
    id: 20,
    title: "Manual Gear Shift Knob",
    description: "Ergonomic leather gear shift knob with metallic finish.",
    price: 340.99,
    image: "https://images.unsplash.com/photo-1677423448565-fc7025621ebc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z2VhciUyMHNoaWZ0ZXIlMjBrbm9ifGVufDB8fDB8fHww",
    category: "interior",
    brand: "Toyota",
    partNumber: "SHIFT-KNOB-001",
    compatibility: ["Universal Fit", "Mazda 3", "Subaru WRX"],
    inStock: true,
    vendorId: 1,
    specs: {
      "Material": "Leather + Aluminum",
      "Thread Size": "M10 x 1.25",
      "Finish": "Matte Black",
      "Height": "95mm"
    }
  }  
];
export const addProduct = (newProduct: Product) => {
  PRODUCTS.push(newProduct);
};

export const CAR_BRANDS = [
  "Toyota", "Honda", "Nissan", "Ford", "Chevrolet", "BMW", "Mercedes-Benz", 
  "Audi", "Volkswagen", "Hyundai", "Kia", "Mazda", "Subaru", "Lexus"
];