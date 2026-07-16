const gridPendentes = document.getElementById('gridPendentes');
const gridConcluidos = document.getElementById('gridConcluidos');
const listaHistorico = document.getElementById('listaHistorico');

const countPendentes = document.getElementById('countPendentes');
const countConcluidos = document.getElementById('countConcluidos');
const countHistorico = document.getElementById('countHistorico');

const btnToggleHistorico = document.getElementById('btnToggleHistorico');
const historicoConteudo = document.getElementById('historicoConteudo');

// Configuração do botão retrátil do histórico
btnToggleHistorico.addEventListener('click', () => {
    historicoConteudo.classList.toggle('escondido');
    if (historicoConteudo.classList.contains('escondido')) {
        btnToggleHistorico.innerHTML = `Ver Pedidos de Ontem e Anteriores (${countHistorico.textContent}) ▾`;
    } else {
        btnToggleHistorico.innerHTML = `Ocultar Pedidos Antigos ▴`;
    }
});

function buscarPedidos() {
    fetch('obter_pedidos.php')
        .then(response => response.json())
        .then(res => {
            if (res.status === 'success' && Array.isArray(res.pedidos)) {
                processarEPendurar(res.pedidos, res.data_servidor);
            }
        })
        .catch(error => {
            console.error('Erro ao buscar dados do PHP:', error);
        });
}

function processarEPendurar(pedidos, dataServidor) {
    // 1. Filtragem inteligente por data e status
    const pendentes = [];
    const concluidosHoje = [];
    const historicoOntem = [];

    // Limpa qualquer espaço extra que possa vir do banco
    const dataServidorDb = dataServidor.trim();

    pedidos.forEach(pedido => {
        // Extrai o formato YYYY-MM-DD da coluna data_criacao do banco de dados
        const dataPedido = pedido.data_criacao.substring(0, 10).trim();

        // Faz a verificação usando a mesma data originada do banco de dados
        if (dataPedido === dataServidorDb) {
            if (pedido.status === 'pendente') {
                pendentes.push(pedido);
            } else if (pedido.status === 'concluido') {
                concluidosHoje.push(pedido);
            }
        } else {
            // Se for de outro dia, vai para o histórico de ontem e anteriores
            historicoOntem.push(pedido);
        }
    });

    // 2. Atualiza os contadores
    countPendentes.textContent = pendentes.length;
    countConcluidos.textContent = concluidosHoje.length;
    countHistorico.textContent = historicoOntem.length;

    // Atualiza o texto do botão retrátil caso esteja fechado
    if (historicoConteudo.classList.contains('escondido')) {
        btnToggleHistorico.innerHTML = `Ver Pedidos de Ontem e Anteriores (${historicoOntem.length}) ▾`;
    }

    // 3. Renderiza os Pedidos Pendentes de HOJE na Fila de Preparação
    if (pendentes.length === 0) {
        gridPendentes.innerHTML = '<div class="sem-pedidos">Sem pedidos na fila. Bom trabalho! 🍳</div>';
    } else {
        gridPendentes.innerHTML = '';
        pendentes.forEach(pedido => {
            gridPendentes.appendChild(criarCardPedido(pedido, false));
        });
    }

    // 4. Renderiza os Pontos para Retirada (Concluídos) de HOJE
    if (concluidosHoje.length === 0) {
        gridConcluidos.innerHTML = '<div class="sem-pedidos">Nenhum pedido finalizado hoje.</div>';
    } else {
        gridConcluidos.innerHTML = '';
        concluidosHoje.forEach(pedido => {
            gridConcluidos.appendChild(criarCardPedido(pedido, true)); // Envia explicitamente "true" para riscar os itens
        });
    }

    // 5. Renderiza o Histórico de Ontem de forma compacta (Tabela)
    if (historicoOntem.length === 0) {
        listaHistorico.innerHTML = `<tr><td colspan="5" class="sem-historico">Nenhum pedido de dias anteriores.</td></tr>`;
    } else {
        listaHistorico.innerHTML = '';
        historicoOntem.forEach(pedido => {
            const tr = document.createElement('tr');
            
            // Formata os itens em texto simples compacto
            const itensTexto = pedido.itens.map(i => `${i.quantidade}x ${i.item_nome}`).join(', ');
            const tipoConsumo = pedido.tipo_consumo === 'viagem' ? 'Viagem' : 'Local';
            
            // Formata o horário de exibição
            const horario = pedido.data_criacao.substring(11, 16) + ' (' + pedido.data_criacao.substring(8, 10) + '/' + pedido.data_criacao.substring(5, 7) + ')';
            const statusIndicador = pedido.status === 'pendente' ? ' <strong style="color: #c48c46;">(Pendente)</strong>' : '';

            tr.innerHTML = `
                <td class="historico-senha">${pedido.codigo_pedido}</td>
                <td>${pedido.cliente_nome}${statusIndicador}</td>
                <td>${itensTexto}</td>
                <td>${tipoConsumo}</td>
                <td>${horario}</td>
            `;
            listaHistorico.appendChild(tr);
        });
    }
}

function criarCardPedido(pedido, isConcluido) {
    const card = document.createElement('div');
    card.className = `card-pedido ${isConcluido ? 'finalizado' : ''}`;

    const classeConsumo = pedido.tipo_consumo === 'viagem' ? 'viagem' : '';
    const textoConsumo = pedido.tipo_consumo === 'viagem' ? 'Para Viagem' : 'Comer Local';

    const dataPedido = new Date(pedido.data_criacao);
    const agora = new Date();
    const diferencaMinutos = Math.floor((agora - dataPedido) / 60000);
    const tempoTexto = diferencaMinutos > 0 ? `Há ${diferencaMinutos} min` : 'Agora mesmo';

    let itensHtml = '';
    pedido.itens.forEach(item => {
        itensHtml += `
            <li>
                <span><span class="qtd-item">${item.quantidade}x</span>${item.item_nome}</span>
            </li>
        `;
    });

    card.innerHTML = `
        <div class="card-header ${classeConsumo}">
            <span class="senha-pedido">${pedido.codigo_pedido}</span>
            <span class="tipo-consumo">${textoConsumo}</span>
        </div>
        <div class="card-body">
            <div class="cliente-info">Cliente: ${pedido.cliente_nome}</div>
            <ul class="itens-lista">
                ${itensHtml}
            </ul>
            <div class="tempo-espera">${tempoTexto}</div>
        </div>
        ${!isConcluido ? `<button class="btn-concluir" onclick="concluirPedido(${pedido.id})">Pronto / Entregar</button>` : ''}
    `;

    return card;
}

function concluirPedido(id) {
    if (!confirm("Confirmar a conclusão deste pedido?")) return;

    fetch('concluir_pedido.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            buscarPedidos();
        } else {
            alert('Erro ao processar: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Erro ao chamar a API de conclusão:', error);
    });
}

buscarPedidos();
setInterval(buscarPedidos, 5000);