//DAR LA BIENVENIDA A LOS USUARIOS A MI PÁGINA WEB.

alert("Bienvenidos a Euphoria Beauty, su tienda de cosméticos.")

console.log("Bienvenidos a Euphoria Beauty, su tienda de cosméticos.")

//REGISTRARSE.

function solicitarDatosParaRegistro() {
    let correoElectronico = prompt("Ingresa tu e-mail para registrarte:").toLowerCase()
    let contrasena = prompt("Crea una contraseña:").toLowerCase()
    let repetirContrasena = prompt("Repetir la contraseña:").toLowerCase()

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

let usuario = prompt("Ingresá tu e-mail:").toLowerCase()
let contrasenaCorrecta = "12345";
let contrasena;

do {
    contrasena = prompt("Por favor, ingresa tu contraseña:")

    if (contrasena !== contrasenaCorrecta) {
        alert("Contraseña incorrecta. Inténtalo de nuevo.")
    }
} while (contrasena !== contrasenaCorrecta)

alert("¡Has ingresado correctamente!")



//TIENDA: PRODUCTOS PARA LABIOS.

let total = 0;
let productos = [
    {
        nombre: "labial retractil",
        descripcion: "Labial mate cremoso que define y llena tus labios de color.",
        coloresDisponibles: ["Rojo", "Rosa", "Naranja", "Violeta", "Marrón", "Beige", "Fucsia"],
        precio: 10000
    },
    {
        nombre: "labial liquido",
        descripcion: "Labial líquido mate con textura suave y no pegajosa, acabado impecable.",
        coloresDisponibles: ["Nude", "Marrón", "Rosa Claro", "Terracota"],
        precio: 12000
    },
    {
        nombre: "labial tradicional",
        descripcion: "Fórmula suave y cremosa, con colores intensos que hidratan los labios.",
        coloresDisponibles: ["Rojo Intenso", "Coral", "Rosa", "Violeta", "Naranja", "Rojo Oscuro", "Beige", "Fucsia"],
        precio: 9000
    }
];

function mostrarProductos() {
    let mensaje = "Productos disponibles:\n\n"

    productos.forEach(producto => {
        mensaje += `Nombre: ${producto.nombre}\n`
        mensaje += `Descripción: ${producto.descripcion}\n`
        mensaje += `Colores disponibles: ${producto.coloresDisponibles.join(", ")}\n`
        mensaje += `Precio: $${producto.precio}\n\n`
    })

    alert(mensaje);
}

mostrarProductos()

function obtenerDetallesProducto(nombreProducto) {
    return productos.find(producto => producto.nombre === nombreProducto)
}

let seleccionUsuario = prompt(
    "Por favor, indique el nombre del producto que le gustaría adquirir y escriba 'comprar' para finalizar su compra.")

while (seleccionUsuario !== "comprar") {
    let producto = obtenerDetallesProducto(seleccionUsuario)

    if (producto) {
        switch (seleccionUsuario) {
            case "labial retractil":
                total += producto.precio;
                console.log(`Producto: ${producto.nombre}`)
                console.log(`Descripción: ${producto.descripcion}`)
                console.log(`Colores disponibles: ${producto.coloresDisponibles.join(", ")}`)
                console.log(`Precio: $${producto.precio}`)
                console.log(`Total actual: $${total}`)
                break

            case "labial líquido":
                total += producto.precio
                console.log(`Producto: ${producto.nombre}`)
                console.log(`Descripción: ${producto.descripcion}`)
                console.log(`Colores disponibles: ${producto.coloresDisponibles.join(", ")}`)
                console.log(`Precio: $${producto.precio}`)
                console.log(`Total actual: $${total}`)
                break

            case "labial tradicional":
                total += producto.precio;
                console.log(`Producto: ${producto.nombre}`)
                console.log(`Descripción: ${producto.descripcion}`)
                console.log(`Colores disponibles: ${producto.coloresDisponibles.join(", ")}`)
                console.log(`Precio: $${producto.precio}`)
                console.log(`Total actual: $${total}`)
                break

            default:
                console.log("Producto no válido.")
                break
        }

        seleccionUsuario = prompt("Puede añadir otro producto o escribir 'comprar' para finalizar su compra!").toLowerCase()
    } else {
        seleccionUsuario = prompt("El producto ingresado no es válido. Ingrese un producto correcto o 'comprar' para finalizar.").toLowerCase()
    }
}

alert("El valor final de su compra es: $" + total)
