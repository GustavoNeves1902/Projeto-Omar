const inputFoto = document.getElementById("input-foto");
const botaoSalvar = document.getElementById("botao-foto");
const imagemPerfil = document.querySelector(".imagem-perfil")

botaoSalvar.addEventListener("click", ()=>{
    const arquivo = inputFoto.files[0];
    if(arquivo){
        const reader = new FileReader();
        reader.onload = function(e){
            imagemPerfil.src = e.target.result;
        };
        reader.readAsDataURL(arquivo);
    }else{
        alert("Selecione uma imagem primeiro");
    }
});

const inputNome = document.getElementById("novo_nome_usuario");
const botaoNome = document.getElementById("botao-nome");
const nomePerfil = document.getElementById("nome-perfil");

botaoNome.addEventListener("click", ()=>{
    const novoNome = inputNome.value.trim();
    if(novoNome !== ""){
        fetch("http://localhost:3000/aluno/1/nome", {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({nome_perfil: novoNome})
        })
        .then(res => res.text())
        .then(msg => {
            nomePerfil.textContent = novoNome;
            inputNome.value = "";
            alert(msg);
        })
        .catch(err => console.log("Erro ao atualizar nome: ", err));
    }else{
        alert("Selecione um nome válido");
    }
});

botaoSalvar.addEventListener("click", ()=> {
    const arquivo = inputFoto.files[0];
    if(arquivo){
        const formData = new FormData();
        formData.append("foto", arquivo);

        fetch("http://localhost:3000/aluno/1/foto", {
            method: "PUT",
            body: formData
        })
        .then(res => res.text())
        .then(msg => {
            // Atualiza a imagem localmente
            const reader = new FileReader();
            reader.onload = function(e){
                imagemPerfil.src = e.target.result;
            };
            reader.readAsDataURL(arquivo);

            alert(msg);
        })
        .catch(err => console.error("Erro ao atualizar foto:", err));
    } else {
        alert("Selecione uma imagem primeiro");
    }
});

document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/aluno/1")
    .then(res => res.json())
    .then(data => {
      // Atualiza o nome do perfil
      document.getElementById("nome-perfil").textContent = data.nome_perfil;

      // Atualiza a foto do perfil (se houver)
      if (data.foto) {
        document.querySelector(".imagem-perfil").src = `data:image/png;base64,${data.foto}`;
      }
    })
    .catch(err => console.error("Erro ao buscar aluno:", err));
});