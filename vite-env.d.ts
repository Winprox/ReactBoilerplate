/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_DATA: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
