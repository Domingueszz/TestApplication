const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database'); 

const app = express();
app.use(bodyParser.json());


app.get('/login', (req, res) => {
  const { username, password } = req.query;

 
  
  // --> Correção: <--
  const query = `SELECT * FROM users WHERE username = ? AND password = ?`;

  console.log(`Executando consulta: ${query}`);

  db.all(query, [username, password], (err, rows) => {

    if (err) {
      res.status(500).send('Erro no servidor.');
    } else if (rows.length > 0) {
      res.send('Login bem-sucedido!');
    } else {
      res.send('Credenciais inválidas!');
    }
  });
});


app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});


/* TESTES:
- s/ Vulnerabilidade: http://localhost:3000/login?username=admin&password=wrongpassword

- c/ Vulnerabilidade: http://localhost:3000/login?username=admin'--&password=anything

*/