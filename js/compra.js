function iniciarPago() {
    const total = document.getElementById("total").innerText.replace('$', '').replace(',', '');

    fetch('http://localhost:3000/iniciar-transaccion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            monto: parseInt(total),
            orden_compra: 'ORDEN_' + Math.floor(Math.random() * 100000)
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.url && data.token) {
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = data.url;

            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = 'token_ws';
            input.value = data.token;

            form.appendChild(input);
            document.body.appendChild(form);
            form.submit();
        } else {
            alert('Error iniciando pago');
        }
    })
    .catch(err => {
        console.error(err);
        alert('Error en la conexión al backend');
    });
}
