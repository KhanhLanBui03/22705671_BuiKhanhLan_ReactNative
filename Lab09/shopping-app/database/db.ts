import * as SQLite from "expo-sqlite";

// Khởi tạo database và trả về đối tượng db
export async function initDB() {
  try {
    const db = await SQLite.openDatabaseAsync("shop.db");

    // Bật khóa ngoại
    await db.execAsync("PRAGMA foreign_keys = ON;");

    // Tạo bảng nếu chưa có
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        price REAL,
        stock INTEGER
      );

      CREATE TABLE IF NOT EXISTS cart (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id INTEGER,
        quantity INTEGER,
        FOREIGN KEY(product_id) REFERENCES products(id)
      );
    `);

    // Thêm dữ liệu mẫu nếu bảng trống
    const result = await db.getFirstAsync<{ count: number }>(
      "SELECT COUNT(*) as count FROM products"
    );

    if (!result || result.count === 0) {
      await db.execAsync(`
        INSERT INTO products (name, price, stock)
        VALUES
        ('Áo thun', 120000, 10),
        ('Quần jean', 350000, 8),
        ('Giày sneaker', 800000, 5);
      `);
      console.log("✅ Đã thêm dữ liệu mẫu vào bảng products");
    }

    console.log("✅ Database khởi tạo thành công!");
    return db;
  } catch (error) {
    console.error("❌ Lỗi khi khởi tạo database:", error);
    throw error;
  }
}

export default initDB;
