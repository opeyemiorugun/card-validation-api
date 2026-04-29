# Card Validation API

A REST API that validates card numbers using the Luhn algorithm and detects card type (Visa or Mastercard).

> **Note:** The Luhn algorithm validates the structural integrity of a card number. It does not verify whether the card is active or issued by a bank.

## Tech Stack

| Layer | Tool |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Language | TypeScript |
| Testing | Vitest |
| Dev Tools | tsx, nodemon |

## Prerequisites

- Node.js v18 or higher (developed on v24.15.0)
- npm

## Getting Started

**Install dependencies**
```bash
npm install
```

**Development** — runs TypeScript directly via tsx
```bash
npm run dev
```

**Production** — compiles to JavaScript, then runs the output
```bash
npm run build
npm run start
```

The server runs on `http://localhost:3000` by default.

## Running Tests

```bash
npm test
```

Unit tests cover the Luhn validation algorithm and card type detection as pure functions, independent of the HTTP layer.

## API Reference

### `POST /validate-card`

Validates a card number and returns its type.

**Request body**
```json
{ "cardNum": "4532015112830366" }
```

**Responses**

| Status | Meaning | Example body |
|---|---|---|
| 200 | Valid card | `{ "valid": true, "type": "Visa" }` |
| 200 | Invalid card | `{ "valid": false, "type": "Unknown" }` |
| 400 | Bad request | `{ "error": "Card number is required" }` |

**Supported card types:** Visa, Mastercard. All other card networks return `"type": "Unknown"`.

**400 error messages**
- `"Card number is required"`
- `"Card number must contain only digits"`
- `"Card number must be between 13 and 19 digits"`

## Design Decisions

**Express over NestJS** — a single endpoint does not justify NestJS's abstractions. Express keeps the implementation flat and easy to reason about.

**Luhn algorithm** — industry-standard checksum for card number validation, widely used by payment systems to catch common input errors such as mistyped or transposed digits.

**Visa and Mastercard only** — these are the predominant card networks in Nigeria. Other card numbers pass through validation normally but return `"type": "Unknown"`.

**Card type always returned** — real payment interfaces display card type as soon as the first digits are entered, before the full number is complete. This API mirrors that behaviour by always including `type` in the response regardless of validity.

**Unit tests over integration tests** — core logic is implemented as pure functions, making isolated unit tests the most direct way to verify correctness. Integration tests covering the full HTTP layer could be added as the project grows.

**Vitest** — fast, modern test runner with native TypeScript and ESM support. Requires minimal configuration for this stack.