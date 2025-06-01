<?php
session_start();
require 'vendor/autoload.php';

use Transbank\Webpay\WebpayPlus;
use Transbank\Webpay\Configuration;

$config = Configuration::forTesting();
$webpay = new WebpayPlus($config);

try {
    $token = $_POST['token_ws'] ?? null;
    if (!$token) {
        throw new Exception("Token no recibido");
    }

    $result = $webpay->getTransaction()->commit($token);

    // Validar orden de compra
    if ($result->buyOrder !== $_SESSION['ordenCompra']) {
        throw new Exception("Orden de compra no coincide");
    }

    // Guardar resultado para mostrar luego
    $_SESSION['resultadoTransaccion'] = $result;

    // Confirmar OK a Webpay
    echo "OK";
} catch (Exception $e) {
    http_response_code(400);
    echo "Error: " . $e->getMessage();
}
