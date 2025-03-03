"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { KeyboardEventHandler } from "react";
import SHA512 from "../../_functions/sha512";
import signin from "../_api/signin";
import { CenterToast } from "../_constants/swal";
import useInput from "../_hooks/useInput";

export default function SigninForm() {
  const router = useRouter();
  // Variables
  const [id, idChangeHandler] = useInput();
  const [password, passwordChangeHandler] = useInput();
  // Handers
  const enterKeyHandler: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      signinHandler({ id, password: SHA512(password) });
    }
  };
  const { mutate: signinHandler } = useMutation({
    mutationKey: ["signin"],
    mutationFn: signin,
    onMutate: (variables) => {
      console.log("Trying To Signin...");
      if (!variables.id) {
        CenterToast({ type: "warning", title: "사번을 입력하세요." });
        return false;
      }
      if (!variables.password) {
        CenterToast({ type: "warning", title: "비밀번호를 입력하세요." });
        return false;
      }
    },
    onSuccess: () => {
      router.replace("/main");
    },
    onError: (err: CustomError) => {
      CenterToast({ type: "warning", title: err.response?.data.message });
    },
  });
  const findPasswordHandler = () => {
    CenterToast({ type: "info", title: "준비중입니다." });
  };

  return (
    <div className="login-form-div">
      <h2 className="mb-3 font-weight-normal primary-fg text-left">LOGIN</h2>
      <label htmlFor="emp-no-input" className="sr-only">
        사 번
      </label>
      <input id="emp-no-input" className="form-control" value={id} onChange={idChangeHandler} placeholder="사 번" required autoFocus />
      <label htmlFor="password-input" className="sr-only">
        비밀번호
      </label>
      <input
        id="password-input"
        className="form-control"
        type="password"
        value={password}
        onChange={passwordChangeHandler}
        onKeyDown={enterKeyHandler}
        placeholder="비밀번호"
        required
      />
      <button id="sign-in-button" className="btn btn-lg btn-block" onClick={() => signinHandler({ id, password: SHA512(password) })}>
        LOGIN
      </button>
      <div className="mt-3 text-right">
        <button className="btn btn-sm hufs-popup-inverse-button" onClick={() => findPasswordHandler()}>
          비밀번호 찾기
        </button>
      </div>
    </div>
  );
}
