import cache from "@/app/_lib/cache";
import { getPool } from "@/app/_lib/oracledb";
import { Connection } from "oracledb";
import getAdminMenuGroupSql from "./_sql/getAdminMenuGroupSql.sql";
import getAdminMenuSql from "./_sql/getAdminMenuSql.sql";
import getAdminRollSql from "./_sql/getAdminRollSql.sql";

const initializeCache = async () => {
  let connection: Connection | null = null;
  try {
    // Load database
    console.log("Getting Connection To DB Pool...");
    const pool = await getPool();
    connection = await pool.getConnection();

    // DB 조회 (역할, 메뉴 그룹, 메뉴)
    const getRollResult = await connection.execute<FixedArray<string, 3>>(getAdminRollSql);
    const getMenuGroupResult = await connection.execute<FixedArray<string, 4>>(getAdminMenuGroupSql);
    const getMenuResult = await connection.execute<FixedArray<string, 5>>(getAdminMenuSql);

    const rollArray = getRollResult.rows;
    const menuGroupArray = getMenuGroupResult.rows;
    const menuArray = getMenuResult.rows;

    // 메뉴 구성
    //   1. 결과 배열 초기화
    const rollMenuObjectArray: RollMenuObjectItem[] = [];
    //   2. 메뉴 구성
    //     1) 루트 역할 객체 정의
    const rootRollObject = (roll: FixedArray<string, 3>): RollMenuObjectItem => ({
      roll_id: roll[0],
      roll_name: roll[1],
      greeting_page: roll[2],
      sub_menu_group: {
        menu_group_id: roll[0],
        menu_group_name: "root",
        menu_group_icon: "",
        sub_menu_group_array: [],
        menu_array: [],
      },
    });
    //     2) 구성 함수
    function configMenuTree() {
      if (!rollArray || !menuGroupArray || !menuArray) {
        throw new Error("ERROR CONFIGURE MENU: NO DATA");
      }
      rollArray.forEach((roll) => {
        let newItem: RollMenuObjectItem | undefined;

        newItem = rollMenuObjectArray.find((rollMenuObject) => roll[0] === rollMenuObject.roll_id);
        if (!newItem) {
          newItem = rootRollObject(roll);
        }

        rollMenuObjectArray.push(newItem);
        configMenuGroup(newItem.sub_menu_group);
      });
    }
    //   3. 서브 메뉴 구성
    //     1) 서브 메뉴 그룹 객체 정의
    const subMenuGroupObject = (menuGroup: FixedArray<string, 4>) => ({
      menu_group_id: menuGroup[1],
      menu_group_name: menuGroup[2],
      menu_group_icon: menuGroup[3],
      sub_menu_group_array: [],
      menu_array: [],
    });
    //     2) 서브 메뉴 객체 정의
    const subMenuObject = (menu: FixedArray<string, 5>) => ({
      menu_id: menu[1],
      menu_name: menu[2],
      menu_icon: menu[4],
      menu_api: menu[3],
    });
    //     3) 구성 함수
    function configMenuGroup(subMenuGroup: SubMenuGroupItem) {
      if (!menuGroupArray || !menuArray) {
        throw new Error("ERROR CONFIGURE MENU GROUP: NO DATA");
      }
      menuGroupArray.forEach((menuGroup) => {
        if (menuGroup[0] === subMenuGroup.menu_group_id) {
          const subMenuGroupItem = subMenuGroupObject(menuGroup);

          subMenuGroup.sub_menu_group_array.push(subMenuGroupItem);
          configMenuGroup(subMenuGroupItem);
        }
      });
      menuArray.forEach((menu) => {
        if (menu[0] === subMenuGroup.menu_group_id) {
          const subMenuItem = subMenuObject(menu);

          subMenuGroup.menu_array.push(subMenuItem);
        }
      });
    }
    configMenuTree();

    // 캐시에 데이터 저장
    cache.setRollMenuObjectArray(rollMenuObjectArray);

    console.log("✅ Cache initialized with DB data");
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
};

// 초기화
initializeCache();
// 1시간 간격으로 캐시 데이터 갱신
setInterval(initializeCache, 1000 * 60 * 60);
