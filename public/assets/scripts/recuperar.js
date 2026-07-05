/* Helpers */
function obtenerUsuarios() {
    return JSON.parse(localStorage.getItem('usuariosDb')) || [];
}

/* recuperar contraseña */
const formRecuperar = document.querySelector("#formRecuperar");
if (formRecuperar) {
    formRecuperar.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.querySelector("#recEmail").value.trim();
        const usuarios = obtenerUsuarios();
        const msg = document.querySelector("#msgRecuperar");

        if (usuarios.find(u => u.email === email)) {
            /* HU03 - E01: Envío de enlace exitoso (válido por 15 minutos) */
            msg.style.color = "#10B981";
            msg.innerText = "Enlace de recuperación enviado. Válido por 15 minutos.";
        } else {
            /* HU03 - E02: Correo no registrado */
            msg.style.color = "#FF2424";
            msg.innerText = "La cuenta no existe.";
        }
    });
}