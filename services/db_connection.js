const mysql = require("mysql2/promise");
const config = require("../config");

async function query(sql, params) {
  const connection = await mysql.createConnection(config.db);
  connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
  });
  const [results] = await connection.execute(sql, params);

  return results;
}

module.exports = {
  query,
};
