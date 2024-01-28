import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: username, password: password }),
    };

    fetch("http://127.0.0.1:8000/api/login", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Login failed");
        }
        return response.json();
      })
      .then((data) => {
        // Handle login success
        console.log("Login successful", data);
        navigate("/main-page");
      })
      .catch((error) => {
        // Handle login errors (like incorrect credentials)
        console.error("There was an error!", error);
      });
  };

  return (
    <div>
      <section className="login-form">
        <h2>Login</h2>

        <div style={{ marginBottom: "8px" }}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Email"
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <br />
        <button className="btn btn-dark" onClick={handleLogin}>
          Log In
        </button>
      </section>
    </div>
  );
};

function Login() {
  return (
    <div className="App">
      <Header />
      <LoginForm />
    </div>
  );
}

// CSS Styles
const styles = `
  body {
    margin: 0;
    font-family: '', sans-serif;
  }
  
  header {
	background: linear-gradient(to bottom, rgba(300, 300, 300, 0), white);
    background-color: purple;
    color: black;
    text-align: center;
    padding: 1rem;
	font-size: 0.5rem;
  }
  
  .login-form,
  .dashboard {
    max-width: 400px;
    margin: auto;
    padding: 2rem;
    border: 2px solid purple;
    border-radius: 5px;
  }
  
  .btn-purple {
    background-color: purple;
    color: magenta;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: grab;
    margin-top: 1rem;
	border-radius: 8px;
	display: grid;
	margin: 5 auto;
	justify-content: center; /* Center items horizontally */
	align-items: center; /* Center items vertically */
	height: 5vh; /* Optionally, set a height to center vertically within the viewport */
  }
  
  footer {
    background-color: #333;
    color: white;
    text-align: center;
    padding: 1rem;
    position: fixed;
    bottom: 0;
    width: 100%;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default Login;
