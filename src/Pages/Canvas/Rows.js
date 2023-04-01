import React from "react";
import Pixel from "./Pixel";
import "./row.scss";

export default function Row(props) {
  const { selectedColor, pixelRow, updatePixel, pixelFilterFunction, blankColor } = props;

  let pixels = pixelRow.map((entry, index) => {
    return (
      <Pixel
        selectedColor={selectedColor}
        pixel={entry}
        updatePixel={updatePixel}
        pixelFilterFunction={pixelFilterFunction}
        blankColor={blankColor}
        key={index}
      />
    );
  });

  return <div className="row">{pixels}</div>;
}
