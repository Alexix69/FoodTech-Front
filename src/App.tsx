import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { WaiterView } from './views/WaiterView';
import { HotKitchenView } from './views/HotKitchenView';
import { BarView } from './views/BarView';
import { ColdKitchenView } from './views/ColdKitchenView';
import { Navigation } from './components/Navigation';
import { CompletedOrdersWidget } from './components/completed-orders/CompletedOrdersWidget';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<Navigate to="/mesero" replace />} />
          <Route path="/mesero" element={<WaiterView />} />
          <Route path="/cocina-caliente" element={<HotKitchenView />} />
          <Route path="/barra" element={<BarView />} />
          <Route path="/cocina-fria" element={<ColdKitchenView />} />
        </Routes>
      </div>
      <CompletedOrdersWidget />
    </BrowserRouter>
  );
}

export default App;
