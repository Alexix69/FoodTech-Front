import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import { StationLayout } from './StationLayout';

// the component uses new Date().toLocaleTimeString so we'll stub it

describe('StationLayout', () => {
  const originalToLocale = Date.prototype.toLocaleTimeString;

  beforeAll(() => {
    // make the time predictable
    vi.spyOn(Date.prototype, 'toLocaleTimeString').mockImplementation(function () {
      // ignore locale/opts, always return fixed string
      return '08:55';
    });
  });

  afterAll(() => {
    // restore the original implementation
    Date.prototype.toLocaleTimeString = originalToLocale;
  });

  it('renders the station name, code and icon', () => {
    render(
      <StationLayout stationName="Cool Station" stationCode="CS-01" icon="kitchen">
        <div>child content</div>
      </StationLayout>
    );

    expect(screen.getByRole('heading', { name: /cool station/i })).toBeInTheDocument();
    expect(screen.getByText(/cs-01/i)).toBeInTheDocument();

    // icon is rendered in a span with the material-icons text
    expect(screen.getByText('kitchen')).toBeInTheDocument();
  });

  it('displays the current time from Date.toLocaleTimeString', () => {
    render(
      <StationLayout stationName="A" stationCode="B" icon="x">
        <>foo</>
      </StationLayout>
    );

    expect(screen.getByText('08:55')).toBeInTheDocument();
  });

  it('renders children inside the layout', () => {
    render(
      <StationLayout stationName="S" stationCode="C" icon="y">
        <section data-testid="inner">hey!</section>
      </StationLayout>
    );

    expect(screen.getByTestId('inner')).toHaveTextContent('hey!');
  });
});
