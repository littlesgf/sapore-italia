(function () {

    /* ======================================================================
       1. CSS DO ADD-ON (injetado dinamicamente)
       ====================================================================== */
    const addonStyle = document.createElement('style');
    addonStyle.textContent = `
        .welcome-overlay {
            position: fixed;
            inset: 0;
            background:
                linear-gradient(rgba(44, 26, 12, 0.88), rgba(44, 26, 12, 0.88)),
                url('assets/itali1.png') no-repeat center center/cover;
            z-index: 1200;
            display: none;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .welcome-overlay.open {
            display: flex;
        }

        .welcome-panel {
            background-color: #ffffff;
            border-radius: 24px;
            padding: 48px 40px;
            max-width: 460px;
            width: 100%;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
        }

        .welcome-logo {
            width: 72px;
            height: 72px;
            object-fit: contain;
            margin-bottom: 14px;
        }

        .welcome-eyebrow {
            color: #c48c46;
            font-size: 0.85rem;
            letter-spacing: 2px;
            font-weight: bold;
            margin-bottom: 10px;
        }

        .welcome-panel h2 {
            font-family: 'Georgia', serif;
            font-size: 1.9rem;
            color: #2c1a0c;
            margin-bottom: 12px;
        }

        .welcome-subtitle {
            color: #706254;
            font-size: 1rem;
            margin-bottom: 28px;
        }

        .welcome-form {
            display: flex;
            flex-direction: column;
            gap: 14px;
            text-align: left;
        }

        .welcome-form label {
            font-weight: 600;
            color: #5c3a21;
            font-size: 0.95rem;
        }

        .optional-tag {
            color: #a39589;
            font-weight: 400;
            font-size: 0.8rem;
        }

        .welcome-form input {
            padding: 16px;
            border-radius: 12px;
            border: 2px solid #e6dfd5;
            font-size: 1.05rem;
            outline: none;
            transition: border 0.2s;
        }

        .welcome-form input:focus {
            border-color: #c48c46;
        }

        .welcome-form .btn-checkout {
            margin-top: 10px;
        }

        #greetingName {
            font-weight: 700;
            color: #5c2121;
        }

        .payment-overlay {
            position: fixed;
            inset: 0;
            background-color: rgba(44, 26, 12, 0.5);
            z-index: 1050;
            display: none;
            justify-content: flex-end;
        }

        .payment-overlay.open {
            display: flex;
        }

        .payment-panel {
            background-color: #ffffff;
            width: 100%;
            max-width: 480px;
            height: 100%;
            display: flex;
            flex-direction: column;
            animation: slideIn 0.25s ease;
        }

        .payment-panel-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 24px;
            border-bottom: 1px solid #f0eae1;
        }

        .payment-panel-header h2 {
            margin-bottom: 0;
        }

        .payment-body {
            flex: 1;
            overflow-y: auto;
            padding: 24px;
        }

        .payment-hint {
            color: #706254;
            font-size: 1rem;
            margin-bottom: 22px;
        }

        .payment-hint strong {
            color: #2c1a0c;
            font-family: 'Georgia', serif;
        }

        .payment-options {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 14px;
            margin-bottom: 20px;
        }

        .payment-option {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 10px;
            padding: 26px 14px;
            border-radius: 14px;
            border: 2px solid #e6dfd5;
            background-color: #ffffff;
            cursor: pointer;
            font-weight: 600;
            color: #5c3a21;
            font-size: 1rem;
            transition: all 0.15s ease;
        }

        .payment-option i {
            font-size: 1.7rem;
            color: #c48c46;
        }

        .payment-option:active {
            transform: scale(0.97);
        }

        .payment-option.selected {
            border-color: #5c2121;
            background-color: #fdf1ee;
            color: #5c2121;
        }

        .payment-option.selected i {
            color: #5c2121;
        }

        .payment-detail {
            display: none;
            background-color: #f3ece2;
            border-radius: 12px;
            padding: 16px 18px;
            color: #5c3a21;
            font-size: 0.92rem;
        }

        .payment-detail.visible {
            display: block;
        }

        .payment-panel-footer {
            padding: 20px 24px 28px;
            border-top: 1px solid #f0eae1;
        }

        .payment-panel-footer .btn-checkout {
            margin-bottom: 10px;
        }

        .payment-panel-footer .btn-checkout:disabled {
            background-color: #d9cfc4;
            color: #8c7e70;
            cursor: not-allowed;
        }

        .confirm-order-meta {
            display: flex;
            flex-direction: column;
            gap: 4px;
            color: #706254;
            font-size: 0.92rem;
            margin-bottom: 24px;
        }
    `;
    document.head.appendChild(addonStyle);

    /* ======================================================================
       2. HTML DO ADD-ON (Injeção de Sapore d'Italia)
       ====================================================================== */
    document.body.insertAdjacentHTML('afterbegin', `
        <div class="welcome-overlay open" id="welcomeOverlay">
            <div class="welcome-panel">
                <img src="assets/garfo-2.png" alt="Logo Sapore d'Italia" class="welcome-logo">
                <p class="welcome-eyebrow">Sapore d'Italia · CUCINA ITALIANA</p>
                <h2>Benvenuto!</h2>
                <p class="welcome-subtitle">Informe seu nome para começarmos seu pedido. O CPF é opcional e serve para acumular pontos de fidelidade.</p>

                <form id="welcomeForm" class="welcome-form">
                    <label for="customerName">Nome</label>
                    <input type="text" id="customerName" placeholder="Como podemos te chamar?" autocomplete="off" required>

                    <label for="customerCpf">CPF <span class="optional-tag">(opcional)</span></label>
                    <input type="text" id="customerCpf" placeholder="000.000.000-00" inputmode="numeric" maxlength="14" autocomplete="off">

                    <button type="submit" class="btn-checkout">Começar Pedido <i class="fas fa-arrow-right"></i></button>
                </form>
            </div>
        </div>
    `);

    document.body.insertAdjacentHTML('beforeend', `
        <div class="payment-overlay" id="orderTypeOverlay">
            <div class="payment-panel">
                <div class="payment-panel-header">
                    <h2>Como Deseja Consumir?</h2>
                    <button class="cart-close" id="orderTypeClose" aria-label="Voltar ao carrinho">&times;</button>
                </div>
                <div class="payment-body">
                    <p class="payment-hint">Isso nos ajuda a preparar seu pedido do jeito certo.</p>

                    <div class="payment-options">
                        <button type="button" class="payment-option" data-ordertype="local">
                            <i class="fas fa-utensils"></i>
                            <span>Comer no Local</span>
                        </button>
                        <button type="button" class="payment-option" data-ordertype="viagem">
                            <i class="fas fa-shopping-bag"></i>
                            <span>Levar para Casa</span>
                        </button>
                    </div>
                </div>
                <div class="payment-panel-footer">
                    <button class="btn-checkout" id="confirmOrderTypeBtn" disabled>Continuar</button>
                    <button class="btn-continue" id="backToCartFromTypeBtn">Voltar ao Carrinho</button>
                </div>
            </div>
        </div>
    `);

    document.body.insertAdjacentHTML('beforeend', `
        <div class="payment-overlay" id="paymentOverlay">
            <div class="payment-panel">
                <div class="payment-panel-header">
                    <h2>Forma de Pagamento</h2>
                    <button class="cart-close" id="paymentClose" aria-label="Voltar">&times;</button>
                </div>
                <div class="payment-body">
                    <p class="payment-hint">Selecione como deseja pagar seu pedido de <strong id="paymentTotal">R$ 0,00</strong>.</p>

                    <div class="payment-options">
                        <button type="button" class="payment-option" data-method="credito">
                            <i class="fas fa-credit-card"></i>
                            <span>Crédito</span>
                        </button>
                        <button type="button" class="payment-option" data-method="debito">
                            <i class="fas fa-money-check-alt"></i>
                            <span>Débito</span>
                        </button>
                        <button type="button" class="payment-option" data-method="pix">
                            <i class="fas fa-qrcode"></i>
                            <span>Pix</span>
                        </button>
                    </div>

                    <p class="payment-detail" id="paymentDetail"></p>
                </div>
                <div class="payment-panel-footer">
                    <button class="btn-checkout" id="confirmPaymentBtn" disabled>Confirmar Pagamento</button>
                    <button class="btn-continue" id="backToCartBtn">Voltar ao Pedido</button>
                </div>
            </div>
        </div>
    `);

    const instructionEl = document.querySelector('.totem-instruction');
    if (instructionEl) {
        instructionEl.insertAdjacentHTML('afterbegin', '<span id="greetingName"></span> ');
    }

    const confirmNumberEl = document.querySelector('.confirm-number');
    if (confirmNumberEl) {
        confirmNumberEl.insertAdjacentHTML('afterend', `
            <div class="confirm-order-meta">
                <span id="confirmCustomerName"></span>
                <span id="confirmOrderType"></span>
                <span id="confirmPaymentMethod"></span>
            </div>
        `);
    }

    /* ======================================================================
       3. REFERÊNCIAS E LOGICA
       ====================================================================== */
    const welcomeOverlay = document.getElementById('welcomeOverlay');
    const welcomeForm = document.getElementById('welcomeForm');
    const customerNameInput = document.getElementById('customerName');
    const customerCpfInput = document.getElementById('customerCpf');
    const greetingNameEl = document.getElementById('greetingName');

    const paymentOverlay = document.getElementById('paymentOverlay');
    const paymentClose = document.getElementById('paymentClose');
    const backToCartBtn = document.getElementById('backToCartBtn');
    const paymentTotalEl = document.getElementById('paymentTotal');
    const paymentDetailEl = document.getElementById('paymentDetail');
    const confirmPaymentBtn = document.getElementById('confirmPaymentBtn');
    const confirmCustomerNameEl = document.getElementById('confirmCustomerName');
    const confirmPaymentMethodEl = document.getElementById('confirmPaymentMethod');

    const orderTypeOverlay = document.getElementById('orderTypeOverlay');
    const orderTypeClose = document.getElementById('orderTypeClose');
    const backToCartFromTypeBtn = document.getElementById('backToCartFromTypeBtn');
    const confirmOrderTypeBtn = document.getElementById('confirmOrderTypeBtn');
    const confirmOrderTypeEl = document.getElementById('confirmOrderType');

    let customerName = '';
    let customerCpf = '';
    let selectedPaymentMethod = null;
    let selectedOrderType = null;

    const orderTypeLabels = {
        local: '<i class="fas fa-utensils"></i> Comer no Local',
        viagem: '<i class="fas fa-shopping-bag"></i> Levar para Casa'
    };

    const paymentDetailsText = {
        credito: 'Insira ou aproxime o cartão na maquininha ao lado quando o pedido for confirmado.',
        debito: 'Insira ou aproxime o cartão na maquininha ao lado quando o pedido for confirmado.',
        pix: 'Um QR Code Pix será exibido na tela de confirmação para você escanear.'
    };

    const paymentLabels = {
        credito: 'Cartão de Crédito',
        debito: 'Cartão de Débito',
        pix: 'Pix'
    };

    customerCpfInput.addEventListener('input', () => {
        let v = customerCpfInput.value.replace(/\D/g, '').slice(0, 11);
        v = v.replace(/(\d{3})(\d)/, '$1.$2');
        v = v.replace(/(\d{3})(\d)/, '$1.$2');
        v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        customerCpfInput.value = v;
    });

    welcomeForm.addEventListener('submit', (e) => {
        e.preventDefault();

        customerName = customerNameInput.value.trim();
        customerCpf = customerCpfInput.value.trim();

        if (!customerName) {
            customerNameInput.focus();
            return;
        }

        greetingNameEl.textContent = `Bem-vindo(a), ${customerName.split(' ')[0]}!`;
        welcomeOverlay.classList.remove('open');
    });

    checkoutBtn.addEventListener('click', () => {
        const { count } = getCartSummary();
        if (count === 0) return;

        confirmOverlay.classList.remove('open');

        selectedOrderType = null;
        document.querySelectorAll('#orderTypeOverlay .payment-option').forEach(b => b.classList.remove('selected'));
        confirmOrderTypeBtn.disabled = true;

        orderTypeOverlay.classList.add('open');
    });

    document.querySelectorAll('#orderTypeOverlay .payment-option').forEach(btn => {
        btn.addEventListener('click', () => {
            selectedOrderType = btn.dataset.ordertype;

            document.querySelectorAll('#orderTypeOverlay .payment-option').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');

            confirmOrderTypeBtn.disabled = false;
        });
    });

    function backToCartFromType() {
        orderTypeOverlay.classList.remove('open');
        cartOverlay.classList.add('open');
    }

    orderTypeClose.addEventListener('click', backToCartFromType);
    backToCartFromTypeBtn.addEventListener('click', backToCartFromType);

    confirmOrderTypeBtn.addEventListener('click', () => {
        if (!selectedOrderType) return;

        const { total } = getCartSummary();

        selectedPaymentMethod = null;
        document.querySelectorAll('#paymentOverlay .payment-option').forEach(b => b.classList.remove('selected'));
        paymentDetailEl.textContent = '';
        paymentDetailEl.classList.remove('visible');
        confirmPaymentBtn.disabled = true;

        paymentTotalEl.textContent = formatBRL(total);

        orderTypeOverlay.classList.remove('open');
        paymentOverlay.classList.add('open');
    });

    document.querySelectorAll('#paymentOverlay .payment-option').forEach(btn => {
        btn.addEventListener('click', () => {
            selectedPaymentMethod = btn.dataset.method;

            document.querySelectorAll('#paymentOverlay .payment-option').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');

            paymentDetailEl.textContent = paymentDetailsText[selectedPaymentMethod];
            paymentDetailEl.classList.add('visible');

            confirmPaymentBtn.disabled = false;
        });
    });

    function backToCart() {
        paymentOverlay.classList.remove('open');
        orderTypeOverlay.classList.add('open');
    }

    paymentClose.addEventListener('click', backToCart);
    backToCartBtn.addEventListener('click', backToCart);

    confirmPaymentBtn.addEventListener('click', () => {
        if (!selectedPaymentMethod) return;

        confirmPaymentBtn.disabled = true;
        confirmPaymentBtn.textContent = "Salvando pedido...";

        const { total } = getCartSummary();
        const dadosPedido = {
            cliente_nome: customerName,
            cliente_cpf: customerCpf || null,
            tipo_consumo: selectedOrderType,
            metodo_pagamento: selectedPaymentMethod,
            carrinho: Object.values(cart),
            total: total
        };

        fetch('salvar_pedido.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosPedido)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                console.log('Pedido salvo no banco de dados com ID:', data.pedido_id);
                
                orderNumberEl.textContent = data.codigo_pedido;

                confirmCustomerNameEl.textContent = customerName ? `Cliente: ${customerName}` : '';
                confirmOrderTypeEl.innerHTML = orderTypeLabels[selectedOrderType] || '';
                confirmPaymentMethodEl.textContent = `Pagamento: ${paymentLabels[selectedPaymentMethod]}`;

                paymentOverlay.classList.remove('open');
                confirmOverlay.classList.add('open');
            } else {
                alert('Erro ao salvar o pedido no banco: ' + data.message);
                confirmPaymentBtn.disabled = false;
                confirmPaymentBtn.textContent = 'Confirmar Pagamento';
            }
        })
        .catch(error => {
            console.error('Erro na requisição para o PHP:', error);
            alert('Não foi possível conectar ao servidor para salvar o pedido.');
            confirmPaymentBtn.disabled = false;
            confirmPaymentBtn.textContent = 'Confirmar Pagamento';
        });
    });

    newOrderBtn.addEventListener('click', () => {
        customerName = '';
        customerCpf = '';
        selectedOrderType = null;
        customerNameInput.value = '';
        customerCpfInput.value = '';
        greetingNameEl.textContent = '';
        welcomeOverlay.classList.add('open');
    });

    document.body.classList.remove('loading');

})();