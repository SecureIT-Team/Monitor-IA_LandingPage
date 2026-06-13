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
            msg.style.color = "#10B981";
            msg.innerText = "¡Mensaje enviado! Revisa la bandeja de tu correo electrónico.";
        } else {
            msg.style.color = "#FF2424";
            msg.innerText = "Ese correo no está registrado en el sistema.";
        }
    });
}