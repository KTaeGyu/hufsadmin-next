import Image from "next/image";
import "./_assets/css/manager-index.css";

export default function Home() {
  const enterKeyPressed = () => {};
  const signInButtonClicked = () => {};
  const openWin = (s: "p") => {
    return s;
  };
  return (
    <>
      <div className="form-signin">
        <div className="text-left">
          <Image
            src="/img/symbol_navy-bold.gif"
            alt="symbol_navy-bold"
            width={38}
            height={undefined}
          />
          <h2 className="d-inline hufs-primary-fg hufs-font-b align-bottom">
            한국외대{" "}
          </h2>
          <h3 className="d-inline hufs-font-m align-bottom">관리자 시스템</h3>
        </div>
        <div className="login-form-div">
          <h2 className="mb-3 font-weight-normal primary-fg text-left">
            LOGIN
          </h2>
          <label htmlFor="inputEmail" className="sr-only">
            사 번
          </label>
          <input
            id="emp-no-input"
            className="form-control"
            placeholder="사 번"
            required
            autoFocus
          />
          <label htmlFor="inputPassword" className="sr-only">
            비밀번호
          </label>
          <input
            type="password"
            id="password-input"
            className="form-control"
            placeholder="비밀번호"
            onKeyDown={enterKeyPressed}
            required
          />
          <button
            id="sign-in-button"
            className="btn btn-lg btn-block"
            onClick={signInButtonClicked}
          >
            LOGIN
          </button>
          <div className="mt-3 text-right">
            <button
              className="btn btn-sm hufs-popup-inverse-button"
              onClick={() => openWin("p")}
            >
              비밀번호 찾기
            </button>
          </div>
          <form
            id="formLogin"
            name="formLogin"
            role="form"
            action="https://at.hufs.ac.kr/auth"
            method="post"
            className="login-form"
          >
            <input type="hidden" name="id" id="id" />
            <input type="hidden" name="password" id="password" />
          </form>
        </div>
      </div>
      <form name="form1" method="post" />
    </>
  );
}
