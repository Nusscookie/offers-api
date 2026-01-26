# Offers API

A Node.js Express API for searching grocery store offers using the Marktguru service.

## Description

Offers API is a simple REST API that allows you to search for supermarket deals and offers. It leverages the Marktguru service to retrieve offers for specified search terms, with support for filtering by retailers, location (zip code), and pagination.

## Features

- Search for grocery store offers by term
- Filter offers by specific retailers
- Pagination support (limit and offset)
- Location-based search with zip code
- Health check endpoint
- JSON request/response format
- Error handling and logging

## Prerequisites

- Node.js (v14 or higher)
- npm

## Installation

1. Clone the repository or download the project
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

## Usage

### Starting the Server

```bash
npm start
```

The API server will start on port 3000 (or the port specified in the `PORT` environment variable).

### API Endpoints

#### POST /offers/:search

Search for offers by term.

**Parameters:**
- `:search` (URL parameter) - The search term for offers

**Request Body (JSON):**
```json
{
  "limit": "1000",
  "offset": "0",
  "allowedRetailers": [],
  "zipCode": "10115"
}
```

- `limit` (optional, default: "1000") - Maximum number of results to return
- `offset` (optional, default: "0") - Number of results to skip for pagination
- `allowedRetailers` (optional, default: []) - Array of retailer names to filter by
- `zipCode` (optional, default: "10115") - Postal code for location-based search

**Response:**
```json
{
  "message": "Offers retrieved successfully",
  "data": [
    {
      "title": "Product Name",
      "price": "1.99",
      "retailer": "Store Name",
      ...
    }
  ]
}
```

#### GET /health

Health check endpoint to verify the API is running.

**Response:**
```
ok
```

### Example Requests

#### Search for pasta offers in Berlin:
```bash
curl -X POST http://localhost:3000/offers/pasta \
  -H "Content-Type: application/json" \
  -d '{
    "zipCode": "10115",
    "limit": "50"
  }'
```

#### Search with retailer filter:
```bash
curl -X POST http://localhost:3000/offers/coffee \
  -H "Content-Type: application/json" \
  -d '{
    "allowedRetailers": ["REWE", "EDEKA"],
    "zipCode": "10115"
  }'
```

## Dependencies

- [express](https://expressjs.com/) - Web application framework
- [marktguru](https://github.com/sydev/marktguru) - Grocery offer search service

## License
[GNU GPLv3](LICENSE)<br>
Copyright (c) Nusscookie