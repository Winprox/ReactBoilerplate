import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from './App';

describe('App', () => {
  it('Original State', () => {
    render(<App />);
    const text = screen.getByText('Clicked 0 times');
    expect(text).toBeInTheDocument();
  });

  it('Clicked 1 Time', () => {
    render(<App />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(button.innerHTML).toEqual('Clicked 1 times');
  });

  it('Clicked 2 Times', () => {
    render(<App />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    fireEvent.click(button);
    expect(button.innerHTML).toEqual('Clicked 2 times');
  });
});
