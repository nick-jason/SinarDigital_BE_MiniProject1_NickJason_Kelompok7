import express from "express";
import fs from "fs";
import products from "./products.json" with { type: "json" };

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json(products);
});

app.listen(port, () => {
  console.log(`Server running on port https://localhost:${port}`);
});
