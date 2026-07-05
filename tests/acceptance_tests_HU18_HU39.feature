# language: es
# ============================================================================
# Monitor-IA — Acceptance Tests (HU18 - HU39)
# ============================================================================
# Proyecto: Monitor-IA / SecureIT
# Curso: IHC y Tecnologías Móviles (1ASI0385) — Sección 4822 — UPC
# Integrante: Y0SHIK1 (Kiyoshi Watanabe Corro)
# ============================================================================
# Este archivo contiene los acceptance tests en formato Gherkin (Cucumber)
# de las historias de usuario HU18 a HU39 del producto Monitor-IA.
# ============================================================================

Feature: HU18 - Detección de bostezos frecuentes

HU18: Detección de bostezos frecuentes
Como usuario, quiero que la aplicación registre si bostezo repetidamente,
para advertirme de fatiga temprana.

Scenario Outline: E01 - Acumulación de bostezos
Given El conductor maneja de madrugada
When El análisis facial registra "<cantidad_bostezos>" aperturas bucales prolongadas en un lapso menor a "<tiempo>"
Then El sistema clasifica el estado como fatiga de nivel uno

Examples: INPUT
| cantidad_bostezos | tiempo |
| 3                 | 5 minutos |

Examples: OUTPUT
| resultado |
| Estado clasificado como fatiga de nivel uno |

Scenario Outline: E02 - Bostezo aislado
Given El conductor se encuentra conduciendo
When Bostezo "<cantidad_bostezos>" a lo largo de un período de "<tiempo>"
Then El sistema registra el dato para las métricas finales pero omite el disparo de alertas audibles en cabina

Examples: INPUT
| cantidad_bostezos | tiempo |
| 1                 | 30 minutos |

Examples: OUTPUT
| resultado |
| Dato registrado en métricas finales sin disparo de alertas audibles en cabina |


Feature: HU19 - Detección de distracción visual

Como conductor, quiero una alerta si estoy mirando mucho tiempo a un lado, para recordar que debe mantener la vista en la pista.

Scenario Outline: E01 - Mirada desviada
Given El conductor desvía la mirada hacia la "<direccion>"
When Transcurren "<tiempo>" exactos sin retornar la vista al frente
Then El algoritmo dispara una alerta preventiva de falta de atención

Examples: INPUT
| direccion           | tiempo    |
| Ventana del pasajero | 4 segundos |

Examples: OUTPUT
| resultado |
| Alerta preventiva de falta de atención disparada |

Scenario Outline: E02 - Retorno de mirada rápido
Given El conductor observa momentáneamente el "<elemento>"
When Regresa la vista hacia el frente antes de cumplirse el "<tiempo_limite>"
Then El contador interno de distracción se reinicia sin penalizar al usuario

Examples: INPUT
| elemento                    | tiempo_limite |
| Panel de instrumentos del auto | 4 segundos    |

Examples: OUTPUT
| resultado |
| Contador interno de distracción reiniciado sin penalización al usuario |


Feature: HU20 - Manejo de obclusiones visuales

Como usuario que usa anteojos, quiero que el sistema siga detectando mis ojos,
para poder usar la aplicación sin quitarme los lentes.

Scenario Outline: E01 - Uso de lentes transparentes
Given El usuario lleva puestos "<tipo_lentes>"
When Inicia el monitoreo y las luces de los postes generan "<interferencia>"
Then El modelo de visión filtra las luces parásitas y reconoce exitosamente el parpadeo del conductor

Examples: INPUT
| tipo_lentes        | interferencia |
| Anteojos de medida | Reflejos      |

Examples: OUTPUT
| resultado |
| Luces parásitas filtradas y parpadeo del conductor reconocido exitosamente |

Scenario Outline: E02 - Uso de mascarilla facial
Given El usuario opta por conducir llevando una "<accesorio>"
When La cámara procesa su rostro cubierto de la nariz hacia abajo
Then El sistema concentra sus puntos de análisis en la "<region>" manteniendo operativa la detección de microsueños

Examples: INPUT
| accesorio             | region        |
| Mascarilla quirúrgica | Región ocular |

Examples: OUTPUT
| resultado |
| Sistema concentrado en región ocular con detección de microsueños operativa |


Feature: HU21 - Finalizar viaje

Como conductor, quiero detener el escaneo fácilmente,
para apagar la cámara al llegar a mi destino.

Scenario Outline: E01 - Detención segura
Given El usuario ha estacionado su vehículo en su "<lugar>"
When Presiona el "<boton>" de finalizar viaje en la pantalla
Then La aplicación apaga inmediatamente el proceso de captura de la cámara frontal

Examples: INPUT
| lugar   | boton        |
| Cochera | Botón físico |

Examples: OUTPUT
| resultado |
| Proceso de captura de cámara frontal apagado inmediatamente |

Scenario Outline: E02 - Resumen inmediato
Given El conductor confirma la "<accion>" del trayecto
When El sistema detiene todos los procesos de visión computacional
Then La interfaz gráfica carga instantáneamente el cuadro de estadísticas correspondientes a dicho viaje

Examples: INPUT
| accion        |
| Finalización |

Examples: OUTPUT
| resultado |
| Cuadro de estadísticas del viaje cargado instantáneamente en la interfaz gráfica |


Feature: HU22 - Autoguardado ante cierre forzado

Como usuario, quiero que si la aplicación se cierra inesperadamente no se pierda mi registro, para mantener mis estadísticas completas.

Scenario Outline: E01 - Recuperación de datos por falta de memoria
Given La aplicación sufre un cierre abrupto generado por el sistema operativo debido a "<causa>"
When El usuario vuelve a abrir la aplicación
Then El sistema restaura los datos guardados en el último ciclo de "<tiempo>" sin corromper el historial

Examples: INPUT
| causa              | tiempo     |
| Falta de memoria RAM | 5 minutos |

Examples: OUTPUT
| resultado |
| Datos restaurados del último ciclo sin corrupción del historial |

Scenario Outline: E02 - Reinicio del dispositivo móvil
Given El teléfono celular se apaga por completo por "<causa>"
When El conductor vuelve a encender el equipo e ingresa al sistema
Then La aplicación identifica que hubo una sesión inconclusa y consolida esos datos en el registro final

Examples: INPUT
| causa             |
| Falta de batería |

Examples: OUTPUT
| resultado |
| Sesión inconclusa identificada y datos consolidados en el registro final |


Feature: HU23 - Alerta preventiva temprana

Como conductor, quiero un aviso sonoro leve ante bostezos,
para estar advertido sin asustarme bruscamente.

Scenario Outline: E01 - Aviso de nivel uno
Given El sistema clasifica el estado actual como "<nivel_fatiga>" por bostezos
When Se dispara el protocolo de alerta
Then El celular emite un "<sonido>" y la pantalla tinteada en color amarillo

Examples: INPUT
| nivel_fatiga   | sonido                        |
| Fatiga temprana | Sonido corto de campanilla |

Examples: OUTPUT
| resultado |
| Sonido corto de campanilla emitido y pantalla tinteando en color amarillo |

Scenario Outline: E02 - Ignorar alerta preventiva
Given La aplicación emite el "<tipo_aviso>" sonoro
When El conductor opta por no interactuar con la pantalla pero cesa la "<conducta>"
Then El aviso visual desaparece luego de "<tiempo>" y el sistema retorna al monitoreo estándar

Examples: INPUT
| tipo_aviso        | conducta               | tiempo     |
| Aviso preventivo | Conducta de bostezo    | 3 segundos |

Examples: OUTPUT
| resultado |
| Aviso visual desaparecido y sistema retornado al monitoreo estándar |


Feature: HU24 - Alarma crítica de emergencia

Como conductor en riesgo, quiero una alarma fuerte ante un microsueño, para despertar inmediatamente y frenar a tiempo.

Scenario Outline: E01 - Alarma de nivel dos
Given Ocurre un evento confirmado de "<evento>"
When Se activa la emergencia del sistema
Then La aplicación emite un "<sonido>" continuo y la pantalla parpadea agresivamente en rojo intenso

Examples: INPUT
| evento                              | sonido           |
| Microsueño o cabeceo profundo       | Sonido estridente |

Examples: OUTPUT
| resultado |
| Sonido estridente continuo emitido y pantalla parpadeando agresivamente en rojo intenso |

Scenario Outline: E02 - Incremento de volumen progresivo
Given La alarma crítica ha sido disparada
When Transcurren "<tiempo>" exactos sin que el usuario confirme haber despertado
Then La aplicación fuerza automáticamente el control de volumen del dispositivo al "<nivel_volumen>"

Examples: INPUT
| tiempo     | nivel_volumen |
| 2 segundos | Nivel máximo  |

Examples: OUTPUT
| resultado |
| Volumen del dispositivo forzado automáticamente al nivel máximo |


Feature: HU25 - Alerta vibratoria
[NOTA: en la imagen aparece como "HU025"]

Como conductor que escucha música, quiero que el celular vibre intensamente,
para percibir la alarma de forma táctil.

Scenario Outline: E01 - Vibración de emergencia
Given Se ha gatillado una alarma de "<nivel>"
When El componente de audio comienza a sonar
Then El motor interno del teléfono inicia simultáneamente un patrón de vibración prolongada de "<duracion>"

Examples: INPUT
| nivel   | duracion   |
| Crítico | 3 segundos |

Examples: OUTPUT
| resultado |
| Motor interno del teléfono iniciando patrón de vibración prolongada de 3 segundos |

Scenario Outline: E02 - Dispositivo silenciado
Given El conductor colocó su teléfono en "<modo>" por la noche
When Ocurre un "<evento>" que requiere intervención
Then La aplicación omite las restricciones de perfil del usuario y activa la vibración máxima de todas maneras

Examples: INPUT
| modo               | evento         |
| Silencio absoluto  | Evento crítico |

Examples: OUTPUT
| resultado |
| Restricciones de perfil omitidas y vibración máxima activada |


Feature: HU26 - Botón de falsa alarma

Como usuario, quiero poder silenciar una alarma fácilmente,
para detener el ruido si el sistema cometió un error de detección.

Scenario Outline: E01 - Silenciado rápido
Given Una alarma de "<nivel>" se encuentra sonando en la cabina
When El usuario presiona el "<area>" de la pantalla indicando estar alerta
Then Los estímulos visuales y auditivos de emergencia se detienen de inmediato

Examples: INPUT
| nivel     | area          |
| Nivel dos | Area central  |

Examples: OUTPUT
| resultado |
| Estímulos visuales y auditivos de emergencia detenidos de inmediato |

Scenario Outline: E02 - Reanudación posterior a la cancelación
Given El usuario acaba de presionar el "<boton>" deteniendo la alarma
When La pantalla vuelve a su estado natural
Then El algoritmo aplica un "<periodo_gracia>" interno antes de procesar nuevos comportamientos de fatiga

Examples: INPUT
| boton             | periodo_gracia |
| Botón cancelatorio | 5 segundos     |

Examples: OUTPUT
| resultado |
| Periodo de gracia de 5 segundos aplicado antes de procesar nuevos comportamientos de fatiga |


Feature: HU27 - Sugerencia de parada estratégica

Como chofer en ruta larga, quiero que la aplicación me recomiende parar, para evitar exceder el límite seguro de horas de manejo.

Scenario Outline: E01 - Recordatorio por tiempo excedido
Given Que el temporizador interno de la sesión de manejo supera las "<horas_limite>"
When Se cumple este "<plazo_exacto>"
Then El sistema despliega una ventana sugiriendo al usuario realizar una pausa

Examples: INPUT
| horas_limite            | plazo_exacto |
| 4 horas interrumpidas   | 4 horas      |

Examples: OUTPUT
| resultado |
| Ventana desplegada sugiriendo pausa para preservar la salud del usuario |

Scenario Outline: E02 - Omitir sugerencia de parada
Given Que la ventana de sugerencia de descanso se encuentra activa en pantalla
When El conductor selecciona la "<opcion>"
Then El sistema cierra el mensaje y pospone cualquier nueva sugerencia

Examples: INPUT
| opcion                |
| continuar la marcha |

Examples: OUTPUT
| resultado |
| Mensaje cerrado y sugerencia pospuesta por una hora |


Feature: HU28 - Integración de mapas para descanso

como conductor fatigado, quiero un botón que me muestre estacionamientos cercanos, para encontrar un lugar seguro donde dormir.

Scenario Outline: E01 - Búsqueda de zonas de parqueo
Given Que el usuario recibe la sugerencia de pausa estratégica
When Presiona explícitamente el botón destinado a buscar "<lugares>"
Then La aplicación delega la instrucción al navegador GPS nativo

Examples: INPUT
| lugares              |
| lugares de descanso |

Examples: OUTPUT
| resultado |
| Puntos de estacionamiento en el radar mostrados en el GPS nativo |

Scenario Outline: E02 - Búsqueda de servicios en ruta
Given Que el conductor se encuentra en una "<vía>"
When Active la opción de descanso seguro ofrecida por la alerta
Then El enlace envía una consulta configurada para mostrar servicios próximos

Examples: INPUT
| vía                          |
| carretera interprovincial |

Examples: OUTPUT
| resultado |
| Estaciones de servicio y grifos operativos más próximos listados |


Feature: HU29 - Monitoreo en segundo plano

Como conductor particular, quiero usar mi navegador de rutas,
para ver el mapa mientras Monitor IA sigue cuidándome de fondo.

Scenario Outline: E01 - Servicio persistente con mapas
Given Que el usuario minimiza la aplicación de seguridad para visualizar la "<app_externa>"
When La aplicación principal pasa a un segundo plano
Then El servicio del sistema operativo retiene los permisos de cámara

Examples: INPUT
| app_externa                  |
| aplicación de mapas/rutas |

Examples: OUTPUT
| resultado |
| Análisis de rostros ininterrumpido asegurado en segundo plano |

Scenario Outline: E02 - Notificación permanente de actividad
Given Que la aplicación se encuentra procesando datos en segundo plano
When El usuario despliega la "<barra>" del celular
Then Observa un mensaje imborrable que certifica la actividad de seguridad

Examples: INPUT
| barra                                |
| barra superior de notificaciones |

Examples: OUTPUT
| resultado |
| Notificación permanente de cámara activa por seguridad mostrada |


Feature: HU30 - Elemento visual flotante

HU30: Elemento visual flotante

Como usuario navegando mi ruta, quiero ver un pequeño icono verde,
para saber visualmente que el monitoreo está activo.

Scenario Outline: E01 - Burbuja de estado verde
Given Que la ventana principal de la aplicación se ha minimizado
When El conductor mira la interfaz de su aplicación de "<app_actual>"
Then Percibe un icono circular verde flotante que indica análisis facial

Examples: INPUT
| app_actual   |
| mapas/GPS    |

Examples: OUTPUT
| resultado |
| Icono verde flotante visible sin invadir el campo visual del usuario |

Scenario Outline: E02 - Interacción con la burbuja
Given Que la burbuja flotante se encuentra posicionada sobre otra aplicación
When El conductor la toca con el dedo para revisar su "<seccion>"
Then El sistema operativo expande la ventana devolviendo a Monitor IA a primer plano

Examples: INPUT
| seccion         |
| configuración |

Examples: OUTPUT
| resultado |
| Vista en primer plano de pantalla completa restaurada |


Feature: HU31 - Modo ahorro de energía

Como taxista, quiero que la pantalla se oscurezca al máximo,
para no gastar batería excesiva durante mi jornada nocturna.

Scenario Outline: E01 - Atenuación automática de brillo
Given Que la aplicación principal permanece abierta sin interacción física por "<tiempo>"
When La funcionalidad de ahorro se encuentra activada en ajustes
Then El sistema reduce el brillo de todo el dispositivo al nivel más bajo

Examples: INPUT
| tiempo            |
| sesenta segundos  |

Examples: OUTPUT
| resultado |
| Brillo reducido al mínimo permitido por hardware |

Scenario Outline: E02 - Bloqueo de suspensión de pantalla
Given Que el brillo de la pantalla ha disminuido sustancialmente
When El tiempo de inactividad táctil supera la "<tiempo_inactividad>" estipulada
Then El código interno prohíbe que el teléfono pase a modo de suspensión

Examples: INPUT
| tiempo_inactividad |
| media hora         |

Examples: OUTPUT
| resultado |
| Cámara mantenida activa y suspensión de pantalla bloqueada |


Feature: HU32 - Iluminación de pantalla en alerta

Como usuario en modo ahorro, quiero que la pantalla se ilumine al máximo si hay un microsueño, para captar mi atención visualmente.

Scenario Outline: E01 - Restauración de brillo ante microsueño
Given Que la pantalla se halla fuertemente atenuada operando en modo ahorro
When Los algoritmos detectan un evento clasificable como "<nivel_evento>"
Then El sistema eleva de golpe la luminosidad de la pantalla

Examples: INPUT
| nivel_evento |
| crítico      |

Examples: OUTPUT
| resultado |
| Luminosidad al cien por ciento y parpadeos en color rojo |

Scenario Outline: E02 - Retorno a modo de ahorro
Given Que la alerta crítica ha sido controlada y la luminosidad se halla al máximo
When Transcurre un período de "<tiempo_espera>" sin interacción del usuario
Then La orden de atenuación entra nuevamente en vigencia

Examples: INPUT
| tiempo_espera |
| un minuto     |

Examples: OUTPUT
| resultado |
| Interfaz oscurecida para continuar la conservación de batería |


Feature: HU33 - Resumen posterior al viaje

Como conductor, quiero ver un resumen apenas apago el motor,
para saber cuántas veces presenté fatiga en la ruta.

Scenario Outline: E01 - Despliegue de métricas exitoso
Given Que el usuario declara la "<accion_final>" formal de su trayecto
When Los datos de la sesión son procesados por la aplicación
Then Se exhibe una pantalla consolidada indicando el tiempo conducido

Examples: INPUT
| accion_final  |
| finalización  |

Examples: OUTPUT
| resultado |
| Pantalla con recuento total de eventos críticos mostrada |

Scenario Outline: E02 - Viaje libre de incidencias
Given Que el conductor completa un trayecto sin registrar parpadeos lentos ni cabeceos
When El resumen correspondiente termina de generarse
Then El algoritmo de calificación adjudica un "<puntaje>"

Examples: INPUT
| puntaje          |
| puntaje perfecto |

Examples: OUTPUT
| resultado |
| Distintivo visual verde por excelencia en seguridad otorgado |


Feature: HU34 - Historial de viajes básico

Como usuario gratuito, quiero ver mis últimos cinco viajes,
para tener noción de mi rendimiento semanal de manejo.

Scenario Outline: E01 - Lista restringida para cuenta gratuita
Given Que un usuario sin suscripción activa accede a la sección de "<seccion>"
When El sistema carga los registros acumulados en la base de datos
Then Muestra detallados únicamente los "<cantidad>" viajes más recientes

Examples: INPUT
| seccion    | cantidad |
| historial  | cinco    |

Examples: OUTPUT
| resultado |
| Iconos de candado colocados sobre el resto de las entradas |

Scenario Outline: E02 - Intento de acceso a viaje bloqueado
Given Que el usuario básico visualiza la lista de registros antiguos protegidos por un candado
When Pulsa sobre uno de estos elementos para ver su "<contenido>"
Then La interfaz despliega una ventana emergente detallando la necesidad de actualizar su perfil

Examples: INPUT
| contenido |
| métricas  |

Examples: OUTPUT
| resultado |
| Ventana emergente solicitando actualización a nivel de pago |


Feature: HU35 - Historial ilimitado premium

Como suscriptor de pago, quiero acceder a mi historial completo,
para comparar mi rendimiento en meses pasados.

Scenario Outline: E01 - Acceso total a la base de datos
Given Que un usuario abona y valida su <membresía> correspondiente
When Visita la sección del historial de conducción
Then El sistema permite desplazarse por todos los meses y semanas registrados

Examples: INPUT
| membresía        |
| membresía premium |

Examples: OUTPUT
| resultado                                |
| Lista mostrada sin límites ni bloqueos visuales |

Scenario Outline: E02 - Filtrado por rango de fechas
Given Que el suscriptor posee decenas de registros alojados en el historial
When Utiliza el calendario integrado seleccionando un <mes_seleccionado> en particular
Then La lista principal se actualiza mostrando de forma exclusiva esas rutas

Examples: INPUT
| mes_seleccionado |
| mes_específico   |

Examples: OUTPUT
| resultado                                                          |
| Rutas efectuadas dentro del lapso de tiempo elegido mostradas |


Feature: HU36 - Gráficos de tendencias

Como usuario de pago, quiero ver gráficos que indiquen a qué horas sufro fatiga, para planificar mis futuras rutas de manera segura.

Scenario Outline: E01 - Análisis de microsueños por franjas horarias
[NOTA: en la imagen aparece "microsuños" (sic)]

Given Que el conductor accede a su apartado premium de métricas consolidadas
When Solicita la visualización del "<tipo_analisis>"
Then Se genera un gráfico de barras que ilustra las horas de somnolencia

Examples: INPUT
| tipo_analisis   |
| análisis horario |

Examples: OUTPUT
| resultado |
| Gráfico de barras de agrupación de eventos generado |

Scenario Outline: E02 - Análisis de evolución semanal
Given Que el usuario desea comprender la mejora de sus hábitos a lo largo de los días
When Modifica la vista principal al "<formato>"
Then El sistema renderiza una curva de progresión reflejando los indicadores

Examples: INPUT
| formato          |
| formato semanal  |

Examples: OUTPUT
| resultado |
| Curva de progresión de cansancio frente a periodos previos mostrada |


Feature: HU37 - Pantalla de actualización a versión de pago

Como usuario gratuito, quiero ver una pantalla comparativa,
para entender claramente los beneficios de adquirir la suscripción.

Scenario Outline: E01 - Visualización de muro de pago y beneficios
Given Que el usuario presiona una funcionalidad exclusiva para perfiles "<tipo_perfil>"
When El código de la aplicación detecta su nivel de cuenta básico
Then Despliega una interfaz que lista las ventajas obtenidas mediante el pago

Examples: INPUT
| tipo_perfil |
| premium     |

Examples: OUTPUT
| resultado |
| Costo mensual y beneficios de la suscripción mostrados |

Scenario Outline: E02 - Cierre del muro de pago
Given Que la oferta promocional se halla activa en el centro de la pantalla
When El individuo presiona el "<icono>" para abandonar la propuesta
Then La ventana se cierra retornándolo al menú anterior

Examples: INPUT
| icono        |
| aspa / cerrar |

Examples: OUTPUT
| resultado |
| Naturaliza de cuenta gratuita preservada sin modificaciones operativas |
[NOTA: el texto "Naturaliza" aparece así en la imagen; probablemente debería ser "Naturaleza"]


Feature: HU38 - Pasarela de pago de suscripción

HU38: Pasarela de pago de suscripción

Como usuario convencido, quiero pagar mi suscripción de manera segura, para activar inmediatamente mis beneficios premium.

Scenario Outline: E01 - Transacción exitosa mediante plataforma nativa
Given Que el usuario pulsa el botón oficial de adquirir la membresía
When La tienda digital procesa favorablemente los datos de su "<metodo_pago>"
Then Los servidores validan el cobro otorgando instantáneamente el rol privilegiado

Examples: INPUT
| metodo_pago     |
| tarjeta afiliada |

Examples: OUTPUT
| resultado |
| Nivel premium validado en la base de datos interna |

Scenario Outline: E02 - Fondos insuficientes en medio de pago
Given Que la solicitud de compra fue iniciada por el individuo
When La plataforma bancaria rechaza la operación por carecer de "<saldo>"
Then La interfaz principal advierte sobre la anomalía transaccional

Examples: INPUT
| saldo           |
| saldo habilitado |

Examples: OUTPUT
| resultado |
| Funcionalidades extendidas suspendidas y advertencia mostrada |


Feature: HU39 - Exportación de reporte en formato PDF

Como conductor profesional, quiero exportar mi récord de seguridad en PDF, para poder enviarlo como prueba a mi empresa de transportes.

Scenario Outline: E01 - Generación de documento y menú para compartir
Given Que el chofer desea sustentar su óptimo desempeño en ruta
When Pulsa la orden de "<acción>" visualizando un viaje determinado
Then El software estructura un documento digital y abre las opciones nativas

Examples: INPUT
| acción            |
| exportar informe  |

Examples: OUTPUT
| resultado |
| Opciones de envío por correo o redes habilitadas |

Scenario Outline: E02 - Cancelación de distribución directa
Given Que el documento ha sido creado tras la indicación del usuario
When Decide descartar el envío directo retrocediendo en el "<menu>"
Then El documento estructurado en formato PDF queda archivado localmente

Examples: INPUT
| menu                  |
| menú de distribución |

Examples: OUTPUT
| resultado |
| Documento archivado en el directorio de descargas del teléfono |

================================================================================
FIN DEL DOCUMENTO
Total de HU procesadas: 22 (HU18 a HU39)
================================================================================
