<?php
session_start();

$result = $_SESSION['resultadoTransaccion'] ?? null;

if (!$result) {
    echo "No hay resultado de transacción.";
    exit();
}

if ($result->isApproved()) {
    echo "<h1>Pago aprobado</h1>";
    echo "<p>Orden de compra: " . htmlspecialchars($result->buyOrder) . "</p>";
    echo "<p>Monto: $" . number_format($result->amount, 0, ',', '.') . "</p>";
} else {
    echo "<h1>Pago rechazado</h1>";
}
