import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("invoice_app.db");

export interface ShopSettings {
  name: string;
  phone: string;
  address: string;
  amqiAccount: string;
  busairiAccount: string;
}

// إنشاء الجدول وإضافة البيانات الافتراضية إذا كان فارغاً
export const initShopTable = async () => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS shop_settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      phone TEXT,
      address TEXT,
      amqi_account TEXT,
      busairi_account TEXT
    );
  `);

  const existing = await db.getAllAsync<ShopSettings>("SELECT * FROM shop_settings WHERE id = 1");
  if (existing.length === 0) {
    await db.runAsync(
      `INSERT INTO shop_settings (id, name, phone, address, amqi_account, busairi_account) 
       VALUES (1, ?, ?, ?, ?, ?)`,
      [
        "بيت الأناقة للارواب والكندورات والملابس الداخلية",
        "770743837",
        "حضرموت-الشحر-سوق شبام امام السعدي للأثاث والزجاج",
        "254000007",
        "335000006"
      ]
    );
  }
};

// جلب إعدادات المحل
export const getShopSettings = async (): Promise<ShopSettings | null> => {
  const result = await db.getAllAsync<any>("SELECT * FROM shop_settings WHERE id = 1");
  if (result.length > 0) {
    const row = result[0];
    return {
      name: row.name,
      phone: row.phone,
      address: row.address,
      amqiAccount: row.amqi_account,
      busairiAccount: row.busairi_account,
    };
  }
  return null;
};

// تحديث إعدادات المحل
export const updateShopSettingsDB = async (settings: ShopSettings) => {
  await db.runAsync(
    `UPDATE shop_settings 
     SET name = ?, phone = ?, address = ?, amqi_account = ?, busairi_account = ? 
     WHERE id = 1`,
    [settings.name, settings.phone, settings.address, settings.amqiAccount, settings.busairiAccount]
  );
};