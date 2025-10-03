const validator = require('validator');

function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(9))) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(10))) return false;

  return true;
}

function validarRG(rg) {
  return /^[0-9]{5,20}$/.test(rg);
}

function validarTelefone(telefone) {
  return /^[0-9]{10,15}$/.test(telefone);
}

function validarNome(nome) {
  return /^[A-Za-zÀ-ÿ\s]{3,100}$/.test(nome);
}

module.exports = {
  validarCPF,
  validarRG,
  validarTelefone,
  validarNome,
};
