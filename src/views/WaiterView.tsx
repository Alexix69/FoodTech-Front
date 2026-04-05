import { useState } from 'react';
import { useTables } from '../hooks/useTables';
import { useOrder } from '../hooks/useOrder';
import { TableSelector } from '../components/waiter/TableSelector';
import { CategoryFilter } from '../components/waiter/CategoryFilter';
import { ProductGrid } from '../components/waiter/ProductGrid';
import { OrderSummary } from '../components/waiter/OrderSummary';
import { KitchenStatus } from '../components/waiter/KitchenStatus';
import { ProductType } from '../models/Product';
import { MENU_PRODUCTS } from '../helpers/menuData';
import { calculateTotalPrice } from '../helpers/orderCalculator';

export const WaiterView = () => {
  const {
    tables,
    selectedTable,
    selectedTableId,
    selectTable,
    markTableAsOccupied,
    syncTablesWithTasks,
  } = useTables();

  const {
    orderProducts,
    totalItems,
    isSubmitting,
    error,
    addProduct,
    removeProduct,
    submitOrder,
  } = useOrder();

  const [selectedCategory, setSelectedCategory] = useState<
    ProductType | 'ALL'
  >('ALL');
  const [orderFeedback, setOrderFeedback] = useState<{
    type: 'info' | 'success' | 'error';
    message: string;
  } | null>(null);

  const handleSubmitOrder = async () => {
    if (!selectedTable) {
      setOrderFeedback({ type: 'info', message: 'Por favor selecciona una mesa' });
      alert('Por favor selecciona una mesa');
      return;
    }

    const response = await submitOrder(selectedTable.number);

    if (response) {
      markTableAsOccupied(selectedTable.id, response.orderId);
      syncTablesWithTasks([]);

      setOrderFeedback({
        type: 'success',
        message: `✅ ${response.message}\n\nMesa: ${response.tableNumber}\nTareas creadas: ${response.tasksCreated}`,
      });
      alert(
        `✅ ${response.message}\n\nMesa: ${response.tableNumber}\nTareas creadas: ${response.tasksCreated}`
      );
    } else if (error) {
      setOrderFeedback({ type: 'error', message: `❌ Error: ${error}` });
      alert(`❌ Error: ${error}`);
    }
  };

  const orderProductNames = orderProducts.map((p) => p.name);
  const totalPrice = calculateTotalPrice(orderProducts);

  return (
    <div className="flex h-screen overflow-hidden">
      {orderFeedback && (
        <div
          data-testid="order-feedback"
          data-feedback-type={orderFeedback.type}
          className="sr-only"
          aria-live="polite"
        >
          {orderFeedback.message}
        </div>
      )}
      
      <TableSelector
        tables={tables}
        selectedTableId={selectedTableId}
        onSelectTable={selectTable}
      />

      
      <main className="flex-1 flex flex-col overflow-hidden bg-midnight">
        
        <header className="h-24 border-b border-white/5 px-10 flex items-center justify-between shrink-0 bg-charcoal">
          <div className="flex items-center gap-8">
            <div>
              <h2 className="text-2xl font-bold text-white-text">
                {selectedTable
                  ? `Mesa ${selectedTable.number}`
                  : 'Selecciona una Mesa'}
              </h2>
              <p className="text-silver-text text-sm">
                {selectedTable
                  ? 'Agrega productos al pedido'
                  : 'Elige una mesa de la zona activa'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <span className="material-symbols-outlined text-primary text-sm">
                schedule
              </span>
              <span className="text-white-text text-sm font-bold">
                {new Date().toLocaleTimeString('es-ES', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          </div>
        </header>

        
        <div className="flex-1 overflow-y-auto p-10 order-scroll">
          
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          
          <ProductGrid
            products={MENU_PRODUCTS}
            selectedCategory={selectedCategory}
            orderProductNames={orderProductNames}
            onAddProduct={addProduct}
          />
        </div>
      </main>

      
      <aside className="w-[420px] bg-charcoal border-l border-white/5 flex flex-col shrink-0">
        
        <OrderSummary
          products={orderProducts}
          totalItems={totalItems}
          totalPrice={totalPrice}
          isSubmitting={isSubmitting}
          onRemoveProduct={removeProduct}
          onSubmit={handleSubmitOrder}
        />

        
        <KitchenStatus
          tasks={[]}
          isLoading={false}
          onRefresh={() => {}}
        />
      </aside>
    </div>
  );
};
