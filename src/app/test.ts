import { cleanup } from '@testing-library/react';
import { afterEach, expect } from 'vitest';
import * as matchers from 'vitest-dom/matchers';
import { storeReset } from '../utils';

expect.extend(matchers);
afterEach(() => {
  storeReset.forEach((fn) => fn());
  cleanup();
});
