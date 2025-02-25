import { ChangeEventHandler, useState } from "react";

export default function useInput(initialValue?: string): [string, ChangeEventHandler<HTMLInputElement>] {
  const [value, setValue] = useState(initialValue || "");

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  return [value, onChange];
}
