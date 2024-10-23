// src/controllers/transactionController.js
const Transaction = require('../models/transactionModel');
const db = require('../database'); // Adjust the path if necessary

// Add a new transaction
exports.addTransaction = (req, res) => {
  const { type, category, amount, date, description } = req.body;
  const newTransaction = new Transaction(type, category, amount, date, description);
  
  Transaction.save(newTransaction, (err, id) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.status(201).json({ id });
  });
};

// Get all transactions
exports.getTransactions = (req, res) => {
  Transaction.getAll((err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

// Get transaction by ID
exports.getTransactionById = (req, res) => {
  Transaction.getById(req.params.id, (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.json(row);
  });
};

// Update a transaction
exports.updateTransaction = (req, res) => {
  const { type, category, amount, date, description } = req.body;
  const updatedTransaction = new Transaction(type, category, amount, date, description);
  
  Transaction.update(req.params.id, updatedTransaction, (err, changes) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (changes === 0) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.json({ message: "Transaction updated successfully" });
  });
};

// Delete a transaction
exports.deleteTransaction = (req, res) => {
  Transaction.delete(req.params.id, (err, changes) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (changes === 0) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.json({ message: "Transaction deleted successfully" });
  });
};

// Get summary of transactions
exports.getSummary = (req, res) => {
  const summaryQuery = `
    SELECT 
      SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS total_income,
      SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expenses
    FROM transactions;
  `;
  
  db.get(summaryQuery, [], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const balance = row.total_income - row.total_expenses;
    res.json({ ...row, balance });
  });
};
