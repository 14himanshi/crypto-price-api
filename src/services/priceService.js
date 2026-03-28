const { SYMBOL_TO_ID, toSymbol, symbolToCoinId } = require("../utils/symbolMap");

const COINGECKO_BASE_URL =
  process.env.COINGECKO_BASE_URL ||
  "https://api.coingecko.com/api/v3/simple/price";
const DEFAULT_CURRENCY = (process.env.DEFAULT_CURRENCY || "usd").toLowerCase();

async function fetchPriceBySymbol(symbol, currency = DEFAULT_CURRENCY) {
  const normalizedSymbol = toSymbol(symbol);
  const coinId = symbolToCoinId(normalizedSymbol);

  if (!coinId) {
    throw new Error("Invalid symbol");
  }

  const url = `${COINGECKO_BASE_URL}?ids=${coinId}&vs_currencies=${currency}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`CoinGecko request failed with status ${response.status}`);
  }

  const data = await response.json(); // example: { bitcoin: { usd: 123 } }
  const price = data && data[coinId] ? data[coinId][currency] : undefined;
  if (typeof price !== "number") {
    throw new Error("Unexpected response from CoinGecko");
  }

  const result = {
    symbol: normalizedSymbol,
    price,
    currency: currency.toUpperCase(),
    timestamp: new Date().toISOString(),
  };

  return result;
}

// One CoinGecko request for all coins (avoids too many calls / rate limits)
async function fetchAllSupportedPrices(currency = DEFAULT_CURRENCY) {
  const symbols = Object.keys(SYMBOL_TO_ID);
  const ids = symbols.map((s) => SYMBOL_TO_ID[s]).join(",");
  const url = `${COINGECKO_BASE_URL}?ids=${ids}&vs_currencies=${currency}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`CoinGecko request failed with status ${response.status}`);
  }

  const data = await response.json();
  const timestamp = new Date().toISOString();

  return symbols.map((symbol) => {
    const coinId = SYMBOL_TO_ID[symbol];
    const price = data && data[coinId] ? data[coinId][currency] : undefined;
    if (typeof price !== "number") {
      throw new Error("Unexpected response from CoinGecko");
    }
    return {
      symbol,
      price,
      currency: currency.toUpperCase(),
      timestamp,
    };
  });
}

module.exports = {
  fetchPriceBySymbol,
  fetchAllSupportedPrices,
};
