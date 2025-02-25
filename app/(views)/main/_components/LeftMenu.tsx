export default function LeftMenu() {
  return (
    <div id="left-menu-div">
      <div id="admin-info-div">
        <div id="admin-info-header-div" className="hufs-primary-bg text-white">
          {/* 역할 */}
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
