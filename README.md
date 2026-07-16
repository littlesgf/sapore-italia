# Sapore d'Italia — Self-Service Ordering Totem

A full-stack web application that simulates a self-service ordering kiosk (totem) for an Italian restaurant, paired with a real-time kitchen display system. Built as the final project for the **Advanced Web Programming** course.

**Live demo:**
- Customer totem: https://saporeitalia.kesug.com
- Kitchen panel: https://saporeitalia.kesug.com/cozinha.html

## Overview

The system covers the full order lifecycle: a customer browses the menu on a touch-friendly kiosk, builds a cart, checks out with their name, dining preference, and payment method, and receives a pickup number. The order is stored in a MySQL database and instantly appears on a kitchen dashboard, where staff can mark it as completed. A weather-aware banner suggests dishes based on the current temperature, conditions, and time of day at the restaurant's location.

## Features

- **Landing page** with a hero section and call-to-action leading into the ordering flow.
- **Self-service totem** with category tabs (starters, pasta, risotto, pizza, desserts, drinks), an add-to-cart flow with quantity steppers, and a slide-out cart panel.
- **Checkout flow**: customer name/CPF capture, dine-in vs. takeaway selection, payment method selection (credit, debit, or Pix), and a confirmation screen with a generated pickup code.
- **Kitchen display panel** that polls the backend every 5 seconds, splitting orders into "Pending," "Ready for pickup," and a collapsible history of orders from previous days.
- **Weather-based dish suggestions** pulled live from the Open-Meteo public API, adapted for rain, heat, and day/night context.
- **Order persistence** in MySQL via PHP/PDO with prepared statements, including automatic generation of unique daily pickup codes.

## Tech stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 (custom properties, Flexbox/Grid, media queries) |
| Client logic | Vanilla JavaScript (ES6+) |
| Server | PHP 7+ with PDO |
| Database | MySQL / MariaDB |
| External API | [Open-Meteo](https://open-meteo.com/) (weather forecast) |
| Hosting | InfinityFree (free shared hosting) |

## Project structure

```
├── index.html            # Landing page
├── descanso.css / .js    # Landing page styles and behavior
├── totem.html             # Customer self-service ordering kiosk
├── totem-style.css        # Totem styling
├── totem-script.js        # Cart, menu tabs, weather suggestion logic
├── totem-addon.js         # Welcome form, order type & payment overlays
├── cozinha.html            # Kitchen display panel
├── cozinha-style.css       # Kitchen panel styling
├── cozinha-script.js       # Live polling, order cards, history table
├── salvar_pedido.php       # Saves a new order + its items to the database
├── obter_pedidos.php       # Returns orders from the last 48 hours as JSON
├── concluir_pedido.php     # Marks an order as completed
└── if0_42420474_totem_db.sql  # Database schema (pedidos, itens_pedido)
```

## Database

Two tables:
- **`pedidos`** — one row per order (customer, dining/payment type, total, status, timestamp, generated pickup code).
- **`itens_pedido`** — line items linked to each order (dish name, unit price, quantity).

## Key JavaScript functionality

- Form validation before an order can proceed (required name, required dining option, required payment method).
- CPF input mask, applied live as the customer types.
- Show/hide logic for menu categories, cart panel, and checkout overlays.
- Order total calculation, recalculated in real time as items are added or removed.
- Confirmation prompt before an order is marked as completed in the kitchen panel.

## Academic context

This project was developed for the *Advanced Web Programming* course, fulfilling the requirements of integrating HTML5, CSS3, JavaScript, PHP, a MySQL database, and a public API into a working, hosted web application.

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# Sapore d'Italia — Totem de Autoatendimento

Uma aplicação web full-stack que simula um totem de autoatendimento para pedidos em um restaurante italiano, junto com um painel de cozinha em tempo real. Desenvolvido como projeto final da disciplina de **Programação Avançada de Computadores**.

**Demonstração ao vivo:**
- Totem do cliente: https://saporeitalia.kesug.com
- Painel da cozinha: https://saporeitalia.kesug.com/cozinha.html

## Visão geral

O sistema cobre todo o ciclo do pedido: o cliente navega pelo cardápio em um totem pensado para toque, monta o carrinho, finaliza informando nome, tipo de consumo e forma de pagamento, e recebe uma senha de retirada. O pedido é salvo em um banco de dados MySQL/MariaDB e aparece instantaneamente no painel da cozinha, onde a equipe pode marcá-lo como concluído. Uma faixa de sugestão baseada no clima recomenda pratos de acordo com a temperatura, condição climática e horário do dia no local do restaurante.

## Funcionalidades

- **Página inicial** com seção de destaque e botão de chamada para ação que leva ao fluxo de pedido.
- **Totem de autoatendimento** com abas de categoria (entradas, massas, risotos, pizzas, sobremesas, bebidas), fluxo de adicionar ao carrinho com contador de quantidade e painel de carrinho deslizante.
- **Fluxo de finalização**: captura de nome/CPF do cliente, escolha entre comer no local ou levar para casa, seleção de forma de pagamento (crédito, débito ou Pix) e tela de confirmação com senha gerada.
- **Painel da cozinha** que consulta o backend a cada 5 segundos, separando os pedidos em "Pendentes", "Prontos para retirada" e um histórico retrátil de pedidos de dias anteriores.
- **Sugestão de pratos baseada no clima**, obtida em tempo real pela API pública Open-Meteo, adaptada para chuva, calor e período do dia/noite.
- **Persistência dos pedidos** em MySQL/MariaDB via PHP/PDO com prepared statements, incluindo geração automática de senhas diárias únicas.

## Tecnologias utilizadas

| Camada | Tecnologia |
|---|---|
| Marcação | HTML5 |
| Estilização | CSS3 (variáveis customizadas, Flexbox/Grid, media queries) |
| Lógica no cliente | JavaScript puro (ES6+) |
| Servidor | PHP 7+ com PDO |
| Banco de dados | MySQL / MariaDB |
| API externa | [Open-Meteo](https://open-meteo.com/) (previsão do tempo) |
| Hospedagem | InfinityFree (hospedagem compartilhada gratuita) |

## Estrutura do projeto

```
├── index.html            # Página inicial
├── descanso.css / .js    # Estilo e comportamento da página inicial
├── totem.html             # Totem de autoatendimento do cliente
├── totem-style.css        # Estilização do totem
├── totem-script.js        # Carrinho, abas do cardápio, sugestão de clima
├── totem-addon.js         # Formulário de boas-vindas, overlays de tipo de consumo e pagamento
├── cozinha.html            # Painel da cozinha
├── cozinha-style.css       # Estilização do painel da cozinha
├── cozinha-script.js       # Consulta em tempo real, cards de pedido, tabela de histórico
├── salvar_pedido.php       # Salva um novo pedido e seus itens no banco
├── obter_pedidos.php       # Retorna os pedidos das últimas 48h em JSON
├── concluir_pedido.php     # Marca um pedido como concluído
└── if0_42420474_totem_db.sql  # Esquema do banco de dados (pedidos, itens_pedido)
```

## Banco de dados

Duas tabelas:
- **`pedidos`** — uma linha por pedido (cliente, tipo de consumo/pagamento, total, status, data/hora, senha gerada).
- **`itens_pedido`** — itens vinculados a cada pedido (nome do prato, preço unitário, quantidade).

## Principais funcionalidades em JavaScript

- Validação de formulário antes de o pedido poder avançar (nome obrigatório, tipo de consumo obrigatório, forma de pagamento obrigatória).
- Máscara de CPF, aplicada em tempo real enquanto o cliente digita.
- Lógica de exibição/ocultação para categorias do cardápio, painel do carrinho e overlays de finalização.
- Cálculo do total do pedido, recalculado em tempo real conforme itens são adicionados ou removidos.
- Confirmação antes de marcar um pedido como concluído no painel da cozinha.

## Contexto acadêmico

Este projeto foi desenvolvido para a disciplina de *Programação Avançada de Computadores*, atendendo aos requisitos de integração entre HTML5, CSS3, JavaScript, PHP, banco de dados MySQL e uma API pública em uma aplicação web funcional e hospedada.
