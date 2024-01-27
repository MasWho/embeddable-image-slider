/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_IMG_ONE_SRC: string;
    readonly VITE_IMG_TWO_SRC: string;
    readonly VITE_IMG_WIDTH: string;
    readonly VITE_IMG_HEIGHT: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }