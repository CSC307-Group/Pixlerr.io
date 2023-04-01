import { React } from "react";
import { fallDown as Menu } from "react-burger-menu";
import "./sidebar.scss";

export default function Sidebar(props) {
  const { isLoggedIn } = props;

  return (
    <Menu>
      <a className="menu-item" href="/">
        Home
      </a>
      <a className="menu-item" href="/About">
        About
      </a>
      {isLoggedIn ? (
        <a className="menu-item" href="/Account">
          Account
        </a>) : (
        <a className="menu-item" href="/Login">
          Login/Signup
        </a>
      )}
      {isLoggedIn ? (
        <a className="menu-item" href="/Logout">
          Logout
        </a>
      ) : null}
    </Menu>
  );
}
