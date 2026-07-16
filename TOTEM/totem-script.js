// ==========================================================================
// TOTEM DE AUTOATENDIMENTO — navegação por categorias + carrinho de pedido
// ==========================================================================

// ---- Estado do pedido: guarda { id: { name, price, qty } } ----
const cart = {};

// ---- Elementos principais ----
const tabButtons = document.querySelectorAll('.tab-btn');
const menuCategories = document.querySelectorAll('.menu-category');

const cartBar = document.getElementById('cartBar');
const cartCountEl = document.getElementById('cartCount');
const cartTotalEl = document.getElementById('cartTotal');

const cartOverlay = document.getElementById('cartOverlay');
const cartItemsEl = document.getElementById('cartItems');
const cartPanelTotalEl = document.getElementById('cartPanelTotal');
const cartClose = document.getElementById('cartClose');
const continueBtn = document.getElementById('continueBtn');
const checkoutBtn = document.getElementById('checkoutBtn');

const confirmOverlay = document.getElementById('confirmOverlay');
const orderNumberEl = document.getElementById('orderNumber');
const newOrderBtn = document.getElementById('newOrderBtn');

// ==========================================================================
// 1. NAVEGAÇÃO POR ABAS DE CATEGORIA
// ==========================================================================
tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.dataset.category;

        menuCategories.forEach(section => {
            const show = category === 'todos' || section.dataset.category === category;
            section.style.display = show ? '' : 'none';
        });
    });
});

// ==========================================================================
// 2. BOTÃO "ADICIONAR" EM CADA CARD (vira contador de quantidade)
// ==========================================================================
document.querySelectorAll('.menu-card').forEach(card => {
    const actionSlot = card.querySelector('.card-action');
    const id = card.dataset.id;
    const name = card.dataset.name;
    const price = parseFloat(card.dataset.price);

    renderCardAction(actionSlot, id, name, price);
});

function renderCardAction(actionSlot, id, name, price) {
    const qty = cart[id] ? cart[id].qty : 0;

    if (qty === 0) {
        actionSlot.innerHTML = `<button class="btn-add">Adicionar</button>`;
        actionSlot.querySelector('.btn-add').addEventListener('click', () => {
            changeQty(id, name, price, 1);
            renderCardAction(actionSlot, id, name, price);
        });
    } else {
        actionSlot.innerHTML = `
            <div class="qty-stepper">
                <button class="qty-minus" aria-label="Remover uma unidade">-</button>
                <span class="qty-value">${qty}</span>
                <button class="qty-plus" aria-label="Adicionar uma unidade">+</button>
            </div>`;

        actionSlot.querySelector('.qty-minus').addEventListener('click', () => {
            changeQty(id, name, price, -1);
            renderCardAction(actionSlot, id, name, price);
        });
        actionSlot.querySelector('.qty-plus').addEventListener('click', () => {
            changeQty(id, name, price, 1);
            renderCardAction(actionSlot, id, name, price);
        });
    }
}

// ---- Atualiza a quantidade de um item no carrinho ----
function changeQty(id, name, price, delta) {
    if (!cart[id]) {
        cart[id] = { name, price, qty: 0 };
    }
    cart[id].qty += delta;

    if (cart[id].qty <= 0) {
        delete cart[id];
    }

    updateCartBar();
}

// ==========================================================================
// 3. BARRA DE CARRINHO FIXA (contador + total)
// ==========================================================================
function getCartSummary() {
    let count = 0;
    let total = 0;
    Object.values(cart).forEach(item => {
        count += item.qty;
        total += item.qty * item.price;
    });
    return { count, total };
}

function formatBRL(value) {
    return 'R$ ' + value.toFixed(2).replace('.', ',');
}

function updateCartBar() {
    const { count, total } = getCartSummary();

    cartCountEl.textContent = count;
    cartTotalEl.textContent = formatBRL(total);
    cartBar.classList.toggle('visible', count > 0);

    renderCartPanel();
}

// ==========================================================================
// 4. PAINEL DO CARRINHO (abrir, listar itens, fechar)
// ==========================================================================
function renderCartPanel() {
    const entries = Object.entries(cart);

    if (entries.length === 0) {
        cartItemsEl.innerHTML = `<p class="cart-empty">Seu carrinho está vazio. Toque em um prato para começar.</p>`;
        cartPanelTotalEl.textContent = formatBRL(0);
        return;
    }

    cartItemsEl.innerHTML = entries.map(([id, item]) => `
        <div class="cart-item">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <span class="cart-item-price">${formatBRL(item.price)} cada</span>
            </div>
            <div class="qty-stepper" data-id="${id}">
                <button class="qty-minus" aria-label="Remover uma unidade">-</button>
                <span class="qty-value">${item.qty}</span>
                <button class="qty-plus" aria-label="Adicionar uma unidade">+</button>
            </div>
        </div>
    `).join('');

    // Reconecta os botões de +/- de dentro do painel
    cartItemsEl.querySelectorAll('.qty-stepper').forEach(stepper => {
        const id = stepper.dataset.id;
        const item = cart[id];

        stepper.querySelector('.qty-minus').addEventListener('click', () => {
            changeQty(id, item.name, item.price, -1);
            syncCardAction(id);
        });
        stepper.querySelector('.qty-plus').addEventListener('click', () => {
            changeQty(id, item.name, item.price, 1);
            syncCardAction(id);
        });
    });

    const { total } = getCartSummary();
    cartPanelTotalEl.textContent = formatBRL(total);
}

// ---- Mantém o card do cardápio sincronizado quando o ajuste vem do painel ----
function syncCardAction(id) {
    const card = document.querySelector(`.menu-card[data-id="${id}"]`);
    if (!card) return;
    const actionSlot = card.querySelector('.card-action');
    const name = card.dataset.name;
    const price = parseFloat(card.dataset.price);
    renderCardAction(actionSlot, id, name, price);
}

cartBar.addEventListener('click', () => {
    cartOverlay.classList.add('open');
});

cartClose.addEventListener('click', () => {
    cartOverlay.classList.remove('open');
});

continueBtn.addEventListener('click', () => {
    cartOverlay.classList.remove('open');
});

// ==========================================================================
// 5. FINALIZAR PEDIDO
// ==========================================================================
checkoutBtn.addEventListener('click', () => {
    const { count } = getCartSummary();
    if (count === 0) return;

    // Gera uma senha simples de atendimento (ex: A42)
    const orderNumber = 'A' + (10 + Math.floor(Math.random() * 89));
    orderNumberEl.textContent = orderNumber;

    cartOverlay.classList.remove('open');
    confirmOverlay.classList.add('open');
});

newOrderBtn.addEventListener('click', () => {
    // Limpa o carrinho e reinicia o totem para o próximo cliente
    Object.keys(cart).forEach(id => delete cart[id]);
    document.querySelectorAll('.menu-card').forEach(card => syncCardAction(card.dataset.id));
    updateCartBar();

    confirmOverlay.classList.remove('open');

    tabButtons.forEach(b => b.classList.remove('active'));
    document.querySelector('.tab-btn[data-category="todos"]').classList.add('active');
    menuCategories.forEach(section => (section.style.display = ''));

    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Estado inicial da barra
updateCartBar();

// =========================================================================
// 6. SUGESTÃO DE PRATO CONFORME O CLIMA E PERÍODO (Com inclusão de Noite!)
// =========================================================================
async function sugestaoPorClima() {
    const banner = document.getElementById('climaSugestao');
    if (!banner) return;

    try {
        // Castanhal, PA - latitude/longitude do totem
        const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=-1.29&longitude=-47.92&current=temperature_2m,weathercode');
        if (!res.ok) throw new Error('Falha ao consultar o clima');

        const dados = await res.json();
        const temp = Math.round(dados.current.temperature_2m);
        const codigo = dados.current.weathercode;

        const chovendo = [51, 53, 55, 61, 63, 65, 80, 81, 82, 95, 96, 99].includes(codigo);
        
        // Obtém a hora local do sistema do Totem
        const horaAtual = new Date().getHours();
        const ehNoite = horaAtual >= 18 || horaAtual < 5;

        let mensagem;
        
        if (ehNoite) {
            // Sugestões exclusivas para o período da Noite
            if (chovendo) {
                mensagem = `🌙🌧️ Noite fria de ${temp}°C com chuva – Perfeito para um Fettuccine Alfredo quentinho acompanhado de vinho tinto!`;
            } else if (temp >= 28) {
                mensagem = `🌙☀️ Noite quente de ${temp}°C – Que tal uma Pizza Margherita leve e uma refrescante Taça de Vinho Branco?`;
            } else {
                mensagem = `🌙✨ Noite agradável de ${temp}°C – Excelente momento para saborear nosso clássico Risotto ai Funghi!`;
            }
        } else {
            // Sugestões para o período do Dia (Manhã/Tarde)
            if (chovendo) {
                mensagem = `🌧️ ${temp}°C e chuva – que tal um Fettuccine Alfredo bem quentinho?`;
            } else if (temp >= 28) {
                mensagem = `☀️ ${temp}°C – dia perfeito para uma Caprese fresquinha!`;
            } else {
                mensagem = `🌤️ ${temp}°C – ótimo momento para uma boa massa italiana!`;
            }
        }

        banner.textContent = mensagem;
    } catch (erro) {
        console.error('Erro ao buscar clima:', erro);
    }
}

// Inicializa a sugestão de clima
sugestaoPorClima();