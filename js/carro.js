document.addEventListener('DOMContentLoaded', () => {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const tbody = document.getElementById('carrito-body');
  const subtotalEl = document.getElementById('subtotal');
  const totalEl = document.getElementById('total');
  const btnPagar = document.getElementById('btnPagar');
  const formPago = document.getElementById('formPago');
  const inputProductos = document.getElementById('inputProductos');
  const inputTotal = document.getElementById('inputTotal');

  if (!tbody || !subtotalEl || !totalEl || !btnPagar || !formPago || !inputProductos || !inputTotal) {
    console.error('Faltan elementos necesarios en el HTML para funcionar correctamente.');
    return;
  }

  function normalizeCodigo(codigo) {
    return codigo.trim().toUpperCase();
  }

  // Función para renderizar el carrito en la tabla
  function renderCarrito() {
    if (carrito.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5">Tu carrito está vacío.</td></tr>';
      subtotalEl.textContent = '$0';
      totalEl.textContent = '$0';
      return;
    }

    fetch('json/data.json')
      .then(res => res.json())
      .then(productos => {
        let subtotal = 0;
        tbody.innerHTML = ''; // limpiar tabla

        carrito.forEach(item => {
          const producto = productos.find(p => normalizeCodigo(p.codigo_producto) === normalizeCodigo(item.codigo_producto));
          if (!producto) {
            console.warn(`Producto con código ${item.codigo_producto} no encontrado en data.json.`);
            return;
          }

          const precio = producto.precio[0]?.valor || 0;
          const cantidad = item.cantidad || 1;
          const totalItem = precio * cantidad;
          subtotal += totalItem;

          const fila = document.createElement('tr');
          fila.innerHTML = `
            <td class="align-middle">
              <img src="img/${producto.imagen}" alt="${producto.nombre}" style="width: 50px;">
              ${producto.nombre}
            </td>
            <td class="align-middle">$${precio}</td>
            <td class="align-middle">
              <button class="btn btn-sm btn-secondary restar-cantidad" data-id="${item.codigo_producto}">-</button>
              <span class="mx-2">${cantidad}</span>
              <button class="btn btn-sm btn-secondary sumar-cantidad" data-id="${item.codigo_producto}">+</button>
            </td>
            <td class="align-middle">$${totalItem.toFixed(2)}</td>
            <td class="align-middle">
              <button class="btn btn-sm btn-danger eliminar-producto" data-id="${item.codigo_producto}">
                <i class="fa fa-times"></i>
              </button>
            </td>
          `;
          tbody.appendChild(fila);
        });

        subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
        totalEl.textContent = `$${subtotal.toFixed(2)}`;

        // Asignar eventos
        tbody.querySelectorAll('.eliminar-producto').forEach(btn => {
          btn.addEventListener('click', () => {
            eliminarProducto(btn.getAttribute('data-id'));
          });
        });

        tbody.querySelectorAll('.sumar-cantidad').forEach(btn => {
          btn.addEventListener('click', () => {
            cambiarCantidad(btn.getAttribute('data-id'), 1);
          });
        });

        tbody.querySelectorAll('.restar-cantidad').forEach(btn => {
          btn.addEventListener('click', () => {
            cambiarCantidad(btn.getAttribute('data-id'), -1);
          });
        });
      })
      .catch(error => {
        console.error('Error cargando productos:', error);
        tbody.innerHTML = '<tr><td colspan="5">Error al cargar productos.</td></tr>';
      });
  }

  function eliminarProducto(id) {
    carrito = carrito.filter(p => normalizeCodigo(p.codigo_producto) !== normalizeCodigo(id));
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderCarrito();
  }

  function cambiarCantidad(id, cambio) {
    carrito = carrito.map(item => {
      if (normalizeCodigo(item.codigo_producto) === normalizeCodigo(id)) {
        const nuevaCantidad = (item.cantidad || 1) + cambio;
        return { ...item, cantidad: nuevaCantidad > 0 ? nuevaCantidad : 0 };
      }
      return item;
    }).filter(item => item.cantidad > 0);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderCarrito();
  }

  // Evento botón pagar: llenamos el formulario y enviamos
  btnPagar.addEventListener('click', (e) => {
    e.preventDefault();

    if (carrito.length === 0) {
      alert('El carrito está vacío.');
      return;
    }

    inputProductos.value = JSON.stringify(carrito);

    const totalStr = totalEl.textContent.replace('$', '').trim();
    const totalNum = parseFloat(totalStr);
    const totalInt = Math.round(totalNum);
    inputTotal.value = totalInt;

    console.log('Productos:', inputProductos.value);
    console.log('Total:', inputTotal.value);

    formPago.submit();
  });

  // Al cargar la página, renderizamos el carrito
  renderCarrito();
});
