function mostrarCotacao() {
  document.getElementById('resultado').innerText = 'R$ 154,90 - Cotação Simulada';
}
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
function mostrarFormulario() {
  document.getElementById('formulario').style.display = 'block';
  document.getElementById('relatorios').style.display = 'none';
}

function mostrarRelatorios() {
  document.getElementById('formulario').style.display = 'none';
  document.getElementById('relatorios').style.display = 'block';
}
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Fornecedores from './pages/Fornecedores';
import Veiculos from './pages/Veiculos';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fornecedores" element={<Fornecedores />} />
        <Route path="/veiculos" element={<Veiculos />} />
        {/* Adicione mais aqui */}
      </Routes>
    </BrowserRouter>
  );
}
function Fornecedores() {
  return (
    <div>
      <h1>Cadastro de Fornecedores</h1>
      {/* Formulário de cadastro */}
    </div>
  );
}
export default Fornecedores;
