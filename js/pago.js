async function crearTransaccion() {
  const orden_compra = sessionStorage.getItem('orden_compra');
  const monto = sessionStorage.getItem('monto');
  const token_ws = sessionStorage.getItem('token_ws');

  try {
    const response = await fetch('http://localhost:3000/api/pagar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ orden_compra, monto, token_ws })
    });

    if (!response.ok) {
      throw new Error('Error en la petición al backend');
    }

    const data = await response.json();
    console.log('Respuesta del pago:', data);
    // Aquí maneja el resultado del pago (redirigir, mostrar mensaje, etc)
  } catch (error) {
    console.error('Error al crear transacción:', error);
  }
}
