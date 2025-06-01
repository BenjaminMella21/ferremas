document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('product-container');
  let allProducts = [];

  fetch('json/data.json')
    .then(res => res.json())
    .then(data => {
      allProducts = data;
      renderProducts(allProducts);
      actualizarContadores(); // Actualiza contadores al cargar
    });

  const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      if (checkbox.id === 'todo' && checkbox.checked) {
        checkboxes.forEach(cb => {
          if (cb.id !== 'todo') cb.checked = false;
        });
        renderProducts(allProducts);
        return;
      }

      if (checkbox.id !== 'todo' && checkbox.checked) {
        document.getElementById('todo').checked = false;
      }

      const selectedCategories = Array.from(checkboxes)
        .filter(cb => cb.checked && cb.id !== 'todo')
        .map(cb => cb.id);

      if (selectedCategories.length === 0) {
        document.getElementById('todo').checked = true;
        renderProducts(allProducts);
        return;
      }

      const filtered = allProducts.filter(p => selectedCategories.includes(p.categoria));
      renderProducts(filtered);
    });
  });

  container.addEventListener('click', (event) => {
    const target = event.target;

    if (target.classList.contains('add-to-cart')) {
      const productId = target.getAttribute('data-id');
      agregarAlCarrito(productId);
    }

    if (target.classList.contains('add-to-favorites')) {
      const productId = target.getAttribute('data-id');
      agregarAFavoritos(productId);
    }
  });

  function agregarAlCarrito(productId) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const index = carrito.findIndex(p => p.codigo_producto === productId);

    if (index !== -1) {
      carrito[index].cantidad += 1;
    } else {
      carrito.push({ codigo_producto: productId, cantidad: 1 });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadores();
    alert('Producto agregado al carrito');
  }

  function agregarAFavoritos(productId) {
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

    if (!favoritos.includes(productId)) {
      favoritos.push(productId);
      localStorage.setItem('favoritos', JSON.stringify(favoritos));
      actualizarContadores();
      alert('Producto agregado a favoritos');
    } else {
      alert('Producto ya está en favoritos');
    }
  }

  function renderProducts(products) {
    container.innerHTML = '';
    if (products.length === 0) {
      container.innerHTML = '<p>No hay productos para mostrar.</p>';
      return;
    }

    products.forEach(product => {
      const price = product.precio[0]?.valor || 'N/A';
      container.innerHTML += `
        <div class="col-lg-4 col-md-6 col-sm-6 pb-1">
          <div class="product-item bg-light mb-4">
            <div class="product-img position-relative overflow-hidden">
              <img class="img-fluid w-100" src="img/${product.imagen}" alt="${product.nombre}">
            </div>
            <div class="text-center py-4">
              <a class="h6 text-decoration-none text-truncate" href="">${product.nombre}</a>
              <div class="d-flex align-items-center justify-content-center mt-2">
                <h5>$${price}</h5>
              </div>
              <div class="mt-3">
                <button class="btn btn-primary btn-sm add-to-cart" data-id="${product.codigo_producto}">Agregar al carrito</button>
                <button class="btn btn-warning btn-sm add-to-favorites" data-id="${product.codigo_producto}">Favorito</button>
              </div>
            </div>
          </div>
        </div>
      `;
    });
  }

  function actualizarContadores() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

    const carritoCount = carrito.reduce((acc, p) => acc + p.cantidad, 0);
    const favoritosCount = favoritos.length;

    const carritoElement = document.getElementById('carrito-count');
    const favoritosElement = document.getElementById('favoritos-count');

    if (carritoElement) carritoElement.textContent = carritoCount;
    if (favoritosElement) favoritosElement.textContent = favoritosCount;
  }
});
