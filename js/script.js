const barraBusqueda = document.getElementById("busqueda");
const productos = document.querySelectorAll(".contenedor-items .item");

barraBusqueda.addEventListener("input", () => {
    const filtro = barraBusqueda.value.toLowerCase();

    productos.forEach((producto) => {
        const titulo = producto.querySelector(".titulo-item").textContent.toLowerCase();

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', ready);
        } else {
            ready();
        }
    });
});
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    cargarCarritoDesdeLocalStorage();
    configurarEventosBotones();
}

function configurarEventosBotones() {
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for (var boton of botonesEliminarItem) {
        boton.addEventListener('click', eliminarItemCarrito);
    }
    
    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for (var boton of botonesSumarCantidad) {
        boton.addEventListener('click', sumarCantidad);
    }
    
    var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for (var boton of botonesRestarCantidad) {
        boton.addEventListener('click', restarCantidad);
    }
    
    var botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for (var boton of botonesAgregarAlCarrito) {
        boton.addEventListener('click', agregarAlCarritoClicked);
    }

    document.getElementsByClassName('btn-pagar')[0].addEventListener('click', pagarClicked);
}

function pagarClicked() {
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    while (carritoItems.hasChildNodes()) {
        carritoItems.removeChild(carritoItems.firstChild);
    }
    actualizarTotalCarrito();
    ocultarCarrito();
    guardarCarritoEnLocalStorage();
}

const btnPagar = document.querySelector("#finalizarCarrito");

btnPagar.addEventListener("click", () => {
    Swal.fire({
        text: 'Gracias por comprar en Euphoria Beauty!',
        confirmButtonText: 'Aceptar',
        iconHtml: '<i class="bi bi-emoji-smile-fill"></i>',
        iconColor: '#f75a96'
    });
});

function agregarAlCarritoClicked(event) {
    var item = event.target.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    var precio = item.getElementsByClassName('precio-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;
    
    agregarItemAlCarrito(titulo, precio, imagenSrc);
    hacerVisibleCarrito();
    guardarCarritoEnLocalStorage();
}

function agregarItemAlCarrito(titulo, precio, imagenSrc) {
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];
    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');

    for (var nombreItem of nombresItemsCarrito) {
        if (nombreItem.innerText === titulo) {
            return;
        }
    }

    var itemCarritoContenido = `
        <div class="carrito-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `;

    var item = document.createElement('div');
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);
    item.getElementsByClassName('restar-cantidad')[0].addEventListener('click', restarCantidad);
    item.getElementsByClassName('sumar-cantidad')[0].addEventListener('click', sumarCantidad);

    actualizarTotalCarrito();
    guardarCarritoEnLocalStorage();
}

function guardarCarritoEnLocalStorage() {
    var carritoItems = document.getElementsByClassName('carrito-item');
    var items = Array.from(carritoItems).map(item => {
        var titulo = item.getElementsByClassName('carrito-item-titulo')[0].innerText;
        var precio = item.getElementsByClassName('carrito-item-precio')[0].innerText;
        var imagenSrc = item.getElementsByTagName('img')[0].src;
        var cantidad = item.getElementsByClassName('carrito-item-cantidad')[0].value;
        return { titulo, precio, imagenSrc, cantidad };
    });
    localStorage.setItem('carrito', JSON.stringify(items));
}

function cargarCarritoDesdeLocalStorage() {
    var items = JSON.parse(localStorage.getItem('carrito'));
    if (items) {
        items.forEach(item => {
            agregarItemAlCarrito(item.titulo, item.precio, item.imagenSrc);
            document.getElementsByClassName('carrito-item-cantidad')[document.getElementsByClassName('carrito-item-cantidad').length - 1].value = item.cantidad;
        });
        actualizarTotalCarrito();
        hacerVisibleCarrito();
    }
}

function sumarCantidad(event) {
    var cantidadActual = ++event.target.parentElement.getElementsByClassName('carrito-item-cantidad')[0].value;
    actualizarTotalCarrito();
    guardarCarritoEnLocalStorage();
}

function restarCantidad(event) {
    var cantidadElemento = event.target.parentElement.getElementsByClassName('carrito-item-cantidad')[0];
    var cantidadActual = --cantidadElemento.value;
    if (cantidadActual < 1) cantidadElemento.value = 1;
    actualizarTotalCarrito();
    guardarCarritoEnLocalStorage();
}

function eliminarItemCarrito(event) {
    event.target.parentElement.parentElement.remove();
    actualizarTotalCarrito();
    ocultarCarrito();
    guardarCarritoEnLocalStorage();
}

function hacerVisibleCarrito() {
    carritoVisible = true;
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';
    document.getElementsByClassName('contenedor-items')[0].style.width = '60%';
}

function ocultarCarrito() {
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    if (carritoItems.childElementCount === 0) {
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;
        document.getElementsByClassName('contenedor-items')[0].style.width = '100%';
    }
}

function actualizarTotalCarrito() {
    var carritoItems = document.getElementsByClassName('carrito-item');
    var total = Array.from(carritoItems).reduce((sum, item) => {
        var precio = parseFloat(item.getElementsByClassName('carrito-item-precio')[0].innerText.replace('$', '').replace('.', ''));
        var cantidad = item.getElementsByClassName('carrito-item-cantidad')[0].value;
        return sum + precio * cantidad;
    }, 0);

    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$' + total.toLocaleString("es") + ",00";
}

var carritoVisible = false;
