document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('btnComecar');

  btn.addEventListener('click', () => {
    // ajuste aqui para rolar até o cardápio ou redirecionar para o totem/catálogo
    const catalogo = document.querySelector('#cardapio') || document.querySelector('#catalogo');
    if (catalogo) {
      catalogo.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = 'totem.html';
    }
  });
});