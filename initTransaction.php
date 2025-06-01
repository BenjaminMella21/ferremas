<?php
require 'vendor/autoload.php';

use Transbank\Webpay\WebpayPlus\Transaction;
use Transbank\Webpay\WebpayPlus\Options;

session_start();

// Datos básicos de la compra
$buyOrder = 'orden_' . time();
$sessionId = session_id();

// Aquí puedes calcular el monto total según tu carrito, 
// para el ejemplo, vamos a un monto fijo (p. ej. $5000)
$amount = 5000; 

// URL donde Webpay redireccionará tras el pago
$returnUrl = 'http://localhost/ferremas/resultado.php';

try {
    // Configurar para modo test
    $options = Options::forTesting();

    // Crear la transacción
    $transaction = new Transaction($options);
    $response = $transaction->create($buyOrder, $sessionId, $amount, $returnUrl);

    // Redireccionar a Webpay con token
    header('Location: ' . $response->getUrl() . '?token_ws=' . $response->getToken());
    exit;

} catch (Exception $e) {
    echo 'Error al iniciar la transacción: ' . $e->getMessage();
}
