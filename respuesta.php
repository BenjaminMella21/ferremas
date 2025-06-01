<?php
require __DIR__ . '/../vendor/autoload.php';

use Transbank\Webpay\WebpayPlus\Transaction;

Transaction::configureForTesting();

$token = $_GET['token_ws'] ?? $_POST['token_ws'] ?? null;

if (!$token) {
    echo "Token no recibido.";
    exit;
}

$response = (new Transaction)->commit($token);

echo "<h1>Resultado del Pago</h1>";
echo "<p>Estado: " . $response->getStatus() . "</p>";
echo "<p>Orden: " . $response->getBuyOrder() . "</p>";
echo "<p>Monto: $" . $response->getAmount() . "</p>";
echo "<p>Autorización: " . $response->getAuthorizationCode() . "</p>";
