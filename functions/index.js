/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */


const express = require("express");
const path = require("path");
const app = express();
const port = 3000; // You can choose any port number

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Define routes if needed
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// Start the server
app.listen(port, () => {
  console.log("Server is running at http://localhost:${port}");
});
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
