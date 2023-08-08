import { vi } from 'vitest';

export default vi.fn(({ url }: { url: string }) => Promise.resolve(url));
