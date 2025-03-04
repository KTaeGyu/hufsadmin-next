import { getSession } from "@/app/_lib/session";
import Photo from "./Photo";

export default async function Body() {
  const { admin_id, admin_name, dept_name, recent_access_time, recent_access_ip } = await getSession();

  return (
    <div id="admin-info-body-div" className="hufs-accent-bg text-white p-1">
      <table>
        <tbody>
          <tr>
            <Photo adminId={admin_id} />
            <td id="admin-id-header-td">사 번</td>
            <td id="admin-id-value-td">{admin_id}</td>
          </tr>
          <tr>
            <td id="admin-name-header-td">성 명</td>
            <td id="admin-name-value-td">{admin_name}</td>
          </tr>
          <tr>
            <td id="admin-dept-name-header-td">소 속</td>
            <td id="admin-dept-name-value-td" colSpan={2}>
              {dept_name}
            </td>
          </tr>
          <tr>
            <td id="admin-access-info-td" colSpan={3}>
              최근접속일자 : {recent_access_time}
              <br />
              최근접속 IP : {recent_access_ip}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
