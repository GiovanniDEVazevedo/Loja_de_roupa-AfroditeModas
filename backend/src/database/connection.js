const mysql = require("mysql2/promise");

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "08111999", 
  database: "nome_do_banco",
});

module.exports = connection;


