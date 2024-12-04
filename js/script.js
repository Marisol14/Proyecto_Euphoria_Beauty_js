if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

async function ready() {
    await cargarProductos(); 
    cargarCarritoDesdeLocalStorage();
    configurarEventosBotones();
}

async function cargarProductos() {
    try {
        const response = await fetch('productos.json');
        const productos = await response.json();
        renderizarProductos(productos);
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

function renderizarProductos(productos) {
    const contenedorItems = document.querySelector('.contenedor-items');
    contenedorItems.innerHTML = ''; 

    productos.forEach(producto => {
        const itemHTML = `
            <div class="item">
                <span class="titulo-item">${producto.titulo}</span>
                <img src="${producto.imagen}" alt="" class="img-item">
                <span class="precio-item">$${producto.precio.toLocaleString('es')}</span>
                <button class="boton-item" data-id="${producto.id}">Agregar al Carrito</button>
            </div>
        `;
        contenedorItems.innerHTML += itemHTML;
    });

    configurarEventosBotones();
}

function configurarEventosBotones() {
    const botonesAgregarAlCarrito = document.querySelectorAll('.boton-item');
    botonesAgregarAlCarrito.forEach(boton =>
        boton.addEventListener('click', agregarAlCarritoClicked)
    );

    document.querySelector('.btn-pagar').addEventListener('click', pagarClicked);
}

async function agregarAlCarritoClicked(event) {
    const boton = event.target;
    const item = boton.parentElement;
    const idProducto = boton.getAttribute('data-id');
    const titulo = item.querySelector('.titulo-item').innerText;
    const precio = parseInt(
        item.querySelector('.precio-item').innerText.replace('$', '').replace('.', '')
    );
    const imagenSrc = item.querySelector('.img-item').src;

    agregarItemAlCarrito(idProducto, titulo, precio, imagenSrc);
    hacerVisibleCarrito();
    guardarCarritoEnLocalStorage();
}

function agregarItemAlCarrito(id, titulo, precio, imagenSrc) {
    const itemsCarrito = document.querySelector('.carrito-items');
    const idsItemsCarrito = Array.from(itemsCarrito.querySelectorAll('.carrito-item')).map(item =>
        item.getAttribute('data-id')
    );

    if (idsItemsCarrito.includes(id)) {
        Swal.fire('Atención', 'El item ya se encuentra en el carrito.', 'warning');
        return;
    }

    const itemCarritoHTML = `
        <div class="carrito-item" data-id="${id}">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">$${precio.toLocaleString('es')}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `;

    const item = document.createElement('div');
    item.innerHTML = itemCarritoHTML;
    itemsCarrito.appendChild(item);

    item.querySelector('.btn-eliminar').addEventListener('click', eliminarItemCarrito);
    item.querySelector('.restar-cantidad').addEventListener('click', restarCantidad);
    item.querySelector('.sumar-cantidad').addEventListener('click', sumarCantidad);

    actualizarTotalCarrito();
}

function guardarCarritoEnLocalStorage() {
    const carritoItems = document.querySelectorAll('.carrito-item');
    const items = Array.from(carritoItems).map(item => ({
        id: item.getAttribute('data-id'),
        titulo: item.querySelector('.carrito-item-titulo').innerText,
        precio: parseInt(
            item.querySelector('.carrito-item-precio').innerText.replace('$', '').replace('.', '')
        ),
        imagenSrc: item.querySelector('img').src,
        cantidad: parseInt(item.querySelector('.carrito-item-cantidad').value)
    }));

    localStorage.setItem('carrito', JSON.stringify(items));
}

function cargarCarritoDesdeLocalStorage() {
    const items = JSON.parse(localStorage.getItem('carrito')) || [];
    items.forEach(item => {
        agregarItemAlCarrito(item.id, item.titulo, item.precio, item.imagenSrc);
        const cantidades = document.querySelectorAll('.carrito-item-cantidad');
        cantidades[cantidades.length - 1].value = item.cantidad;
    });
    actualizarTotalCarrito();
}

function eliminarItemCarrito(event) {
    const item = event.target.closest('.carrito-item');
    item.remove();
    actualizarTotalCarrito();
    guardarCarritoEnLocalStorage();
}

function sumarCantidad(event) {
    const cantidad = event.target.parentElement.querySelector('.carrito-item-cantidad');
    cantidad.value = parseInt(cantidad.value) + 1;
    actualizarTotalCarrito();
    guardarCarritoEnLocalStorage();
}

function restarCantidad(event) {
    const cantidad = event.target.parentElement.querySelector('.carrito-item-cantidad');
    cantidad.value = Math.max(1, parseInt(cantidad.value) - 1);
    actualizarTotalCarrito();
    guardarCarritoEnLocalStorage();
}

function actualizarTotalCarrito() {
    const carritoItems = document.querySelectorAll('.carrito-item');
    const total = Array.from(carritoItems).reduce((sum, item) => {
        const precio = parseInt(
            item.querySelector('.carrito-item-precio').innerText.replace('$', '').replace('.', '')
        );
        const cantidad = parseInt(item.querySelector('.carrito-item-cantidad').value);
        return sum + precio * cantidad;
    }, 0);

    document.querySelector('.carrito-precio-total').innerText =
        '$' + total.toLocaleString('es') + ',00';
}

function pagarClicked() {
    const carritoItems = document.querySelector('.carrito-items');
    while (carritoItems.firstChild) {
        carritoItems.removeChild(carritoItems.firstChild);
    }
    actualizarTotalCarrito();
    ocultarCarrito();
    guardarCarritoEnLocalStorage();
}

const btnPagar = document.querySelector("#finalizarCarrito")

btnPagar.addEventListener("click", () =>{
    Swal.fire({
        text: 'Gracias por comprar en Euphoria Beauty!',
        confirmButtonText: 'Aceptar',
        iconHtml:'<i class="bi bi-emoji-smile-fill"></i>' ,
        iconColor:'#f75a96'
                })
})

function hacerVisibleCarrito() {
    const carrito = document.querySelector('.carrito');
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';
    document.querySelector('.contenedor-items').style.width = '60%';
}

function ocultarCarrito() {
    const carritoItems = document.querySelector('.carrito-items');
    if (!carritoItems.childElementCount) {
        const carrito = document.querySelector('.carrito');
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        document.querySelector('.contenedor-items').style.width = '100%';
    }
}


