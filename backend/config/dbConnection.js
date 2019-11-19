const mysql = require('mysql');

const connMySQL = function () {
  return mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'teste',
      multipleStatements: true
    }
  );
}

module.exports = function () {
  return connMySQL;
}