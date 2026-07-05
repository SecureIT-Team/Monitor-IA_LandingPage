# language: es
# ============================================================================
# Monitor-IA — Acceptance Tests (HU40 - HU55)
# ============================================================================
# Proyecto: Monitor-IA / SecureIT
# Curso: IHC y Tecnologías Móviles (1ASI0385) — Sección 4822 — UPC
# Integrante: Homesman (Hernán Huayta Fuentes)
# ============================================================================
# Este archivo contiene los acceptance tests en formato Gherkin (Cucumber)
# de las historias de usuario HU40 a HU55 del producto Monitor-IA.
# ============================================================================

Feature: Acceptance Tests HU40 - HU55 — Monitor-IA
  Como equipo de SecureIT, queremos validar el comportamiento esperado de
  las funcionalidades avanzadas de Monitor-IA mediante acceptance tests,
  para asegurar que cada historia de usuario se cumple antes de liberar.

  # ==========================================================================
  # HU40: Contacto de soporte y retroalimentación
  # ==========================================================================
  Feature: HU40 - Contacto de soporte y retroalimentación
    Como usuario con problemas técnicos, quiero enviar un mensaje a soporte,
    para reportar fallos o proponer mejoras directamente desde la aplicación.

    Scenario Outline: E01 - Envío de formulario exitoso
      Given Que el usuario completa satisfactoriamente los campos del formulario
      When Ejecuta la acción central de envío de "<datos>"
      Then La información ingresada viaja encriptada hacia los servidores de atención
      Examples:
        | datos    |
        | mensaje  |
      Examples:
        | resultado                                            |
        | Notificación formal de agradecimiento presentada     |

    Scenario Outline: E02 - Fallo por falta de conexión a red
      Given Que el conductor pulse el botón destinado a transmitir su reclamo
      When El equipo móvil se halla carente de conexión viable a "<red>"
      Then El sistema resguarda el texto redactado alertando mediante un mensaje temporal
      Examples:
        | red              |
        | internet/datos   |
      Examples:
        | resultado                                              |
        | Comunicación en espera de restauración de señal        |

  # ==========================================================================
  # HU41: Sistema de puntaje por manejo seguro
  # ==========================================================================
  Feature: HU41 - Sistema de puntaje por manejo seguro
    Como conductor profesional, quiero acumular puntos por cada trayecto sin
    alertas críticas, para motivarme a mantener hábitos de descanso saludables.

    Scenario Outline: E01 - Acumulación de puntos
      Given Que el usuario finaliza un viaje sin registrar microsueños
      When El sistema procesa el resumen final
      Then Se le otorgan "<puntos>" al perfil del usuario
      Examples:
        | puntos                 |
        | 50 puntos de seguridad |
      Examples:
        | resultado                                          |
        | Puntos sumados exitosamente al perfil del conductor |

    Scenario Outline: E02 - Penalización de puntaje
      Given Que el sistema detecta un evento crítico de cabeceo
      When Se genera el cierre del viaje
      Then La aplicación descuenta "<puntos_descuento>" del total acumulado
      Examples:
        | puntos_descuento |
        | 10 puntos        |
      Examples:
        | resultado                              |
        | Penalización aplicada al puntaje del día |

  # ==========================================================================
  # HU42: Ranking de seguridad vial
  # ==========================================================================
  Feature: HU42 - Ranking de seguridad vial
    Como usuario, quiero ver mi posición en un ranking local de conductores
    seguros, para comparar mi desempeño con otros profesionales del sector.

    Scenario Outline: E01 - Visualización de tabla de posiciones
      Given Que el usuario ingresa a la sección de "<seccion>"
      When Selecciona la pestaña de ranking semanal
      Then La interfaz despliega una lista ordenada de usuarios según su puntaje
      Examples:
        | seccion    |
        | comunidad  |
      Examples:
        | resultado                                                       |
        | Lista de conductores ordenados por nivel de seguridad mostrada  |

    Scenario Outline: E02 - Anonimato en el ranking
      Given Que el usuario prefiere no mostrar su nombre completo
      When Activa la opción de privacidad en ajustes
      Then El sistema muestra un "<nombre_ficticio>" en la tabla pública
      Examples:
        | nombre_ficticio     |
        | pseudónimo genérico |
      Examples:
        | resultado                                       |
        | Identidad real protegida en el ranking público  |

  # ==========================================================================
  # HU43: Compartir logros de seguridad
  # ==========================================================================
  Feature: HU43 - Compartir logros de seguridad
    Como conductor particular, quiero compartir mis récords de conducción sin
    fatiga en redes sociales, para promover la seguridad vial entre mis contactos.

    Scenario Outline: E01 - Publicación en redes
      Given Que el usuario logra una semana perfecta de conducción
      When Presiona el botón de compartir "<logro>"
      Then El sistema genera una imagen optimizada para plataformas sociales
      Examples:
        | logro          |
        | logro semanal  |
      Examples:
        | resultado                                                |
        | Imagen generada con el resumen de su desempeño           |

    Scenario Outline: E02 - Selección de plataforma
      Given Que la imagen del logro ha sido generada
      When El usuario elige una aplicación de "<plataforma>" específica
      Then El archivo se adjunta automáticamente para su envío
      Examples:
        | plataforma            |
        | mensajería/red social |
      Examples:
        | resultado                                                  |
        | Archivo visual adjuntado exitosamente en la app elegida    |

  # ==========================================================================
  # HU44: Notificación automática a contactos de emergencia
  # ==========================================================================
  Feature: HU44 - Notificación automática a contactos de emergencia
    Como conductor nocturno, quiero que la aplicación envíe un mensaje a mi
    contacto de emergencia tras una alerta crítica persistente, para recibir
    ayuda externa si no reacciono.

    Scenario Outline: E01 - Envío de alerta externa
      Given Que se han disparado tres alarmas de nivel dos en menos de "<tiempo>"
      When El usuario no confirma su estado de alerta
      Then El sistema envía un mensaje de texto automático con la ubicación actual
      Examples:
        | tiempo        |
        | diez minutos  |
      Examples:
        | resultado                                          |
        | SMS de alerta enviado al contacto registrado       |

    Scenario Outline: E02 - Confirmación de recepción
      Given Que el mensaje de emergencia ha sido enviado
      When El contacto recibe la notificación
      Then La aplicación muestra un "<aviso>" en pantalla
      Examples:
        | aviso           |
        | alerta visual   |
      Examples:
        | resultado                                                          |
        | Aviso en pantalla indicando que la ayuda ha sido solicitada         |

  # ==========================================================================
  # HU45: Autodiagnóstico de calidad de cámara
  # ==========================================================================
  Feature: HU45 - Autodiagnóstico de calidad de cámara
    Como usuario, quiero que la aplicación verifique si el lente de mi cámara
    está sucio o empañado, para garantizar la precisión de la detección.

    Scenario Outline: E01 - Detección de lente obstruido
      Given Que el algoritmo de visión recibe una imagen "<calidad>"
      When Se inicia el proceso de calibración facial
      Then El sistema muestra un mensaje sugiriendo la limpieza del lente
      Examples:
        | calidad  |
        | borrosa  |
      Examples:
        | resultado                                    |
        | Advertencia de lente obstruido desplegada    |

    Scenario Outline: E02 - Verificación de éxito
      Given Que el usuario limpia la cámara tras el aviso
      When El sistema detecta nitidez en los puntos faciales
      Then La advertencia desaparece y permite proceder con el "<proceso>"
      Examples:
        | proceso     |
        | monitoreo   |
      Examples:
        | resultado                              |
        | Monitoreo facial iniciado correctamente |

  # ==========================================================================
  # HU46: Sugerencia de ejercicios de estiramiento
  # ==========================================================================
  Feature: HU46 - Sugerencia de ejercicios de estiramiento
    Como taxista en jornada intensa, quiero recibir guías de estiramientos
    breves durante mis paradas, para reducir la fatiga física acumulada.

    Scenario Outline: E01 - Visualización de ejercicios
      Given Que el conductor se detiene tras una alerta de fatiga temprana
      When La aplicación detecta que el vehículo no está en "<estado>"
      Then Ofrece una rutina de tres minutos con ilustraciones
      Examples:
        | estado      |
        | movimiento  |
      Examples:
        | resultado                                   |
        | Ejercicios cervicales mostrados en pantalla |

    Scenario Outline: E02 - Finalización de rutina
      Given Que el usuario completa los ejercicios sugeridos
      When Marca la actividad como "<estado_actividad>"
      Then El sistema registra una mejora en el estado de bienestar del perfil
      Examples:
        | estado_actividad |
        | terminada        |
      Examples:
        | resultado                           |
        | Registro de bienestar actualizado   |

  # ==========================================================================
  # HU47: Personalización de la voz de alerta
  # ==========================================================================
  Feature: HU47 - Personalización de la voz de alerta
    Como usuario, quiero elegir entre diferentes voces para las alertas, para
    que el estímulo auditivo sea más efectivo según mi preferencia.

    Scenario Outline: E01 - Cambio de perfil de voz
      Given Que el usuario ingresa a los ajustes de audio
      When Selecciona un paquete de "<tipo_voz>" diferente
      Then El sistema reproduce una muestra del nuevo tono para confirmación
      Examples:
        | tipo_voz |
        | voz      |
      Examples:
        | resultado                                         |
        | Muestra de audio de confirmación reproducida      |

    Scenario Outline: E02 - Aplicación en tiempo real
      Given Que el nuevo perfil de voz ha sido guardado
      When Ocurre un evento de somnolencia
      Then La aplicación utiliza la "<voz_configurada>" seleccionada
      Examples:
        | voz_configurada |
        | voz guardada    |
      Examples:
        | resultado                                       |
        | Advertencias emitidas con el nuevo perfil sonoro |

  # ==========================================================================
  # HU48: Sincronización con calendario laboral
  # ==========================================================================
  Feature: HU48 - Sincronización con calendario laboral
    Como médico residente, quiero vincular mi horario de guardias con la
    aplicación, para que Monitor-IA me sugiera iniciar el monitoreo
    automáticamente al salir del trabajo.

    Scenario Outline: E01 - Vinculación de calendario
      Given Que el usuario otorga permisos de lectura de calendario
      When Existe un evento laboral marcado como "<estado_evento>"
      Then La aplicación envía una notificación recordatoria para activar el escaneo
      Examples:
        | estado_evento |
        | finalizado    |
      Examples:
        | resultado                                                  |
        | Notificación para iniciar monitoreo de seguridad enviada    |

    Scenario Outline: E02 - Ajuste de horario
      Given Que el horario de salida del trabajo cambia
      When El usuario modifica su "<registro>"
      Then El sistema actualiza automáticamente el momento de la sugerencia
      Examples:
        | registro |
        | agenda   |
      Examples:
        | resultado                                               |
        | Recordatorio de protección reprogramado exitosamente    |

  # ==========================================================================
  # HU49: Modo de acompañamiento asistido
  # ==========================================================================
  Feature: HU49 - Modo de acompañamiento asistido
    Como conductor solitario, quiero que la aplicación me haga preguntas
    sencillas ocasionalmente, para mantener mi cerebro activo mediante la
    interacción verbal.

    Scenario Outline: E01 - Interacción preventiva
      Given Que el sistema detecta un nivel moderado de fatiga monótona
      When Se activa el modo de acompañamiento
      Then La aplicación emite una "<interaccion>" por voz que requiere respuesta
      Examples:
        | interaccion       |
        | pregunta sencilla |
      Examples:
        | resultado                                     |
        | Pregunta de estimulación mental emitida       |

    Scenario Outline: E02 - Detección de respuesta
      Given Que el sistema espera la respuesta verbal del usuario
      When Detecta la voz confirmando estar "<estado_conductor>"
      Then El contador de fatiga se reinicia temporalmente
      Examples:
        | estado_conductor |
        | alerta           |
      Examples:
        | resultado                                                          |
        | Fatiga acumulada reiniciada gracias a la confirmación verbal       |

  # ==========================================================================
  # HU50: Reporte de eficiencia y seguridad
  # ==========================================================================
  Feature: HU50 - Reporte de eficiencia y seguridad
    Como profesional de transporte, quiero vincular mis eventos de fatiga con
    mi consumo de combustible, para entender cómo el cansancio afecta mi economía.

    Scenario Outline: E01 - Análisis de conducción brusca
      Given Que el usuario tiene activado el GPS y los sensores de movimiento
      When Se registran frenados bruscos tras "<evento_peligroso>"
      Then El reporte final destaca la pérdida de eficiencia energética asociada
      Examples:
        | evento_peligroso |
        | microsueños      |
      Examples:
        | resultado                                            |
        | Impacto en consumo de combustible reportado          |

    Scenario Outline: E02 - Comparativa de ahorro
      Given Que el conductor mejora sus horas de descanso
      When Revisa el resumen semanal
      Then El sistema muestra una estimación del "<beneficio>" por conducción segura
      Examples:
        | beneficio        |
        | dinero ahorrado  |
      Examples:
        | resultado                                                |
        | Estimación económica de mejora desplegada en pantalla    |

  # ==========================================================================
  # HU51: Control mediante gestos faciales básicos
  # ==========================================================================
  Feature: HU51 - Control mediante gestos faciales básicos
    Como usuario con las manos al volante, quiero silenciar alertas leves
    mediante un guiño prolongado o movimiento de cabeza, para no soltar el timón.

    Scenario Outline: E01 - Silenciado gestual
      Given Que suena una alerta preventiva de nivel uno
      When El conductor realiza un movimiento de cabeza afirmativo detectado por la "<tecnologia>"
      Then El sistema interpreta la señal y detiene el sonido sin interacción táctil
      Examples:
        | tecnologia |
        | cámara     |
      Examples:
        | resultado                                          |
        | Alerta cancelada exitosamente mediante gesto       |

    Scenario Outline: E02 - Prioridad de seguridad
      Given Que ocurre una alarma crítica de nivel dos
      When El usuario intenta usar gestos para "<accion_deseada>"
      Then El sistema ignora el gesto y exige la pulsación física del botón
      Examples:
        | accion_deseada |
        | apagarla        |
      Examples:
        | resultado                                                |
        | Gesto ignorado, requiriendo acción táctil consciente     |

  # ==========================================================================
  # HU52: Insignias de experto en prevención
  # ==========================================================================
  Feature: HU52 - Insignias de experto en prevención
    Como usuario recurrente, quiero ganar insignias digitales por hitos
    alcanzados, para sentir una progresión en mi compromiso con la seguridad vial.

    Scenario Outline: E01 - Otorgamiento de insignia
      Given Que el conductor completa treinta días de monitoreo continuo
      When Se genera el cierre del "<periodo>"
      Then El sistema desbloquea la insignia de Protector de la Vía
      Examples:
        | periodo |
        | mes     |
      Examples:
        | resultado                                              |
        | Insignia desbloqueada y añadida al perfil público      |

    Scenario Outline: E02 - Colección visual
      Given Que el usuario ha ganado múltiples reconocimientos
      When Visita su perfil personal
      Then Observa un panel con todos los distintivos logrados y los requisitos para los "<siguientes>"
      Examples:
        | siguientes        |
        | siguientes logros |
      Examples:
        | resultado                                               |
        | Galería de insignias y progresos desplegada en pantalla |

  # ==========================================================================
  # HU53: Autodiagnóstico de hardware del sensor
  # ==========================================================================
  Feature: HU53 - Autodiagnóstico de hardware del sensor
    Como conductor, quiero que la aplicación evalúe si mi procesador es
    suficientemente rápido para el análisis en tiempo real, para evitar
    retrasos en las alertas.

    Scenario Outline: E01 - Prueba de rendimiento inicial
      Given Que la aplicación se instala en un dispositivo nuevo
      When Se ejecuta por primera vez
      Then Realiza una prueba de latencia de procesamiento del modelo de "<sistema>"
      Examples:
        | sistema                 |
        | inteligencia artificial |
      Examples:
        | resultado                                             |
        | Prueba de capacidad de CPU completada internamente    |

    Scenario Outline: E02 - Advertencia de hardware limitado
      Given Que el dispositivo no cumple con los tiempos mínimos de respuesta
      When Finaliza el diagnóstico
      Then El sistema sugiere cerrar otras aplicaciones en segundo plano para optimizar
      Examples:
        | resultado_diagnostico |
        | tiempos superados     |
      Examples:
        | resultado                                              |
        | Advertencia de límite de hardware desplegada al usuario |

  # ==========================================================================
  # HU54: Sincronización con dispositivos vestibles
  # ==========================================================================
  Feature: HU54 - Sincronización con dispositivos vestibles
    Como usuario que posee un reloj inteligente, quiero que Monitor-IA reciba
    mis datos de frecuencia cardíaca, para mejorar la precisión de la detección de sueño.

    Scenario Outline: E01 - Vinculación de dispositivo externo
      Given Que el usuario tiene un reloj compatible conectado por "<metodo>"
      When Inicia la sesión de conducción
      Then La aplicación integra las pulsaciones por minuto como variable adicional
      Examples:
        | metodo      |
        | proximidad  |
      Examples:
        | resultado                                          |
        | Datos biométricos integrados al algoritmo principal |

    Scenario Outline: E02 - Alerta por pulso bajo
      Given Que la frecuencia cardíaca desciende a niveles típicos de sueño profundo
      When Esto ocurre en paralelo con un "<indicador_visual>"
      Then El sistema dispara la alarma crítica de manera prioritaria
      Examples:
        | indicador_visual |
        | parpadeo lento   |
      Examples:
        | resultado                                          |
        | Alarma de riesgo inminente detonada sin retraso    |

  # ==========================================================================
  # HU55: Modo de entrenamiento de reflejos
  # ==========================================================================
  Feature: HU55 - Modo de entrenamiento de reflejos
    Como conductor nuevo, quiero realizar una simulación de alerta en un
    entorno seguro, para saber exactamente cómo reaccionar ante una emergencia real.

    Scenario Outline: E01 - Ejecución de simulacro
      Given Que el vehículo se encuentra estacionado y la app en modo "<modo_app>"
      When El sistema dispara una alarma aleatoria
      Then El usuario debe presionar el botón de respuesta midiendo su tiempo de reacción
      Examples:
        | modo_app       |
        | entrenamiento  |
      Examples:
        | resultado                                        |
        | Milisegundos de tiempo de reacción registrados   |

    Scenario Outline: E02 - Reporte de agilidad
      Given Que el usuario completa tres ejercicios de simulación
      When Finaliza la sesión
      Then La aplicación le indica si sus reflejos actuales son aptos para iniciar una "<tipo_ruta>"
      Examples:
        | tipo_ruta  |
        | ruta larga |
      Examples:
        | resultado                                |
        | Veredicto de aptitud mostrado en la interfaz |
