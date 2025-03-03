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

const a = [
  {
    roll_id: "HUFSADMIN^2020-12-02 11:31:13^20191139",
    roll_name: "상담 센터 관리자",
    greeting_page: "mgr_counseling/greeting",
    sub_menu_group: {
      menu_group_id: "HUFSADMIN^2020-12-02 11:31:13^2019113",
      menu_group_name: "root",
      menu_group_icon: "",
      sub_menu_group_array: [
        {
          menu_group_id: "HUFSADMIN^MENUGROUPID^2020-12-02 11:47:55^2019113",
          menu_group_name: "상담 현황 및 통계",
          menu_group_icon: null,
          sub_menu_group_array: [],
          menu_array: [
            {
              menu_id: "HUFSADMIN^MENUID^2020-12-24 15:53:41^2019113",
              menu_name: "상담스케줄 현황 및 통계",
              menu_icon: null,
              menu_api: "mgr_counseling/statistics_info",
            },
          ],
        },
        {
          menu_group_id: "HUFSADMIN^MENUGROUPID^2020-12-02 11:47:22^2019113",
          menu_group_name: "마스터 관리",
          menu_group_icon: null,
          sub_menu_group_array: [],
          menu_array: [
            {
              menu_id: "HUFSADMIN^MENUID^2020-12-18 12:53:18^2019113",
              menu_name: "상담센터 권한 설정",
              menu_icon: null,
              menu_api: "mgr_counseling/role_setting",
            },
            {
              menu_id: "HUFSADMIN^MENUID^2020-12-18 12:54:56^2019113",
              menu_name: "상담센터 공통코드 관리",
              menu_icon: null,
              menu_api: "mgr_counseling/common_info_edit",
            },
          ],
        },
        {
          menu_group_id: "HUFSADMIN^MENUGROUPID^2020-12-02 11:47:35^2019113",
          menu_group_name: "상담 스케줄",
          menu_group_icon: null,
          sub_menu_group_array: [],
          menu_array: [
            {
              menu_id: "HUFSADMIN^MENUID^2020-12-24 15:54:27^2019113",
              menu_name: "상담스케줄 등록 및 조회",
              menu_icon: null,
              menu_api: "mgr_counseling/counseling_schedule_create_edit",
            },
          ],
        },
      ],
      menu_array: [],
    },
  },
];
