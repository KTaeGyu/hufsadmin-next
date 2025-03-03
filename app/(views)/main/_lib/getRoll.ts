import axios from "axios";
import { Roll } from "../_layout/LeftMenu";

type Data = { rolls: Roll[] };

export default async function getRoll() {
  const { data } = await axios.post<Data>("/api/roll");
  return data;
}
