"use client";

import useGetRoleQuery from "../../_api/getRole";

export default function AdminInfoHeader() {
  const { data } = useGetRoleQuery();

  return (
    <div id="admin-info-header-div" className="hufs-primary-bg text-white">
      {/* 역할 */}
    </div>
  );
}
