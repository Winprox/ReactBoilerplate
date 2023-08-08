import { vi } from 'vitest';

export default vi.fn(({ url }: { url: string; method: string }) => Promise.resolve(url));
