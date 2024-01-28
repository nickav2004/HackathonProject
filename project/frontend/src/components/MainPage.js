import React from "react";
import MultiSelect from "./MultiSelect";
import Logo from "./Logo";

function HomePage() {
  return (
    <div className="contianer">
      <header style={{ fontSize: "3rem" }}>Select Your Materials:</header>
      <div className="row mt-3">
        <div className="col-3">
          <Logo></Logo>
        </div>
        <div className="col-9">
          <MultiSelect></MultiSelect>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
