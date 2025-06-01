<?php
session_start();

$carrito = $_SESSION['carrito'] ?? [];

$productos = json_decode(file_get_contents('ruta/a/tu/data.json'), true);

$total = 0;

echo "<h2>Tu carrito:</h2>";
echo "<table border='1'>";
echo "<tr><th>Producto</th><th>Cantidad</th><th>Precio unitario</th><th>Subtotal</th></tr>";

foreach ($carrito as $codigo_producto => $cantidad) {
    foreach ($productos as $producto) {
        if ($producto['codigo_producto'] === $codigo_producto) {
            $precio_unitario = $producto['precio'][0]['valor'];
            $subtotal = $precio_unitario * $cantidad;
            $total += $subtotal;
            echo "<tr>";
            echo "<td>" . htmlspecialchars($producto['nombre']) . "</td>";
            echo "<td>" . $cantidad . "</td>";
            echo "<td>$" . number_format($precio_unitario, 0, ',', '.') . "</td>";
            echo "<td>$" . number_format($subtotal, 0, ',', '.') . "</td>";
            echo "</tr>";
            break;
        }
    }
}
echo "<tr><td colspan='3'><strong>Total:</strong></td><td><strong>$" . number_format($total, 0, ',', '.') . "</strong></td></tr>";
echo "</table>";

echo '<a href="initTransaction.php">Pagar con Webpay</a>';
?>
