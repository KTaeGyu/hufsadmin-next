import SHA512 from "@/app/_functions/sha512";
import axios from "axios";

interface Body {
  id: string;
  password: string;
}

interface Data {
  message: string;
}

export default async function signin({ id, password }: Body) {
  const body = { id, password: SHA512(password) };
  const respose = await axios.post<Data>("/api/auth", body);
  return respose.data;
}
