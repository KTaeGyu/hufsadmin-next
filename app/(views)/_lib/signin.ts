import axios from "axios";

type Body = { id: string; password: string };
type Data = void;

export default async function signin(body: Body) {
  const { data } = await axios.post<Data>("/api/auth", body);
  return data;
}
