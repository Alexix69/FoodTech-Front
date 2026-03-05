import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CompletedOrdersToast } from './CompletedOrdersToast';

describe('CompletedOrdersToast', () => {
  it('returns null when not visible', () => {
    const { container } = render(
      <CompletedOrdersToast message="x" isVisible={false} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders message when visible', () => {
    render(<CompletedOrdersToast message="hola" isVisible={true} />);
    expect(screen.getByText('hola')).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});