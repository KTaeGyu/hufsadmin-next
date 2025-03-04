import { AxiosError } from "axios";

declare global {
  // 전역적으로 사용 가능한 타입 선언
  type CustomError = AxiosError<{ message: string }>;

  type FixedArray<T, N extends number, R extends T[] = []> = R["length"] extends N ? R : FixedArray<T, N, [...R, T]>;
}

export {};
