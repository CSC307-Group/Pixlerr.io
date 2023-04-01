import { useState } from "react";
import "./cursor.scss";

export default function Cursor(props) {
  const { mouseColor } = props;

  const [cursorX, setCursorX] = useState();
  const [cursorY, setCursorY] = useState();
  window.addEventListener("mousemove", (e) => {
    setCursorX(e.pageX - 14);
    setCursorY(e.pageY - 14);
  });

  return (
    <div
      className="cursor"
      style={{
        left: cursorX + "px",
        top: cursorY + "px",
        backgroundColor: mouseColor,
      }}
    ></div>
  );
}
