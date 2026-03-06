import React from 'react';
import { render, screen, fireEvent} from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CompletedOrdersModal } from './CompletedOrdersModal';
import type { CompletedOrder } from '../../models/CompletedOrder';

const baseOrders: CompletedOrder[] = [
  {
    id: '2',
    tableNumber: 'A1',
    totalItems: 3,
    completedAt: new Date('2022-01-02'),
  },
  {
    id: '1',
    tableNumber: 'B2',
    totalItems: 5,
    completedAt: new Date('2022-01-01'),
  },
];

describe('CompletedOrdersModal', () => {
  const onClose = vi.fn();
  const onInvoice = vi.fn().mockResolvedValue(123);

  beforeEach(() => {
    onClose.mockClear();
    onInvoice.mockClear();
  });

  it('returns null when isOpen is false', () => {
    const { container } = render(
      <CompletedOrdersModal
        isOpen={false}
        onClose={onClose}
        orders={[]}
        onInvoice={onInvoice}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it('shows loader when loading flag is present', () => {
    render(
      <CompletedOrdersModal
        isOpen={true}
        onClose={onClose}
        orders={[]}
        onInvoice={onInvoice}
        loading
      />
    );
    expect(screen.getByText(/Cargando pedidos/i)).toBeInTheDocument();
  });

  it('displays error message when error prop provided', () => {
    render(
      <CompletedOrdersModal
        isOpen={true}
        onClose={onClose}
        orders={[]}
        onInvoice={onInvoice}
        error="algo salió mal"
      />
    );
    expect(screen.getByText(/algo salió mal/i)).toBeInTheDocument();
  });

  it('renders empty state when there are no orders', () => {
    render(
      <CompletedOrdersModal
        isOpen={true}
        onClose={onClose}
        orders={[]}
        onInvoice={onInvoice}
      />
    );
    expect(screen.getByText(/No completed orders/i)).toBeInTheDocument();
  });

  it('sorts the orders by completedAt descending', () => {
    render(
      <CompletedOrdersModal
        isOpen={true}
        onClose={onClose}
        orders={baseOrders}
        onInvoice={onInvoice}
      />
    );

    const orderLabels = screen.getAllByText('Order');
    const ids = orderLabels.map((label) => {
      const parent = label.parentElement;
      const ps = parent?.querySelectorAll('p');
      return ps && ps[1] ? ps[1].textContent : null;
    });
    expect(ids[0]).toBe('2');
    expect(ids[1]).toBe('1');
  });

  it('calls onClose when close button clicked or overlay clicked or Escape pressed', () => {
    const { unmount } = render(
      <CompletedOrdersModal
        isOpen={true}
        onClose={onClose}
        orders={[]}
        onInvoice={onInvoice}
      />
    );
    fireEvent.click(screen.getByLabelText(/Close completed orders/i));
    expect(onClose).toHaveBeenCalledTimes(1);

    // unmount before rendering again to avoid duplicate overlays
    unmount();
    render(
      <CompletedOrdersModal
        isOpen={true}
        onClose={onClose}
        orders={[]}
        onInvoice={onInvoice}
      />
    );
    const overlay = screen.getByRole('presentation');
    fireEvent.mouseDown(overlay, { target: overlay });
    expect(onClose).toHaveBeenCalledTimes(2);

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(3);
  });

  it('shows invoice form and errors when necessary', async () => {
    render(
      <CompletedOrdersModal
        isOpen={true}
        onClose={onClose}
        orders={[
          ...baseOrders,
          {
            id: 'abc',
            tableNumber: 'C3',
            totalItems: 1,
            completedAt: new Date(),
          },
        ]}
        onInvoice={onInvoice}
        invoiceErrorById={{ '2': 'falló' }}
      />
    );

    // find invoice button for order abc by filtering all invoice buttons
    const allBtns = screen.getAllByRole('button', { name: /facturar/i });
    const abcBtn = allBtns.find((b) =>
      b.closest('.glass-panel-dark')?.textContent?.includes('abc')
    );
    expect(abcBtn).toBeDefined();

    fireEvent.click(abcBtn!);
    expect(await screen.findByText(/Ingresa el nombre del cliente/i)).toBeInTheDocument();

    // enter a name and click again -> invalid id
    fireEvent.change(screen.getByLabelText(/Nombre del cliente/i), {
      target: { value: 'Juan' },
    });
    fireEvent.click(abcBtn!);
    expect(await screen.findByText(/Order ID inválido/i)).toBeInTheDocument();

    // invoiceErrorById message should appear for order 2 (outside the card)
    expect(screen.getByText(/falló/i)).toBeInTheDocument();

    // simulate valid invoice call for first order
    const firstBtn = allBtns.find((b) =>
      b.closest('.glass-panel-dark')?.textContent?.includes('2')
    );
    expect(firstBtn).toBeDefined();
    // repeat the name-input flow for the first order too
    fireEvent.click(firstBtn!); // reveal input
    const firstNameInput = await screen.findByLabelText(/Nombre del cliente/i);
    fireEvent.change(firstNameInput, { target: { value: 'Cliente1' } });
    fireEvent.click(firstBtn!);
    expect(onInvoice).toHaveBeenCalled();
  });

  it('disables button and shows sending text when invoiceLoadingById is true', () => {
    render(
      <CompletedOrdersModal
        isOpen={true}
        onClose={onClose}
        orders={baseOrders}
        onInvoice={onInvoice}
        invoiceLoadingById={{ '2': true }}
      />
    );
    const sending = screen.getByText('Enviando...');
    expect(sending).toBeInTheDocument();
    const btn = sending.closest('button');
    expect(btn).toBeDisabled();
  });
});
