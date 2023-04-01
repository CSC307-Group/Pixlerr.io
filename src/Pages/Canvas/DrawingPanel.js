import React, { useRef } from "react";
import Row from "./Rows";
import "./drawingPanel.scss";

export default function DrawingPanel(props) {
  const { selectedColor, pixelList, updatePixel, setMouseColor, pixelFilterFunction, blankColor } = props;
  const panelRef = useRef();

  function mouseIsOverCanvas() {
    setMouseColor(selectedColor);
  }

  function mouseIsNotOverCanvas() {
    setMouseColor("transparent");
  }

  let rows = [];
  for (let i = 0; i < pixelList.length; i++) {
    const y = pixelList.filter((data) => data["y"] === i);
    rows.push(
      <Row
        selectedColor={selectedColor}
        pixelRow={y}
        updatePixel={updatePixel}
        pixelFilterFunction={pixelFilterFunction}
        blankColor={blankColor}
        key={i}
      />
    );
  }

  return (
    <div
      id="drawingPanel"
      onMouseEnter={mouseIsOverCanvas}
      onMouseLeave={mouseIsNotOverCanvas}
    >
      <div id="pixels" ref={panelRef}>
        {rows}
      </div>
    </div>
  );
}
