//DAR LA BIENVENIDA A LOS USUARIOS A MI PÁGINA WEB.

alert("Bienvenidos a Euphoria Beauty, su tienda de cosméticos.")

console.log("Bienvenidos a Euphoria Beauty, su tienda de cosméticos.")

//REGISTRARSE.
let correoElectronico
let contrasena
let repetirContrasena

function solicitarDatosParaRegistro() {
    correoElectronico = prompt("Ingresa tu e-mail para registrarte:").toLowerCase()
    contrasena = prompt("Crea una contraseña:").toLowerCase()
    repetirContrasena = prompt("Repetir la contraseña:").toLowerCase()

    if (contrasena === repetirContrasena) {
        let mensaje ="Datos ingresados:\n" +
                    "Correo electrónico: " + correoElectronico + "\n" +
                    "Contraseña: " + contrasena + "\n" +
                    "Repetir contraseña: " + repetirContrasena
                    
        alert(mensaje)        
        console.log(mensaje) 
    } else {
        alert("Las contraseñas no coinciden. Inténtalo de nuevo.")
        console.log("Las contraseñas no coinciden.")
    }
} 
solicitarDatosParaRegistro();

// INGRESAR A MI CUENTA.

let ingresoDeCorreo = prompt("Ingresá tu e-mail:").toLowerCase()
let ingresoDeContraseña = prompt ("Por favor, ingrese su contraseña")

do {
    if (contrasena !== ingresoDeContraseña) {
        alert("Contraseña incorrecta. Inténtalo de nuevo.")
    }
}   while (contrasena !== ingresoDeContraseña)
        alert("¡Has ingresado correctamente!")

//PRODUCTOS DE EUPHORIA BEAUTY.
class Producto {
    constructor(id, nombre, precio) {
        this.id = id;
        this.nombre = nombre.toLowerCase();
        this.precio = precio;
    }
}

const productosDeMiTienda = [
    new Producto(1, "Labial retráctil", 10000, "Labios"),
    new Producto(2, "Labial líquido", 15000, "Labios"),
    new Producto(3, "Labial", 20000, "Labios"),
    new Producto(4, "Sombra de Ojos", 30000, "Ojos"),
    new Producto(5, "Máscara de pestañas", 20000, "Ojos"),
    new Producto(6, "Delineador", 10000, "Ojos"),
    new Producto(7, "Base de Maquillaje", 25000, "Rostro"),
    new Producto(8, "Corrector", 16000, "Rostro"),
    new Producto(9, "Rubor", 16000, "Rostro"),
];

let carrito = [];
function agregarAlCarrito(id) {
    const producto = productosDeMiTienda.find(prod => prod.id === id);
    if (producto) {
        carrito.push(producto);
        alert(`${producto.nombre} ha sido añadido al carrito.`);
        console.log(`${producto.nombre} ha sido añadido al carrito.`);
    } else {
        alert('Producto no encontrado.');
        console.log('Producto no encontrado.');
    }
}

function verCarrito() {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        console.log("El carrito está vacío.");
    } else {
        let mensajeCarrito = "Productos en el carrito:\n";
        carrito.forEach((producto, index) => {
            mensajeCarrito += `${index + 1}. ${producto.nombre} - $${producto.precio}\n`;
        });
        alert(mensajeCarrito);
        console.log(mensajeCarrito);
    }
}

function calcularTotal() {
    let totalCarrito = 0;
    for (let i = 0; i < carrito.length; i++) {
        totalCarrito += carrito[i].precio;
    }
    alert(`Total a pagar: $${totalCarrito}`);
    console.log(`Total a pagar: $${totalCarrito}`);
}

function tienda() {
    let opcion;
    do {
        opcion = prompt("Bienvenido a la tienda. Elige una opción:\n1. Agregar producto al carrito\n2. Ver carrito\n3. Calcular total\n4. Salir");
        
        switch (opcion) {
            case '1':
                let idProducto = prompt("Ingrese el ID del producto que desea agregar:\n1. Labial retráctil - $10000\n2. Labial líquido - $15000\n3. Labial - $20000\n4. Sombra de Ojos - $30000\n5. Máscara de pestañas - $20000\n6. Delineador - $10000\n7. Base de Maquillaje - $25000\n8. Corrector - $16000\n9. Rubor - $16000");
                agregarAlCarrito(parseInt(idProducto));
                break;
            case '2':
                verCarrito();
                break;
            case '3':
                calcularTotal();
                break;
            case '4':
                alert("Gracias por comprar en Euphoria Beauty.");
                console.log("Gracias por comprar en Euphoria Beauty.");
                break;
            default:
                alert("Opción no válida.");
                console.log("Opción no válida.");
        }
    } while (opcion !== '4');
}

tienda();

const productosLabios = productosDeMiTienda.filter(producto => producto.nombre.includes("labial"));
const productosOjos = productosDeMiTienda.filter(producto => producto.nombre.includes("ojos") || producto.nombre.includes("máscara") || producto.nombre.includes("delineador"));
const productosRostro = productosDeMiTienda.filter(producto => producto.nombre.includes("base") || producto.nombre.includes("corrector") || producto.nombre.includes("rubor"));

console.log("Productos de Labios:", productosLabios);
console.log("Productos de Ojos:", productosOjos);
console.log("Productos de Rostro:", productosRostro);