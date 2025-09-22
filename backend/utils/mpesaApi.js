const axios = require("axios");
const { Buffer } = require("buffer"); // Node.js Buffer API
const crypto = require("crypto"); // For MD5 hashing for the M-Pesa password

// Load M-Pesa credentials from environment variables
const MPESA_CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY;
const MPESA_CONSUMER_SECRET = process.env.MPESA_CONSUMER_SECRET;
const MPESA_SHORTCODE = process.env.MPESA_SHORTCODE; // Your Paybill/Till Number
const MPESA_PASSKEY = process.env.MPESA_PASSKEY;
const MPESA_CALLBACK_URL = process.env.MPESA_CALLBACK_URL; // Your publicly accessible callback URL
const MPESA_TRANSACTION_DESCRIPTION = process.env.MPESA_TRANSACTION_DESCRIPTION;

let mpesaAccessToken = null; // Store the access token globally or in a cache
let tokenExpiryTime = 0; // Store its expiry time

/**
 * Gets the M-Pesa Daraja API access token. Caches it and refreshes if expired.
 * @returns {string} The M-Pesa access token.
 */
async function getMpesaAccessToken() {
  if (mpesaAccessToken && Date.now() < tokenExpiryTime) {
    return mpesaAccessToken;
  }

  try {
    const auth = Buffer.from(
      `${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`
    ).toString("base64");
    const response = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );

    mpesaAccessToken = response.data.access_token;
    tokenExpiryTime = Date.now() + (response.data.expires_in - 300) * 1000; // 5 minutes before actual expiry

    console.log("M-Pesa Access Token obtained successfully.");
    return mpesaAccessToken;
  } catch (error) {
    console.error(
      "Error getting M-Pesa access token:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to get M-Pesa access token.");
  }
}

/**
 * Initiates an M-Pesa STK Push to the customer's phone.
 * @param {string} phoneNumber - Customer's M-Pesa phone number (format 2547XXXXXXXX).
 * @param {number} amount - The transaction amount.
 * @param {string} accountReference - A unique identifier for the transaction (e.g., your order ID).
 * @param {string} transactionDesc - A description for the transaction.
 * @returns {Object} Response from M-Pesa API.
 */
async function initiateSTKPush(
  phoneNumber,
  amount,
  accountReference,
  transactionDesc = MPESA_TRANSACTION_DESCRIPTION
) {
  try {
    const token = await getMpesaAccessToken();
    const timestamp = new Date()
      .toISOString()
      .replace(/[^0-9]/g, "")
      .slice(0, 14); // YYYYMMDDHHmmss
    const password = Buffer.from(
      `${MPESA_SHORTCODE}${MPESA_PASSKEY}${timestamp}`
    ).toString("base64");

    const requestBody = {
      BusinessShortCode: MPESA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline", // Or 'CustomerBuyGoodsOnline'
      Amount: amount,
      PartyA: phoneNumber, // Customer's phone number
      PartyB: MPESA_SHORTCODE, // Your Till/Paybill Number
      PhoneNumber: phoneNumber, // Customer's phone number
      CallBackURL: MPESA_CALLBACK_URL,
      AccountReference: accountReference, // Your unique order ID or reference
      TransactionDesc: transactionDesc,
    };

    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("STK Push request sent successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error initiating STK Push:",
      error.response ? error.response.data : error.message
    );
    throw new Error(
      `Failed to initiate STK Push: ${
        error.response
          ? error.response.data.errorMessage || error.response.data
          : error.message
      }`
    );
  }
}

module.exports = {
  getMpesaAccessToken,
  initiateSTKPush, // <--- Export the new function
  // Export necessary constants if they might be used directly elsewhere (optional)
  MPESA_SHORTCODE,
  MPESA_PASSKEY,
  MPESA_CALLBACK_URL,
  MPESA_TRANSACTION_DESCRIPTION,
};
