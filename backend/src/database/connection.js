const mysql = require("mysql2/promise");

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "", // coloque sua senha se tiver
  database: "nome_do_banco",
});

module.exports = connection;


