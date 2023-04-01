import React from "react";
import Sidebar from "./Sidebar";
import "./about.scss";

function About (props) {
  const { isLoggedIn } = props;

  return (
    <div>
      <Sidebar isLoggedIn={isLoggedIn} />
      <div className="header">About Us</div>
      <div className="content">
        <br></br>
        Pixlerr.io is a globally interactive art canvas that allows users to
        coordinate individual pixels to create an image.
        <br></br>
        <br></br>
        Built by Cameron McGiffert, Seena Abed, Jun Liang, and Reed Marohn.
      </div>
      <div className="footer"></div>
    </div>
  );
}

export default About;