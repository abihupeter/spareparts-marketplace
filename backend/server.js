// backend/server.js

const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Initialize Firebase Admin SDK
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const auth = admin.auth();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// --- API Routes ---

// Middleware to verify Firebase ID Token (for authenticated routes)
const verifyToken = async (req, res, next) => {
  const idToken = req.headers.authorization?.split("Bearer ")[1];

  if (!idToken) {
    return res
      .status(401)
      .json({ message: "Unauthorized: No token provided." });
  }

  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Error verifying Firebase ID token:", error);
    res.status(403).json({ message: "Unauthorized: Invalid token." });
  }
};

// Test Route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// --- Auth Routes ---

// Register User
app.post("/api/auth/register", async (req, res) => {
  const { email, password, fullName } = req.body; // 'role' is removed from destructuring

  console.log(`Attempting to register user: ${email}`);

  if (!email || !password || !fullName) {
    // 'role' check removed
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: fullName,
    });

    console.log(`User created in Firebase Auth: ${userRecord.uid}`);

    // Save additional user data to Firestore, EXCLUDING 'role'
    await db.collection("users").doc(userRecord.uid).set({
      id: userRecord.uid,
      email,
      name: fullName,
      // role: role, // <-- This line is removed
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log(`User data saved to Firestore for: ${userRecord.uid}`);

    res
      .status(201)
      .json({ message: "User registered successfully!", uid: userRecord.uid });
  } catch (error) {
    console.error("--- Detailed Backend Registration Error ---");
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    console.error("------------------------------------------");

    if (error.code === "auth/email-already-in-use") {
      return res.status(409).json({ message: "Email already in use." });
    }
    if (error.code === "auth/weak-password") {
      return res.status(400).json({
        message: "Password is too weak. Must be at least 6 characters.",
      });
    }
    if (error.code === "auth/invalid-email") {
      return res.status(400).json({ message: "Invalid email format." });
    }
    res.status(500).json({ message: "Error registering user." });
  }
});

// Login User (simplified - frontend will handle Firebase Auth sign-in directly)
app.post("/api/auth/login", async (req, res) => {
  res.status(200).json({
    message: "Login handled by client SDK. Backend can verify token if sent.",
  });
});

// --- Product Routes ---

// Get all products
app.get("/api/products", async (req, res) => {
  try {
    const productsRef = db.collection("products");
    const snapshot = await productsRef.get();
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products." });
  }
});

// Add a new product (requires authentication)
app.post("/api/products", verifyToken, async (req, res) => {
  const {
    title,
    description,
    price,
    image,
    category,
    brand,
    partNumber,
    compatibility,
    inStock,
    specs,
  } = req.body;
  const vendorId = req.user.uid; // Get vendorId from authenticated user

  if (
    !title ||
    !description ||
    !price ||
    !image ||
    !category ||
    !brand ||
    !partNumber
  ) {
    return res
      .status(400)
      .json({ message: "Missing required product fields." });
  }

  try {
    const newProductRef = await db.collection("products").add({
      title,
      description,
      price: parseFloat(price),
      image,
      category,
      brand,
      partNumber,
      compatibility: compatibility || [],
      inStock: typeof inStock === "boolean" ? inStock : true,
      specs: specs || {},
      vendorId,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res
      .status(201)
      .json({ id: newProductRef.id, message: "Product added successfully!" });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Error adding product." });
  }
});

// --- Order Routes ---

// Place a new order (requires authentication)
app.post("/api/orders", verifyToken, async (req, res) => {
  const { items, total, shippingAddress } = req.body;
  const customerId = req.user.uid;

  if (!items || !total || !shippingAddress) {
    return res.status(400).json({ message: "Missing required order fields." });
  }

  try {
    const newOrderRef = await db.collection("orders").add({
      customerId,
      items: items.map((item) => ({
        productId: item.product.id,
        title: item.product.title,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image,
      })),
      total: parseFloat(total),
      shippingAddress,
      status: "pending",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res
      .status(201)
      .json({ id: newOrderRef.id, message: "Order placed successfully!" });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Error placing order." });
  }
});

// Get orders for a specific user (requires authentication and matching user ID)
app.get("/api/orders/:userId", verifyToken, async (req, res) => {
  const { userId } = req.params;

  if (req.user.uid !== userId) {
    return res
      .status(403)
      .json({ message: "Forbidden: You can only view your own orders." });
  }

  try {
    const ordersRef = db.collection("orders").where("customerId", "==", userId);
    const snapshot = await ordersRef.get();
    const orders = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: "Error fetching user orders." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
