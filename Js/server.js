// server.js

const express = require('express');
const app = express();
const port = 3000;
const db = require('./database');

// Configuração do banco de dados
require('./database');

app.use(express.json());

// Rota para criar uma nova comanda
app.post('/comandas', (req, res) => {
    const nome = req.body.nome;
    const quantidade = req.body.quantidade;
    const preco = req.body.preco;

    db.run('INSERT INTO comandas (nome, quantidade, preco) VALUES (?, ?, ?)', [nome, quantidade, preco], function(err) {
        if (err) {
            return console.log(err.message);
        }
        res.json({ id: this.lastID });
    });
});

// Rota para obter todas as comandas
app.get('/comandas', (req, res) => {
    db.all('SELECT * FROM comandas', (err, rows) => {
        if (err) {
            return console.log(err.message);
        }
        res.json(rows);
    });
});

// Adicione outras rotas conforme necessário

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
