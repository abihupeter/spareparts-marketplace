// backend/server.js

const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// --- START: Updated imports for scraping, saving, and MPESA ---
const { scrapeJaymaxAuto } = require("./scrapers/jaymaxScraper");
const { scrapeKMAutoSpares } = require("./scrapers/kmScraper");
const { saveProductsToFirestore } = require("./utils/productSaver");
// Corrected M-Pesa import to include initiateSTKPush
const { getMpesaAccessToken, initiateSTKPush } = require("./utils/mpesaApi");
// --- END: Updated imports for scraping, saving, and MPESA ---

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
  const { email, password, fullName, role } = req.body;

  console.log(`Attempting to register user: ${email}`);

  if (!email || !password || !fullName || !role) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: fullName,
    });

    console.log(`User created in Firebase Auth: ${userRecord.uid}`);

    // Save additional user data to Firestore
    await db.collection("users").doc(userRecord.uid).set({
      id: userRecord.uid,
      email,
      name: fullName,
      role:role,
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

// --- API Endpoints for Web Scraping with Firestore Save ---
app.get("/api/scrape/kmauto", async (req, res) => {
  try {
    const scrapedProducts = await scrapeKMAutoSpares();
    const { addedCount, updatedCount } = await saveProductsToFirestore(
      scrapedProducts,
      db
    );
    res.status(200).json({
      message: `Scraping from KM Auto Spares completed. Added ${addedCount} new products, updated ${updatedCount}.`,
      totalScraped: scrapedProducts.length,
    });
  } catch (error) {
    console.error("Error in scraping endpoint for KM Auto Spares:", error);
    res
      .status(500)
      .json({ error: "Failed to scrape or save data from KM Auto Spares" });
  }
});

app.get("/api/scrape/jaymax", async (req, res) => {
  try {
    const scrapedProducts = await scrapeJaymaxAuto();
    const { addedCount, updatedCount } = await saveProductsToFirestore(
      scrapedProducts,
      db
    );
    res.status(200).json({
      message: `Scraping from Jaymax Auto completed. Added ${addedCount} new products, updated ${updatedCount}.`,
      totalScraped: scrapedProducts.length,
    });
  } catch (error) {
    console.error("Error in scraping endpoint for Jaymax Auto:", error);
    res
      .status(500)
      .json({ error: "Failed to scrape or save data from Jaymax Auto" });
  }
});
// --- END: API Endpoints for Web Scraping with Firestore Save ---

// --- START: New M-Pesa STK Push Endpoint ---
app.post("/api/mpesa/stkpush", verifyToken, async (req, res) => {
  const { phoneNumber, amount, orderId } = req.body; // orderId is crucial for linking payment to order

  if (!phoneNumber || !amount || !orderId) {
    return res
      .status(400)
      .json({
        message:
          "Missing required M-Pesa payment fields (phoneNumber, amount, orderId).",
      });
  }

  // Basic phone number validation (M-Pesa expects 2547XXXXXXXX)
  if (!phoneNumber.startsWith("2547") || phoneNumber.length !== 12) {
    return res
      .status(400)
      .json({ message: "Invalid phone number format. Must be 2547XXXXXXXX." });
  }

  try {
    // Amount must be at least 1 KES for M-Pesa STK Push
    if (parseFloat(amount) < 1) {
      return res
        .status(400)
        .json({ message: "Amount must be at least 1 KES." });
    }

    const response = await initiateSTKPush(
      phoneNumber,
      parseFloat(amount),
      orderId
    );

    // Save STK Push request details to Firestore for tracking
    await db.collection("mpesa_stk_requests").add({
      orderId: orderId,
      userId: req.user.uid, // From verifyToken middleware
      phoneNumber,
      amount,
      checkoutRequestID: response.CheckoutRequestID || null,
      merchantRequestID: response.MerchantRequestID || null,
      responseCode: response.ResponseCode || null,
      responseDescription: response.ResponseDescription || null,
      customerMessage: response.CustomerMessage || null,
      status: "pending", // Initial status
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).json({
      message:
        "STK Push initiated successfully. Please check your phone for the prompt.",
      checkoutRequestID: response.CheckoutRequestID,
      customerMessage: response.CustomerMessage,
    });
  } catch (error) {
    console.error("Error initiating M-Pesa STK Push:", error.message);
    res.status(500).json({ error: error.message });
  }
});
// --- END: New M-Pesa STK Push Endpoint ---

// --- START: New M-Pesa Callback Endpoint ---
// This endpoint is called by Safaricom to confirm the transaction.
// It DOES NOT require verifyToken middleware.
app.post("/api/mpesa/callback", async (req, res) => {
  console.log("M-Pesa Callback Received:", JSON.stringify(req.body, null, 2));

  const callbackData = req.body.Body.stkCallback;
  const checkoutRequestID = callbackData.CheckoutRequestID;
  const resultCode = callbackData.ResultCode;
  const resultDesc = callbackData.ResultDesc;
  const merchantRequestID = callbackData.MerchantRequestID;

  let transactionStatus = "failed";
  let mpesaReceiptNumber = null;
  let transactionDate = null;
  let phoneNumber = null;

  if (resultCode === 0) {
    // Payment was successful
    transactionStatus = "completed";
    const callbackItems = callbackData.CallbackMetadata.Item;
    mpesaReceiptNumber = callbackItems.find(
      (item) => item.Name === "MpesaReceiptNumber"
    )?.Value;
    transactionDate = callbackItems.find(
      (item) => item.Name === "TransactionDate"
    )?.Value;
    phoneNumber = callbackItems.find(
      (item) => item.Name === "PhoneNumber"
    )?.Value;
    console.log(`Successful M-Pesa transaction: ${mpesaReceiptNumber}`);
  } else {
    transactionStatus = "failed";
    console.error(
      `Failed M-Pesa transaction for CheckoutRequestID ${checkoutRequestID}: ${resultDesc}`
    );
  }

  try {
    // Find the corresponding STK push request in your Firestore
    const stkRequestSnapshot = await db
      .collection("mpesa_stk_requests")
      .where("checkoutRequestID", "==", checkoutRequestID)
      .limit(1)
      .get();

    if (!stkRequestSnapshot.empty) {
      const stkRequestDoc = stkRequestSnapshot.docs[0];
      const orderId = stkRequestDoc.data().orderId;

      // Update the STK request status
      await stkRequestDoc.ref.update({
        status: transactionStatus,
        resultCode: resultCode,
        resultDesc: resultDesc,
        mpesaReceiptNumber: mpesaReceiptNumber,
        transactionDate: transactionDate,
        customerPhoneNumber: phoneNumber,
        completedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      console.log(
        `STK Request ${stkRequestDoc.id} updated to ${transactionStatus}.`
      );

      // Update the associated Order status if successful
      if (transactionStatus === "completed" && orderId) {
        await db.collection("orders").doc(orderId).update({
          paymentStatus: "paid",
          mpesaReceiptNumber: mpesaReceiptNumber,
          paidAt: admin.firestore.FieldValue.serverTimestamp(),
          status: "processing", // Or 'confirmed', depending on your workflow
        });
        console.log(`Order ${orderId} updated to paid.`);
      } else if (transactionStatus === "failed" && orderId) {
        await db.collection("orders").doc(orderId).update({
          paymentStatus: "failed",
          // You might add a field for failure reason or just keep it as 'pending' if you want to allow retries
          status: "payment_failed",
        });
        console.log(`Order ${orderId} payment failed.`);
      }
    } else {
      console.warn(
        `No matching STK request found for CheckoutRequestID: ${checkoutRequestID}`
      );
    }

    // M-Pesa expects a specific response
    res.status(200).json({ ResultCode: 0, ResultDesc: "C2B Recieved." });
  } catch (error) {
    console.error("Error processing M-Pesa callback:", error);
    res
      .status(500)
      .json({ ResultCode: 1, ResultDesc: "Internal Server Error." }); // M-Pesa expects a standard response
  }
});
// --- END: New M-Pesa Callback Endpoint ---

// --- Order Routes ---

// Place a new order (requires authentication)
app.post("/api/orders", verifyToken, async (req, res) => {
  const { items, total, shippingAddress, paymentMethod } = req.body; // Added paymentMethod to capture how user intends to pay
  const customerId = req.user.uid;

  if (!items || !total || !shippingAddress || !paymentMethod) {
    // Check paymentMethod
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
      paymentMethod, // Save payment method
      status: "pending", // Initial status is pending payment
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
  getMpesaAccessToken() // This line is for testing and can be removed in production
    .then(() => console.log("M-Pesa token test successful"))
    .catch((err) => console.error("M-Pesa token test failed:", err.message));
});
