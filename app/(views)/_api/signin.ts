import axios from "axios";

interface Body {
  id: string;
  password: string;
}

interface Data {
  message: string;
}

export default async function signin(body: Body) {
  const respose = await axios.post<Data>("/api/auth", body);
  return respose.data;
}
