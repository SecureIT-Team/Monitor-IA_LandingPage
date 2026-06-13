/* Proteger ruta e informacion de usuario */
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser) {
    window.location.href = 'index.html';
} else {
    document.getElementById('userNameDisplay').innerText = currentUser.nombre;
}

/* Navegacion por pestañas*/
const tabBtns = document.querySelectorAll('.tab-btn:not(.logout)');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remover activos
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Agregar activos
        btn.classList.add('active');
        const targetId = btn.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
    });
});

document.getElementById('btnSalirDash').addEventListener('click', () => {
    window.location.href = 'index.html';
});

/* Eventos de la Pestaña "Monitoreo"*/
document.getElementById('btnIniciarViaje').addEventListener('click', () => {
    alert("Iniciando monitoreo. La pantalla pasará a Modo Oscuro y la app funcionará en segundo plano.");
 
    tabBtns[1].click();
});

document.getElementById('btnCalibrar').addEventListener('click', () => {
    const view = document.getElementById('camView');
    const text = document.getElementById('camText');
    view.style.borderColor = "#F59E0B";
    text.innerText = "Enfocando rostro...";
    text.style.color = "#F59E0B";
    setTimeout(() => {
        view.style.borderColor = "#10B981";
        text.innerText = "Cámara vinculada y calibrada";
        text.style.color = "#10B981";
    }, 1500);
});

document.getElementById('btnVerificarRed').addEventListener('click', () => alert('El procesamiento local (offline) está activado.'));
document.getElementById('chkLuz').addEventListener('click', () => alert('Nivel de luz adecuado para la detección.'));
document.getElementById('chkLente').addEventListener('click', () => alert('Lente frontal limpio y despejado.'));
document.getElementById('chkHardware').addEventListener('click', () => alert('Rendimiento del procesador óptimo para análisis en tiempo real.'));
document.getElementById('chkBateria').addEventListener('click', () => alert('El modo de ahorro de energía se activará automáticamente tras 1 minuto.'));

/*  Eventos de la Pestaña "Alertas"*/
const pantallaAlerta = document.getElementById('pantallaAlerta');

document.getElementById('btnFinalizarViaje').addEventListener('click', () => alert('Viaje finalizado. Generando resumen...'));

document.getElementById('btnSimularBostezo').addEventListener('click', () => {
    pantallaAlerta.style.backgroundColor = '#F59E0B';
    pantallaAlerta.innerText = '¡Atención! Bostezo detectado. (Sonido leve)';
});

document.getElementById('btnSimularMicrosueno').addEventListener('click', () => {
    pantallaAlerta.style.backgroundColor = '#FF2424';
    pantallaAlerta.innerText = '¡PELIGRO! Microsueño detectado. (Alarma máxima y vibración)';
});

document.getElementById('btnSilenciarAlarma').addEventListener('click', () => {
    pantallaAlerta.style.backgroundColor = '#1F2937';
    pantallaAlerta.innerText = 'Estado: Conducción Segura';
});

document.getElementById('btnSugerirParada').addEventListener('click', () => alert('Abriendo mapas para mostrar gasolineras y zonas de descanso cercanas...'));
document.getElementById('btnNotificarEmergencia').addEventListener('click', () => alert('Enviando mensaje de emergencia SMS con tu ubicación a tu contacto de confianza.'));
document.getElementById('btnVerEstiramientos').addEventListener('click', () => alert('Mostrando guía rápida de estiramientos cervicales.'));

/*Eventos de Otras Pestañas*/
document.getElementById('btnExportarPDF').addEventListener('click', () => alert('Generando documento PDF de tu récord de seguridad...'));
document.getElementById('btnPremiumBanner').addEventListener('click', () => alert('Mostrando pasarela de pago para historial ilimitado y gráficos de tendencias.'));
document.getElementById('btnCompartirLogro').addEventListener('click', () => alert('Generando imagen para compartir en redes sociales.'));
document.getElementById('btnGuardarCambios').addEventListener('click', () => alert('Cambios guardados correctamente.'));
document.getElementById('btnVincularReloj').addEventListener('click', () => alert('Buscando dispositivos cercanos... Smartwatch vinculado.'));
document.getElementById('btnSincronizarCalendario').addEventListener('click', () => alert('Sincronizando con tu calendario de guardias médicas/laborales.'));
document.getElementById('btnContactarSoporte').addEventListener('click', () => alert('Abriendo formulario de soporte técnico.'));