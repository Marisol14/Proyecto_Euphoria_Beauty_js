function handleLogin(event) {
    event.preventDefault(); 
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const user = storedUsers.find(user => user.email === email && user.password === password);

    if (user) {
        Swal.fire("¡Éxito!", "Has iniciado sesión correctamente", "success");
    } else {
        Swal.fire("Error", "Correo o contraseña incorrectos", "error");
    }
}


function handleRegister(event) {
    event.preventDefault(); 
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    if (email && password) {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

        const userExists = storedUsers.some(user => user.email === email);
        if (userExists) {
            Swal.fire("Error", "El usuario ya está registrado", "error");
            return;
        }

        storedUsers.push({ email, password });
        localStorage.setItem('users', JSON.stringify(storedUsers));

        Swal.fire("¡Éxito!", "Te has registrado correctamente", "success");
    } else {
        Swal.fire("Error", "Por favor completa todos los campos", "error");
    }
}

document.querySelector('.login-form').addEventListener('submit', handleLogin);
document.querySelector('.register-form').addEventListener('submit', handleRegister);
