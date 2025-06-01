<?php
require __DIR__ . '/../vendor/autoload.php';

use Transbank\Webpay\WebpayPlus\Transaction;

Transaction::configureForTesting(); // Sandbox

$amount = $_POST['amount'] ?? 0;
$buyOrder = 'ORDER-' . rand(1000, 9999);
$sessionId = session_id();

// ⚠️ Cambiar esta URL al final por la URL real de Render
$returnUrl = 'https://tu-app.onrender.com/respuesta.php';

$transaction = new Transaction();
$response = $transaction->create($buyOrder, $sessionId, $amount, $returnUrl);

header('Location: ' . $response->getUrl() . '?token_ws=' . $response->getToken());
