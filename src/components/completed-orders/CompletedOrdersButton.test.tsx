import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CompletedOrdersButton } from './CompletedOrdersButton';

describe('CompletedOrdersButton', () => {
  it('calls onToggle when clicked', () => {
    const cb = vi.fn();
    render(<CompletedOrdersButton count={0} onToggle={cb} />);
    fireEvent.click(screen.getByRole('button'));
    expect(cb).toHaveBeenCalled();
  });

  it('shows count badge when count > 0', () => {
    render(<CompletedOrdersButton count={5} onToggle={() => {}} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('renders loading spinner when isLoading', () => {
    render(<CompletedOrdersButton count={0} isLoading onToggle={() => {}} />);
    const icon = screen.getByText('progress_activity');
    expect(icon).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  });
});