// database.js

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('comandas.db');

// Criação da tabela de comandas se não existir
db.run(`
    CREATE TABLE IF NOT EXISTS comandas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        quantidade INTEGER,
        preco REAL
    )
`);

module.exports = db;
