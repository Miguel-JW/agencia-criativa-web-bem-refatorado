// ── Menu hamburguer ──────────────────────────

const navToggle = document.getElementById('navToggle');
const mainNav   = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  navToggle.classList.toggle('active', open);
  navToggle.setAttribute('aria-expanded', open);
});

// Fechar menu ao clicar em um link
mainNav.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', false);
  });
});

// ── Validação do formulário de contato ───────

const form        = document.getElementById('formContato');
const feedback    = document.getElementById('formFeedback');

const campos = [
  { id: 'nome',     erroId: 'erroNome',     msg: 'Informe seu nome.'      },
  { id: 'email',    erroId: 'erroEmail',    msg: 'Informe um e-mail válido.' },
  { id: 'mensagem', erroId: 'erroMensagem', msg: 'Escreva sua mensagem.'   },
];

function validarCampo({ id, erroId, msg }) {
  const el    = document.getElementById(id);
  const erro  = document.getElementById(erroId);
  const vazio = el.value.trim() === '';
  const emailInvalido = id === 'email' && !el.value.includes('@');

  const invalido = vazio || emailInvalido;
  el.classList.toggle('invalido', invalido);
  erro.textContent = invalido ? msg : '';
  return !invalido;
}

// Validação em tempo real
campos.forEach(c => {
  document.getElementById(c.id).addEventListener('input', () => validarCampo(c));
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const validos = campos.map(validarCampo);

  if (validos.every(Boolean)) {
    feedback.textContent = '✓ Mensagem enviada! Retornaremos em breve.';
    feedback.className   = 'form-feedback sucesso';
    form.reset();
    setTimeout(() => { feedback.textContent = ''; feedback.className = 'form-feedback'; }, 4000);
  } else {
    feedback.textContent = 'Corrija os campos em vermelho.';
    feedback.className   = 'form-feedback erro';
  }
});

// ── Header sombra ao rolar ───────────────────

const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 20
    ? '0 2px 24px rgba(0,0,0,0.4)'
    : 'none';
});
