import React, { useState } from "react";

function CreateAccount() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordVerify: "",
    age: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.passwordVerify) {
      alert("Passwords do not match.");
      return;
    }

    // Prepare data to be sent
    let dataToSend = { ...formData };
    delete dataToSend.passwordVerify; // Removing the password verification field

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    };

    fetch("http://127.0.0.1:8000/api/user", requestOptions)
      .then((response) => {
        if (!response.ok) {
          // If response is not OK, handle errors
          console.log(response.json);
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((newUser) => {
        // Handle the response data for the newly created user
        console.log("New User Added:", newUser);

        // Optional: Clear the form or update state as necessary
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          passwordVerify: "",
          age: "",
        });
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  return (
    <div>
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label for="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Verify Password:</label>
          <input
            type="password"
            name="passwordVerify"
            value={formData.passwordVerify}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}

export default CreateAccount;
