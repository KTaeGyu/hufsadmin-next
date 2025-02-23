declare namespace NodeJS {
  export interface ProcessEnv {
    NEXT_PUBLIC_HOST: string;

    KEY: string;
    SECRET_COOKIE_PASSWORD: string;

    DB_USER: string;
    DB_PASSWORD: string;
    DB_CONNECT_STRING: string;

    E_MAIL_USER: string;
    E_MAIL_PASSWORD: string;

    PUBLIC_TRAFFIC_MANAGER_ID: string;
    PUBLIC_TRAFFIC_MANAGER_PW: string;
  }
}
