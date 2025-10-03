// script.js
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('form_login');
  const registerForm = document.getElementById('form_cadastro');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const msg1 = document.getElementById('msg1');

      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const text = await res.text();
      if (text === 'OK') {
        window.location.href = 'login-sucess.html';
      } else {
        msg1.innerText = text;
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const data = Object.fromEntries(new FormData(registerForm));
      const msg = document.getElementById('msg');

      const res = await fetch('/api/cadastrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const text = await res.text();
      if (text === 'OK') {
        window.location.href = 'register-sucess.html';
      } else {
        msg.innerText = text;
      }
    });
  }
});
