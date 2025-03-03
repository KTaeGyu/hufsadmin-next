import { AxiosError } from "axios";

declare global {
  // 전역적으로 사용 가능한 타입 선언
  interface MenuItem {
    menu_id: string;
    menu_name: string;
    menu_icon: string;
    menu_api: string;
  }

  interface SubMenuGroupItem {
    menu_group_id: string;
    menu_group_name: string;
    menu_group_icon: string;
    sub_menu_group_array: SubMenuGroupItem[];
    menu_array: MenuItem[];
  }

  interface RollMenuObjectItem {
    roll_id: string;
    roll_name: string;
    greeting_page: string;
    sub_menu_group: SubMenuGroupItem;
  }

  interface AppSession {
    campus: string;
    dept_name: string;
    // admin
    admin_id: string;
    admin_name: string;
    recent_access_ip: string | null;
    recent_access_time: string;
    roll_name_text: string;
  }

  type CustomError = AxiosError<{ message: string }>;

  type FixedArray<T, N extends number, R extends T[] = []> = R["length"] extends N ? R : FixedArray<T, N, [...R, T]>;
}

export {};
