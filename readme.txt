# Personal Expense Tracker API

A RESTful API for managing personal financial records, allowing users to record income and expenses, retrieve past transactions, and get summaries by category or time period.

## Table of Contents
- #technologies
- #setup-and-installation
- #api-documentation
- #postman-screenshots

## Technologies
- Backend Framework: Node.js with Express.js
- Database: SQLite
- Middleware: Body-parser, CORS
- Testing Tool: Postman

##Install dependencies:

npm install

##run the application:

node src/server.js

## API Documentation Endpoints
POST /api/transactions

Description: Adds a new transaction (income or expense).
Request Body:
json
Copy code
{
  "type": "income", // or "expense"
  "category": "Salary",
  "amount": 5000,
  "date": "2024-10-01",
  "description": "Monthly salary"
}
Response:
json
Copy code
{
  "id": 1,
  "type": "income",
  "category": "Salary",
  "amount": 5000,
  "date": "2024-10-01",
  "description": "Monthly salary"
}


GET /api/transactions

Description: Retrieves all transactions.
Response:
json
Copy code
[
  {
    "id": 1,
    "type": "income",
    "category": "Salary",
    "amount": 5000,
    "date": "2024-10-01",
    "description": "Monthly salary"
  },
  ...
]
GET /api/transactions/:id

Description: Retrieves a transaction by ID.
Response:
json
Copy code
{
  "id": 1,
  "type": "income",
  "category": "Salary",
  "amount": 5000,
  "date": "2024-10-01",
  "description": "Monthly salary"
}

PUT /api/transactions/:id

Description: Updates a transaction by ID.
Request Body:
json
Copy code
{
  "type": "expense",
  "category": "Groceries",
  "amount": 150,
  "date": "2024-10-02",
  "description": "Weekly groceries"
}

DELETE /api/transactions/:id

Description: Deletes a transaction by ID.
Response:
json
Copy code
{
  "message": "Transaction deleted successfully"
}


GET /api/summary

Description: Retrieves a summary of transactions, including total income, total expenses, and balance.
Response:
json
Copy code
{
  "totalIncome": 5000,
  "totalExpenses": 150,
  "balance": 4850
}

##postman screenshorts were available in application file

