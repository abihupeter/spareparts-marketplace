const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeJaymaxAuto() {
  const url = "https://jaymaxauto.co.ke/product-category/engine-parts/"; // Example category URL
  const products = [];

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // IMPORTANT: You'll need to inspect the website's HTML to find the correct selectors.
    // Use your browser's "Inspect Element" tool on https://jaymaxauto.co.ke/
    // to find the specific class names or IDs. The selectors below are examples.

    $(".product-item").each((index, element) => {
      // Replace '.product-item' with the actual product container selector
      const title = $(element).find(".product-title a").text().trim(); // Replace '.product-title a'
      const price = $(element).find(".price .amount").text().trim(); // Replace '.price .amount'
      const imageUrl = $(element)
        .find(".woocommerce-loop-product__thumbnail img")
        .attr("src"); // Replace '.woocommerce-loop-product__thumbnail img'
      const productLink = $(element).find(".product-title a").attr("href"); // Replace '.product-title a'

      // Basic validation
      if (title && price && imageUrl && productLink) {
        products.push({
          title,
          price,
          imageUrl,
          productLink,
          source: "jaymaxauto.co.ke",
        });
      }
    });

    console.log(`Scraped ${products.length} products from Jaymax Auto.`);
    return products;
  } catch (error) {
    console.error(`Error scraping Jaymax Auto: ${error.message}`);
    return [];
  }
}

module.exports = {
  scrapeJaymaxAuto,
};
