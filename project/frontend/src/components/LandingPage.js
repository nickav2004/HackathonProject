import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

function LandingPage() {
  return (
    <div>
      <Header />

      <div className="container">
        <div className="row mt-3 justify-content-center">
          <div className="col-auto">
            <Link to="/login" className="btn btn-dark">
              Login
            </Link>
          </div>
          <div className="col-auto">
            <Link to="/create-account" className="btn btn-dark">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
