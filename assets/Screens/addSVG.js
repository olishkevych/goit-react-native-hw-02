import React from "react";
import Svg, { Circle, Path } from "react-native-svg";

const AddSVG = () => {
  return (
    <Svg width="37" height="37" viewBox="0 0 37 37">
      <Circle cx="18.5" cy="18.5" r="12" fill="white" stroke="#FF6C00" />

      <Path
        fill="#FF6C00"
        fill-rule="evenodd"
        d="m14.257 13.55-.707.707 4.243 4.243-4.243 4.243.707.707 4.243-4.243 4.243 4.243.707-.707-4.243-4.243 4.243-4.243-.707-.707-4.243 4.243-4.243-4.243Z"
        clip-rule="evenodd"
        transform="rotate(-45 18.5 18.5)"
      />
    </Svg>
  );
};

export default AddSVG;
