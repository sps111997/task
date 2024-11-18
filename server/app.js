const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

// Initialize Express app
const app = express();
const port = 3000;

// Load JSON data from file
const dataPath = path.join(__dirname, "data.json");
let data = [];

// Read data from JSON file
fs.readFile(dataPath, "utf8", (err, jsonData) => {
  if (err) {
    console.error("Error reading JSON file:", err);
    return;
  }
  data = JSON.parse(jsonData);
});
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Search API endpoint
app.get("/search", (req, res) => {
  const name = req.query.name;
  setTimeout(() => {
    if (!name) {
      return res.status(400).json({ error: "Missing 'name' query parameter" });
    }

    // Perform case-insensitive search by name
    const results = data.filter((item) =>
      item.name.toLowerCase().includes(name.toLowerCase())
    );

    if (results.length > 0) {
      return res.json(results);
    } else {
      return res.status(200).json([]);
    }
  }, 20000);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
