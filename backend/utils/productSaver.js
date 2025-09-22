const admin = require("firebase-admin");

/**
 * Saves an array of scraped products to Firestore.
 * Handles adding new products and updating existing ones.
 * @param {Array<Object>} products - An array of product objects scraped from a website.
 * @param {admin.firestore.Firestore} db - The Firestore database instance.
 */
async function saveProductsToFirestore(products, db) {
  console.log(`Attempting to save ${products.length} products to Firestore.`);
  const productsCollection = db.collection("products");
  let addedCount = 0;
  let updatedCount = 0;

  for (const product of products) {
    // We'll use productLink as a unique identifier for simplicity.
    // For a real application, you might use a combination of properties like
    // source + original_product_id, or a part number if consistent.
    if (!product.productLink) {
      console.warn(
        "Product missing productLink, skipping:",
        product.title || "Untitled Product"
      );
      continue;
    }

    try {
      // Check if a product with this productLink already exists
      const existingProductsSnapshot = await productsCollection
        .where("productLink", "==", product.productLink)
        .limit(1)
        .get();

      if (!existingProductsSnapshot.empty) {
        // Product exists, update it
        const existingProductDoc = existingProductsSnapshot.docs[0];
        const existingData = existingProductDoc.data();

        // Only update if relevant data has changed (e.g., price, title, image)
        const updates = {};
        let changed = false;

        if (existingData.title !== product.title) {
          updates.title = product.title;
          changed = true;
        }
        if (
          existingData.price !==
          parseFloat(product.price.replace(/[^0-9.-]+/g, ""))
        ) {
          // Clean price string
          updates.price = parseFloat(product.price.replace(/[^0-9.-]+/g, ""));
          changed = true;
        }
        if (existingData.imageUrl !== product.imageUrl) {
          updates.imageUrl = product.imageUrl;
          changed = true;
        }
        // Add more fields for comparison as needed (e.g., description, stock)

        if (changed) {
          updates.updatedAt = admin.firestore.FieldValue.serverTimestamp();
          await existingProductDoc.ref.update(updates);
          updatedCount++;
          // console.log(`Updated product: ${product.title}`);
        } else {
          // console.log(`No changes for product: ${product.title}`);
        }
      } else {
        // Product does not exist, add it
        await productsCollection.add({
          name: product.title, // Map scraped 'title' to 'name' in your schema
          description: product.description || "No description available", // Add a description field if available from scraper
          price: parseFloat(product.price.replace(/[^0-9.-]+/g, "")), // Clean price string
          imageUrl: product.imageUrl || null,
          category: product.category || "Uncategorized", // Add a category if available from scraper
          brand: product.brand || "Unknown", // Add a brand if available from scraper
          partNumber: product.partNumber || null, // Add partNumber if available
          compatibility: product.compatibility || [], // Add compatibility if available
          stock: product.stock !== undefined ? parseInt(product.stock) : 1, // Default stock, handle if scraped
          productLink: product.productLink, // Store the original link for unique identification
          source: product.source, // Store the source website
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        addedCount++;
        // console.log(`Added new product: ${product.title}`);
      }
    } catch (error) {
      console.error(
        `Error saving product ${product.title || "Untitled"}:`,
        error
      );
    }
  }
  console.log(
    `Firestore save complete: Added ${addedCount} new products, Updated ${updatedCount} existing products.`
  );
  return { addedCount, updatedCount };
}

module.exports = {
  saveProductsToFirestore,
};
