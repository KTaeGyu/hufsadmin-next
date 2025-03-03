import { AxiosError } from "axios";

declare global {
  // 전역적으로 사용 가능한 타입 선언
  type FixedSizeArray<T, N extends number> = [T, ...T[]] & { length: N };

  type CustomError = AxiosError<{ message: string }>;
}

export {};
