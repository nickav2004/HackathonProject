import React from "react";
import techtotsImage from "../images/techtots.jpg";

function Header() {
  return (
    <header style={{ textAlign: "center" }}>
      <img
        src={techtotsImage}
        alt="Techtots Logo"
        style={{ width: "300px", height: "auto", borderRadius: "45px" }}
      />
      <h2 style={{ fontSize: "4em" }}>Our Mission:</h2>
      <p
        style={{
          fontSize: "3em",
          width: "700px",
          textAlign: "center",
          margin: "0 auto",
        }}
      >
        "Empowering young minds to explore, create, and innovate through
        accessible, hands-on STEM projects. Our mission is to ignite a lifelong
        passion for learning, problem-solving, and critical thinking in
        children, equipping them with the skills and confidence they need to
        shape a brighter future."
      </p>
    </header>
  );
}

export default Header;
