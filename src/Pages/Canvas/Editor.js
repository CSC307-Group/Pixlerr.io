import React, { useState } from "react";
import { ChromePicker } from "react-color"; // https://casesandberg.github.io/react-color/#api
import Cursor from "./Cursor";
import DrawingPanel from "./DrawingPanel";
import "./editor.scss";

export default function Editor(props) {
  const [selectedColor, setColor] = useState("#420f69");
  const [mouseColor, setMouseColor] = useState("transparent");

  function changeColor(color) {
    setColor(color.hex);
  }

  function showReset() {
    if (props.userType === "admin")
      return <button onClick={props.resetCanvas}>Reset</button>;
    return null;
  }

  return (
    <div id="editor">
      {<Cursor mouseColor={mouseColor} />}
      <h1>Pixlerr</h1>
      <table>
        <tbody>
          <tr>
            <td>
              {
                <DrawingPanel
                  selectedColor={selectedColor}
                  pixelList={props.pixelList}
                  updatePixel={props.updatePixel}
                  setMouseColor={setMouseColor}
                  pixelFilterFunction={(pixel) => { return true;}}
                  blankColor={(pixel) => { return pixel; }}
                />
              }
            </td>
            <td>
              {
                <ChromePicker
                  disableAlpha={true}
                  color={selectedColor}
                  onChangeComplete={changeColor}
                />
              }
            </td>
          </tr>
        </tbody>
      </table>
      {showReset()}
    </div>
  );
}
