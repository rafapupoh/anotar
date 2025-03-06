const notaInput = document.getElementById("nota");
const salvarBtn = document.getElementById("salvar");
const listaNotas = document.getElementById("lista-notas");

function carregarNotas() {
  const notas = JSON.parse(localStorage.getItem("notas")) || [];
  listaNotas.innerHTML = "";
  notas.forEach((nota, index) => {
    adicionarNotaNaLista(nota, index);
  });
}

function adicionarNotaNaLista(nota, index) {
  const li = document.createElement("li");
  li.innerHTML = `
    <span>${nota}</span>
    <button data-index="${index}">Excluir</button>
  `;
  listaNotas.appendChild(li);
}

function salvarNota() {
  const nota = notaInput.value;
  if (nota) {
    const notas = JSON.parse(localStorage.getItem("notas")) || [];
    notas.push(nota);
    localStorage.setItem("notas", JSON.stringify(notas));
    notaInput.value = "";
    carregarNotas();
  }
}

function excluirNota(index) {
  const notas = JSON.parse(localStorage.getItem("notas")) || [];
  notas.splice(index, 1);
  localStorage.setItem("notas", JSON.stringify(notas));
  carregarNotas();
}

salvarBtn.addEventListener("click", salvarNota);
listaNotas.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    excluirNota(event.target.dataset.index);
  }
});

carregarNotas();