/* Manejo de sesion y renderizado de menu */
function verificarSesion() {
    const usuarioActual = JSON.parse(localStorage.getItem('currentUser'));
    const menuVisitante = document.querySelector("#menuVisitante");
    const menuUsuario = document.querySelector("#menuUsuario");
    const nombrePerfil = document.querySelector("#nombrePerfil");

    if (usuarioActual) {
        menuVisitante.style.display = "none";
        menuUsuario.style.display = "flex";
        nombrePerfil.innerText = "Hola, " + usuarioActual.nombre;
    } else {
        menuVisitante.style.display = "flex";
        menuUsuario.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", verificarSesion);

/* Menú con desplazamiento suave */
const enlacesScroll = [
    { id: "#btnInicio", target: "#inicio" },
    { id: "#btnFuncionalidades", target: "#funcionalidades" },
    { id: "#btnDemostracion", target: "#demostracion" }
];

enlacesScroll.forEach(enlace => {
    const btn = document.querySelector(enlace.id);
    if (btn) {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(enlace.target).scrollIntoView({ behavior: "smooth" });
        });
    }
});

/* Cerrar Sesión */
const btnCerrarSesion = document.querySelector("#btnCerrarSesion");
if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem('currentUser');
        verificarSesion();
    });
}