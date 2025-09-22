const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeKMAutoSpares() {
  // Note: kmautospares.com might be more dynamic or have different structures.
  // This URL is an example. You might need to explore different categories or search pages.
  const url = "https://kmautospares.com/categories/accessories"; // Example category URL
  const products = [];

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // IMPORTANT: You MUST inspect the HTML of https://kmautospares.com/
    // using your browser's developer tools to find the correct CSS selectors.
    // The selectors below are placeholders and will very likely need adjustment.

    // Example: Finding product cards. Replace '.product-card' with the actual selector
    // and update inner selectors for title, price, etc.
    $(".product-card").each((index, element) => {
      // Replace '.product-card' with actual container
      const title = $(element).find(".product-title").text().trim(); // Replace '.product-title'
      const price = $(element).find(".product-price").text().trim(); // Replace '.product-price'
      const imageUrl = $(element).find(".product-image img").attr("src"); // Replace '.product-image img'
      const productLink = $(element).find(".product-link").attr("href"); // Replace '.product-link'

      // Basic validation
      if (title && price && imageUrl && productLink) {
        products.push({
          title,
          price,
          imageUrl,
          productLink: new URL(productLink, url).href, // Ensure absolute URL
          source: "kmautospares.com",
        });
      }
    });

    console.log(`Scraped ${products.length} products from KM Auto Spares.`);
    return products;
  } catch (error) {
    console.error(`Error scraping KM Auto Spares: ${error.message}`);
    // Often, sites block automated requests. If you get 403, 406, or similar,
    // you might need to add headers (e.g., User-Agent) or use Puppeteer/Playwright.
    return [];
  }
}

module.exports = {
  scrapeKMAutoSpares,
};
