const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  connectionLimit: "10",
  host: "localhost",
  user: "root",
  password: "",
  database: "book_my_show",
});

module.exports = pool;
