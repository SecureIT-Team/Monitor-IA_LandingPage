/* Helpers */
function obtenerUsuarios() {
    return JSON.parse(localStorage.getItem('usuariosDb')) || [];
}

/* Registro con correo y contraseña */
const formRegistro = document.querySelector("#formRegistro");
if (formRegistro) {
    formRegistro.addEventListener("submit", (e) => {
        e.preventDefault();
        const nombre = document.querySelector("#regNombre").value.trim();
        const email = document.querySelector("#regEmail").value.trim();
        const password = document.querySelector("#regPassword").value;

        const usuarios = obtenerUsuarios();

        if (usuarios.find(u => u.email === email)) {
            alert("Ese correo ya está registrado. ¿Deseas iniciar sesión?");
            return;
        }

        if (password.length < 6) {
            alert("La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        const nuevoUsuario = { nombre, email, password };
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
            email: `user@${red.toLowerCase()}.com`
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