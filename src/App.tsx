import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { WaiterView } from './views/WaiterView';
import { BarView } from './views/BarView';
import { CocineroView } from './views/CocineroView';
import { LoginView } from './views/LoginView';
import { Navigation } from './components/Navigation';
import { ProtectedRoute } from './components/ProtectedRoute';
import { PublicRoute } from './components/PublicRoute';
import { CompletedOrdersWidget } from './components/completed-orders/CompletedOrdersWidget';
import { NotFound } from './components/NotFound';
import { UserRole } from './models/UserRole';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PublicRoute><LoginView /></PublicRoute>} />
        <Route path="/registro" element={<PublicRoute><LoginView /></PublicRoute>} />

        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Navigation />
              <div className="pt-16">
                <Routes>
                  <Route path="/" element={<Navigate to="/login" replace />} />
                  <Route
                    path="/mesero"
                    element={
                      <ProtectedRoute allowedRoles={[UserRole.MESERO]}>
                        <WaiterView />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/cocina"
                    element={
                      <ProtectedRoute allowedRoles={[UserRole.COCINERO]}>
                        <CocineroView />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/barra"
                    element={
                      <ProtectedRoute allowedRoles={[UserRole.BARTENDER]}>
                        <BarView />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
              <CompletedOrdersWidget />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
