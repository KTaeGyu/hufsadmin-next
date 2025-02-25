"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { KeyboardEventHandler, useRef } from "react";
import { CenterToast } from "../_constants/swal";
import SHA512 from "../_functions/sha512";
import useInput from "../_hooks/useInput";

type AuthRespose = ResposeData<"AUTHENTICATED" | "NO_RIGHT" | "INVALID_ID_PASSWORD">;

export default function SigninForm() {
  const router = useRouter();

  const [id, idChangeHandler] = useInput();
  const [password, passwordChangeHandler] = useInput();
  const form1 = useRef<HTMLFormElement>(null);

  const enterKeyPressed: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      signInButtonClicked();
    }
  };
  const signInButtonClicked = async () => {
    console.log("Trying To Signin...");
    if (id.length === 0) {
      CenterToast({ type: "warning", title: "사번을 입력하세요." });
      return;
    }
    if (password.length === 0) {
      CenterToast({ type: "warning", title: "비밀번호를 입력하세요." });
      return;
    }
    try {
      const newPassword = SHA512(password);
      const data = { id, password: newPassword };
      const result = await axios.post<AuthRespose>("/auth", data);

      // 요청 실패
      if (result.data.status === "FAIL") {
        CenterToast({ type: "warning", title: "에러가 발생했습니다." });
      }
      // 아이디/비밀번호 불일치
      else if (result.data.value === "INVALID_ID_PASSWORD") {
        CenterToast({ type: "warning", title: "아이디 또는 비밀번호가 유효하지 않습니다." });
      }
      // 권한 없음
      else if (result.data.value === "NO_RIGHT") {
        CenterToast({ type: "warning", title: "교직원만 사용할 수 있습니다." });
      }
      // 로그인 성공
      else if (result.data.value === "AUTHENTICATED") {
        router.push("/main");
      }
    } catch (err) {
      console.error(err);
    }
  };
  const openWin = (s: "p" | "g", form: HTMLFormElement | null) => {
    console.log("Trying To Open New Window...");
    if (!form) {
      console.log("Error: form is not assigned.");
      return;
    }
    const isP = s === "p";
    const target = "chang";

    // window
    const width = "500";
    const height = isP ? "460" : "500";
    const features = `'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no,width=${width},height=${height}',top=0,left=0`;
    window.open("", target, features);

    // form
    const url = isP ? "https://webs.hufs.ac.kr/src08/jsp/login/FindPw.jsp" : "https://webs.hufs.ac.kr/src08/jsp/login/LOGIN1050R.jsp";
    form.method = "post";
    form.target = target;
    form.action = url;
    form.submit();
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
        onKeyDown={enterKeyPressed}
        placeholder="비밀번호"
        required
      />
      <button id="sign-in-button" className="btn btn-lg btn-block" onClick={signInButtonClicked}>
        LOGIN
      </button>
      <div className="mt-3 text-right">
        <button className="btn btn-sm hufs-popup-inverse-button" onClick={() => openWin("p", form1.current)}>
          비밀번호 찾기
        </button>
      </div>
      <form ref={form1} method="post" className="d-none" />
    </div>
  );
}
