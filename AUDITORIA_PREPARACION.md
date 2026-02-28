# 📋 Preparación Auditoría Técnica - LoginView

## 1. TEST VERIFICAR (Arquitectura)

### ¿Qué verifica?
Que el componente llama correctamente al hook `useAuth` (puerto)

### Código del test:
```typescript
it('debe llamar login con los parametros correctos al hacer submit', async () => {
  render(
    <BrowserRouter>
      <LoginView />
    </BrowserRouter>
  )
  
  const emailInput = document.querySelector('input[id="email"]')
  const passwordInput = document.querySelector('input[id="password"]')
  
  fireEvent.change(emailInput, { target: { value: 'test@test.com' } })
  fireEvent.change(passwordInput, { target: { value: 'password123' } })
  fireEvent.submit(screen.getByRole('button', { name: /Iniciar sesión/i }))
  
  await waitFor(() => {
    expect(mockLogin).toHaveBeenCalledWith('test@test.com', 'password123', false)
  })
})
```

### Explicación para el instructor:
- **Mock utilizado:** `useAuth` del archivo `../hooks/useAuth`
- **Por qué se mockea:** Porque useAuth es una dependencia externa (hook personalizado) que llama a otros servicios. Al mockearlo, aislamos el test al componente LoginView sin depender de la implementación real del hook.
- **Qué verifica:** Que el componente llama correctamente a la función `login` del hook con los parámetros esperados (email, password, rememberMe).

---

## 2. TEST VALIDAR (Negocio)

### ¿Qué valida?
Que el registro de usuario funciona correctamente (regla de negocio)

### Código del test:
```typescript
it('debe registrar usuario con datos correctos', async () => {
  render(
    <BrowserRouter>
      <LoginView />
    </BrowserRouter>
  )
  
  // Cambiar a modo registro
  fireEvent.click(screen.getByRole('button', { name: /Regístrate/i }))
  
  // Llenar formulario
  fireEvent.change(document.querySelector('input[id="email"]'), { target: { value: 'usuario@test.com' } })
  fireEvent.change(document.querySelector('input[id="username"]'), { target: { value: 'usuario1' } })
  fireEvent.change(document.querySelector('input[id="password"]'), { target: { value: 'password123' } })
  
  // Submit
  fireEvent.submit(screen.getByRole('button', { name: /Registrarse/i }))
  
  await waitFor(() => {
    expect(mockRegister).toHaveBeenCalledWith('usuario@test.com', 'usuario1', 'password123')
  })
})
```

### Explicación para el instructor:
- **Mock utilizado:** `useAuth` (que contiene `register`)
- **Por qué se mockea:** Para controlar el comportamiento del servicio de autenticación sin hacer llamadas reales a una API.
- **Qué valida:** La regla de negocio: que el registro recibe los datos correctos (email, username, password) y los pasa al hook.

---

## 3. HUMAN CHECK - Explicación de Mocks

### Test elegido aleatoriamente: LoginView TDD - Submit

```typescript
describe('Submit del formulario', () => {
  it('debe llamar login al hacer submit', async () => {
    renderWithRouter(<LoginView />)
    fireEvent.change(document.querySelector('input[id="email"]'), { target: { value: 'test@email.com' } })
    fireEvent.change(document.querySelector('input[id="password"]'), { target: { value: 'password123' } })
    fireEvent.submit(screen.getByRole('button', { name: /Iniciar sesión/i }))
    
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@email.com', 'password123', false)
    })
  })
})
```

### Dependencias que se mockean:

| Dependencia | Por qué se mockea |
|-------------|-------------------|
| `useAuth` (hook) | Es una dependencia externa que llama a servicios de autenticación. Al mockearlo, controlamos su comportamiento y evitamos llamadas reales a la API. |
| `mockLogin` (función) | Simula la respuesta del servicio de login. Permite verificar que el componente llama correctamente al hook sin depender de la implementación. |
| `BrowserRouter` (react-router) | Proporciona el contexto de navegación para que el componente funcione correctamente en el test. |

### Por qué estos mocks son necesarios:
1. **Aislamiento:** Testeamos solo el componente, no toda la aplicación
2. **Velocidad:** No esperamos respuestas de API
3. **Determinismo:** El test siempre da el mismo resultado
4. **Control:** Podemos simular errores, cargas, etc.

---

## 4. REPORTE AUTOMATIZADO DE PRUEBAS

### Configuración en vite.config.ts:
```typescript
export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage',
    },
  },
})
```

### Ejecutar reporte:
```bash
npm test -- --coverage
```

### Reporte generado:
- **Ubicación:** `./coverage/`
- **Archivos:**
  - `index.html` - Reporte visual HTML
  - `coverage-final.json` - Datos en JSON
  - `LoginView.tsx.html` - Detalle por archivo

### Cobertura actual:
```
File           | % Stmts | % Branch | % Funcs | % Lines 
---------------|---------|----------|---------|---------
LoginView.tsx |   100   |   94.11 |   100   |   100
```

---

## 5. RESUMEN PARA LA AUDITORÍA

| Aspecto | Detalle |
|---------|---------|
| Tests totals | 18 (15 TDD + 3 Auditoría) |
| Coverage | 100% en LoginView |
| VERIFICAR | Test que verifica llamada correcta al hook useAuth |
| VALIDAR | Test que valida registro de usuario con datos correctos |
| Mocks usados | useAuth (hook), mockLogin, mockRegister |
| Reporte | Generado en `./coverage/` |

¡Listo para la auditoría! ✅
