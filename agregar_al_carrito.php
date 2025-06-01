<?php
session_start();

// Recibir datos (ajusta nombres si es distinto)
$codigo_producto = $_POST['codigo_producto'] ?? null;
$cantidad = (int)($_POST['cantidad'] ?? 1);

if (!$codigo_producto || $cantidad <= 0) {
    echo "Datos inválidos";
    exit;
}

// Inicializa carrito si no existe
if (!isset($_SESSION['carrito'])) {
    $_SESSION['carrito'] = [];
}

// Si ya existe el producto, suma la cantidad
if (isset($_SESSION['carrito'][$codigo_producto])) {
    $_SESSION['carrito'][$codigo_producto] += $cantidad;
} else {
    $_SESSION['carrito'][$codigo_producto] = $cantidad;
}

// Confirmar al usuario o redirigir
echo "Producto agregado al carrito.";
// o header("Location: carrito.php");
?>
