# Crypto Price Backend (Node.js + Express)

Backend service that fetches live cryptocurrency prices from CoinGecko and exposes them through custom APIs.

## Tech Stack

- Node.js
- Express.js
- dotenv

## Project Structure

```text
src/
  app.js
  routes/
    priceRoutes.js
  services/
    priceService.js
  utils/
    symbolMap.js
```

## Setup

1. Install dependencies:

   ```bash
   npm install
   npm i express
   npm i dotenv
   ```

2. Run server:

   ```bash
   npm start
   ```

3. Server runs at:

   ```text
   http://localhost:3000
   ```

## API Endpoints

- `GET /price/btc`
- `GET /price/eth`
- `GET /price/:symbol`
- `GET /price/prices` (bonus)

Supported symbols: `BTC`, `ETH`, `SOL`

### Sample Response

```json
{
  "symbol": "BTC",
  "price": 66298,
  "currency": "USD",
  "timestamp": "2026-03-28T05:58:48.621Z"
}
```

## Error Handling

- `400` for invalid symbol
- `500` for API/server failures
- Server remains stable on errors

## Bonus Features Included

- `GET /price/prices` for all supported symbols
- Request logging middleware

## Project Explanation

This project is a clean, minimal backend service built with **Node.js** and **Express**. It acts as a "middleman" between the user and the CoinGecko API to provide simplified cryptocurrency price data.

### How it Works:

* **`app.js`**: The entry point of the application. It initializes the server, sets up a request logger, and includes a global error handler to ensure the API stays stable even if a request fails.
* **`routes/`**: This folder defines the URL paths. It contains the logic to route requests to specific coins (like BTC or ETH) and handles the dynamic `/:symbol` parameter.
* **`services/`**: This is the core logic layer. It fetches raw data from the CoinGecko API, extracts only the necessary price information, and formats it into a clean JSON response for the user.
* **`utils/`**: A helper utility that acts as a translator. It maps simple user inputs (like "BTC") into the specific unique IDs required by the CoinGecko API (like "bitcoin").

### Why this approach?

By separating the code into these specific layers, the project is much easier to maintain. For example, if we wanted to add a new coin or switch to a different data provider, we would only need to update the **Utilities** or **Service** layer without touching the rest of the application.
