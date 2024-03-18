import { afterEach, expect, vi } from 'vitest';
import * as matchers from 'vitest-dom/matchers';
import { cleanup } from '@testing-library/react';
import { storeReset } from '@/shared/utils';

vi.mock('axios');
expect.extend(matchers);

afterEach(() => {
    storeReset.forEach((fn) => fn());
    cleanup();
});
