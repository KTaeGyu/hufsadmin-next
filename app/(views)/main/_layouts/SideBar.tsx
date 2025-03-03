import Body from "./info/Body";
import Header from "./info/Header";
import Menus from "./menus/Menus";

export default async function SideBar() {
  return (
    <div id="left-menu-div">
      <div id="admin-info-div">
        <Header />
        <Body />
      </div>
      <Menus />
    </div>
  );
}
