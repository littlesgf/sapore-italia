<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

ini_set('display_errors', 0);
error_reporting(E_ALL);

// Configurações do Banco de Dados no InfinityFree
$host = "sql210.infinityfree.com";
$db_name = "if0_42420474_totem_db";
$username = "if0_42420474";
$password = "pasapore2026";

try {
    $conn = new PDO("mysql:host=" . $host . ";dbname=" . $db_name . ";charset=utf8mb4", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // 1. Obtém a data atual configurada diretamente no banco de dados
    $stmtData = $conn->query("SELECT CURDATE() as data_atual");
    $resultadoData = $stmtData->fetch(PDO::FETCH_ASSOC);
    $dataServidorDb = $resultadoData['data_atual']; // Retorna no formato 'YYYY-MM-DD'

    // 2. Busca pedidos dos últimos 2 dias (48 horas)
    $queryPedidos = "SELECT id, codigo_pedido, cliente_nome, tipo_consumo, metodo_pagamento, status, data_criacao 
                     FROM pedidos 
                     WHERE data_criacao >= NOW() - INTERVAL 2 DAY
                     ORDER BY data_criacao DESC";
    
    $stmtPedidos = $conn->prepare($queryPedidos);
    $stmtPedidos->execute();
    $pedidos = $stmtPedidos->fetchAll(PDO::FETCH_ASSOC);
    
    $listaCompleta = [];

    foreach ($pedidos as $pedido) {
        $queryItens = "SELECT item_nome, quantidade FROM itens_pedido WHERE pedido_id = :pedido_id";
        $stmtItens = $conn->prepare($queryItens);
        $stmtItens->execute([':pedido_id' => $pedido['id']]);
        
        $pedido['itens'] = $stmtItens->fetchAll(PDO::FETCH_ASSOC);
        $listaCompleta[] = $pedido;
    }

    // Retorna a lista de pedidos e a data atual vinda exclusivamente do Banco de Dados
    echo json_encode([
        "status" => "success",
        "data_servidor" => $dataServidorDb,
        "pedidos" => $listaCompleta
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "status" => "error", 
        "message" => "Erro na API: " . $e->getMessage()
    ]);
}
?>