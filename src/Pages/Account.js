import { React, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import DrawingPanel from "./Canvas/DrawingPanel";
import "./account.scss";
import { io } from "socket.io-client";

const socket = io(process.env.REACT_APP_BACKEND_URL, { 
  forceNew: true, 
  secure: true,
  transports: ['websocket', 'polling', 'flashsocket']
});

function Account (props) {
  const { activeUser, isLoggedIn } = props;
  const [pixelList, setPixels] = useState([]);

  useEffect(() => {
    socket.emit("connected", (newPixels) => {
      setPixels(newPixels);
    })
  }, []);

  function postedByUser(pixel) {
    return (pixel['userId'] === activeUser['_id']);
  }
  
  function returnWhitePixel(pixel) {
    return "#fff";
  }

  return (
    <div>
      <Sidebar isLoggedIn={isLoggedIn} />
      <div className="base-container">
        <div className="header">{activeUser.username}'s Account</div>
        <div className="content">
          <div className="contributions">Your canvas contributions</div>
          <div className="accountInfo">Last pixel posted on {activeUser.pixelTime}</div>
        </div>
      </div>
      {(< DrawingPanel
        selectedColor={"transparent"}
        pixelList={pixelList}
        updatePixel={() => {}}  
        setMouseColor={() => {}}
        pixelFilterFunction={postedByUser}
        blankColor={returnWhitePixel}
      />)}
    </div>
  );
}

export default Account;
