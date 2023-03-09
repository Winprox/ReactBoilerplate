/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DEV: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
