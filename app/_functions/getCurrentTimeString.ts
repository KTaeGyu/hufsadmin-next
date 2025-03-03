import dayjs from "dayjs";

export default function getCurrentTimeString() {
  return dayjs().format("YYYY-MM-DD HH:mm:ss");
}
