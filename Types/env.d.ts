declare namespace NodeJS {
  export interface ProcessEnv {
    NEXT_PUBLIC_HOST: string;
    KEY: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_CONNECT_STRING: string;
    DB_POOL_MIN: string;
    DB_POOL_MAX: string;
    DB_POOL_INCREMENT: string;
    E_MAIL_USER: string;
    E_MAIL_PASSWORD: string;
  }
}
