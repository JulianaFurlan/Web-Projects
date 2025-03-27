document.addEventListener("DOMContentLoaded", function() {
    const formRelatorio = document.getElementById("formRelatorio");
    const listaRelatorios = document.getElementById("listaRelatorios");
    const btnApagarUltimo = document.getElementById("apagarUltimo");

    // Carregar relatórios salvos ao iniciar a página
    function carregarRelatorios() {
        const relatoriosSalvos = JSON.parse(localStorage.getItem("relatorios")) || [];
        relatoriosSalvos.forEach(relatorio => adicionarRelatorioNaLista(relatorio.titulo, relatorio.descricao));
    }

    // Salvar relatórios no LocalStorage
    function salvarRelatorios() {
        const itens = listaRelatorios.querySelectorAll("li");
        let relatorios = [];
        itens.forEach(item => {
            relatorios.push({
                titulo: item.querySelector("strong").innerText,
                descricao: item.innerText.replace(item.querySelector("strong").innerText, "").trim()
            });
        });
        localStorage.setItem("relatorios", JSON.stringify(relatorios));
    }

    // Adicionar relatório na lista
    function adicionarRelatorioNaLista(titulo, descricao) {
        let novoRelatorio = document.createElement("li");
        novoRelatorio.innerHTML = `<strong>${titulo}</strong><br>${descricao.replace(/\n/g, "<br>")}<hr>`;
        listaRelatorios.appendChild(novoRelatorio);
    }

    // Evento de envio do formulário
    formRelatorio.addEventListener("submit", function(event) {
        event.preventDefault();

        let titulo = document.getElementById("titulo").value;
        let descricao = document.getElementById("descricao").value;

        adicionarRelatorioNaLista(titulo, descricao);
        salvarRelatorios();

        document.getElementById("titulo").value = "";
        document.getElementById("descricao").value = "";
    });

    // Apagar o último relatório inserido
    btnApagarUltimo.addEventListener("click", function() {
        let itens = listaRelatorios.querySelectorAll("li");
        if (itens.length > 0) {
            listaRelatorios.removeChild(itens[itens.length - 1]); // Remove o último item
            salvarRelatorios(); // Atualiza o LocalStorage
        }
    });

    // Carregar os relatórios quando a página for carregada
    carregarRelatorios();
});

