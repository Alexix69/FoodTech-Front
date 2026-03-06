# Explicación de Todos los Tests - FoodTech

Este documento contiene la explicación de cada test para la presentación de evaluación.

---

## TESTS DE authService (01-15)

---

### Test 01: 01-auth-login-exitoso.test.ts

**Qué hace:**
Este test verifica que cuando un usuario hace login con credenciales correctas, el sistema:
1. Retorna `true` como resultado exitoso
2. Guarda el token en localStorage con la key 'auth_token'

**Qué verifica:**
- Verifica que el login exitoso funciona correctamente
- Verifica que el token se guarda en el almacenamiento del navegador

**Mocks usados:**
- `global.fetch` - Simula que el servidor responde con ok:true y retorna un token válido

**Texto para presentación:**
> "Este test verifica el flujo feliz: login con credenciales correctas. Mockeo fetch para simular que el servidor retorna un token, y verifico que ese token se guarde en localStorage."

---

### Test 02: 02-auth-login-invalidas.test.ts

**Qué hace:**
Este test valida que cuando un usuario intenta hacer login con credenciales incorrectas (email o password wrong), el sistema lanza un error con el mensaje "Credenciales inválidas".

**Qué valida:**
- Valida la regla de negocio: credenciales inválidas no permiten acceso
- Valida que el mensaje de error sea correcto

**Mocks usados:**
- `global.fetch` - Simula que el servidor responde con ok:false y status 401

**Texto para presentación:**
> "Este test valida la seguridad: si alguien intenta acceder con credenciales incorrectas, el sistema debe rechazarle. Mockeo fetch con status 401 y verifico que lance el error 'Credenciales inválidas'."

---

### Test 03: 03-auth-login-error-red.test.ts

**Qué hace:**
Este test valida que cuando hay un error de red (el servidor no responde, conexión fallida), el sistema lanza un error con el mensaje "Error de conexión".

**Qué valida:**
- Valida que errores de red se manejan apropiadamente
- Valida que el mensaje al usuario es claro

**Mocks usados:**
- `global.fetch` - Simula que la llamada a red falla con TypeError ('Failed to fetch')

**Texto para presentación:**
> "Este test valida el manejo de errores de red. Si el servidor no responde, el usuario debe ver 'Error de conexión', no un crash. Mockeo un error de red y verifico que se maneje correctamente."

---

### Test 04: 04-auth-login-remember-false.test.ts

**Qué hace:**
Este test verifica que cuando un usuario hace login SIN marcar "recordarme" (rememberMe=false), el token se guarda pero SIN fecha de expiración.

**Qué verifica:**
- Verifica que el token se guarda
- Verifica que NO se guarda fecha de expiración (auth_token_expiry es null)

**Mocks usados:**
- `global.fetch` - Simula respuesta exitosa del servidor

**Texto para presentación:**
> "Este test verifica que cuando el usuario NO marca 'recordarme', el token se guarda sin fecha de expiración. Es decir, la sesión dura solo mientras el navegador está abierto."

---

### Test 05: 05-auth-login-remember-true.test.ts

**Qué hace:**
Este test verifica que cuando un usuario hace login CON "recordarme" marcado (rememberMe=true), el token se guarda CON fecha de expiración.

**Qué verifica:**
- Verifica que el token se guarda
- Verifica que SÍ se guarda fecha de expiración (auth_token_expiry no es null)

**Mocks usados:**
- `global.fetch` - Simula respuesta exitosa del servidor

**Texto para presentación:**
> "Este test verifica lo contrario al anterior: cuando el usuario marca 'recordarme', el sistema guarda también la fecha de expiración del token para mantener la sesión activa."

---

### Test 06: 06-auth-logout-token.test.ts

**Qué hace:**
Este test verifica que la función logout() remueve completamente el token de localStorage.

**Qué verifica:**
- Verifica que después de logout, auth_token es null en localStorage
- Verifica que la función de cerrar sesión funciona

**Mocks usados:**
- Ninguno - usa localStorage directamente

**Texto para presentación:**
> "Este test verifica que el logout funciona: cuando el usuario cierra sesión, el token debe desaparecer del almacenamiento. Sin mocks, pruebo la función directamente."

---

### Test 07: 07-auth-getToken.test.ts

**Qué hace:**
Este test verifica que la función getToken() retorna exactamente el token que está guardado en localStorage.

**Qué verifica:**
- Verifica que getToken retorna el valor correcto
- Verifica la lectura del almacenamiento

**Mocks usados:**
- Ninguno - usa localStorage directamente

**Texto para presentación:**
> "Este test verifica que getToken funciona correctamente: retorna exactamente lo que está guardado. Sin mocks, es una verificación directa de la lógica."

---

### Test 08: 08-auth-getToken-null.test.ts

**Qué hace:**
Este test valida que cuando NO hay token guardado en localStorage, la función getToken() retorna null.

**Qué valida:**
- Valida el caso base: sin token = null
- Valida que no retorna vacío o undefined

**Mocks usados:**
- Ninguno - localStorage vacío

**Texto para presentación:**
> "Este test valida el caso negativo: si no hay token, getToken debe retornar null, no vacío ni undefined. Es la validación del caso base."

---

### Test 09: 09-auth-isAuthenticated-true.test.ts

**Qué hace:**
Este test verifica que cuando hay un token válido guardado, la función isAuthenticated() retorna true.

**Qué verifica:**
- Verifica que con token válido, el usuario está autenticado
- Verifica la lógica de verificación de autenticación

**Mocks usados:**
- Ninguno - usa localStorage con token

**Texto para presentación:**
> "Este test verifica que isAuthenticated retorna true cuando hay un token. Sin mocks, pruebo que la función detecta correctamente un token válido."

---

### Test 10: 10-auth-isAuthenticated-false.test.ts

**Qué hace:**
Este test valida que cuando NO hay token guardado, isAuthenticated() retorna false.

**Qué valida:**
- Valida que sin token, el usuario no está autenticado
- Valida la regla base de seguridad

**Mocks usados:**
- Ninguno - localStorage vacío

**Texto para presentación:**
> "Este test valida la regla de seguridad más básica: sin token, el usuario NO está autenticado. Es la validación opuesta al test anterior."

---

### Test 11: 11-auth-isAuthenticated-expirado.test.ts

**Qué hace:**
Este test valida que cuando un token está expirado (la fecha de expiración ya pasó), isAuthenticated() retorna false. Es como "saldo negativo" - si está expirado, no es válido.

**Qué valida:**
- Valida la regla de negocio: token expirado = acceso denegado
- Valida que el sistema protege contra sesiones vencidas

**Mocks usados:**
- Ninguno - usa localStorage con token y fecha expirada

**Texto para presentación:**
> "Este test valida la regla de negocio más importante: token expirado NO permite acceso. Es como el 'saldo negativo' en seguridad bancaria. Creo un token con fecha pasada y verifico que isAuthenticated retorne false."

---

### Test 12: 12-auth-register-exitoso.test.ts

**Qué hace:**
Este test verifica que el registro de un nuevo usuario retorna true cuando el servidor responde exitosamente.

**Qué verifica:**
- Verifica que el registro exitoso funciona
- Verifica el flujo de registro

**Mocks usados:**
- `global.fetch` - Simula respuesta exitosa del servidor

**Texto para presentación:**
> "Este test verifica el flujo de registro: cuando un usuario se registra correctamente, el sistema retorna true. Mockeo fetch para simular el servidor."

---

### Test 13: 13-auth-register-error.test.ts

**Qué hace:**
Este test valida que cuando el servidor devuelve error 400 (Bad Request) en registro, el sistema maneja el error apropiadamente.

**Qué valida:**
- Valida el manejo de errores 400 en registro
- Valida que el sistema no crashea

**Mocks usados:**
- `global.fetch` - Simula respuesta con status 400

**Texto para presentación:**
> "Este test valida que cuando el servidor rechaza el registro (error 400), el sistema lo maneja sin tronar. Es validación de robustez."

---

### Test 14: 14-auth-register-error-red.test.ts

**Qué hace:**
Este test valida que cuando hay error de red durante el registro, el sistema lanza error "Error de conexión".

**Qué valida:**
- Valida manejo de errores de red en registro
- Valida mensaje apropiado al usuario

**Mocks usados:**
- `global.fetch` - Simula error de red (TypeError)

**Texto para presentación:**
> "Este test valida que si el servidor no responde durante el registro, el usuario vea 'Error de conexión'. Es el mismo manejo de red que en login."

---

### Test 15: 15-auth-register-request.test.ts

**Qué hace:**
Este test verifica que cuando se hace register, la llamada a la API incluye los datos correctos: email, username, password, y usa el método POST.

**Qué verifica:**
- Verifica que se llama al endpoint correcto (/auth/register)
- Verifica que el método es POST
- Verifica que los datos del body son correctos

**Mocks usados:**
- `global.fetch` - Captura la llamada para verificar parámetros

**Texto para presentación:**
> "Este test verifica la arquitectura: que el registro llama al endpoint correcto con los datos correctos. Verifico que fetch se llame con '/auth/register', método POST, y el body con email, username y password."

---

## TESTS DE useAuth (16-24)

---

### Test 16: 16-useAuth-inicial.test.ts

**Qué hace:**
Este test verifica que el hook useAuth inicia con el estado correcto cuando NO hay token: isAuthenticated=false, token=null, isLoading=false.

**Qué verifica:**
- Verifica el estado inicial del hook
- Verifica que no hay sesión activa al iniciar

**Mocks usados:**
- `react-router-dom` - Mock de useNavigate para evitar navegación real

**Texto para presentación:**
> "Este test verifica el estado inicial del hook useAuth: cuando no hay token, debe iniciar con isAuthenticated=false, token=null, y isLoading=false."

---

### Test 17: 17-useAuth-inicial-token.test.ts

**Qué hace:**
Este test verifica que el hook useAuth inicia con isAuthenticated=true y token válido cuando YA hay un token guardado en localStorage.

**Qué verifica:**
- Verifica que el hook detecta token existente al iniciar
- Verifica la restauración de sesión

**Mocks usados:**
- `react-router-dom` - Mock de useNavigate

**Texto para presentación:**
> "Este test verifica que si el usuario ya tenía sesión activa (token en localStorage), el hook la restaura automáticamente al iniciar."

---

### Test 18: 18-useAuth-login.test.ts

**Qué hace:**
Este test verifica que el hook useAuth puede hacer login exitosamente y actualizar su estado interno: isAuthenticated=true, token=token-recibido, error=null.

**Qué verifica:**
- Verifica que el hook actualiza el estado tras login exitoso
- Verifica integración entre hook y authService

**Mocks usados:**
- `global.fetch` - Simula respuesta del servidor
- `react-router-dom` - Mock de useNavigate

**Texto para presentación:**
> "Este test verifica el flujo completo de login en el hook. Uso dos mocks: fetch para simular el servidor, y react-router-dom para evitar navegación real. Así aíslo solo la lógica del hook."

---

### Test 19: 19-useAuth-login-error.test.ts

**Qué hace:**
Este test valida que cuando el login falla (credenciales inválidas), el hook maneja el error correctamente: isAuthenticated=false, error="Credenciales inválidas", token=null, y NO guarda token en localStorage.

**Qué valida:**
- Valida que error de login se maneja correctamente
- Valida que NO se crea sesión con credenciales wrong
- Valida que el mensaje de error es correcto

**Mocks usados:**
- `global.fetch` - Simula respuesta 401
- `react-router-dom` - Mock de useNavigate

**Texto para presentación:**
> "Este test valida la seguridad en el hook: si el login falla, el hook debe manejar el error, NO crear sesión, y mostrar el mensaje correcto. Es la validación más importante para el hook."

---

### Test 20: 20-useAuth-login-loading.test.ts

**Qué hace:**
Este test verifica que el hook maneja el estado de carga (loading) correctamente durante el proceso de login.

**Qué verifica:**
- Verifica que isLoading cambia apropiadamente
- Verifica el ciclo de loading

**Mocks usados:**
- `global.fetch` - Simula respuesta
- `react-router-dom` - Mock de useNavigate

**Texto para presentación:**
> "Este test verifica que el hook muestra estado de carga mientras hace login. Es importante para la UX: el usuario debe saber que algo está pasando."

---

### Test 21: 21-useAuth-logout.test.ts

**Qué hace:**
Este test verifica que cuando se llama logout() en el hook, el estado se limpia: isAuthenticated=false, token=null, y también se limpia localStorage.

**Qué verifica:**
- Verifica que logout limpia todo el estado
- Verifica limpieza de localStorage

**Mocks usados:**
- `react-router-dom` - Mock de useNavigate

**Texto para presentación:**
> "Este test verifica que logout funciona correctamente en el hook: limpia el estado interno Y el token en localStorage. Sin mocks de red, solo pruebo la limpieza."

---

### Test 22: 22-useAuth-register.test.ts

**Qué hace:**
Este test verifica que el hook puede hacer registro exitosamente y maneja el resultado sin error.

**Qué verifica:**
- Verifica que el registro funciona en el hook
- Verifica que no hay error tras registro

**Mocks usados:**
- `global.fetch` - Simula respuesta exitosa
- `react-router-dom` - Mock de useNavigate

**Texto para presentación:**
> "Este test verifica el flujo de registro en el hook: que puede llamar al servicio de registro y manejar la respuesta exitosa."

---

### Test 23: 23-useAuth-register-error.test.ts

**Qué hace:**
Este test valida que cuando hay error de red durante el registro en el hook, el error se maneja correctamente: isAuthenticated=false, error presente, token=null.

**Qué valida:**
- Valida manejo de errores de red en registro
- Valida que no queda sesión huérfana

**Mocks usados:**
- `global.fetch` - Simula error de red
- `react-router-dom` - Mock de useNavigate

**Texto para presentación:**
> "Este test valida que si el registro falla por error de red, el hook maneja el error apropiadamente y no deja al usuario en estado inconsistente."

---

### Test 24: 24-useAuth-register-loading.test.ts

**Qué hace:**
Este test verifica que el hook maneja el estado de loading durante el registro.

**Qué verifica:**
- Verifica que isLoading funciona durante registro
- Verifica el ciclo completo

**Mocks usados:**
- `global.fetch` - Simula respuesta
- `react-router-dom` - Mock de useNavigate

**Texto para presentación:**
> "Este test verifica que el hook muestra loading mientras registra al usuario. Similar al test 20 pero para registro."

---

## TESTS ADICIONALES (43-48)

---

### Test 43: 43-authService-coverage.test.ts

**Qué hace:**
Estos tests adicionales cubren casos de error que no estaban probados para aumentar la cobertura:
1. Error con status diferente a 401 (ej: 500)
2. Error desconocido en login (reject con string)
3. Error desconocido en register

**Qué verifica:**
- Verifica manejo de errores 500
- Verifica manejo de errores desconocidos

**Mocks usados:**
- `global.fetch` - Simula diferentes tipos de errores

**Texto para presentación:**
> "Estos tests son para aumentar cobertura: prueban errores que no se habían testeado como 500 o errores desconocidos. Así llegamos a 97% de cobertura."

---

### Test 44: 44-validacion-negocio.test.ts

**Qué hace:**
Este archivo contiene múltiples tests que validan reglas de negocio:
1. Token expirado no permite acceso
2. Logout limpia token
3. getToken retorna null sin token
4. isAuthenticated false sin token
5. Login exitoso guarda token
6. Login error NO guarda token
7. RememberMe guarda expiry
8. Sin rememberMe NO guarda expiry
9. isAuthenticated true con token válido
10. getToken retorna token guardado

**Qué valida:**
- Valida todas las reglas de negocio de autenticación

**Mocks usados:**
- Varios: global.fetch para algunos, localStorage para otros

**Texto para presentación:**
> "Este archivo agrupa validaciones de negocio: cada test protege una regla como 'logout limpia todo' o 'error no guarda token'. Son las validaciones más importantes."

---

### Test 45: 45-verificar-arquitectura.test.ts

**Qué hace:**
Este test verifica la arquitectura: que el código llama a los endpoints correctos de la API.
1. Login debe llamar a '/api/auth/login' con POST
2. Register debe llamar a '/api/auth/register' con POST

**Qué verifica:**
- Verifica que la comunicación con el "puerto" (API) es correcta
- Verifica endpoint, método y headers

**Mocks usados:**
- `global.fetch` - Captura la llamada para verificar

**Texto para presentación:**
> "Este test verifica la ARQUITECTURA: que el servicio llama al endpoint correcto. Es verificación técnica, no de negocio. Llamamos a esto 'verificar' porque prueba que el código está bien conectado."

---

### Test 46: 46-validar-negocio.test.ts

**Qué hace:**
Este test valida reglas CRÍTICAS de negocio:
1. Token expirado NO permite acceso (como "saldo negativo")
2. Credenciales inválidas NO crean sesión
3. Sin token = sesión inválida (como cuenta bloqueada)

**Qué valida:**
- Valida que las reglas de seguridad del negocio se protegen
- Valida que no hay forma de acceder con estado inválido

**Mocks usados:**
- Algunos usan fetch (para login), otros no

**Texto para presentación:**
> "Este test valida el NEGOCIO: son las reglas que protegen la seguridad. Como 'saldo negativo' en banking, aquí 'token expirado' o 'credenciales wrong' no permiten acceso. Llamamos a esto 'validar' porque valida reglas de negocio."

---

### Test 47: 47-edge-cases.test.ts

**Qué hace:**
Estos tests cubren casos extremos (edge cases):
1. Login con email vacío debe fallar
2. Login con password vacío debe fallar
3. Login con email inválido (sin @) debe fallar
4. getToken con storage vacío retorna null
5. isAuthenticated con token string vacío
6. Token con expiry en el futuro es válido
7. Múltiples logout seguidos no rompen nada
8. Login dos veces seguidas sobrescribe token

**Qué valida:**
- Valida que casos extremos no rompen el sistema
- Valida robustez

**Mocks usados:**
- Algunos usan fetch, otros no

**Texto para presentación:**
> "Estos tests validan edge cases: qué pasa si el usuario envía email vacío, o hace logout 3 veces seguidas? Son pruebas de robustez para asegurar que situaciones extrañas no rompen la app."

---

### Test 48: 48-integracion.test.ts

**Qué hace:**
Estos son tests de integración que prueban flujos completos:
1. Login y logout completos funcionan juntos
2. Error de red muestra mensaje apropiado
3. Registro exitoso retorna sin error
4. Loading state cambia correctamente

**Qué verifica:**
- Verifica flujos completos de principio a fin
- Verifica integración entre múltiples funciones

**Mocks usados:**
- `global.fetch` - Simula servidor
- `react-router-dom` - Mock de navegación

**Texto para presentación:**
> "Estos son tests de INTEGRACIÓN: prueban flujos completos como login+logout juntos, no solo funciones aisladas. Verifican que todo funciona cuando las piezas se unen."

---

## RESUMEN PARA PRESENTACIÓN

### Tests que VERIFICAN (Arquitectura/Código)
- 01, 04, 05, 06, 07, 09, 12, 15, 16, 17, 18, 20, 21, 22, 24, 43, 45, 48
- **Qué verifican:** Que el código funciona, que las funciones retornan lo esperado

### Tests que VALIDAN (Negocio/Protección)
- 02, 03, 08, 10, 11, 13, 14, 19, 23, 44, 46, 47
- **Qué validan:** Que las reglas de negocio se protegen, que no hay formas de romper la seguridad

### Mocks y su propósito
| Mock | Propósito |
|------|-----------|
| `global.fetch` | Simular respuestas del servidor HTTP |
| `react-router-dom` | Evitar navegación real, aislar lógica del hook |
| localStorage | Probar lógica de almacenamiento sin dependencia externa |

---

## ORDEN RECOMENDADO PARA PRESENTAR

1. **Test 45** - "Verificar arquitectura" (el endpoint correcto)
2. **Test 46** - "Validar negocio" (token expirado = sin acceso)
3. **Test 18** - useAuth login (ejemplo con mocks explicados)
4. **Test 19** - useAuth login error (ejemplo de validación)
5. **Test 11** - Token expirado (sin mocks)
6. **Correr tests** - `npm test -- --coverage`
7. **Mostrar coverage** - authService 97.36%

---

## PREGUNTAS PARA HUMAN CHECK

El instructor puede preguntar sobre CUALQUIER test. Ejemplos:

**Sobre Test 18:**
- "¿Qué mockeas?"
  - fetch (simula servidor) y react-router-dom (evita navegación)
- "¿Por qué esos mocks?"
  - fetch para no llamar API real, react-router-dom para aislar solo la lógica del hook

**Sobre Test 11:**
- "¿Por qué sin mocks?"
  - Porque es lógica pura de negocio, no depende de servicios externos. Uso localStorage real.

**Sobre Test 46:**
- "¿Qué valida este test?"
  - Que token expirado NO permite acceso - es como "saldo negativo" en seguridad
