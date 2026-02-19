import { useState } from 'react';
import { useCompletedOrders } from '../../hooks/useCompletedOrders';
import { CompletedOrdersButton } from './CompletedOrdersButton';
import { CompletedOrdersModal } from './CompletedOrdersModal';

export const CompletedOrdersWidget = () => {
  const { completedOrders, count, markAsInvoiced } = useCompletedOrders();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleInvoice = (orderId: string) => {
    markAsInvoiced(orderId);
  };

  return (
    <>
      <CompletedOrdersButton count={count} onToggle={handleToggle} />
      <CompletedOrdersModal
        isOpen={isOpen}
        onClose={handleClose}
        orders={completedOrders}
        onInvoice={handleInvoice}
      />
    </>
  );
};
