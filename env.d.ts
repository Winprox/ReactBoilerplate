export {};

declare global {
    const APP_VER: string;

    interface Window {
        env: 'dev' | 'test' | 'prod';
    }
}
