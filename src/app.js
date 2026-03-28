require("dotenv").config();

const express = require("express");
const priceRoutes = require("./routes/priceRoutes");

const app = express();
const PORT = Number(process.env.PORT || 3000);

app.use(express.json());

// logger
app.use((req, _res, next) => {
  console.log(req.method, req.url);
  next();
});

app.get("/", (_req, res) => {
  res.json({
    message: "Crypto price API is running",
    endpoints: ["/price/btc", "/price/eth", "/price/sol", "/price/prices", "/price/:symbol"],
  });
});

app.use("/price", priceRoutes);

app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Server error" });
});

app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
});
