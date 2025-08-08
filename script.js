
document.getElementById('freteForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const origem = document.getElementById('origem').value;
  const destino = document.getElementById('destino').value;
  const peso = parseFloat(document.getElementById('peso').value);

  const precoPorKg = 2.50;
  const frete = peso * precoPorKg;

  const resultado = `De ${origem} para ${destino}, o valor do frete é R$ ${frete.toFixed(2)}.`;
  document.getElementById('resultado').textContent = resultado;
});
