// Variáveis para armazenar as comandas e o total
const comandas = [];
let comandaAtual = [];
let total = 0;

// Função para criar uma nova comanda
function criarNovaComanda() {
    comandaAtual = [];
    comandas.push(comandaAtual);

    // Atualiza a lista de comandas disponíveis
    atualizarListaDeComandas();

    // Limpa a comanda atual
    limparComanda();
}

// Função para atualizar a lista de comandas disponíveis
function atualizarListaDeComandas() {
    const listaDeComandas = document.getElementById("listaDeComandas");
    listaDeComandas.innerHTML = "";

    // Adiciona um botão para cada comanda disponível
    comandas.forEach((comanda, index) => {
        const botaoComanda = document.createElement("button");
        botaoComanda.textContent = `Comanda ${index + 1}`;
        botaoComanda.onclick = () => selecionarComanda(index);
        listaDeComandas.appendChild(botaoComanda);
    });
}

// Função para selecionar uma comanda existente
function selecionarComanda(index) {
    comandaAtual = comandas[index];

    // Limpa a lista de pedidos na comanda atual
    const comandaList = document.getElementById("comandaList");
    comandaList.innerHTML = "";

    // Preenche a lista de pedidos da comanda selecionada
    comandaAtual.forEach((pedido, index) => {
        const listItem = criarElementoPedido(pedido, index);
        comandaList.appendChild(listItem);
    });

    // Atualiza o total
    atualizarTotal();
}

// Função para calcular o total da comanda
function calcularTotal(comanda) {
    return comanda.reduce((total, pedido) => total + pedido.preco, 0);
}
//////////////////////////////////////////////

//Integração com o servidor usando AJAX
function enviarComandaParaServidor() {
    const xhr = new XMLHttpRequest();
    const url = "https://pedroonayquen.github.io/Comanda-Digital/"; // Substitua pela URL correta do seu servidor
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    // Prepara os dados para enviar ao servidor
    const dadosParaEnviar = JSON.stringify({ comanda: comandaAtual });

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Limpa a comanda após o sucesso
            limparComanda();
        }
    };

    // Envia os dados para o servidor
    xhr.send(dadosParaEnviar);
}

// Função para adicionar um pedido à comanda atual
function adicionarPedido(itemNome, quantidade, itemPreco) {
    const valorPedido = itemPreco * quantidade;

    // Adicionar o pedido à comanda atual
    comandaAtual.push({ nome: itemNome, quantidade, preco: valorPedido });

    // Atualizar a lista de pedidos na comanda atual
    atualizarComanda();

    // Atualizar o total
    atualizarTotal();

    // Enviar a comanda para o servidor
    enviarComandaParaServidor();
}

////////////////////////////////////////

// Função para criar um elemento de pedido na lista da comanda
function criarElementoPedido(pedido, index) {
    const listItem = document.createElement("li");
    listItem.innerHTML = `${pedido.quantidade} ${pedido.nome} - R$ ${pedido.preco.toFixed(2)} 
        <div>
            <button class="item-button" onclick="decrementarQuantidade(${index})">-</button>
            <button class="item-button" onclick="incrementarQuantidade(${index})">+</button>
        </div>`;
    return listItem;
}

// Função para atualizar a lista de pedidos na comanda atual
function atualizarComanda() {
    const comandaList = document.getElementById("comandaList");
    comandaList.innerHTML = "";

    // Percorrer a lista de pedidos na comanda atual
    comandaAtual.forEach((pedido, index) => {
        const listItem = criarElementoPedido(pedido, index);
        comandaList.appendChild(listItem);
    });

    // Atualizar o total
    atualizarTotal();
}

// Função para limpar a comanda
function limparComanda() {
    comandaAtual.length = 0;

    // Limpar a lista de pedidos na comanda atual
    atualizarComanda();

    // Atualizar o total
    total = 0;
    document.getElementById("total").textContent = "R$ " + total.toFixed(2);
}

function exibirItensDoMenu() {
    const itensMenu = document.getElementById("itensMenu");
        // Lista de itens com nome, preço e categoria
        const itens = [
            { nome: "Carne de Gado", preco: 5.00, categoria: "Espetos" },
            { nome: "Asa de Frango", preco: 5.00, categoria: "Espetos" },
            { nome: "Frango", preco: 4.00, categoria: "Espetos" },
            { nome: "Porco", preco: 4.00, categoria: "Espetos" },
            { nome: "Queijo", preco: 4.00, categoria: "Espetos" },
            { nome: "Calabresa", preco: 4.00, categoria: "Espetos" },
            { nome: "Coração de Frango", preco: 4.00, categoria: "Espetos" },
            { nome: "Carne do Sol", preco: 5.00, categoria: "Espetos" },
            { nome: "Baião Cremoso", preco: 6.00, categoria: "Guarnições" },
            { nome: "Arroz de Queijo", preco: 6.00, categoria: "Guarnições" },
            { nome: "Cuscuz", preco: 8.00, categoria: "Guarnições" },
            { nome: "Tapioca", preco: 8.00, categoria: "Guarnições" },
            { nome: "Batata Frita", preco: 12.00, categoria: "Guarnições" },
            { nome: "Coca 2L", preco: 12.00, categoria: "Refrigerantes" },
            { nome: "Coca 1L", preco: 8.00, categoria: "Refrigerantes" },
            { nome: "Coca 600ml", preco: 7.00, categoria: "Refrigerantes" },
            { nome: "Coca KS", preco: 3.00, categoria: "Refrigerantes" },
            { nome: "Coca Lata", preco: 5.00, categoria: "Refrigerantes" },
            { nome: "Delrio 2L", preco: 8.00, categoria: "Refrigerantes" },
            { nome: "Delrio 1L", preco: 6.00, categoria: "Refrigerantes" },
            { nome: "Gua. Antarc 1L", preco: 6.00, categoria: "Refrigerantes" },
            { nome: "Refri 250ml", preco: 2.00, categoria: "Refrigerantes" },
            { nome: "Fanta Lata", preco: 5.00, categoria: "Refrigerantes" },
            { nome: "Fresh Limão", preco: 5.00, categoria: "Refrigerantes" },
            { nome: "Sprite", preco: 5.00, categoria: "Refrigerantes" },
            { nome: "Red Bull", preco: 12.00, categoria: "Refrigerantes" },
            { nome: "Água 1,5L", preco: 4.00, categoria: "Refrigerantes" },
            { nome: "Água com Gás", preco: 3.00, categoria: "Refrigerantes" },
            { nome: "Água sem Gás", preco: 1.00, categoria: "Refrigerantes" },
            { nome: "Cajuína", preco: 8.00, categoria: "Refrigerantes" },
            { nome: "Maracujá", preco: 3.00, categoria: "Sucos" },
            { nome: "Cajá", preco: 3.00, categoria: "Sucos" },
            { nome: "Tamarindo", preco: 3.00, categoria: "Sucos" },
            { nome: "Abacaxi", preco: 3.00, categoria: "Sucos" },
            { nome: "Graviola", preco: 4.00, categoria: "Sucos" },
            { nome: "Limão", preco: 4.00, categoria: "Sucos" },
            { nome: "Skol 300ml", preco: 4.00, categoria: "Cervejas" },
            { nome: "Bohemia 300ml", preco: 4.00, categoria: "Cervejas" },
            { nome: "Bohemia 600ml", preco: 9.00, categoria: "Cervejas" },
            { nome: "Heineken 330ml", preco: 9.00, categoria: "Cervejas" },
            { nome: "Heineken 600ml", preco: 15.00, categoria: "Cervejas" },
            { nome: "OldPar", preco: 12.00, categoria: "Doses" },
            { nome: "Black White", preco: 6.00, categoria: "Doses" },
            { nome: "Teachers", preco: 8.00, categoria: "Doses" },
            { nome: "Campari", preco: 6.00, categoria: "Doses" },
            { nome: "Vodka Natasha", preco: 8.00, categoria: "Doses" },
            { nome: "Martine", preco: 6.00, categoria: "Doses" },
            { nome: "Quinta do Morgado", preco: 8.00, categoria: "Doses" },
            { nome: "Vinho", preco: 8.00, categoria: "Doses" },
            { nome: "Ypioca Branca", preco: 2.00, categoria: "Doses" },
            { nome: "Copo Ypioca Branca", preco: 6.00, categoria: "Doses" },
            { nome: "Ypioca Amarela", preco: 2.00, categoria: "Doses" },
            { nome: "Copo Ypioca Amarela", preco: 6.00, categoria: "Doses" },
            { nome: "Copo Dreher", preco: 6.00, categoria: "Doses" },
        ];
    
    const categorias = [
        "Espetos",
        "Guarnições",
        "Refrigerantes",
        "Sucos",
        "Cervejas",
        "Doses"
    ];

    categorias.forEach(categoria => {
        const categoriaHeader = document.createElement("h3");
        categoriaHeader.textContent = categoria;
        itensMenu.appendChild(categoriaHeader);

        const categoriaItens = itens.filter(item => item.categoria === categoria);
        categoriaItens.forEach((item, index) => {
            // Criar elemento de lista com botão "Adicionar" e campo de quantidade
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <div class="item-input">
                    ${item.nome} -  ${item.preco.toFixed(2)} 
                    <input type="number" id="quantidade-${item.nome}-${index}" placeholder="Quantidade" min="1" value="1">
                </div>
                <button class="item-button" onclick="adicionarPedidoComQuantidade('${item.nome}', ${index}, '${categoria}')">Adicionar</button>`;
            itensMenu.appendChild(listItem);
        });
    });
}

// Chama a função para exibir os itens do menu ao carregar a página
exibirItensDoMenu();

// Função para adicionar um pedido à comanda com quantidade especificada
function adicionarPedidoComQuantidade(itemNome, index, categoria) {
    const quantidadeInput = document.getElementById(`quantidade-${itemNome}-${index}`);
    const quantidade = parseInt(quantidadeInput.value);

    const itemPreco = obterPrecoDoItem(itemNome, categoria);

    if (quantidade > 0) {
        adicionarPedido(itemNome, quantidade, itemPreco);
    }
}



// Função para obter o preço do item com base no nome e categoria
function obterPrecoDoItem(itemNome, categoria) {
    const itens = [
        // Lista de itens com nome, preço e categoria
        { nome: "Carne de Gado", preco: 5.00, categoria: "Espetos" },
        { nome: "Asa de Frango", preco: 5.00, categoria: "Espetos" },
        { nome: "Frango", preco: 4.00, categoria: "Espetos" },
        { nome: "Porco", preco: 4.00, categoria: "Espetos" },
        { nome: "Queijo", preco: 4.00, categoria: "Espetos" },
        { nome: "Calabresa", preco: 4.00, categoria: "Espetos" },
        { nome: "Coração de Frango", preco: 4.00, categoria: "Espetos" },
        { nome: "Carne do Sol", preco: 5.00, categoria: "Espetos" },
        { nome: "Baião Cremoso", preco: 6.00, categoria: "Guarnições" },
        { nome: "Arroz de Queijo", preco: 6.00, categoria: "Guarnições" },
        { nome: "Cuscuz", preco: 8.00, categoria: "Guarnições" },
        { nome: "Tapioca", preco: 8.00, categoria: "Guarnições" },
        { nome: "Batata Frita", preco: 12.00, categoria: "Guarnições" },
        { nome: "Coca 2L", preco: 12.00, categoria: "Refrigerantes" },
        { nome: "Coca 1L", preco: 8.00, categoria: "Refrigerantes" },
        { nome: "Coca 600ml", preco: 7.00, categoria: "Refrigerantes" },
        { nome: "Coca KS", preco: 3.00, categoria: "Refrigerantes" },
        { nome: "Coca Lata", preco: 5.00, categoria: "Refrigerantes" },
        { nome: "Delrio 2L", preco: 8.00, categoria: "Refrigerantes" },
        { nome: "Delrio 1L", preco: 6.00, categoria: "Refrigerantes" },
        { nome: "Gua. Antarc 1L", preco: 6.00, categoria: "Refrigerantes" },
        { nome: "Refri 250ml", preco: 2.00, categoria: "Refrigerantes" },
        { nome: "Fanta Lata", preco: 5.00, categoria: "Refrigerantes" },
        { nome: "Fresh Limão", preco: 5.00, categoria: "Refrigerantes" },
        { nome: "Sprite", preco: 5.00, categoria: "Refrigerantes" },
        { nome: "Red Bull", preco: 12.00, categoria: "Refrigerantes" },
        { nome: "Água 1,5L", preco: 4.00, categoria: "Refrigerantes" },
        { nome: "Água com Gás", preco: 3.00, categoria: "Refrigerantes" },
        { nome: "Água sem Gás", preco: 1.00, categoria: "Refrigerantes" },
        { nome: "Cajuína", preco: 8.00, categoria: "Refrigerantes" },
        { nome: "Maracujá", preco: 3.00, categoria: "Sucos" },
        { nome: "Cajá", preco: 3.00, categoria: "Sucos" },
        { nome: "Tamarindo", preco: 3.00, categoria: "Sucos" },
        { nome: "Abacaxi", preco: 3.00, categoria: "Sucos" },
        { nome: "Graviola", preco: 4.00, categoria: "Sucos" },
        { nome: "Limão", preco: 4.00, categoria: "Sucos" },
        { nome: "Skol 300ml", preco: 4.00, categoria: "Cervejas" },
        { nome: "Bohemia 300ml", preco: 4.00, categoria: "Cervejas" },
        { nome: "Bohemia 600ml", preco: 9.00, categoria: "Cervejas" },
        { nome: "Heineken 330ml", preco: 9.00, categoria: "Cervejas" },
        { nome: "Heineken 600ml", preco: 15.00, categoria: "Cervejas" },
        { nome: "OldPar", preco: 12.00, categoria: "Doses" },
        { nome: "Black White", preco: 6.00, categoria: "Doses" },
        { nome: "Teachers", preco: 8.00, categoria: "Doses" },
        { nome: "Campari", preco: 6.00, categoria: "Doses" },
        { nome: "Vodka Natasha", preco: 8.00, categoria: "Doses" },
        { nome: "Martine", preco: 6.00, categoria: "Doses" },
        { nome: "Quinta do Morgado", preco: 8.00, categoria: "Doses" },
        { nome: "Vinho", preco: 8.00, categoria: "Doses" },
        { nome: "Ypioca Branca", preco: 2.00, categoria: "Doses" },
        { nome: "Copo Ypioca Branca", preco: 6.00, categoria: "Doses" },
        { nome: "Ypioca Amarela", preco: 2.00, categoria: "Doses" },
        { nome: "Copo Ypioca Amarela", preco: 6.00, categoria: "Doses" },
        { nome: "Copo Dreher", preco: 6.00, categoria: "Doses" },
    ];

    const itemEncontrado = itens.find(item => item.nome === itemNome)
    if (itemEncontrado) {
        return itemEncontrado.preco;
    } else {
        return 0;
    }
}

// Função para calcular o preço de um item com base na quantidade
function calcularPreco(itemNome, quantidade) {
    const itemPreco = obterPrecoDoItem(itemNome);
    return itemPreco * quantidade;
}

// Função para incrementar a quantidade de um pedido na comanda atual
function incrementarQuantidade(index) {
    comandaAtual[index].quantidade++;
    comandaAtual[index].preco = calcularPreco(comandaAtual[index].nome, comandaAtual[index].quantidade);
    atualizarComanda();
    atualizarTotal();
}

// Função para decrementar a quantidade de um pedido na comanda atual
function decrementarQuantidade(index) {
    if (comandaAtual[index].quantidade > 1) {
        comandaAtual[index].quantidade--;
        comandaAtual[index].preco = calcularPreco(comandaAtual[index].nome, comandaAtual[index].quantidade);
    } else {
        // Remover o item se a quantidade for 1
        comandaAtual.splice(index, 1);
    }
    atualizarComanda();
    atualizarTotal();
}



// Função para calcular o preço de um item com base na quantidade
function calcularPreco(itemNome, quantidade) {
    const itemPreco = obterPrecoDoItem(itemNome);
    return itemPreco * quantidade;
}



// Função para atualizar o total
function atualizarTotal() {
    total = calcularTotal(comandaAtual);
    document.getElementById("total").textContent = "R$ " + total.toFixed(2);
}

