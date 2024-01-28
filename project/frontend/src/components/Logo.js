import React from "react";
import techtotsImage from "../images/techtots.jpg";

function Logo() {
  return (
    <div>
      <img
        src={techtotsImage}
        alt="Techtots Logo"
        style={{ width: "300px", height: "auto", borderRadius: "45px" }}
      />
    </div>
  );
}

export default Logo;
