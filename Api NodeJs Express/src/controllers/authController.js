const db = require('../database/db');
const bcrypt = require('bcrypt');
const validator = require('validator'); // <- IMPORTAÇÃO FALTANDO (corrigido aqui)
const {
  validarCPF,
  validarRG,
  validarTelefone,
  validarNome,
} = require('../validations/validators');

exports.cadastrar = async (req, res) => {
  const {
    nome,
    cpf,
    rg,
    data_nascimento,
    endereco,
    telefone,
    email,
    email_confirmation,
    senha,
    senha_confirmation,
    genero,
  } = req.body;

  if (
    !nome || !cpf || !rg || !data_nascimento || !endereco ||
    !telefone || !email || !email_confirmation ||
    !senha || !senha_confirmation || !genero
  ) {
    return res.status(400).send('Todos os campos são obrigatórios.');
  }

  if (email !== email_confirmation) return res.status(400).send('Os e-mails não coincidem.');
  if (senha !== senha_confirmation) return res.status(400).send('As senhas não coincidem.');
  if (!validarCPF(cpf)) return res.status(400).send('CPF inválido.');
  if (!validarRG(rg)) return res.status(400).send('RG inválido.');
  if (!validarNome(nome)) return res.status(400).send('Nome inválido.');
  if (!validarTelefone(telefone)) return res.status(400).send('Telefone inválido.');
  if (!validator.isEmail(email)) return res.status(400).send('Email inválido.');

  db.query('SELECT * FROM usuarios WHERE cpf = ? OR email = ?', [cpf, email], async (err, results) => {
    if (err) return res.status(500).send('Erro ao verificar dados existentes.');

    if (results.length > 0) {
      const mensagens = [];
      results.forEach(r => {
        if (r.cpf === cpf) mensagens.push('CPF já cadastrado.');
        if (r.email === email) mensagens.push('Email já cadastrado.');
      });
      return res.status(400).send(mensagens.join(' '));
    }

    const hash = await bcrypt.hash(senha, 10);
    db.query(
      'INSERT INTO usuarios (nome, cpf, rg, data_nascimento, endereco, telefone, email, senha_hash, genero) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [nome, cpf, rg, data_nascimento, endereco, telefone, email, hash, genero],
      (err) => {
        if (err) return res.status(500).send('Erro ao cadastrar usuário.');
        res.status(200).send('OK');
      }
    );
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).send('Email e senha são obrigatórios.');

  db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).send('Erro ao buscar usuário.');
    if (results.length === 0) return res.status(400).send('Usuário não encontrado.');

    const usuario = results[0];
    const senhasIguais = await bcrypt.compare(password, usuario.senha_hash);
    if (!senhasIguais) return res.status(400).send('Senha incorreta.');

    res.status(200).send('OK');
  });
};
