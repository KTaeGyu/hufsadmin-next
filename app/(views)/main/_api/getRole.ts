import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export async function getRole() {
  const result = await axios.get<{ roles: RollMenuObjectItem[] }>("/api/role");
  return result.data;
}

export default function useGetRoleQuery() {
  return useQuery({ queryKey: ["getRole"], queryFn: getRole });
}
