import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

// SUA CONFIGURAÇÃO REAL
const firebaseConfig = {
  apiKey: "AIzaSyCOsIklRs-PtT1kxHQ5My-CUgd1n7mzUnI",
  authDomain: "teste-6f017.firebaseapp.com",
  databaseURL: "https://teste-6f017-default-rtdb.firebaseio.com/",
  projectId: "teste-6f017",
  storageBucket: "teste-6f017.firebasestorage.app",
  messagingSenderId: "331373288049",
  appId: "1:331373288049:web:5ae39c50baac6490f2d9d0",
  measurementId: "G-6C2EWKD698"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const form = document.getElementById("form-recado");
const lista = document.getElementById("lista-recados");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const autor = document.getElementById("autor").value.trim();
  const turma = document.getElementById("turma").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();

  if (!autor || !turma || !mensagem) {
    alert("Preencha todos os campos.");
    return;
  }

  push(ref(db, "recados"), {
    autor,
    turma,
    mensagem
  });

  form.reset();
});

onValue(ref(db, "recados"), (snapshot) => {
  lista.innerHTML = "";

  if (!snapshot.exists()) {
    lista.innerHTML = "<p>Nenhum recado cadastrado ainda.</p>";
    return;
  }

  snapshot.forEach((item) => {
    const dados = item.val();

    lista.innerHTML += `
      <div class="recado">
        <strong>${dados.autor}</strong> - ${dados.turma}
        <p>${dados.mensagem}</p>
        <button onclick="removerRecado('${item.key}')">Excluir</button>
      </div>
    `;
  });
});

window.removerRecado = function (id) {
  remove(ref(db, "recados/" + id));
};