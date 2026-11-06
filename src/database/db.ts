import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('invoices.db');

export const initDatabase = () => {
  // 1. جدول العملاء الجديد
  db.execSync(`
    CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE -- تمنع تكرار نفس الاسم
    );
  `);

  // 2. جدول الفواتير (تعديل ليرتبط بـ customer_id بدلاً من مجرد نص)
  db.execSync(`
    CREATE TABLE IF NOT EXISTS invoices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      invoice_number TEXT NOT NULL,
      customer_id INTEGER, -- ربط مع جدول العملاء
      customer_name TEXT,  -- نتركها للاحتياط أو لعرض سريع
      created_at TEXT NOT NULL,
      currency TEXT DEFAULT 'YER',
      status TEXT DEFAULT 'نقداً',
      FOREIGN KEY (customer_id) REFERENCES customers (id)
    );
  `);

  // 3. جدول أصناف الفاتورة (كما هو)
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
};