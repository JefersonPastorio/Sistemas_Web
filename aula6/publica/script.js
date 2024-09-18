document.getElementById("meuForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const idUser = document.getElementById("enConsulta").value;
  const url = `http://localhost:3000/usuarios/${idUser}`;
  const usuario = document.getElementById('enUsuario').value;
  const senha = document.getElementById('enSenha').value;
  const auth = 'Basic' + window.btoa(usuario + ':' + senha);
  fetch(url, {
    method: "GET",
    headers: {
        'Authorization': auth,
        'Content-Type': 'application/json',
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Erro: Usuário não localizado!");
      }
      return response.json();
    })
    .then(data => {
      document.getElementById("saConsulta").textContent = JSON.stringify( data,null,2);
    })
    .catch((erro) => {
      document.getElementById("saConsulta").textContent = erro.message;
    });
});
