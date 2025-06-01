<?php
require 'vendor/autoload.php';

$declaredClasses = get_declared_classes();
$transbankClasses = array_filter($declaredClasses, function($c) {
    return strpos($c, 'Transbank\\') === 0;
});

echo "<h2>Clases Transbank disponibles:</h2>";
echo "<ul>";
foreach ($transbankClasses as $class) {
    echo "<li>" . $class . "</li>";
}
echo "</ul>";
