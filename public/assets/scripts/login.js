/* Helpers */
function obtenerUsuarios() {
    return JSON.parse(localStorage.getItem('usuariosDb')) || [];
}

/* HU02 - E02: Bloqueo de seguridad tras intentos fallidos */
const MAX_INTENTOS = 5;
const TIEMPO_BLOQUEO_MS = 30000; /* 30 segundos, valor de demostración */

function obtenerIntentos() {
    return JSON.parse(localStorage.getItem('intentosFallidos')) || {};
}
function guardarIntentos(data) {
    localStorage.setItem('intentosFallidos', JSON.stringify(data));
}

/* Login con correo y contraseña */
const formLogin = document.querySelector("#formLogin");
if (formLogin) {
    formLogin.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.querySelector("#logEmail").value.trim();
        const password = document.querySelector("#logPassword").value;

        const intentos = obtenerIntentos();
        const registro = intentos[email];

        /* Si la cuenta está bloqueada, no permitir el intento */
        if (registro && registro.bloqueadoHasta && Date.now() < registro.bloqueadoHasta) {
            const segundosRestantes = Math.ceil((registro.bloqueadoHasta - Date.now()) / 1000);
            alert(`Acceso bloqueado temporalmente. Intente de nuevo más tarde. (${segundosRestantes}s restantes)`);
            return;
        }

        const usuarios = obtenerUsuarios();
        const usuarioEncontrado = usuarios.find(u => u.email === email && u.password === password);

        if (usuarioEncontrado) {
            /* Login correcto: limpiar contador de intentos */
            delete intentos[email];
            guardarIntentos(intentos);
            localStorage.setItem('currentUser', JSON.stringify(usuarioEncontrado));
            window.location.href = 'dashboard.html';
        } else {
            const fallosPrevios = (registro && registro.fallos) || 0;
            const fallosActuales = fallosPrevios + 1;

            if (fallosActuales >= MAX_INTENTOS) {
                intentos[email] = { fallos: 0, bloqueadoHasta: Date.now() + TIEMPO_BLOQUEO_MS };
                guardarIntentos(intentos);
                alert("Acceso bloqueado temporalmente. Intente de nuevo más tarde.");
            } else {
                intentos[email] = { fallos: fallosActuales, bloqueadoHasta: null };
                guardarIntentos(intentos);
                alert(`Correo o contraseña incorrectos. Intento ${fallosActuales} de ${MAX_INTENTOS}.`);
            }
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
            email: `user@${red.toLowerCase()}.com`,
            tutorialVisto: false,
            permisoCamara: false
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