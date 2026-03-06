import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { CompletedOrdersWidget } from './CompletedOrdersWidget';

// We'll mock the hook to control its output
const mockUseCompletedOrders = vi.fn();
vi.mock('../../hooks/useCompletedOrders', () => ({
  useCompletedOrders: () => mockUseCompletedOrders(),
}));

describe('CompletedOrdersWidget', () => {
  beforeEach(() => {
    mockUseCompletedOrders.mockReset();
  });

  // no global fake timers – individual tests control their own if needed


  const defaultOrder = {
    id: '1',
    tableNumber: 'T1',
    totalItems: 2,
    completedAt: new Date(),
  };

  function setupHook(overrides: Partial<ReturnType<typeof mockUseCompletedOrders>> = {}) {
    const base = {
      completedOrders: [defaultOrder],
      count: 1,
      loading: false,
      error: null,
      requestInvoice: vi.fn().mockResolvedValue(1),
      invoiceLoadingById: {},
      invoiceErrorById: {},
    };
    const combined = { ...base, ...overrides };
    mockUseCompletedOrders.mockReturnValue(combined);
    return combined;
  }

  it('toggles modal when button is clicked', () => {
    setupHook();
    render(<CompletedOrdersWidget />);
    const btn = screen.getByRole('button', { name: /Open completed orders/i });
    fireEvent.click(btn);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    // closing via toggle again
    fireEvent.click(btn);
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('shows toast message after invoicing and clears it after timeout', async () => {
    // use real timers so DOM queries work normally
    vi.useRealTimers();
    const { requestInvoice } = setupHook({ requestInvoice: vi.fn().mockResolvedValue(2) });
    render(<CompletedOrdersWidget />);

    // open modal and invoice flow inside order card
    fireEvent.click(screen.getByRole('button', { name: /Open completed orders/i }));
    const card = screen.getByText('1').closest('.glass-panel-dark');
    expect(card).toBeTruthy();
    const { getByRole, getByLabelText } = within(card as HTMLElement);

    let invoiceBtn = getByRole('button', { name: /Facturar/i });
    fireEvent.click(invoiceBtn); // show input

    const nameInput = getByLabelText(/Nombre del cliente/i);
    fireEvent.change(nameInput, { target: { value: 'Cliente' } });
    invoiceBtn = getByRole('button', { name: /Facturar/i });
    fireEvent.click(invoiceBtn);

    expect(requestInvoice).toHaveBeenCalledWith(1, 'Cliente');
    expect(await screen.findByText(/Factura enviada correctamente/i)).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();

    // switch to fake to move time forward quickly
    vi.useFakeTimers();
    act(() => {
      vi.advanceTimersByTime(4000);
    });
    // return to real to allow queries again
    vi.useRealTimers();

    expect(screen.queryByRole('status')).toBeNull();
  });

  it('closes modal when invoice returns 0 remaining', async () => {
    vi.useRealTimers();
    setupHook({ requestInvoice: vi.fn().mockResolvedValue(0) });
    render(<CompletedOrdersWidget />);
    fireEvent.click(screen.getByRole('button'));
    const card = screen.getByText('1').closest('.glass-panel-dark');
    expect(card).toBeTruthy();
    const { getByRole, getByLabelText } = within(card as HTMLElement);
    let invoiceBtn = getByRole('button', { name: /Facturar/i });
    fireEvent.click(invoiceBtn);
    const nameInput = getByLabelText(/Nombre del cliente/i);
    fireEvent.change(nameInput, { target: { value: 'X' } });
    invoiceBtn = getByRole('button', { name: /Facturar/i });
    fireEvent.click(invoiceBtn);

    // modal should close after the request settles
    await act(async () => Promise.resolve());
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('clears timeout on unmount after invoice', async () => {
    const clearSpy = vi.spyOn(window, 'clearTimeout');
    vi.useRealTimers();
    setupHook({ requestInvoice: vi.fn().mockResolvedValue(1) });
    const { unmount } = render(<CompletedOrdersWidget />);
    fireEvent.click(screen.getByRole('button', { name: /Open completed orders/i }));
    const invoiceBtn = await screen.findByRole('button', { name: /Facturar/i });
    fireEvent.click(invoiceBtn);
    const nameInput = await screen.findByLabelText(/Nombre del cliente/i);
    fireEvent.change(nameInput, { target: { value: 'ABC' } });
    fireEvent.click(invoiceBtn);
    // unmount should clear whatever timeout was set
    unmount();
    expect(clearSpy).toHaveBeenCalled();
    clearSpy.mockRestore();
  });
});