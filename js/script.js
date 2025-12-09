/* --------------------------------------------------
   CONFIGURACIÓN DEL FETCH API PARA MOCKAPI
-------------------------------------------------- */

const FetchAPI = "https://69383f124618a71d77cf8629.mockapi.io/api/toDo/Ventas";

/* --------------------------------------------------
   CARGAR TABLA DE REGISTROS
-------------------------------------------------- */

async function cargarVentas() {
    const res = await fetch(FetchAPI);
    const datos = await res.json();

    const tabla = document.getElementById("tablaVentas");
    tabla.innerHTML = "";

    datos.forEach(reg => {
        tabla.innerHTML += `
        <tr>
            <td>${reg.cliente}</td>
            <td>${reg.producto}</td>
            <td>$${reg.precio}</td>
            <td>${reg.metodo_pago}</td>
            <td>${reg.mes_compra}</td>
            <td>${reg.metodo_envio}</td>
            <td>
                <button class="btn-edit" onclick="editarVenta(${reg.id})">Editar</button>
                <button class="btn-delete" onclick="eliminarVenta(${reg.id})">Eliminar</button>
            </td>
        </tr>`;
    });
}

cargarVentas();

/* --------------------------------------------------
   CREAR REGISTRO
-------------------------------------------------- */

document.getElementById("ventaForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const nuevaVenta = {
        cliente: document.getElementById("cliente").value,
        producto: document.getElementById("producto").value,
        precio: parseFloat(document.getElementById("precio").value),
        metodo_pago: document.getElementById("metodo_pago").value,
        mes_compra: document.getElementById("mes_compra").value,
        metodo_envio: document.getElementById("metodo_envio").value
    };

    await fetch(FetchAPI, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaVenta)
    });

    e.target.reset();
    cargarVentas();
});

/* --------------------------------------------------
   ELIMINAR REGISTRO
-------------------------------------------------- */

async function eliminarVenta(id) {
    await fetch(`${FetchAPI}/${id}`, { method: "DELETE" });
    cargarVentas();
}

/* --------------------------------------------------
   EDITAR REGISTRO
-------------------------------------------------- */

async function editarVenta(id) {
    // 1. Obtener datos actuales del registro
    const res = await fetch(`${FetchAPI}/${id}`);
    const ventaActual = await res.json();

    // 2. Prompts precargados con los valores actuales
    const nuevoCliente = prompt("Cliente:", ventaActual.cliente);
    const nuevoProducto = prompt("Producto:", ventaActual.producto);
    const nuevoPrecio = prompt("Precio:", ventaActual.precio);
    const nuevoMetodoPago = prompt("Método de pago (Efectivo, Tarjeta, Transferencia):", ventaActual.metodo_pago);
    const nuevoMesCompra = prompt("Mes de compra:", ventaActual.mes_compra);
    const nuevoMetodoEnvio = prompt("Método de envío (Presencial, Delivery):", ventaActual.metodo_envio);

    // 3. Si el usuario cancela cualquiera, no actualiza nada
    if (
        nuevoCliente === null ||
        nuevoProducto === null ||
        nuevoPrecio === null ||
        nuevoMetodoPago === null ||
        nuevoMesCompra === null ||
        nuevoMetodoEnvio === null
    ) return;

    // 4. Enviar PUT con todos los campos actualizados
    await fetch(`${FetchAPI}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            cliente: nuevoCliente,
            producto: nuevoProducto,
            precio: parseFloat(nuevoPrecio),
            metodo_pago: nuevoMetodoPago,
            mes_compra: nuevoMesCompra,
            metodo_envio: nuevoMetodoEnvio
        })
    });

    // 5. Recargar tabla
    cargarVentas();
}
