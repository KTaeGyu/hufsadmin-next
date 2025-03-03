"use client";

import { useEffect, useState } from "react";
import getRoll from "../_lib/getRoll";
import RollDropdown from "./leftMenu/RollDropdown";

export interface Roll {
  rollId: string;
  rollName: string;
}

export default function LeftMenu() {
  const [selectedRoll, setSelectedRoll] = useState<Roll>();
  const [rolls, setRolls] = useState<Roll[]>();

  const selectRollHandler = (roll: Roll) => {
    setSelectedRoll(roll);
  };

  useEffect(() => {
    const onSuccess = (data: Roll[]) => {
      setRolls(data);
      if (data.length === 1) {
        setSelectedRoll(data[0]);
      }
    };

    getRoll(onSuccess);
  }, []);

  return (
    <div id="left-menu-div">
      <div id="admin-info-div">
        <div id="admin-info-header-div" className="hufs-primary-bg text-white">
          {rolls && rolls.length <= 1 ? (
            <h5 className="hufs-font-m">{selectedRoll?.rollName || "권한 없음"}</h5>
          ) : (
            <RollDropdown rolls={rolls} selectRollHandler={selectRollHandler} selectedRoll={selectedRoll} />
          )}
        </div>
        <div id="admin-info-body-div" className="hufs-accent-bg text-white p-1">
          <table>
            <tbody>
              <tr>
                <td id="admin-photo-td" rowSpan={2}>
                  <div>{/* 사진 */}</div>
                </td>
                <td id="admin-id-header-td">사 번</td>
                <td id="admin-id-value-td">{/* 사번 */}</td>
              </tr>
              <tr>
                <td id="admin-name-header-td">성 명</td>
                <td id="admin-name-value-td">{/* 성명 */}</td>
              </tr>
              <tr>
                <td id="admin-dept-name-header-td">소 속</td>
                <td id="admin-dept-name-value-td" colSpan={2}>
                  {/* 소속 */}
                </td>
              </tr>
              <tr>
                <td id="admin-access-info-td" colSpan={3}>
                  {/* 접속기록 */}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div id="menu-list-div">{/* 메뉴 */}</div>
    </div>
  );
}
