import { arrayBufferToBase64 } from "@/app/_functions/arrayBufferToBase64";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Params {
  adminId: string;
}

interface NoContentData {
  message: string;
}

export async function getPhoto({ adminId }: Params) {
  const result = await axios.get<ArrayBuffer | NoContentData>(`/api/user/${adminId}/photo`, {
    responseType: "arraybuffer",
    validateStatus: (status) => status === 200 || status === 204,
  });

  if (result.status === 200) {
    return arrayBufferToBase64(result.data as ArrayBuffer);
  } else if (result.status === 204) {
    console.log((result.data as NoContentData).message);
    return null;
  }
}

export default function useGetPhotoQuery({ adminId }: Params) {
  return useQuery({ queryKey: ["adminPhoto", adminId], queryFn: () => getPhoto({ adminId }), enabled: !!adminId });
}
