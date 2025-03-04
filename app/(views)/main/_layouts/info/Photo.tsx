"use client";

import useGetPhotoQuery from "../../_api/getPhoto";

interface Props {
  adminId: string;
}

export default function Photo({ adminId }: Props) {
  const { data, isLoading, error } = useGetPhotoQuery({ adminId });

  if (error) {
    console.log("Error loading admin photo.");
  }

  return (
    <td id="admin-photo-td" rowSpan={2}>
      {!isLoading && !error && <div style={{ backgroundImage: `url(${data})`, backgroundPosition: "center", backgroundRepeat: "no-repeat" }} />}
    </td>
  );
}
