/* Proteger ruta e informacion de usuario */
let currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser) {
    window.location.href = 'index.html';
} else {
    document.getElementById('userNameDisplay').innerText = currentUser.nombre;
}

/* Helpers de persistencia de usuario */
function guardarCurrentUser() {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
}

function actualizarUsuarioDb() {
    if (!currentUser.email) return;
    const usuarios = JSON.parse(localStorage.getItem('usuariosDb')) || [];
    const idx = usuarios.findIndex(u => u.email === currentUser.email);
    if (idx !== -1) {
        usuarios[idx] = { ...usuarios[idx], ...currentUser };
        localStorage.setItem('usuariosDb', JSON.stringify(usuarios));
    }
}

/* Navegacion por pestañas*/
const tabBtns = document.querySelectorAll('.tab-btn:not(.logout)');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        const targetId = btn.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
    });
});

document.getElementById('btnSalirDash').addEventListener('click', () => {
    window.location.href = 'index.html';
});

/* ==========================================================
   HU04: Tutorial de uso inicial (carrusel de 3 pantallas)
   ========================================================== */
const slidesTutorial = [
    { titulo: "Bienvenido a Monitor-IA", texto: "Coloca tu celular en un soporte frente a ti, con la cámara enfocando tu rostro completo." },
    { titulo: "Calibración Rápida", texto: "Antes de cada viaje, calibra tu rostro para que el sistema te reconozca correctamente." },
    { titulo: "Alertas en Tiempo Real", texto: "Si detectamos bostezos, microsueños o cabeceos, te alertaremos de inmediato para tu seguridad." }
];
let indiceTutorial = 0;

const modalTutorial = document.getElementById('modalTutorial');
const tutorialTitulo = document.getElementById('tutorialTitulo');
const tutorialTexto = document.getElementById('tutorialTexto');
const btnSiguienteTutorial = document.getElementById('btnSiguienteTutorial');

function mostrarSlideTutorial(i) {
    tutorialTitulo.innerText = slidesTutorial[i].titulo;
    tutorialTexto.innerText = slidesTutorial[i].texto;
    btnSiguienteTutorial.innerText = (i === slidesTutorial.length - 1) ? "Finalizar" : "Siguiente";
}

function cerrarTutorial() {
    modalTutorial.style.display = 'none';
    currentUser.tutorialVisto = true;
    guardarCurrentUser();
    actualizarUsuarioDb();
}

/* E01: Navegación del tutorial completa (usuario nuevo) */
if (currentUser.tutorialVisto === false || currentUser.tutorialVisto === undefined) {
    indiceTutorial = 0;
    mostrarSlideTutorial(indiceTutorial);
    modalTutorial.style.display = 'flex';
}

btnSiguienteTutorial.addEventListener('click', () => {
    indiceTutorial++;
    if (indiceTutorial >= slidesTutorial.length) {
        cerrarTutorial();
    } else {
        mostrarSlideTutorial(indiceTutorial);
    }
});

/* E02: Omitir tutorial -> redirección directa a la herramienta de calibración */
function omitirTutorial() {
    cerrarTutorial();
    tabBtns[0].click(); /* Pestaña "Monitoreo Activo" */
    document.getElementById('camView').scrollIntoView({ behavior: 'smooth', block: 'center' });
}
document.getElementById('btnOmitirTutorial').addEventListener('click', omitirTutorial);
document.getElementById('btnOmitirTutorial2').addEventListener('click', omitirTutorial);

/* ==========================================================
   HU09: Permisos de sistema requeridos (cámara)
   ========================================================== */
const modalPermisoCamara = document.getElementById('modalPermisoCamara');
const btnIniciarViaje = document.getElementById('btnIniciarViaje');

document.getElementById('btnAceptarPermiso').addEventListener('click', () => {
    currentUser.permisoCamara = true;
    guardarCurrentUser();
    actualizarUsuarioDb();
    modalPermisoCamara.style.display = 'none';
    iniciarSecuenciaMonitoreo();
});

document.getElementById('btnRechazarPermiso').addEventListener('click', () => {
    currentUser.permisoCamara = false;
    guardarCurrentUser();
    modalPermisoCamara.style.display = 'none';
    btnIniciarViaje.disabled = true;
    btnIniciarViaje.style.opacity = '0.5';
    btnIniciarViaje.style.cursor = 'not-allowed';
    alert('Botón de iniciar viaje bloqueado y advertencia de funcionalidad limitada mostrada.');
});

/* ==========================================================
   HU15: Inicialización de monitoreo rápida (con cancelación)
   ========================================================== */
let temporizadorInicio = null;

/* Estadísticas del viaje activo (usadas en HU21 y HU33) */
let viajeInicio = null;
let contadorEventosCriticos = 0;

function iniciarSecuenciaMonitoreo() {
    btnIniciarViaje.dataset.enCuenta = 'true';
    btnIniciarViaje.innerText = 'Cancelar (3s)';
    temporizadorInicio = setTimeout(() => {
        btnIniciarViaje.dataset.enCuenta = 'false';
        btnIniciarViaje.innerText = 'Iniciar Monitoreo';
        viajeInicio = Date.now();
        contadorEventosCriticos = 0;
        alert("Cámara activada y redireccionado a la pantalla de viaje sin pasos intermedios.");
        tabBtns[1].click();
    }, 3000);
}

btnIniciarViaje.addEventListener('click', () => {
    /* E02: Cancelación de inicio accidental */
    if (btnIniciarViaje.dataset.enCuenta === 'true') {
        clearTimeout(temporizadorInicio);
        btnIniciarViaje.dataset.enCuenta = 'false';
        btnIniciarViaje.innerText = 'Iniciar Monitoreo';
        alert('Proceso abortado. Usuario devuelto al menú de inicio.');
        return;
    }

    /* HU09: verificar permiso de cámara antes de iniciar */
    if (!currentUser.permisoCamara) {
        modalPermisoCamara.style.display = 'flex';
        return;
    }

    /* E01: Arranque inmediato (con ventana de cancelación) */
    iniciarSecuenciaMonitoreo();
});

/* ==========================================================
   Eventos de la Pestaña "Monitoreo" (HU11, HU12, HU14)
   ========================================================== */
const camView = document.getElementById('camView');
const camText = document.getElementById('camText');

document.getElementById('btnCalibrar').addEventListener('click', () => {
    camView.style.borderColor = "#F59E0B";
    camText.innerText = "Enfocando rostro...";
    camText.style.color = "#F59E0B";
    setTimeout(() => {
        camView.style.borderColor = "#10B981";
        camText.innerText = "Cámara vinculada y calibrada. Indicador visual en verde.";
        camText.style.color = "#10B981";
    }, 1500);
});

/* HU11 - E02: Rostro fuera del marco guía */
document.getElementById('btnFueraMarco').addEventListener('click', () => {
    camView.style.borderColor = "#FF2424";
    camText.innerText = "Rostro fuera del marco. Indicador en rojo solicitando reubicación.";
    camText.style.color = "#FF2424";
});

/* HU12: Alerta de luz insuficiente */
document.getElementById('btnLuzInsuficiente').addEventListener('click', () => {
    camView.style.borderColor = "#F59E0B";
    camText.innerText = "Luz insuficiente. Mejore la iluminación del entorno.";
    camText.style.color = "#F59E0B";
    setTimeout(() => {
        camView.style.borderColor = "#10B981";
        camText.innerText = "Cámara vinculada y calibrada";
        camText.style.color = "#10B981";
        alert("Advertencia de luz baja desaparecida automáticamente tras confirmación del sensor.");
    }, 2000);
});

document.getElementById('btnVerificarRed').addEventListener('click', () => alert('El procesamiento local (offline) está activado.'));

/* HU14: Modo avión / procesamiento local */
document.getElementById('btnModoAvion').addEventListener('click', () => {
    alert('Modo avión activado. El proceso de detección de fatiga mantiene su rendimiento óptimo respaldado en el procesamiento local (offline).');
});

document.getElementById('chkLuz').addEventListener('click', () => alert('Nivel de luz adecuado para la detección.'));
document.getElementById('chkLente').addEventListener('click', () => alert('Lente frontal limpio y despejado.'));
document.getElementById('chkHardware').addEventListener('click', () => alert('Rendimiento del procesador óptimo para análisis en tiempo real.'));
document.getElementById('chkBateria').addEventListener('click', () => alert('El modo de ahorro de energía se activará automáticamente tras 1 minuto.'));

/* HU20: Manejo de oclusiones visuales (lentes y mascarilla) */
document.getElementById('btnSimularLentes').addEventListener('click', () => {
    camView.style.borderColor = "#10B981";
    camText.innerText = "Reflejo de lentes filtrado. Parpadeo reconocido correctamente.";
    camText.style.color = "#10B981";
});

document.getElementById('btnSimularMascarilla').addEventListener('click', () => {
    camView.style.borderColor = "#10B981";
    camText.innerText = "Análisis concentrado en la región ocular. Detección de microsueños activa.";
    camText.style.color = "#10B981";
});

/* ==========================================================
   HU29: Monitoreo en segundo plano
   HU30: Elemento visual flotante
   ========================================================== */
const burbujaFlotante = document.getElementById('burbujaFlotante');

document.getElementById('btnSimularSegundoPlano').addEventListener('click', () => {
    alert('Servicio persistente activo. Los permisos de cámara se retienen y el análisis facial continúa sin interrupciones.');
    burbujaFlotante.style.display = 'flex';
});

document.getElementById('btnVerNotificacionPersistente').addEventListener('click', () => {
    alert('Notificación permanente: la cámara frontal de Monitor-IA está activa por motivos de seguridad.');
});

/* HU30 - E02: Interacción con la burbuja flotante regresa la app a primer plano */
burbujaFlotante.addEventListener('click', () => {
    burbujaFlotante.style.display = 'none';
    tabBtns[0].click();
});

/* ==========================================================
   HU22: Autoguardado ante cierre forzado
   ========================================================== */
document.getElementById('btnSimularCierreForzado').addEventListener('click', () => {
    localStorage.setItem('viajeRespaldo', JSON.stringify({ eventosCriticos: contadorEventosCriticos, guardadoEn: Date.now() }));
    alert('La aplicación se cerró de forma abrupta. Los datos se respaldaron en el último ciclo de cinco minutos.');
});

document.getElementById('btnSimularReinicio').addEventListener('click', () => {
    const respaldo = JSON.parse(localStorage.getItem('viajeRespaldo'));
    if (respaldo) {
        contadorEventosCriticos = respaldo.eventosCriticos;
        alert('Sesión inconclusa detectada. La aplicación consolidó los datos pendientes en el registro final.');
    } else {
        alert('No se encontró ninguna sesión pendiente por recuperar.');
    }
});

/* ==========================================================
   Eventos de la Pestaña "Alertas" (HU13, HU16, HU17)
   ========================================================== */
const pantallaAlerta = document.getElementById('pantallaAlerta');
const dimOverlay = document.getElementById('dimOverlay');
let enPeriodoGracia = false;
let forzarVolumenTimeoutId = null;

/* ==========================================================
   HU21: Finalizar viaje
   HU33: Resumen posterior al viaje
   ========================================================== */
document.getElementById('btnFinalizarViaje').addEventListener('click', () => {
    /* HU21 - E01: Apagado inmediato del proceso de captura de la cámara */
    camView.style.borderColor = '';
    camText.innerText = 'Cámara inactiva';
    camText.style.color = '';
    pantallaAlerta.style.backgroundColor = '#1F2937';
    pantallaAlerta.innerText = 'Estado: Conducción Segura';

    const segundos = viajeInicio ? Math.floor((Date.now() - viajeInicio) / 1000) : 0;
    const mm = String(Math.floor(segundos / 60)).padStart(2, '0');
    const ss = String(segundos % 60).padStart(2, '0');
    document.getElementById('resumenTiempo').innerText = `${mm}:${ss}`;
    document.getElementById('resumenEventos').innerText = contadorEventosCriticos;

    const resumenBadge = document.getElementById('resumenBadge');
    if (contadorEventosCriticos === 0) {
        /* HU33 - E02: Viaje libre de incidencias, puntaje perfecto */
        resumenBadge.className = 'badge green';
        resumenBadge.innerText = 'Viaje Perfecto';
    } else {
        /* HU33 - E01: Despliegue de métricas del viaje */
        resumenBadge.className = 'badge yellow';
        resumenBadge.innerText = `${contadorEventosCriticos} evento(s) registrados`;
    }
    document.getElementById('resumenTexto').style.display = 'none';
    document.getElementById('resumenDatos').style.display = 'block';

    /* HU21 - E02: Carga instantánea del cuadro de estadísticas del viaje */
    viajeInicio = null;
    tabBtns[2].click();
});

/* HU18: Detección de bostezos frecuentes
   HU23: Alerta preventiva temprana */
let contadorBostezos = 0;
let bostezoResetTimeoutId = null;

document.getElementById('btnSimularBostezo').addEventListener('click', () => {
    contadorBostezos++;
    clearTimeout(bostezoResetTimeoutId);
    bostezoResetTimeoutId = setTimeout(() => { contadorBostezos = 0; }, 8000);

    /* HU18 - E01: Tres bostezos detectados en un lapso corto -> fatiga nivel uno */
    if (contadorBostezos >= 3) {
        contadorBostezos = 0;
        contadorEventosCriticos++;
        pantallaAlerta.style.backgroundColor = '#F59E0B';
        pantallaAlerta.innerText = '¡Atención! Fatiga de nivel uno detectada por bostezos repetidos.';
        setTimeout(() => {
            /* HU23 - E02: El aviso desaparece solo si el conductor deja de bostezar */
            if (pantallaAlerta.innerText.includes('nivel uno')) {
                pantallaAlerta.style.backgroundColor = '#1F2937';
                pantallaAlerta.innerText = 'Estado: Conducción Segura';
            }
        }, 3000);
    } else {
        /* HU23 - E01: Aviso sonoro leve y pantalla en amarillo */
        pantallaAlerta.style.backgroundColor = '#F59E0B';
        pantallaAlerta.innerText = '¡Atención! Bostezo detectado. (Sonido leve)';
    }
});

/* HU18 - E02: Bostezo aislado, se registra pero no dispara alertas audibles */
document.getElementById('btnBostezoAislado').addEventListener('click', () => {
    contadorBostezos = 0;
    alert('Bostezo aislado registrado para las métricas del viaje. No se disparó ninguna alerta audible.');
});

/* HU24: Alarma crítica de emergencia ante microsueño
   HU25: Alerta vibratoria
   HU32: Iluminación de pantalla en alerta */
document.getElementById('btnSimularMicrosueno').addEventListener('click', () => {
    /* HU26 - E02: Los eventos se ignoran durante el periodo de gracia */
    if (enPeriodoGracia) {
        alert('Evento ignorado: el sistema se encuentra en su periodo de gracia tras la última alarma.');
        return;
    }

    contadorEventosCriticos++;

    /* HU24 - E01: Sonido estridente y parpadeo agresivo en rojo */
    pantallaAlerta.classList.add('shake');
    pantallaAlerta.style.backgroundColor = '#FF2424';
    pantallaAlerta.innerText = '¡PELIGRO! Microsueño detectado. (Alarma máxima y vibración)';
    setTimeout(() => pantallaAlerta.classList.remove('shake'), 3000);

    /* HU07 - E01: El volumen se eleva automáticamente al máximo apenas se dispara la alarma */
    const rango = document.getElementById('rangoVolumen');
    if (rango) rango.value = 100;

    /* HU25 - E01 / E02: Vibración de tres segundos, incluso con el equipo en silencio */
    if (navigator.vibrate) navigator.vibrate(3000);

    /* HU32 - E01: Restaura el brillo máximo si la pantalla estaba en modo ahorro */
    if (dimOverlay.classList.contains('active')) {
        dimOverlay.classList.remove('active');
        setTimeout(() => dimOverlay.classList.add('active'), 60000);
    }

    /* HU24 - E02: Si en dos segundos el usuario no confirma haber despertado, el volumen se vuelve a forzar al máximo */
    clearTimeout(forzarVolumenTimeoutId);
    forzarVolumenTimeoutId = setTimeout(() => {
        if (rango) rango.value = 100;
    }, 2000);
});

/* HU26: Botón de falsa alarma (silenciado rápido) */
document.getElementById('btnSilenciarAlarma').addEventListener('click', () => {
    /* HU26 - E01: Silenciado inmediato de los estímulos de emergencia */
    clearTimeout(forzarVolumenTimeoutId);
    pantallaAlerta.classList.remove('shake');
    pantallaAlerta.style.backgroundColor = '#1F2937';
    pantallaAlerta.innerText = 'Estado: Conducción Segura';

    /* HU26 - E02: Periodo de gracia de cinco segundos antes de procesar nuevos eventos */
    enPeriodoGracia = true;
    setTimeout(() => { enPeriodoGracia = false; }, 5000);
});

/* HU28 - E01: Búsqueda de zonas de parqueo cercanas */
document.getElementById('btnSugerirParada').addEventListener('click', () => alert('Delegando al navegador GPS la búsqueda de estacionamientos cercanos...'));
/* HU28 - E02: Búsqueda de servicios en ruta (grifos y estaciones de servicio) */
document.getElementById('btnBuscarGrifos').addEventListener('click', () => alert('Delegando al navegador GPS la búsqueda de grifos y estaciones de servicio próximas...'));

document.getElementById('btnNotificarEmergencia').addEventListener('click', () => atAbrir('at-emergencia'));
document.getElementById('btnVerEstiramientos').addEventListener('click', () => atAbrir('at-estiramientos'));

/* HU13: Alerta de rostro mal posicionado (pérdida de enfoque en ruta) */
document.getElementById('btnPerdidaRostro').addEventListener('click', () => {
    pantallaAlerta.style.backgroundColor = '#374151';
    pantallaAlerta.innerText = 'Sonido suave emitido: pérdida de visibilidad del rostro detectada.';
    setTimeout(() => {
        pantallaAlerta.style.backgroundColor = '#1F2937';
        pantallaAlerta.innerText = 'Aviso sonoro detenido. Monitoreo reanudado silenciosamente.';
    }, 2500);
});

/* HU16: Detección de parpadeo prolongado vs parpadeo natural */
document.getElementById('btnParpadeoProlongado').addEventListener('click', () => {
    pantallaAlerta.style.backgroundColor = '#FF2424';
    pantallaAlerta.innerText = 'Evento clasificado como microsueño crítico. Alerta enviada al sistema central.';
});

document.getElementById('btnParpadeoNatural').addEventListener('click', () => {
    alert('Eventos de parpadeo natural ignorados por no superar el tiempo umbral programado.');
});

/* HU17: Detección de cabeceo peligroso vs movimiento breve */
document.getElementById('btnCabeceoPeligroso').addEventListener('click', () => {
    pantallaAlerta.style.backgroundColor = '#FF2424';
    pantallaAlerta.innerText = 'Evento de cabeceo por sueño registrado formalmente en el sistema.';
});

document.getElementById('btnMovimientoBreve').addEventListener('click', () => {
    alert('El algoritmo determina que el tiempo es insuficiente y no emite falsas alarmas.');
});

/* HU19: Detección de distracción visual */
let distraccionTimeoutId = null;

document.getElementById('btnMiradaDesviada').addEventListener('click', () => {
    pantallaAlerta.style.backgroundColor = '#F59E0B';
    pantallaAlerta.innerText = 'Mirada desviada del frente. Verificando tiempo de distracción...';
    distraccionTimeoutId = setTimeout(() => {
        /* HU19 - E01: Cuatro segundos sin retornar la vista al frente */
        contadorEventosCriticos++;
        pantallaAlerta.innerText = 'Alerta preventiva: mantén la vista en la pista.';
    }, 4000);
});

document.getElementById('btnRetornoMirada').addEventListener('click', () => {
    /* HU19 - E02: El contador se reinicia sin penalizar al usuario */
    clearTimeout(distraccionTimeoutId);
    pantallaAlerta.style.backgroundColor = '#1F2937';
    pantallaAlerta.innerText = 'Estado: Conducción Segura';
    alert('Retorno de mirada a tiempo. El contador de distracción se reinició sin penalización.');
});

/* HU27: Sugerencia de parada estratégica */
const modalSugerenciaParada = document.getElementById('modalSugerenciaParada');
let sugerenciaPospuesta = false;

document.getElementById('btnSimular4Horas').addEventListener('click', () => {
    /* HU27 - E02: La sugerencia permanece pospuesta durante una hora */
    if (sugerenciaPospuesta) {
        alert('Sugerencia pospuesta. Aún resta tiempo dentro de la hora de tolerancia.');
        return;
    }
    /* HU27 - E01: Cuatro horas continuas de manejo */
    modalSugerenciaParada.style.display = 'flex';
});

document.getElementById('btnTomarDescanso').addEventListener('click', () => {
    modalSugerenciaParada.style.display = 'none';
    alert('Buen trabajo. Tómate un momento para descansar antes de continuar tu viaje.');
});

document.getElementById('btnContinuarManejando').addEventListener('click', () => {
    modalSugerenciaParada.style.display = 'none';
    sugerenciaPospuesta = true;
    setTimeout(() => { sugerenciaPospuesta = false; }, 15000);
});

/* ==========================================================
   Eventos de Otras Pestañas
   ========================================================== */
document.getElementById('btnExportarPDF').addEventListener('click', () => atAbrir('at-pdf'));
document.getElementById('btnPremiumBanner').addEventListener('click', () => alert('Mostrando pasarela de pago para historial ilimitado y gráficos de tendencias.'));
document.getElementById('btnCompartirLogro').addEventListener('click', () => atAbrir('at-compartir'));

/* ==========================================================
   HU34: Historial de viajes básico (candado para cuenta gratuita)
   HU35: Historial ilimitado premium
   ========================================================== */
const historialBody = document.getElementById('historialBody');
const selectFiltroMes = document.getElementById('selectFiltroMes');
let cuentaPremium = false;

historialBody.addEventListener('click', (e) => {
    const fila = e.target.closest('tr');
    if (!fila) return;

    /* HU34 - E02: Intento de acceso a un viaje bloqueado */
    if (fila.dataset.locked === 'true' && !cuentaPremium) {
        alert('Este viaje pertenece al historial extendido. Actualiza tu perfil a la versión premium para consultarlo.');
    }
});

document.getElementById('btnActivarPremium').addEventListener('click', () => {
    /* HU35 - E01: Acceso total al historial sin bloqueos */
    cuentaPremium = true;
    historialBody.querySelectorAll('tr').forEach(fila => {
        fila.dataset.locked = 'false';
        const badge = fila.querySelector('.badge.locked');
        if (badge) {
            badge.classList.remove('locked');
            badge.classList.add('green');
            badge.innerText = 'Seguro';
        }
    });
    selectFiltroMes.disabled = false;
    alert('Cuenta premium activada. Historial ilimitado desbloqueado.');
});

selectFiltroMes.addEventListener('change', (e) => {
    /* HU35 - E02: Filtrado del historial por rango de fechas */
    const mes = e.target.value;
    historialBody.querySelectorAll('tr').forEach(fila => {
        fila.style.display = (mes === 'todos' || fila.dataset.month === mes) ? '' : 'none';
    });
});

document.getElementById('btnVincularReloj').addEventListener('click', () => atAbrir('at-reloj'));
document.getElementById('btnSincronizarCalendario').addEventListener('click', () => atAbrir('at-calendario'));
document.getElementById('btnContactarSoporte').addEventListener('click', () => atAbrir('at-soporte'));

/* ==========================================================
   HU06: Ajuste de sensibilidad de detección
   ========================================================== */
const selectSensibilidad = document.getElementById('selectSensibilidad');

selectSensibilidad.addEventListener('change', (e) => {
    alert(`Parámetros de reconocimiento facial actualizados a nivel ${e.target.value}.`);
});

document.getElementById('btnRestaurarSensibilidad').addEventListener('click', () => {
    selectSensibilidad.value = 'media';
    alert('Sensibilidad restablecida exitosamente al nivel medio.');
});

/* ==========================================================
   HU07: Configuración de volumen de alertas (probar sonido)
   ========================================================== */
document.getElementById('btnProbarSonido').addEventListener('click', () => {
    const nivel = document.getElementById('rangoVolumen').value;
    alert(`Emitiendo muestra de audio del tono de alarma real durante 5 segundos. (Volumen: ${nivel}%)`);
});

/* ==========================================================
   HU08: Tema oscuro/claro automático (simulación por horario)
   ========================================================== */
function aplicarColoresElementos(colores) {
    document.body.style.backgroundColor = colores.fondo;
    document.body.style.color = colores.texto;
    document.querySelectorAll('.dash-card').forEach(el => {
        el.style.backgroundColor = colores.tarjeta;
        el.style.color = colores.texto;
    });
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.style.backgroundColor = colores.tarjeta;
    }
}

document.getElementById('btnSimularNocturno').addEventListener('click', () => {
    aplicarColoresElementos({ fondo: '#111827', texto: '#FFFFFF', tarjeta: '#1F2937' });
    alert('Interfaz cambiada automáticamente a colores oscuros puros.');
});

document.getElementById('btnSimularDiurno').addEventListener('click', () => {
    aplicarColoresElementos({ fondo: '#F3F4F6', texto: '#111827', tarjeta: '#FFFFFF' });
    alert('Interfaz retornada automáticamente a una paleta de colores claros.');
});

/* ==========================================================
   HU31: Modo de ahorro de energía
   HU32: Iluminación de pantalla en alerta
   ========================================================== */
document.getElementById('btnSimularInactividad').addEventListener('click', () => {
    /* HU31 - E01: Atenuación automática de brillo tras inactividad */
    dimOverlay.classList.add('active');
    alert('Sesenta segundos sin interacción. El brillo del dispositivo se redujo al mínimo para ahorrar energía.');
});

document.getElementById('btnSimularSuspension').addEventListener('click', () => {
    /* HU31 - E02: Bloqueo de suspensión de pantalla mientras el monitoreo está activo */
    alert('Inactividad prolongada detectada. La suspensión de pantalla se bloqueó para mantener la cámara operativa.');
});

/* ==========================================================
   HU05: Edición de perfil (nombre y tipo de vehículo)
   HU10: Contactos de emergencia (validación de formato)
   ========================================================== */
const inputNombrePerfil = document.getElementById('inputNombrePerfil');
const selectTipoVehiculo = document.getElementById('selectTipoVehiculo');
const inputContactoEmergencia = document.getElementById('inputContactoEmergencia');

/* Precargar datos guardados del usuario */
inputNombrePerfil.value = currentUser.nombre || '';
if (currentUser.tipoVehiculo) selectTipoVehiculo.value = currentUser.tipoVehiculo;
if (currentUser.contactoEmergencia) inputContactoEmergencia.value = currentUser.contactoEmergencia;

const telefonoRegex = /^[+]?[\d\s]{6,15}$/;

document.getElementById('btnGuardarCambios').addEventListener('click', () => {
    const nombre = inputNombrePerfil.value.trim();
    const contacto = inputContactoEmergencia.value.trim();

    /* HU05 - E02: Intento de guardar campos vacíos */
    if (!nombre) {
        inputNombrePerfil.style.borderColor = '#FF2424';
        alert('Acción bloqueada. Se solicita ingresar un nombre válido.');
        return;
    }
    inputNombrePerfil.style.borderColor = '';

    /* HU10 - E02: Formato de número inválido */
    if (!telefonoRegex.test(contacto)) {
        inputContactoEmergencia.style.borderColor = '#FF2424';
        alert('Casilla resaltada en rojo. Mensaje de error de formato de contacto.');
        return;
    }
    inputContactoEmergencia.style.borderColor = '#10B981';

    /* HU05 - E01: Actualización de datos exitosa */
    currentUser.nombre = nombre;
    currentUser.tipoVehiculo = selectTipoVehiculo.value;
    currentUser.contactoEmergencia = contacto;
    guardarCurrentUser();
    actualizarUsuarioDb();
    document.getElementById('userNameDisplay').innerText = currentUser.nombre;

    /* HU10 - E01: Registro de contacto exitoso */
    alert('Información actualizada. Contacto guardado exitosamente como contacto principal para notificaciones futuras.');
});

/* ============================================================ */
/* VISTAS ACCEPTANCE TESTS HU40-HU55 (puro front, sin lógica)   */
/* ============================================================ */
function atAbrir(id) { document.getElementById(id).classList.add('active'); }
function atCerrar(id) {
    const m = document.getElementById(id);
    m.classList.remove('active');
    m.querySelectorAll('.at-ok').forEach(o => o.classList.remove('show'));
}
document.querySelectorAll('.at-overlay').forEach(ov => {
    ov.addEventListener('click', e => { if (e.target === ov) atCerrar(ov.id); });
});
document.querySelectorAll('[data-at-close]').forEach(btn => {
    btn.addEventListener('click', () => atCerrar(btn.getAttribute('data-at-close')));
});
document.querySelectorAll('[data-at-ok]').forEach(btn => {
    btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-at-ok');
        const ok = document.querySelector('#' + modalId + ' .at-ok');
        if (ok) ok.classList.add('show');
    });
});
