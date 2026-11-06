import * as SQLite from "expo-sqlite";

import { Invoice, InvoiceItem, Customer } from "../types/invoice.types";

const db = SQLite.openDatabaseSync("invoices.db");

export const InvoiceRepository = {
  // تهيئة الجداول (الكود الحالي الخاص بك دون تعديل)
  init() {
    db.execSync(`
      CREATE TABLE IF NOT EXISTS customers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE
      );
    `);
    db.execSync(`
      CREATE TABLE IF NOT EXISTS invoices (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        invoice_number TEXT NOT NULL,
        customer_name TEXT NOT NULL,
        currency TEXT NOT NULL,
        status TEXT NOT NULL,
        created_at TEXT NOT NULL
      );
    `);
    db.execSync(`
      CREATE TABLE IF NOT EXISTS invoice_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        invoice_id INTEGER,
        item_name TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        price REAL NOT NULL,
        FOREIGN KEY (invoice_id) REFERENCES invoices (id) ON DELETE CASCADE
      );
    `);
  },

  // === العمليات الخاصة بالعملاء ===
  getCustomers(): Customer[] {
    return db.getAllSync("SELECT * FROM customers ORDER BY name ASC");
  },

  getCustomerByName(name: string): Customer | null {
    return db.getFirstSync("SELECT id, name FROM customers WHERE name = ?", [name]);
  },

  createCustomer(name: string): number {
    const result = db.runSync("INSERT INTO customers (name) VALUES (?)", [name]);
    return result.lastInsertRowId;
  },

  // === العمليات الخاصة بالفواتير ===
  
  // 1. جلب كل الفواتير الرئيسية مرتبة من الأحدث إلى الأقدم
  getAllInvoices(): any[] {
    return db.getAllSync("SELECT * FROM invoices ORDER BY id DESC");
  },

  // 2. جلب الأصناف التابعة لفاتورة معينة
  getItemsByInvoiceId(invoiceId: number): InvoiceItem[] {
    return db.getAllSync(
      "SELECT id, item_name, quantity, price FROM invoice_items WHERE invoice_id = ?",
      [invoiceId]
    );
  },

  // 3. حساب إجمالي الفاتورة من قاعدة البيانات لتقليل عمليات الـ Loops في الواجهة
  getInvoiceTotal(invoiceId: number): number {
    const result = db.getFirstSync<{ total: number }>(
      "SELECT SUM(quantity * price) as total FROM invoice_items WHERE invoice_id = ?",
      [invoiceId]
    );
    return result?.total || 0;
  },

  createInvoice(invoiceNumber: string, customerName: string, currency: string, status: string, createdAt: string): number {
    const result = db.runSync(
      "INSERT INTO invoices (invoice_number, customer_name, currency, status, created_at) VALUES (?, ?, ?, ?, ?)",
      [invoiceNumber, customerName, currency, status, createdAt]
    );
    return result.lastInsertRowId;
  },

  createInvoiceItem(invoiceId: number, itemName: string, quantity: number, price: number) {
    db.runSync(
      "INSERT INTO invoice_items (invoice_id, item_name, quantity, price) VALUES (?, ?, ?, ?)",
      [invoiceId, itemName, quantity, price]
    );
  }
};

