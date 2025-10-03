const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Servir arquivos HTML, CSS, JS da pasta public/
app.use(express.static('public'));

// Rotas da API (login/cadastro)
app.use(authRoutes);

// Porta do servidor fixada em 5000 para evitar conflito com outras aplicações
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
