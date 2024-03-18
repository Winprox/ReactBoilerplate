import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Page } from '../ui/Page';

describe('App', () => {
    it('Axios Mock', async () => {
        render(<Page />);
        await waitFor(() => {
            const text = screen.getByRole('heading');
            expect(text.innerText).toContain('/');
        });
    });

    it('Click 1 Time', () => {
        render(<Page />);
        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(button.innerText).toContain('1');
    });

    it('Click 0 Times', () => {
        render(<Page />);
        const button = screen.getByRole('button');
        expect(button.innerText).toContain('0');
    });

    it('Click 2 Times', () => {
        render(<Page />);
        const button = screen.getByRole('button');
        fireEvent.click(button);
        fireEvent.click(button);
        expect(button.innerText).toContain('2');
    });
});
