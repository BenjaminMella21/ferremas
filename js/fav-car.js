function actualizarContadores() {
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const totalFavoritos = favoritos.length;
    const totalCarrito = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);

    document.getElementById('contador-favoritos').textContent = totalFavoritos;
    document.getElementById('contador-carrito').textContent = totalCarrito;
  }

  window.addEventListener('DOMContentLoaded', actualizarContadores);