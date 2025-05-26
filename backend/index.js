require("dotenv").config();
const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// اطلاعات اتصال به MySQL (اطمینان حاصل کن که این مقادیر با XAMPP هماهنگ باشند)
const MYSQL_HOST = process.env.MYSQL_HOST || "localhost";
const MYSQL_USER = process.env.MYSQL_USER || "root";
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || "";
const MAIN_DB = process.env.MAIN_DB || "pertech_db"; // دیتابیس اصلی برای ثبت شرکت‌ها

// اتصال عمومی به MySQL (بدون دیتابیس)
async function getConnection(db = null) {
  return await mysql.createConnection({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: db || undefined,
    multipleStatements: true,
  });
}

// ایجاد دیتابیس اولیه pertech_db و جدول ثبت شرکت‌ها و کاربران اصلی
async function initMainDatabase() {
  const conn = await getConnection();
  await conn.query(`CREATE DATABASE IF NOT EXISTS \`${MAIN_DB}\`;`);
  await conn.changeUser({ database: MAIN_DB });
  await conn.query(`
    CREATE TABLE IF NOT EXISTS companies (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(50) UNIQUE NOT NULL,
      db_name VARCHAR(100) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  await conn.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(50) NOT NULL,
      password VARCHAR(100) NOT NULL,
      company_db VARCHAR(100) NOT NULL,
      role ENUM('admin', 'employee') DEFAULT 'employee',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  await conn.end();
}

// ایجاد دیتابیس اختصاصی برای هر شرکت با حداقل جدول کاربران
async function createCompanyDatabase(companyDbName) {
  const conn = await getConnection();
  await conn.query(`CREATE DATABASE IF NOT EXISTS \`${companyDbName}\`;`);
  await conn.changeUser({ database: companyDbName });
  // جدول محصولات نمونه
  await conn.query(`
    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      price DECIMAL(12,2) NOT NULL,
      stock INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  // جدول کاربران شرکت
  await conn.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(50) NOT NULL,
      password VARCHAR(100) NOT NULL,
      role ENUM('admin', 'employee') DEFAULT 'employee',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  await conn.end();
}

// ثبت‌نام شرکت (ایجاد دیتابیس و مدیر)
app.post("/api/register-company", async (req, res) => {
  const { companyName, adminUsername, adminPassword } = req.body;
  if (!companyName || !adminUsername || !adminPassword)
    return res.status(400).json({ error: "همه فیلدها اجباری است" });

  const companyDbName = `pertech_${companyName.replace(/\s+/g, "_").toLowerCase()}`;
  try {
    // ایجاد دیتابیس شرکت و جداول مربوطه
    await createCompanyDatabase(companyDbName);

    // ذخیره شرکت در دیتابیس اصلی
    const conn = await getConnection(MAIN_DB);
    await conn.query(
      "INSERT INTO companies (name, db_name) VALUES (?, ?)",
      [companyName, companyDbName]
    );
    // ذخیره یوزر ادمین در دیتابیس اصلی
    await conn.query(
      "INSERT INTO users (username, password, company_db, role) VALUES (?, ?, ?, 'admin')",
      [adminUsername, adminPassword, companyDbName]
    );
    await conn.end();

    // ذخیره یوزر ادمین در دیتابیس شرکت
    const conn2 = await getConnection(companyDbName);
    await conn2.query(
      "INSERT INTO users (username, password, role) VALUES (?, ?, 'admin')",
      [adminUsername, adminPassword]
    );
    await conn2.end();

    res.json({ success: true, companyDbName });
  } catch (err) {
    res.status(500).json({ error: "خطا در ثبت شرکت: " + err.message });
  }
});

// ورود (login)
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const conn = await getConnection(MAIN_DB);
  const [users] = await conn.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password]
  );
  await conn.end();
  if (users.length === 0)
    return res.status(401).json({ error: "نام کاربری یا رمز عبور اشتباه است" });

  res.json({
    success: true,
    user: {
      id: users[0].id,
      username: users[0].username,
      company_db: users[0].company_db,
      role: users[0].role,
    },
  });
});

// افزودن کارمند جدید به شرکت (فقط ادمین شرکت)
app.post("/api/:companyDb/add-employee", async (req, res) => {
  const { companyDb } = req.params;
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ error: "نام کاربری و رمز عبور لازم است" });

  try {
    const conn = await getConnection(companyDb);
    await conn.query(
      "INSERT INTO users (username, password, role) VALUES (?, ?, 'employee')",
      [username, password]
    );
    await conn.end();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "خطا در افزودن کارمند: " + err.message });
  }
});

// دریافت لیست محصولات (کاربران شرکت)
app.get("/api/:companyDb/products", async (req, res) => {
  const { companyDb } = req.params;
  try {
    const conn = await getConnection(companyDb);
    const [rows] = await conn.query("SELECT * FROM products");
    await conn.end();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "خطا در دریافت محصولات: " + err.message });
  }
});

// افزودن محصول جدید
app.post("/api/:companyDb/products", async (req, res) => {
  const { companyDb } = req.params;
  const { name, price, stock } = req.body;
  try {
    const conn = await getConnection(companyDb);
    await conn.query(
      "INSERT INTO products (name, price, stock) VALUES (?, ?, ?)",
      [name, price, stock]
    );
    await conn.end();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "خطا در افزودن محصول: " + err.message });
  }
});

// راه‌اندازی سرور و دیتابیس اصلی
const PORT = process.env.PORT || 4000;
initMainDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`pertech backend running on port ${PORT}`);
  });
});