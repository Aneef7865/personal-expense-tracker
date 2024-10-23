// src/models/transactionModel.js
const db = require('../database');

// Transaction Model
class Transaction {
  constructor(type, category, amount, date, description) {
    this.type = type;
    this.category = category;
    this.amount = amount;
    this.date = date;
    this.description = description;
  }

  // Save transaction to the database
  static save(transaction, callback) {
    const query = `INSERT INTO transactions (type, category, amount, date, description) VALUES (?, ?, ?, ?, ?)`;
    db.run(query, [transaction.type, transaction.category, transaction.amount, transaction.date, transaction.description], function (err) {
      callback(err, this.lastID);
    });
  }

  // Get all transactions
  static getAll(callback) {
    const query = `SELECT * FROM transactions`;
    db.all(query, [], (err, rows) => {
      callback(err, rows);
    });
  }

  // Get transaction by ID
  static getById(id, callback) {
    const query = `SELECT * FROM transactions WHERE id = ?`;
    db.get(query, [id], (err, row) => {
      callback(err, row);
    });
  }

  // Update transaction by ID
  static update(id, transaction, callback) {
    const query = `UPDATE transactions SET type = ?, category = ?, amount = ?, date = ?, description = ? WHERE id = ?`;
    db.run(query, [transaction.type, transaction.category, transaction.amount, transaction.date, transaction.description, id], function (err) {
      callback(err, this.changes);
    });
  }

  // Delete transaction by ID
  static delete(id, callback) {
    const query = `DELETE FROM transactions WHERE id = ?`;
    db.run(query, [id], function (err) {
      callback(err, this.changes);
    });
  }
}

module.exports = Transaction;
