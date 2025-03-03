"use client";

import { useEffect } from "react";
import useGetRoleQuery from "../../_api/getRole";

export default function AdminInfoHeader() {
  const { data, isSuccess } = useGetRoleQuery();

  const rollSelectHandler = (id: string) => {
    // let thisRollMenuObject = null;
    // for (let i = 0; i < rollMenuObjectArray.length; i++) {
    //   if (rollMenuObjectArray[i].roll_id == id) {
    //     thisRollMenuObject = rollMenuObjectArray[i];
    //     break;
    //   }
    // }
    // if (thisRollMenuObject != null) {
    //   selectedRollName = thisRollMenuObject.roll_name;
    //   $.post("http://203.232.236.146:3000/set_current_roll_name", { new_roll_name: thisRollMenuObject.roll_name }, function (data) {
    //     if (data.status == "SUCCESS") {
    //       menuHtml = "";
    //       thisTimeRoll = thisRollMenuObject.roll_name;
    //       configSubMenuTree(thisRollMenuObject.sub_menu_group, 0, "root");
    //       $("#roll-select-dropdown-button").html(thisTimeRoll);
    //       $("#menu-list-div").html(menuHtml);
    //       TopToast.fire({ type: "success", title: "'" + thisTimeRoll + "'로 역할이 설정되었습니다." });
    //       if (thisRollMenuObject.greeting_page != null && thisRollMenuObject.greeting_page.length > 0) {
    //         showSpinner();
    //         greetingPageURL = thisRollMenuObject.greeting_page;
    //         $("#home-i").show();
    //         $("#right-intro-div").hide();
    //         $("#home-span").show();
    //         $("#right-main-div")
    //           .empty()
    //           .load(serverURL + thisRollMenuObject.greeting_page, function () {
    //             hideSpinner();
    //           })
    //           .show();
    //       } else {
    //         $("#home-i").hide();
    //         $("#home-span").hide();
    //       }
    //       thisTimeOrgSect = "";
    //       if (thisTimeRoll.indexOf("조회자") >= 0) {
    //         thisTimeOrgSect = "A";
    //       } else {
    //         for (let i = 0; i < orgSectList.length; i++) {
    //           if (thisTimeRoll.indexOf(orgSectList[i].name) > 0) {
    //             thisTimeOrgSect = orgSectList[i].value;
    //             break;
    //           }
    //         }
    //       }
    //     } else {
    //       swal({ type: "error", title: "에러가 발생했습니다!", showConfirmButton: false, timer: 1500 });
    //     }
    //   });
    // }
  };

  useEffect(() => {
    if (isSuccess) {
      rollSelectHandler(data.roles[0].roll_id);
    }
  }, [isSuccess, data?.roles]);

  return (
    <div id="admin-info-header-div" className="hufs-primary-bg text-white">
      {!data?.roles.length ? (
        <h5 className="hufs-font-m">권한 없음</h5>
      ) : data.roles.length === 1 ? (
        <h5 className="hufs-font-m">{data.roles[0].roll_name}</h5>
      ) : (
        <div id="roll-select-dropdown-div" className="dropdown">
          <button
            id="roll-select-dropdown-button"
            className="btn btn-secondary dropdown-toggle btn-block"
            style={{ color: "#ffffff" }}
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            역할 선택
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {data.roles.map((role) => (
              <a key={role.roll_id} className="dropdown-item" href="#" onClick={() => rollSelectHandler(role.roll_id)}>
                {role.roll_name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
