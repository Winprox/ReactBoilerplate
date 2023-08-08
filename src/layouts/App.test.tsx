import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { App } from './App';

vi.mock('axios');

describe('App', () => {
  it('Axios Mock', async () => {
    render(<App />);
    await waitFor(() => {
      const text = screen.getByRole('heading');
      expect(text.innerHTML).toContain('/');
    });
  });

  it('Click 1 Time', () => {
    render(<App />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(button.innerHTML).toContain('1');
  });

  it('Click 0 Times', () => {
    render(<App />);
    const button = screen.getByRole('button');
    expect(button.innerHTML).toContain('0');
  });

  it('Click 2 Times', () => {
    render(<App />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    fireEvent.click(button);
    expect(button.innerHTML).toContain('2');
  });
});
