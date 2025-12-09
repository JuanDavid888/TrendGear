// =========================
// CONFIGURACIÓN API
// =========================
const FetchAPI = "https://69383f124618a71d77cf8629.mockapi.io/api/toDo/Ventas";

// =========================
// CARGAR TABLA DE VENTAS
// =========================
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
                <button class="btn-edit" onclick="mostrarFormularioEdicion(${reg.id})">Editar</button>
                <button class="btn-delete" onclick="eliminarVenta(${reg.id})">Eliminar</button>
            </td>
        </tr>`;
    });
}

// =========================
// CREAR VENTA
// =========================
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

// =========================
// ELIMINAR VENTA
// =========================
async function eliminarVenta(id) {
    await fetch(`${FetchAPI}/${id}`, { method: "DELETE" });
    cargarVentas();
}

// =========================
// MOSTRAR MODAL DE EDICIÓN
// =========================
async function mostrarFormularioEdicion(id) {
    const res = await fetch(`${FetchAPI}/${id}`);
    const venta = await res.json();

    document.getElementById("editarId").value = venta.id;
    document.getElementById("editarCliente").value = venta.cliente;
    document.getElementById("editarProducto").value = venta.producto;
    document.getElementById("editarPrecio").value = venta.precio;
    document.getElementById("editarMetodoPago").value = venta.metodo_pago;
    document.getElementById("editarMesCompra").value = venta.mes_compra;
    document.getElementById("editarMetodoEnvio").value = venta.metodo_envio;

    document.getElementById("editarModal").style.display = "flex";
}

// =========================
// GUARDAR CAMBIOS
// =========================
document.getElementById("editarForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("editarId").value;

    const updatedData = {
        cliente: document.getElementById("editarCliente").value,
        producto: document.getElementById("editarProducto").value,
        precio: parseFloat(document.getElementById("editarPrecio").value),
        metodo_pago: document.getElementById("editarMetodoPago").value,
        mes_compra: document.getElementById("editarMesCompra").value,
        metodo_envio: document.getElementById("editarMetodoEnvio").value
    };

    await fetch(`${FetchAPI}/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(updatedData)
    });

    document.getElementById("editarModal").style.display = "none";
    cargarVentas();
});

// =========================
// CANCELAR EDICIÓN
// =========================
document.getElementById("cancelarEdicion").addEventListener("click", () => {
    document.getElementById("editarModal").style.display = "none";
});

// =========================
// CARGAR TABLA AL INICIO
// =========================
document.addEventListener("DOMContentLoaded", cargarVentas);
