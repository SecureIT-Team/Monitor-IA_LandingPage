/* Helpers */
function obtenerUsuarios() {
    return JSON.parse(localStorage.getItem('usuariosDb')) || [];
}

/* Validador de formato de correo (HU01 - E02) */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* Registro con correo y contraseña */
const formRegistro = document.querySelector("#formRegistro");
if (formRegistro) {
    formRegistro.addEventListener("submit", (e) => {
        e.preventDefault();
        const nombre = document.querySelector("#regNombre").value.trim();
        const email = document.querySelector("#regEmail").value.trim();
        const password = document.querySelector("#regPassword").value;

        /* HU01 - E02: Formato inválido de correo */
        if (!emailRegex.test(email)) {
            alert("Formato de correo inválido. Ingresar un correo válido.");
            return;
        }

        const usuarios = obtenerUsuarios();

        if (usuarios.find(u => u.email === email)) {
            alert("Ese correo ya está registrado. ¿Deseas iniciar sesión?");
            return;
        }

        if (password.length < 6) {
            alert("La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        /* HU01 - E01: Registro exitoso */
        const nuevoUsuario = { nombre, email, password, tutorialVisto: false, permisoCamara: false };
        usuarios.push(nuevoUsuario);
        localStorage.setItem('usuariosDb', JSON.stringify(usuarios));
        localStorage.setItem('currentUser', JSON.stringify(nuevoUsuario));

        window.location.href = 'dashboard.html';
    });
}

/* Registro con redes sociales */
const redesBtns = document.querySelectorAll(".auth-social-btn");
redesBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        const red = btn.getAttribute("data-red");
        const usuarioSocial = {
            nombre: `Usuario de ${red}`,
            email: `user@${red.toLowerCase()}.com`,
            tutorialVisto: false,
            permisoCamara: false
        };
        localStorage.setItem('currentUser', JSON.stringify(usuarioSocial));
        window.location.href = 'dashboard.html';
    });
});

/*redirigir al dashboard si hay sesion activa */
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (currentUser) {
    window.location.href = 'dashboard.html';
}