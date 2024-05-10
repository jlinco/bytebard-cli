/// <reference types="vite/client" />

// environment variables are defined here
// to ensure type safety
interface ImportMetaEnv {
  // add as many ENV VARS you need here
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
