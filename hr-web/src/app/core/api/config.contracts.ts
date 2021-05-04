
export interface AppConfig {
    production: boolean;
    hmr: boolean;
    version: string;
    defaultLanguage: string;
    supportedLanguages: string[];
    serverUrl: string;
    authenticationUrl: string;
    cstoolboxApiUrl: string;
    api?: ApiConfig;
  }
  export interface ApiConfig {
    httpCallTimeout: number;
    httpCallRetry: number;
    billingEditApiUrl: string;
    cstoolboxApiUrl: string;
  }
  