const sqlite3 = require('sqlite3').verbose();

// --> Conexão com o banco de dados
const db = new sqlite3.Database(':memory:');


db.serialize(() => {
  db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)");
  db.run("INSERT INTO users (username, password) VALUES ('admin', '12345')");
  db.run("INSERT INTO users (username, password) VALUES ('user', 'password')");
});

module.exports = db;
