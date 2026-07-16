<?php
// 1. Configurações de cabeçalho para receber requisições do tipo POST JSON
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

ini_set('display_errors', 0);
error_reporting(E_ALL);

// Configurações do Banco de Dados no InfinityFree
$host = "sql210.infinityfree.com";
$db_name = "if0_42420474_totem_db";
$username = "if0_42420474";
$password = "pasapore2026";

try {
    // 2. Conexão com o Banco de Dados
    $conn = new PDO("mysql:host=" . $host . ";dbname=" . $db_name . ";charset=utf8mb4", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // 3. Recebe e decodifica o JSON enviado pelo corpo da requisição do JavaScript
    $data = json_decode(file_get_contents("php://input"), true);

    // Validação de segurança: verifica se o ID foi realmente enviado
    if (empty($data['id'])) {
        echo json_encode([
            "status" => "error", 
            "message" => "ID do pedido não foi fornecido pelo sistema."
        ]);
        exit();
    }

    $pedidoId = intval($data['id']);

    // 4. Executa a query de atualização com Prepared Statement para evitar SQL Injection
    $query = "UPDATE pedidos SET status = 'concluido' WHERE id = :id";
    $stmt = $conn->prepare($query);
    $stmt->execute([':id' => $pedidoId]);

    // 5. Retorna uma mensagem de sucesso confirmando a alteração
    echo json_encode([
        "status" => "success", 
        "message" => "O status do pedido #$pedidoId foi atualizado para concluído!"
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "status" => "error", 
        "message" => "Erro ao atualizar o status do pedido: " . $e->getMessage()
    ]);
}
?>