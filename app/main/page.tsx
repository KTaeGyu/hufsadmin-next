"use client";

import "./_assets/css/main.css";

export default function Home() {
  const leftMenuIClicked = () => {};
  const homeButtonClicked = () => {};
  const signOutButtonClicked = () => {};

  return (
    <div id="main-container-div" className="container-fluid">
      <div id="main-header-div" className="row">
        <div className="text-left">
          <img src="/img/symbol_navy-mark-text.png" />
          <i id="left-menu-i" className="fas fa-bars finger-cursor" onClick={leftMenuIClicked}></i>
        </div>
        <div className="col text-right">
          <i id="home-i" className="fas fa-home align-middle finger-cursor" style={{ display: "none" }} onClick={homeButtonClicked}></i>
          <span
            id="home-span"
            className="hufs-font-m align-middle finger-cursor"
            style={{ display: "none", paddingRight: 5 }}
            onClick={homeButtonClicked}
          >
            {" "}
            Home
          </span>
          <i id="sign-out-i" className="fas fa-sign-out-alt align-middle finger-cursor" onClick={signOutButtonClicked}></i>
          <span className="hufs-font-m align-middle finger-cursor" onClick={signOutButtonClicked}>
            {" "}
            Sign Out
          </span>
        </div>
      </div>
      <div id="main-body-div" className="row align-items-start">
        <div id="left-menu-div">
          <div id="admin-info-div">
            <div id="admin-info-header-div" className="hufs-primary-bg text-white"></div>
            <div id="admin-info-body-div" className="hufs-accent-bg text-white p-1">
              <table>
                <tbody>
                  <tr>
                    <td id="admin-photo-td" rowSpan={2}>
                      <div></div>
                    </td>
                    <td id="admin-id-header-td">사 번</td>
                    <td id="admin-id-value-td"></td>
                  </tr>
                  <tr>
                    <td id="admin-name-header-td">성 명</td>
                    <td id="admin-name-value-td"></td>
                  </tr>
                  <tr>
                    <td id="admin-dept-name-header-td">소 속</td>
                    <td id="admin-dept-name-value-td" colSpan={2}></td>
                  </tr>
                  <tr>
                    <td id="admin-access-info-td" colSpan={3}></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div id="menu-list-div"></div>
        </div>
        <div id="right-main-div" className="col" style={{ overflowY: "scroll" }}></div>
        <div id="right-intro-div" className="col" style={{ overflowY: "scroll" }}></div>
      </div>
    </div>
  );
}
