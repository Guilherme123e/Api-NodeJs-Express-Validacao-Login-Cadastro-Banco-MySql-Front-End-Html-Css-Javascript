document.getElementById('simular1').addEventListener('click', function () {
  document.getElementById('nome').value = 'Guilherme Oliveira';
  document.getElementById('cpf').value = '12345678909'; // CPF só com números
  document.getElementById('rg').value = '1234567';       // RG sem pontuação
  document.getElementById('data_nascimento').value = '1990-05-15';
  document.getElementById('endereco').value = 'Rua das Flores, 123, Belo Horizonte';
  document.getElementById('telefone').value = '31987654321';
  document.getElementById('email').value = 'guilherme@example.com';
  document.getElementById('confemail').value = 'guilherme@example.com';
  document.getElementById('senha').value = 'SenhaForte123!';
  document.getElementById('confsenha').value = 'SenhaForte123!';
  document.getElementById('genero').value = 'masculino';
});
