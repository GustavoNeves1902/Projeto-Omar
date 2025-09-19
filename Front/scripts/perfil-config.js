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
        nomePerfil.textContent = novoNome;
        inputNome.value = "";
    }else{
        alert("Selecione um nome válido");
    }
});