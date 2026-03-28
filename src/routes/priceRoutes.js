const express = require("express");
const { fetchPriceBySymbol, fetchAllSupportedPrices } = require("../services/priceService");
const { toSymbol, symbolToCoinId } = require("../utils/symbolMap");

const router = express.Router();

function invalidSymbolResponse(res, symbol) {
  return res
    .status(400)
    .json({ error: `Invalid symbol: ${symbol}.` });
}

router.get("/btc", async (_req, res) => {
  try {
    res.json(await fetchPriceBySymbol("BTC"));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
});

router.get("/eth", async (_req, res) => {
  try {
    res.json(await fetchPriceBySymbol("ETH"));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
});

router.get("/sol", async (_req, res) => {
  try {
    res.json(await fetchPriceBySymbol("SOL"));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
});

router.get("/prices", async (_req, res) => {
  try {
    res.json({ prices: await fetchAllSupportedPrices() });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
});

router.get("/:symbol", async (req, res) => {
  try {
    const symbol = toSymbol(req.params.symbol);
    const coinId = symbolToCoinId(symbol);
    if (!coinId) return invalidSymbolResponse(res, req.params.symbol);

    res.json(await fetchPriceBySymbol(symbol));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
