"use client";

import Image from "next/image";

export default function Header() {
  const leftMenuIClicked = () => {};
  const homeButtonClicked = () => {};
  const signOutButtonClicked = () => {};

  return (
    <div id="main-header-div" className="row">
      <div className="text-left">
        <Image src="/img/symbol_navy-mark-text.png" alt="symbol_navy-mark-text" width={139} height={50} />
        <i id="left-menu-i" className="fas fa-bars finger-cursor" onClick={leftMenuIClicked}></i>
      </div>
      <div className="col text-right">
        <i id="home-i" className="fas fa-home align-middle finger-cursor" style={{ display: "none" }} onClick={homeButtonClicked}></i>
        <span
          id="home-span"
          className="hufs-font-m align-middle finger-cursor"
          style={{ display: "none", paddingRight: 5 }}
          onClick={homeButtonClicked}
        >
          {" "}
          Home
        </span>
        <i id="sign-out-i" className="fas fa-sign-out-alt align-middle finger-cursor" onClick={signOutButtonClicked}></i>
        <span className="hufs-font-m align-middle finger-cursor" onClick={signOutButtonClicked}>
          {" "}
          Sign Out
        </span>
      </div>
    </div>
  );
}
