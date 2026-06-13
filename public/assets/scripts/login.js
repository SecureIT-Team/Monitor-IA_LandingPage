/* Helpers */
function obtenerUsuarios() {
    return JSON.parse(localStorage.getItem('usuariosDb')) || [];
}

/* Login con correo y contraseña */
const formLogin = document.querySelector("#formLogin");
if (formLogin) {
    formLogin.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.querySelector("#logEmail").value.trim();
        const password = document.querySelector("#logPassword").value;

        const usuarios = obtenerUsuarios();
        const usuarioEncontrado = usuarios.find(u => u.email === email && u.password === password);

        if (usuarioEncontrado) {
            localStorage.setItem('currentUser', JSON.stringify(usuarioEncontrado));
            window.location.href = 'dashboard.html';
        } else {
            alert("Correo o contraseña incorrectos.");
        }
    });
}

/* Login con redes sociales */
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

/* Si ya hay sesion activa, redirigir al dashboard */
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (currentUser) {
    window.location.href = 'dashboard.html';
}