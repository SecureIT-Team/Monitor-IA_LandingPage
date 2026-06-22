# Monitor-IA

> **Seguridad vial inteligente.** Plataforma de detección de somnolencia y fatiga al volante basada en inteligencia artificial, accesible desde el smartphone de cualquier conductor.

![Monitor-IA](https://img.shields.io/badge/Monitor--IA-SecureIT-red?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![jQuery](https://img.shields.io/badge/jQuery-0769AD?style=flat-square&logo=jquery&logoColor=white)

---

## Descripción del proyecto

**Monitor-IA** es el producto estrella de la startup **SecureIT**, una solución tecnológica enfocada en revolucionar la seguridad vial y el monitoreo en tiempo real mediante herramientas basadas en inteligencia artificial. Nuestro propósito es **salvaguardar la vida de los conductores y pasajeros** anticipándose a las situaciones de riesgo en la vía.

La fatiga y la somnolencia al volante son una de las principales causas de accidentes de tránsito. Monitor-IA utiliza algoritmos avanzados de **visión computacional** y análisis de datos para detectar signos tempranos de cansancio —parpadeo prolongado, cabeceo y bostezos— y emitir alertas preventivas antes de que ocurra un accidente.

Este repositorio contiene el **Landing Page** del producto, desarrollado como avance del proyecto del curso de **IHC y Tecnologías Móviles** en la **Universidad Peruana de Ciencias Aplicadas (UPC)**.

---

## Acerca de la startup — SecureIT

| | |
|---|---|
| **Misión** | Desarrollar e implementar soluciones tecnológicas innovadoras y accesibles basadas en inteligencia artificial para reducir drásticamente los accidentes de tránsito, protegiendo la vida de las personas y optimizando la seguridad en el transporte. |
| **Visión** | Consolidarnos como la empresa líder a nivel internacional en el desarrollo de software de seguridad preventiva para el sector transporte, siendo reconocidos por nuestra alta precisión, impacto social positivo y excelencia técnica. |

---

## Segmentos objetivo

| # | Segmento | Perfil | Necesidad |
|---|----------|--------|-----------|
| 1 | **Conductores profesionales** | Choferes independientes (taxistas, transporte de carga ligera o personal) cuyas largas jornadas los exponen a un alto desgaste físico. | Proteger su herramienta de trabajo y regresar a salvo con su familia. |
| 2 | **Conductores particulares post-jornada** | Oficinistas y profesionales (ej. médicos residentes) entre 20 y 50 años que enfrentan riesgo letal por cansancio acumulado en su trayecto de retorno en el tráfico limeño. | Un "copiloto silencioso" de un solo toque que vigile su viaje de vuelta a casa. |

### El problema en cifras

- **82 %** de los conductores reconoce que la fatiga es la principal causa de accidentes viales.
- **59 %** reporta haber tenido al menos un *casi-accidente* vinculado directamente a la fatiga.
- **56 %** admite haber sentido cansancio extremo al volante.
- **47 %** duerme menos de 7 horas en días laborales.
- En el Perú se registran más de **87 000 siniestros de tránsito** al año, con el **70 %** atribuible al factor humano.

*Fuentes: ONSV-MTC (2024); Rey de Castro, Rosales Mayor & Egoavil Rojas (2022); Growth Market Reports (2024).*

---

## Principales características de la solución

- **Procesamiento biométrico local (Edge Computing)** — Análisis de parpadeo, cabeceo y bostezos usando la cámara frontal del smartphone, **100 % offline** para proteger la privacidad.
- **Sistema de alertas escalonado** — Avisos preventivos suaves (vibración) y alarmas críticas sonoras/visuales para microsueños.
- **Interfaz adaptativa** — Modo oscuro automático y modo ahorro de energía para trayectos nocturnos prolongados.
- **Historial de viajes** — Métricas post-viaje con indicadores tipo semáforo para crear conciencia sobre los hábitos de descanso.
- **Modelo freemium** — Accesible para cualquier conductor particular sin inversión en hardware adicional.
- **Interfaz "zero-touch"** — Diseñada bajo la Ley de Fitts: botones gigantes que no exigen esfuerzo mental a un conductor ya agotado.

---

## Autores

Proyecto desarrollado por el equipo **SecureIT** (grupo 4822) — curso *IHC y Tecnologías Móviles*, UPC.

| Integrante | Código | Carrera |
|------------|--------|---------|
| **Huayta Fuentes, Hernán Gabriel** | U202320776 | Ingeniería de Software |
| **Orellana Gutiérrez, Daniel Esteban** | U202314756 | Ingeniería de Sistemas de Información |
| **Quijano Tasayco, Stefano Paolo** | U20241C659 | Ingeniería de Sistemas de Información |
| **Tello Lima, José Alejandro** | U202421618 | Ingeniería de Software |
| **Watanabe Corro, Kiyoshi Sebastian** | U202518806 | Ingeniería de Software |

---

## Estructura del proyecto

```
Monitor-IA_LandingPage/
├── README.md                      # Documentación del proyecto
├── .gitignore
└── public/                        # Carpeta principal del proyecto
    ├── favicon.ico                # Ícono del sitio
    ├── index.html                 # Página principal (Landing Page)
    └── assets/                    # Carpeta de assets
        ├── styles/
        │   └── styles.css         # Hoja de estilos
        ├── images/                # Imágenes (.jpg, .png, etc.)
        └── scripts/
            └── main.js            # Lógica JavaScript + jQuery
```

---

## Tecnologías utilizadas

- **HTML5** — Estructura semántica.
- **CSS3** — Estilos personalizados (sin frameworks CSS).
- **JavaScript** — Interactividad del lado del cliente.
- **[jQuery](https://jquery.com/)** — Manipulación del DOM y eventos.
- **[Google Fonts](https://fonts.google.com/)** — Tipografía web (Poppins, Inter).
- **[Font Awesome](https://fontawesome.com/)** — Iconografía.

---

## Flujo de trabajo — GitFlow

El repositorio sigue el modelo **GitFlow** con las siguientes ramas:

| Rama | Propósito |
|------|-----------|
| `main` | Código en producción (versiones estables liberadas). |
| `develop` | Rama de integración donde convergen todas las funcionalidades en desarrollo. |
| `feature/*` | Funcionalidades nuevas, se ramifican **a partir de `develop`**. |

### Convención de nombres para ramas `feature`

```
feature/<sección>-<descripción-corta>
```

Ejemplos:

- `feature/hero-section` — Desarrollo de la sección principal (hero).
- `feature/navbar-navigation` — Barra de navegación y menú.
- `feature/about-startup` — Sección "Acerca de SecureIT".
- `feature/target-segments` — Sección de segmentos objetivo.
- `feature/features-section` — Sección de características del producto.
- `feature/footer-contact` — Pie de página y formulario de contacto.

---

## Cómo ejecutar el proyecto localmente

1. Clona el repositorio:

   ```bash
   git clone https://github.com/SecureIT-Team/Monitor-IA_LandingPage.git
   cd Monitor-IA_LandingPage
   ```

2. Abre el archivo `public/index.html` en tu navegador, o sirve la carpeta con un servidor estático:

   ```bash
   # Con Python 3
   cd public
   python3 -m http.server 8000
   ```

3. Visita `http://localhost:8000` en tu navegador.

---

## Licencia

Proyecto académico desarrollado con fines educativos para la **Universidad Peruana de Ciencias Aplicadas (UPC)**. Curso: *IHC y Tecnologías Móviles* (1ASI0385) — Sección 4822 — Ciclo 2026-10.

© 2026 **SecureIT — Monitor-IA**. Todos los derechos reservados.
