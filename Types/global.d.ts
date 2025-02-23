declare global {
  // 전역적으로 사용 가능한 타입 선언
  interface AppSession {
    admin_id: string;
    admin_name: string;
    dept_name: string;
    recent_access_ip: string | null;
    recent_access_time: string;
  }

  interface ResposeData<T = ""> {
    status: "SUCCESS" | "FAIL";
    value: T;
  }
}

export {};
