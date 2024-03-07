"use strict";
// import sqlite3 from "sqlite3";
// import * as dotenv from "dotenv";
// dotenv.config();
// async function createDatabaseAndTable() {
//   // Create a MySQL database connection
//   const db = new sqlite3.Database("grocery_management.db");
//   try {
//     db.serialize(() => {
//       // Users table
//       db.run(`CREATE TABLE IF NOT EXISTS users (
//     id INTEGER PRIMARY KEY,
//     name TEXT DEFAULT NULL,
//     firstname TEXT DEFAULT NULL,
//     lastname TEXT DEFAULT NULL,
//     email TEXT NOT NULL UNIQUE,
//     password TEXT NOT NULL,
//     is_admin BOOLEAN DEFAULT FALSE,
//     createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
//     updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
//   )`);
//       // Products table
//       db.run(`CREATE TABLE IF NOT EXISTS products (
//     id INTEGER PRIMARY KEY,
//     name TEXT NOT NULL,
//     description TEXT,
//     price REAL NOT NULL,
//     quantity INTEGER NOT NULL
//   )`);
//       // Carts table
//       db.run(`CREATE TABLE IF NOT EXISTS carts (
//     id INTEGER PRIMARY KEY,
//     userId INTEGER NOT NULL,
//     FOREIGN KEY (userId) REFERENCES users(id)
//   )`);
//       // CartItems table
//       db.run(`CREATE TABLE IF NOT EXISTS cartItems (
//     id INTEGER PRIMARY KEY,
//     cartId INTEGER NOT NULL,
//     productId INTEGER NOT NULL,
//     quantity INTEGER NOT NULL,
//     FOREIGN KEY (cartId) REFERENCES carts(id),
//     FOREIGN KEY (productId) REFERENCES products(id)
//   )`);
//       // Bookings table
//       db.run(`CREATE TABLE IF NOT EXISTS bookings (
//     id INTEGER PRIMARY KEY,
//     userId INTEGER NOT NULL,
//     total REAL NOT NULL,
//     status TEXT NOT NULL,
//     FOREIGN KEY (userId) REFERENCES users(id)
//   )`);
//       // BookingItems table
//       db.run(`CREATE TABLE IF NOT EXISTS bookingItems (
//     id INTEGER PRIMARY KEY,
//     bookingId INTEGER NOT NULL,
//     productId INTEGER NOT NULL,
//     quantity INTEGER NOT NULL,
//     FOREIGN KEY (bookingId) REFERENCES bookings(id),
//     FOREIGN KEY (productId) REFERENCES products(id)
//   )`);
//     });
//     console.log("Database and table created successfully.");
//   } catch (error) {
//     console.error("Error creating database and table:", error);
//   } finally {
//     db.close();
//   }
// }
// createDatabaseAndTable();
//# sourceMappingURL=create_database.js.map