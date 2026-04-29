# Card Validation API

A REST API that validates card numbers using the Luhn algorithm and detects card type. 

** Note: The Luhn algorithm validates the structure of a card number but does not guarantee that the card is active or issued by a bank. **

## How to Run
### Install dependencies
npm install

### Development (runs directly from TypeScript)
npm run dev

### Production (compile then run compiled JS)
npm run build
npm run start

## How to Test
npm test

Unit tests cover the Luhn algorithm and card type detection functions directly.

## API Documentation

POST /validate-card

Request:
{"cardNum": "4532015112830366"}

Success response (valid card - 200):
{"valid": true, "type": "Visa"}

Success response (invalid card - 200):
{"valid": false, "type": "Unknown"}

Error responses (400):
{"error": "Card number is required"}
{"error": "Card number must contain only digits"}
{"error": "Card number must be between 13 and 19 digits"}

## Design Decisions

**Express over NestJS** — Express is lightweight and allows quick setup of a single HTTP endpoint without unnecessary abstraction. For this scope, it keeps the implementation simple and easy to reason about.

**Luhn algorithm** — Industry standard checksum for card number validation, widely used by payment systems to detect common input errors such as mistyped or transposed digits.

**Unit tests over integration tests** — The core logic is implemented as pure functions, making them ideal for isolated testing. This ensures the correctness of the validation algorithm independent of the HTTP layer. Integration tests could be added in a larger system to verify full request-response behavior.

**Vitest** — Fast, modern test runner with native TypeScript and ESM support. Requires minimal configuration for this project setup.

**Card type always returned** — In real payment interfaces, card type is displayed as soon as the first digits are entered, regardless of whether the full number is valid yet. This mirrors that behaviour.