import React, { useState, useEffect } from "react";
import Editor from "./Editor";
import Sidebar from "../Sidebar";
import { io } from "socket.io-client";
import "./home.scss";

const socket = io(process.env.REACT_APP_BACKEND_URL, { forceNew: true, secure: true });

export default function Home(props) {
  const { activeUser, setActiveUser, isLoggedIn } = props;
  const [pixels, setPixels] = useState([]);

  useEffect(() => {
    const cleanup = () => {
      setPixels([]);
      socket.off("updateCanvas");
      socket.close();
    }; 
    window.addEventListener('beforeunload', cleanup);

    socket.emit("connected", (newPixels) => {
      setPixels(newPixels);
    })
    return () => {
      window.removeEventListener('beforeunload', cleanup);
    }    
  }, []);

  socket.on("updateCanvas", (res) => {
    const pixelsCopy = [...pixels];
    pixelsCopy[res.index] = res.updatedPixel;
    setPixels(pixelsCopy);
  })

  async function updatePixel(pixel, newColor) {
    if (!isLoggedIn) return;
    socket.emit("pixelUpdate", pixel, newColor, activeUser, (newUserData) => { 
      setActiveUser(newUserData); 
    })
  }

  function resetCanvas() {
    socket.emit("resetCanvas", activeUser, (newCanvas) => {
      console.log("Canvas reset");
      setPixels(newCanvas);
    });
  }

  return (
    <div className="App">
      <Sidebar isLoggedIn={isLoggedIn} />
      <Editor
        pixelList={pixels}
        updatePixel={updatePixel}
        resetCanvas={resetCanvas}
        userType={activeUser["type"]}
      />
      <span>
        {isLoggedIn ? `Logged in as ${activeUser.username}` : "Log in to place pixels"}
      </span>
    </div>
  );
}
