// symbol -> CoinGecko "id"
const SYMBOL_TO_ID = {
  BTC: "bitcoin",
  ETH: "ethereum",
  SOL: "solana",
};

function toSymbol(input) {
  if (typeof input !== "string") return null;
  const s = input.trim().toUpperCase();
  return s.length ? s : null;
}

function symbolToCoinId(symbol) {
  const s = toSymbol(symbol);
  if (!s) return null;
  return SYMBOL_TO_ID[s] || null;
}

module.exports = { SYMBOL_TO_ID, toSymbol, symbolToCoinId };
