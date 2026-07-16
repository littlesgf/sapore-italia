<?php
// Configuração de cabeçalhos para permitir requisições (CORS) e definir retorno como JSON
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Evita que o PHP envie avisos/erros diretamente no output
ini_set('display_errors', 0);
error_reporting(E_ALL);

// 1. Conexão com o banco de dados do XAMPP
$host = "localhost";
$db_name = "totem_db";
$username = "root";
$password = ""; // Padrão do XAMPP é vazio

try {
    $conn = new PDO("mysql:host=" . $host . ";dbname=" . $db_name . ";charset=utf8mb4", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $exception) {
    echo json_encode(["status" => "error", "message" => "Erro de conexão com o banco de dados: " . $exception->getMessage()]);
    exit();
}

// 2. Recebe os dados enviados pelo JavaScript
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["status" => "error", "message" => "Nenhum dado recebido."]);
    exit();
}

// 3. Validação básica dos campos obrigatórios
if (
    empty($data['cliente_nome']) ||
    empty($data['tipo_consumo']) ||
    empty($data['metodo_pagamento']) ||
    empty($data['carrinho']) ||
    empty($data['total'])
) {
    echo json_encode(["status" => "error", "message" => "Dados incompletos para processar o pedido."]);
    exit();
}

// Função para gerar uma senha única baseada no banco de dados
function gerarCodigoPedidoUnico($pdo) {
    $tentativas = 0;
    $maxTentativas = 200; // Evita loop infinito se as senhas de A10 a A99 acabarem no dia

    do {
        // Gera a senha no padrão A10 a A99
        $numeroAleatorio = rand(10, 99);
        $codigoGerado = 'A' . $numeroAleatorio;

        // Verifica se já existe esse código criado HOJE (usando a coluna real 'data_criacao')
        $sql = "SELECT COUNT(*) FROM pedidos WHERE codigo_pedido = :codigo AND DATE(data_criacao) = CURDATE()";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([':codigo' => $codigoGerado]);
        $existe = $stmt->fetchColumn();

        $tentativas++;
    } while ($existe > 0 && $tentativas < $maxTentativas);

    // Se por acaso as 90 combinações diárias do "A" acabarem, mudamos para o prefixo "B"
    if ($tentativas >= $maxTentativas) {
        $codigoGerado = 'B' . rand(10, 99);
    }

    return $codigoGerado;
}

try {
    // Iniciamos uma transação para garantir integridade dos dados
    $conn->beginTransaction();

    // 4. Gera a senha única diretamente no servidor
    $codigoPedido = gerarCodigoPedidoUnico($conn);

    // 5. Insere o pedido principal (com status padrão 'pendente')
    $queryPedido = "INSERT INTO pedidos (codigo_pedido, cliente_nome, cliente_cpf, tipo_consumo, metodo_pagamento, valor_total, status) 
                    VALUES (:codigo_pedido, :cliente_nome, :cliente_cpf, :tipo_consumo, :metodo_pagamento, :valor_total, 'pendente')";
    
    $stmtPedido = $conn->prepare($queryPedido);
    
    $stmtPedido->execute([
        ':codigo_pedido'    => $codigoPedido,
        ':cliente_nome'     => htmlspecialchars(strip_tags($data['cliente_nome'])),
        ':cliente_cpf'      => !empty($data['cliente_cpf']) ? htmlspecialchars(strip_tags($data['cliente_cpf'])) : null,
        ':tipo_consumo'     => htmlspecialchars(strip_tags($data['tipo_consumo'])),
        ':metodo_pagamento' => htmlspecialchars(strip_tags($data['metodo_pagamento'])),
        ':valor_total'      => floatval($data['total'])
    ]);

    // Pega o ID do pedido recém-criado para vincular aos itens
    $pedidoId = $conn->lastInsertId();

    // 6. Insere os itens do pedido na tabela 'itens_pedido'
    $queryItem = "INSERT INTO itens_pedido (pedido_id, item_nome, preco_unitario, quantidade) 
                  VALUES (:pedido_id, :item_nome, :preco_unitario, :quantidade)";
    
    $stmtItem = $conn->prepare($queryItem);

    foreach ($data['carrinho'] as $item) {
        $stmtItem->execute([
            ':pedido_id'      => $pedidoId,
            ':item_nome'      => htmlspecialchars(strip_tags($item['name'])),
            ':preco_unitario' => floatval($item['price']),
            ':quantidade'     => intval($item['qty'])
        ]);
    }

    // Confirma todas as operações no banco de dados
    $conn->commit();

    // Retorna a resposta para o Totem com a senha gerada
    echo json_encode([
        "status" => "success", 
        "message" => "Pedido salvo com sucesso!", 
        "pedido_id" => $pedidoId,
        "codigo_pedido" => $codigoPedido
    ]);

} catch (Exception $e) {
    // Se der erro, desfaz qualquer inserção parcial
    $conn->rollBack();
    echo json_encode([
        "status" => "error", 
        "message" => "Falha ao salvar o pedido: " . $e->getMessage()
    ]);
}
?>