const form = document.getElementById('formFornecedor');
const lista = document.getElementById('lista');
let fornecedores = JSON.parse(localStorage.getItem('fornecedores') || '[]');

function mostrar() {
  lista.innerHTML = fornecedores.map(f => `
    <div class="fornecedor">
      ${f.nome} - ${f.cnpj} - ${f.contato}
    </div>`).join('');
}

form.addEventListener('submit', e => {
  e.preventDefault();
  fornecedores.push({
    nome: form.nome.value,
    cnpj: form.cnpj.value,
    contato: form.contato.value
  });
  localStorage.setItem('fornecedores', JSON.stringify(fornecedores));
  mostrar();
  form.reset();
});

mostrar();
