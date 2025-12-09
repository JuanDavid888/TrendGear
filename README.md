# **TrendGear - Registro de Ventas**

## **Descripción**

TrendGear es un panel web para la gestión de ventas de productos. Permite registrar, visualizar, editar y eliminar ventas de manera sencilla, utilizando una interfaz intuitiva con formularios y tablas dinámicas. Los datos se almacenan y gestionan mediante MockAPI.

El proyecto está desarrollado con **HTML, CSS y JavaScript puro**, utilizando `fetch` para comunicarse con la API.

---

## **Funcionalidades**

- **Registrar ventas:** Captura información como cliente, producto, precio, método de pago, mes de compra y método de envío.
- **Listado de ventas:** Visualiza todas las ventas registradas en una tabla dinámica.
- **Editar ventas:** Permite modificar los datos de una venta mediante un modal centrado.
- **Eliminar ventas:** Permite borrar registros de manera individual.
- **Actualización en tiempo real:** La tabla se actualiza automáticamente después de crear, editar o eliminar ventas.

---

## Estructura del proyecto

```
TrendGear/
├── index.html # Página principal
├── css/
│ └── style.css # Estilos del proyecto
├── js/
│ └── script.js # Lógica de interacción con la API y el DOM
└── README.md # Documentación del proyecto
```

---

## **¿Cómo usarlo?**

**1.** Abrir el archivo `index.html` en un navegador moderno.

**2.** En el formulario de "Registrar Venta", completar los campos obligatorios:
   - Cliente
   - Producto
   - Precio
   - Método de Pago
   - Mes de Compra
   - Método de Envío

**3.** Hacer clic en **Registrar Venta** para agregar la venta a la tabla.

**4.** En la tabla de ventas:
   - Hacer clic en **Editar** para modificar los datos de una venta.  
     - Se abrirá un modal con los datos actuales.
     - Modificar lo necesario y hacer clic en **Guardar Cambios**.
   - Hacer clic en **Eliminar** para borrar la venta de la tabla.

**5.** Todos los cambios se reflejan automáticamente en la tabla mediante la API.

---

## **Tecnologías utilizadas**

- **HTML5** para la estructura de la página.
- **CSS3** para el diseño responsivo y estilos visuales.
- **JavaScript (ES6)** para la interacción con la API y manipulación del DOM.
- **MockAPI** para simular la base de datos y operaciones CRUD.