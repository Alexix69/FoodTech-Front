# 📋 Historias de Usuario - FoodTech Frontend

## HU-FRONT-001: Visualizar disponibilidad de mesas en tiempo real

**Como** mesero del restaurante  
**Quiero** ver el estado actual de todas las mesas (disponibles u ocupadas)  
**Para** saber qué mesas puedo asignar a nuevos clientes sin consultar manualmente con cocina

### Criterios de Aceptación

#### Escenario 1: Identificación visual de mesas disponibles

```gherkin
Scenario: Mesero visualiza mesas disponibles para nuevos clientes
  Given que el mesero ingresa al sistema de gestión de pedidos
  When el sistema carga la zona de mesas
  Then el mesero puede identificar visualmente las mesas disponibles
  And el mesero puede identificar visualmente las mesas ocupadas
  And cada mesa muestra claramente su identificador
```

#### Escenario 2: Mesa se marca como ocupada al enviar pedido

```gherkin
Scenario: Mesa cambia a ocupada después de enviar una orden
  Given que la mesa "A2" está disponible
  And el mesero selecciona la mesa "A2"
  When el mesero agrega productos al pedido
  And el mesero envía la orden a cocina
  Then la mesa "A2" debe mostrar estado ocupada
  And otros meseros no pueden asignar la mesa "A2" a nuevos clientes
```

#### Escenario 3: Mesa permanece ocupada mientras hay preparación pendiente

```gherkin
Scenario: Mesa ocupada mientras cocina tiene tareas activas
  Given que la mesa "B1" tiene una orden enviada a cocina
  And la orden tiene tareas en cualquier estación que no están completadas
  When el mesero consulta el estado de las mesas
  Then la mesa "B1" debe aparecer como ocupada
```

#### Escenario 4: Mesa se marca disponible cuando todo está completado

```gherkin
Scenario: Mesa vuelve a disponible al completarse toda la preparación
  Given que la mesa "C3" tenía una orden en cocina
  And todas las estaciones han completado sus tareas para esa orden
  When el sistema actualiza el estado de las mesas
  Then la mesa "C3" debe aparecer como disponible
  And el mesero puede asignar la mesa "C3" a nuevos clientes
```

#### Escenario 5: Prevención de selección de mesas ocupadas

```gherkin
Scenario: Sistema impide tomar pedidos en mesas ocupadas
  Given que la mesa "A4" está ocupada con una orden en preparación
  When el mesero intenta seleccionar la mesa "A4"
  Then el sistema no permite seleccionar la mesa ocupada
  And el mesero recibe indicación de que la mesa no está disponible
```

---

## HU-FRONT-002: Construir pedido por categorías de productos

**Como** mesero del restaurante  
**Quiero** explorar el menú organizado por categorías de productos  
**Para** encontrar rápidamente lo que el cliente solicita sin revisar todo el menú

### Criterios de Aceptación

#### Escenario 1: Visualización de todas las categorías disponibles

```gherkin
Scenario: Mesero accede al menú completo sin filtros
  Given que el mesero ha seleccionado una mesa disponible
  When el mesero accede al catálogo de productos
  Then el sistema muestra todos los productos del menú
  And el mesero puede ver categorías como bebidas, platos calientes, platos fríos y postres
```

#### Escenario 2: Filtrado por categoría específica

```gherkin
Scenario: Mesero filtra solo bebidas para encontrarlas rápidamente
  Given que el mesero está construyendo un pedido
  And el cliente solicita solo bebidas
  When el mesero selecciona la categoría de bebidas
  Then el sistema muestra únicamente productos de bebidas
  And no se muestran productos de otras categorías
```

#### Escenario 3: Cambio entre categorías durante el pedido

```gherkin
Scenario: Mesero navega entre categorías mientras toma el pedido
  Given que el mesero está visualizando productos de una categoría
  When el cliente solicita productos de otra categoría
  Then el mesero puede cambiar fácilmente a otra categoría
  And los productos agregados previamente se mantienen en el pedido
```

#### Escenario 4: Vuelta a vista completa del menú

```gherkin
Scenario: Mesero regresa a ver todos los productos sin filtro
  Given que el mesero está visualizando una categoría específica
  When el mesero necesita ver todos los productos disponibles
  Then el mesero puede volver a la vista completa del menú
  And se muestran productos de todas las categorías nuevamente
```

---

## HU-FRONT-003: Construir pedido con múltiples productos

**Como** mesero del restaurante  
**Quiero** agregar múltiples productos al pedido antes de enviarlo  
**Para** tomar todo lo que el cliente solicita en una sola interacción con el sistema

### Criterios de Aceptación

#### Escenario 1: Agregar un producto al pedido

```gherkin
Scenario: Mesero agrega el primer producto solicitado
  Given que el mesero ha seleccionado una mesa disponible
  And el pedido está vacío
  When el mesero selecciona un producto del menú
  Then el producto se agrega al resumen del pedido
  And el mesero puede ver el producto agregado en la lista de pedido
```

#### Escenario 2: Agregar múltiples productos diferentes

```gherkin
Scenario: Cliente solicita varios productos diferentes
  Given que el mesero está construyendo un pedido
  When el mesero agrega el producto "Gin Tonic Premium"
  And el mesero agrega el producto "Ensalada César"
  And el mesero agrega el producto "Tiramisú"
  Then el pedido debe contener los 3 productos
  And cada producto aparece una vez en el resumen
```

#### Escenario 3: Agregar múltiples unidades del mismo producto

```gherkin
Scenario: Cliente solicita dos bebidas iguales
  Given que el mesero está construyendo un pedido
  When el mesero agrega el producto "Vino Tinto Reserva"
  And el mesero agrega nuevamente el producto "Vino Tinto Reserva"
  Then el pedido debe mostrar "Vino Tinto Reserva" con cantidad 2
  And no se duplica el producto en la lista
```

#### Escenario 4: Indicación visual de productos ya agregados

```gherkin
Scenario: Mesero identifica qué productos ya agregó
  Given que el mesero ha agregado varios productos al pedido
  When el mesero revisa el catálogo de productos
  Then el sistema indica visualmente cuáles productos ya están en el pedido
  And el mesero puede distinguir productos agregados de los no agregados
```

#### Escenario 5: Visualización del total de items

```gherkin
Scenario: Mesero verifica cuántos items lleva el pedido
  Given que el mesero ha agregado varios productos al pedido
  When el mesero revisa el resumen de pedido
  Then el sistema muestra el total de items agregados
  And el total refleja la suma de todas las cantidades
```

---

## HU-FRONT-004: Modificar pedido antes de enviarlo

**Como** mesero del restaurante  
**Quiero** corregir o eliminar productos del pedido antes de enviarlo  
**Para** ajustar el pedido si el cliente cambia de opinión o si cometí un error al agregar

### Criterios de Aceptación

#### Escenario 1: Eliminar un producto del pedido

```gherkin
Scenario: Cliente decide no ordenar un producto ya agregado
  Given que el mesero ha agregado varios productos al pedido
  And el producto "Ensalada César" está en el pedido
  When el cliente indica que ya no desea la "Ensalada César"
  And el mesero elimina ese producto del pedido
  Then el producto "Ensalada César" ya no aparece en el resumen
  And el total de items disminuye correctamente
```

#### Escenario 2: Reducir cantidad de un producto

```gherkin
Scenario: Cliente ordena menos cantidad de lo inicialmente indicado
  Given que el pedido contiene "Cerveza Artesanal" con cantidad 3
  When el cliente indica que solo quiere 2 cervezas
  And el mesero elimina una unidad de "Cerveza Artesanal"
  Then el pedido debe mostrar "Cerveza Artesanal" con cantidad 2
  And el total de items se ajusta correctamente
```

#### Escenario 3: Eliminar todas las unidades de un producto

```gherkin
Scenario: Cliente cancela completamente un producto con múltiples unidades
  Given que el pedido contiene "Agua Mineral" con cantidad 4
  When el mesero elimina todas las unidades de "Agua Mineral"
  Then el producto "Agua Mineral" desaparece completamente del pedido
```

#### Escenario 4: Pedido vacío después de eliminar todos los productos

```gherkin
Scenario: Mesero elimina todos los productos agregados
  Given que el pedido tiene 3 productos diferentes
  When el mesero elimina todos los productos uno por uno
  Then el pedido queda vacío
  And el sistema indica que no hay productos en el pedido
```

---

## HU-FRONT-005: Enviar pedido completo a cocina

**Como** mesero del restaurante  
**Quiero** enviar el pedido completo a cocina cuando el cliente confirma su orden  
**Para** que todas las estaciones reciban sus tareas y comiencen la preparación

### Criterios de Aceptación

#### Escenario 1: Envío exitoso con pedido completo

```gherkin
Scenario: Mesero envía orden con productos válidos
  Given que el mesero ha seleccionado la mesa "A1"
  And el pedido contiene al menos un producto
  When el mesero confirma el envío del pedido
  Then el sistema transmite el pedido a cocina
  And el mesero recibe confirmación de que el pedido fue recibido
```

#### Escenario 2: Confirmación muestra información de la orden

```gherkin
Scenario: Sistema confirma los detalles de la orden enviada
  Given que el mesero envía un pedido para la mesa "B3"
  When el sistema procesa exitosamente la orden
  Then la confirmación muestra el identificador de la orden
  And la confirmación muestra el número de mesa
  And la confirmación indica cuántas tareas se crearon en cocina
```

#### Escenario 3: Prevención de envío sin productos

```gherkin
Scenario: Sistema no permite enviar pedidos vacíos
  Given que el mesero ha seleccionado una mesa
  And el pedido está vacío sin ningún producto
  When el mesero intenta enviar el pedido
  Then el sistema solicita agregar al menos un producto
  And el pedido no se transmite a cocina
```

#### Escenario 4: Prevención de envío sin mesa seleccionada

```gherkin
Scenario: Sistema no permite enviar sin mesa asignada
  Given que el mesero ha agregado productos al pedido
  And no hay ninguna mesa seleccionada
  When el mesero intenta enviar el pedido
  Then el sistema solicita seleccionar una mesa primero
  And el pedido no se transmite a cocina
```

#### Escenario 5: Pedido se limpia después del envío exitoso

```gherkin
Scenario: Sistema queda listo para el siguiente pedido
  Given que el mesero envía exitosamente un pedido
  When el sistema confirma la recepción
  Then el resumen de pedido se vacía
  And el sistema queda listo para tomar un nuevo pedido
```

---

## HU-FRONT-006: Monitoreo y visualización del estado y progreso de órdenes

### Descripción

**Como** mesero del restaurante  
**Quiero** ver en un solo lugar el estado y el progreso de las órdenes que envié a cocina  
**Para** informar al cliente con precisión sobre cuándo estará su pedido y actuar oportunamente

### Contexto de Negocio

Cada orden se divide en tareas por estación (barra, cocina caliente, cocina fría). Los meseros necesitan una visión clara y unificada para:
- Identificar si una orden está en cola, en preparación o lista
- Ver qué productos componen cada orden
- Conocer el avance global de la orden para informar tiempos estimados

Sin esta visibilidad, los meseros interrumpen a cocina, dan información imprecisa al cliente y no pueden anticipar entregas.

### Valor de Negocio

- Información precisa y única para comunicar tiempos al cliente
- Menos interrupciones al personal de cocina
- Mayor eficiencia en la entrega y servicio al cliente
- Mejora en la experiencia al reducir incertidumbre
**Como** mesero del restaurante  
**Quiero** ver en un solo lugar el estado y el progreso de las órdenes que envié a cocina  
**Para** informar al cliente con precisión sobre cuándo estará su pedido y actuar oportunamentend el mesero entiende qué significa cada estado para la entrega
```

#### Escenario 3: Visualización de productos por orden

```gherkin
Scenario: Mesero revisa los productos incluidos en una orden
  Given que una orden está en preparación
  When el mesero consulta los detalles de esa orden
  Then el mesero ve la lista completa de productos que componen la orden
  And puede confirmarlo con el cliente
```

#### Escenario 4: Indicador de progreso basado en estaciones

```gherkin
Scenario: Mesero ve el progreso de una orden según estaciones
  Given que una orden tiene tareas en barra, cocina caliente y cocina fría
  And inicialmente ninguna tarea está completada
  When una estación completa sus tareas
  Then el progreso de la orden aumenta proporcionalmente
  And el mesero ve el porcentaje de avance y cuántas estaciones faltan
```

#### Escenario 5: Orden lista y notificación de recogida

```gherkin
Scenario: Mesero es notificado cuando la orden está completamente lista
  Given que todas las estaciones han completado sus tareas para una orden
  When la orden alcanza 100% de progreso
  Then la orden aparece como "Lista"
  And el mesero recibe indicación clara de que puede recoger y servir la orden
```


## HU-FRONT-007: Visualizar tareas asignadas a estación de trabajo

### Descripción

**Como** personal de cocina (barra, cocina caliente o cocina fría)  
**Quiero** ver las tareas que están asignadas a mi estación de trabajo  
**Para** saber qué productos debo preparar, para qué mesa y en qué orden

### Contexto de Negocio

El personal de cada estación (barra, cocina caliente, cocina fría) debe conocer:
- Qué productos le corresponde preparar
- Para qué mesa es cada preparación
- De qué orden forma parte cada tarea
- Qué tareas tiene pendientes vs. en proceso

Sin esta visibilidad clara:
- El personal no sabe qué preparar primero
- Se pierde el contexto de la mesa asociada
- No hay claridad sobre qué tareas están esperando atención
---

## HU-FRONT-007: Visualizar tareas asignadas a estación de trabajo

**Como** personal de cocina (barra, cocina caliente o cocina fría)  
**Quiero** ver las tareas que están asignadas a mi estación de trabajo  
**Para** saber qué productos debo preparar, para qué mesa y en qué ordenhen el personal ve qué productos debe preparar
  And el personal ve para qué mesa es la preparación
  And el personal ve el número de orden asociada
```

#### Escenario 3: Inicio de preparación de tarea

```gherkin
Scenario: Personal comienza a preparar una tarea pendiente
  Given que hay una tarea con estado pendiente
  When el personal inicia la preparación de esa tarea
  Then la tarea cambia a estado en preparación
  And otros miembros del equipo pueden ver que esa tarea ya está siendo trabajada
```

#### Escenario 4: Múltiples tareas visibles simultáneamente

```gherkin
Scenario: Estación con varias tareas pendientes
  Given que hay 5 tareas asignadas a la estación de cocina caliente
  When el personal consulta su estación
  Then el personal ve las 5 tareas en la lista
  And puede identificar cuáles son prioritarias
```

#### Escenario 5: Vista cuando no hay tareas asignadas

```gherkin
Scenario: Estación sin tareas pendientes o en proceso
  Given que no hay tareas asignadas a la estación de cocina fría
  When el personal consulta su estación
  Then el sistema indica claramente que no hay tareas activas
  And el personal sabe que puede esperar nuevas órdenes
```

---

## HU-FRONT-008: Filtrar tareas por estado en estación

### Descripción

**Como** personal de cocina en mi estación de trabajo  
**Quiero** filtrar las tareas por su estado (todas, pendientes, en preparación, completadas)  
**Para** enfocarme en las tareas que requieren mi atención inmediata

### Contexto de Negocio

Durante el servicio, cada estación acumula tareas en diferentes estados:
- Pendientes: esperando ser iniciadas
- En preparación: actualmente siendo trabajadas
- Completadas: ya finalizadas

Sin capacidad de filtrado:
- El personal ve todas las tareas mezcladas
- Pierde tiempo revisando tareas ya completadas
- No puede enfocarse solo en lo pendiente
- La pantalla se satura con información irrelevante

La solución permite filtrar tareas según su estado para mejor organización.

### Valor de Negocio

- Mayor enfoque en tareas prioritarias
- Reducción de distracciones visuales
**Como** personal de cocina en mi estación de trabajo  
**Quiero** filtrar las tareas por su estado (todas, pendientes, en preparación, completadas)  
**Para** enfocarme en las tareas que requieren mi atención inmediata
```gherkin
Scenario: Personal revisa qué está actualmente en proceso
  Given que hay tareas siendo trabajadas por el equipo
  When el personal selecciona el filtro "En Preparación"
  Then el personal ve únicamente las tareas que están siendo preparadas
  And puede identificar qué está ocupando al equipo actualmente
```

#### Escenario 4: Filtro para ver tareas completadas

```gherkin
Scenario: Personal verifica qué se ha completado
  Given que varias tareas ya fueron finalizadas
  When el personal selecciona el filtro "Completada"
  Then el personal ve únicamente las tareas ya finalizadas
  And puede confirmar qué preparaciones están listas
```

#### Escenario 5: Cambio dinámico de filtros

```gherkin
Scenario: Personal cambia de filtro según necesidad
  Given que el personal está visualizando tareas pendientes
  When el personal cambia al filtro de completadas
  Then la vista se actualiza mostrando solo tareas completadas
  And el cambio es inmediato sin perder contexto
```

#### Escenario 6: Filtro sin resultados

```gherkin
Scenario: Filtro seleccionado no tiene tareas
  Given que no hay tareas en estado pendiente en la estación
  When el personal selecciona el filtro "Pendiente"
  Then el sistema indica claramente que no hay tareas pendientes
  And el personal entiende que no hay trabajo nuevo por iniciar
```

---

## HU-FRONT-009: Actualización automática de estados

**Como** mesero del restaurante  
**Quiero** que los estados de mesas y órdenes se actualicen automáticamente  
**Para** ver información siempre actualizada sin tener que recargar manualmente

### Criterios de Aceptación

#### Escenario 1: Actualización periódica automática

```gherkin
Scenario: Sistema actualiza estados sin intervención del mesero
  Given que el mesero está consultando el estado de cocina
  When transcurre un período de tiempo
  Then el sistema actualiza automáticamente los estados
  And el mesero ve la información más reciente sin recargar
```

#### Escenario 2: Reflejo de cambios en tiempo de preparación

```gherkin
Scenario: Mesero ve cambios conforme cocina trabaja
  Given que el mesero está observando una orden en preparación
  When una estación completa su tarea
  Then el progreso de la orden se actualiza automáticamente
  And el mesero ve el nuevo porcentaje sin actualizar manualmente
```

#### Escenario 3: Actualización de disponibilidad de mesas

```
```gherkin
Scenario: Mesa se muestra ocupada cuando se envía orden
  Given que el mesero está viendo las mesas disponibles
  When otro mesero envía una orden para una mesa disponible
  Then esa mesa se actualiza automáticamente a ocupada
  And el primer mesero ve el cambio sin recargar
```

#### Escenario 4: Actualización manual disponible

```gherkin
Scenario: Mesero puede forzar actualización inmediata
  Given que el mesero quiere verificar el estado más reciente
  When el mesero solicita actualizar manualmente
  Then el sistema consulta inmediatamente el estado actual
  And muestra la información más reciente
```

---

# HU COMPLETADAS

## HU-FRONT-010: Iniciar Sesión (Login)

**Como** usuario del sistema de restaurante  
**Quiero** iniciar sesión con mis credenciales  
**Para** acceder al sistema y gestionar pedidos

### Criterios de Aceptación

#### Escenario 1: Login exitoso con credenciales válidas

```gherkin
Scenario: Usuario inicia sesión con email y password correctos
  Given que el usuario tiene una cuenta registrada
  When el usuario ingresa email y password correctos
  Then el sistema inicia sesión exitosamente
  And guarda el token de autenticación
  And redirige a la vista principal
```

#### Escenario 2: Login con credenciales inválidas

```gherkin
Scenario: Usuario intenta login con password incorrecto
  Given que el usuario tiene una cuenta registrada
  When el usuario ingresa email correcto pero password incorrecto
  Then el sistema muestra error "Credenciales inválidas"
  And no inicia sesión
```

#### Escenario 3: Login con rememberMe

```gherkin
Scenario: Usuario marca "recordarme" para sesión persistente
  Given que el usuario tiene una cuenta registrada
  When el usuario marca la opción "recordarme"
  And inicia sesión
  Then el sistema guarda token con fecha de expiración
  And la sesión persiste después de cerrar el navegador
```

#### Escenario 4: Modo demo sin cuenta

```gherkin
Scenario: Usuario accede con modo demo
  Given que el usuario no tiene cuenta
  When el usuario activa el modo demo
  Then el sistema permite acceso sin autenticación
  And crea una sesión de demo
```

---

## HU-FRONT-011: Cerrar Sesión (Logout)

**Como** usuario autenticado  
**Quiero** cerrar sesión  
**Para** salir del sistema y proteger mi cuenta

### Criterios de Aceptación

#### Escenario 1: Logout exitoso

```gherkin
Scenario: Usuario hace click en cerrar sesión
  Given que el usuario está autenticado
  When el usuario hace click en "Cerrar Sesión"
  Then el sistema elimina el token de autenticación
  And redirige a la página de login
```

#### Escenario 2: Token expirado obliga logout

```gherkin
Scenario: Sesión expira por tiempo
  Given que el usuario tiene una sesión activa
  When el token de autenticación expira
  Then el sistema cierra sesión automáticamente
  And redirige a la página de login
```

---

## HU-FRONT-012: Registro de Usuario

**Como** nuevo usuario del sistema  
**Quiero** registrarme con mis datos  
**Para** poder acceder al sistema y gestionar pedidos

### Criterios de Aceptación

#### Escenario 1: Registro exitoso

```gherkin
Scenario: Nuevo usuario se registra exitosamente
  Given que el usuario no tiene cuenta
  When el usuario ingresa email, username y password
  And completa el registro
  Then el sistema crea la cuenta
  And inicia sesión automáticamente
```

#### Escenario 2: Registro con email duplicado

```gherkin
Scenario: Usuario intenta registrar con email existente
  Given que ya existe una cuenta con ese email
  When el usuario intenta registrarse con ese email
  Then el sistema muestra error
  And no crea la cuenta
```

#### Escenario 3: Toggle entre login y registro

```gherkin
Scenario: Usuario cambia entre modo login y registro
  Given que está en la página de login
  When el usuario hace click en "Regístrate"
  Then el formulario cambia a modo registro
  And puede completar el registro
```

---

# Pendientes

- [ ] HU-FRONT-001: Visualizar disponibilidad de mesas en tiempo real
- [ ] HU-FRONT-002: Construir pedido por categorías de productos
- [ ] HU-FRONT-003: Construir pedido con múltiples productos
- [ ] HU-FRONT-004: Modificar pedido antes de enviarlo
- [ ] HU-FRONT-005: Enviar pedido completo a cocina
- [ ] HU-FRONT-006: Monitoreo y visualización del estado y progreso de órdenes
- [ ] HU-FRONT-007: Visualizar tareas asignadas a estación de trabajo
- [ ] HU-FRONT-008: Filtrar tareas por estado en estación
- [ ] HU-FRONT-009: Actualización automática de estados
