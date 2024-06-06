# Transaction Management Application

This is a simple Transaction Management Application built with Node.js, Express, and MongoDB for the backend. The application includes data sanitization, uses observables, routes, async/await, promises, and ensures data security.

## Features

- Display user transactions with details like ID, Date, Comments, and Action.
- REST API with startDate and endDate parameters to fetch user transactions.
- Sort transactions by date and filter by status (COMPLETED, IN PROGRESS, REJECTED).
- Data is sanitized to prevent MongoDB Operator Injection.
- The `id` field is hashed for security.

## Technologies Used

- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Data Sanitization**: express-mongo-sanitize

## Prerequisites

- Node.js
- npm (Node Package Manager)
- MongoDB

## Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/transaction-app.git
   cd transaction-app

2. **Backend Setup:**
   - Run Npm install
   - Update the config.js file 
   - Run Node index.js

## Api End Point

GET /api/transactions
Fetch transactions with optional date filters.

**Query Parameters:**
startDate (optional): Start date for filtering transactions (format: YYYY-MM-DD).
endDate (optional): End date for filtering transactions (format: YYYY-MM-DD).

**Example Response**
[
  {
    "id": "hashed-id",
    "date": 1639502071000,
    "Comments": "Utility bill"
  },
  {
    "id": "hashed-id",
    "date": 1639486575000,
    "Comments": "Rent"
  }
]

## Project Structure

├── transaction-app-backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── Transaction.js
│   │   ├── models/
│   │   │   └── Transaction.js
│   │   ├── routes/
│   │   │   └── transactions.js
│   │   ├── index.js
│   ├── package.json
|   |─── README.md

## Postman Collections

https://api.postman.com/collections/32193590-995384ae-d106-48f6-8b47-457d44d20b0c?access_key=PMAT-01HZP6NSWB6JBX54EA60YFQ66E