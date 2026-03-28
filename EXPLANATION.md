# Architecture Explanation

This service follows a layered backend structure:

1. **Routes layer** (`src/routes/priceRoutes.js`)
   - Defines API endpoints.
   - Accepts request params and returns HTTP responses.
   - Converts domain errors into proper status codes (`400`, `500`).

2. **Service layer** (`src/services/priceService.js`)
   - Contains async business logic for fetching prices.
   - Calls CoinGecko through fetch.

3. **Utility layer** (`src/utils/symbolMap.js`)
   - Handles symbol normalization and mapping:
     - `BTC -> bitcoin`
     - `ETH -> ethereum`
     - `SOL -> solana`
   - Keeps mapping logic reusable and centralized.

## Async Flow

`Route -> Service -> CoinGecko API -> Service -> Route -> Client`

- Routes call service methods with `await`.
- Service performs asynchronous HTTP request with fetch.
- Promise rejections are handled using `try/catch` at route level to prevent server crashes.

## Error Strategy

- Invalid symbol throws `InvalidSymbolError` -> route returns `400`.
- Unexpected external/API issues -> route returns `500`.
- Global error middleware in `app.js` catches unhandled issues as fallback.


