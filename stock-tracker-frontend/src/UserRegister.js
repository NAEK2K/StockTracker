import React, { useState } from "react";

function UserRegister(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function login() {
    const loginUrl = "http://localhost:8080/login";
    const reqOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password }),
    };
    const response = await fetch(loginUrl, reqOptions);
    const data = await response.json();
    if (data.auth) {
      props.setAuth(data.auth);
    } else {
      return;
    }
  }
  async function register() {
    const registerUrl = "http://localhost:8080/register";
    const reqOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password }),
    };
    const response = await fetch(registerUrl, reqOptions);
    if (response.status === 401) {
      alert(`Account ${username} already registered.`);
    } else if (response.status === 200) {
      alert(`Account ${username} successfully registered.`);
    }
  }
  return (
    <div>
      <p>
        Username:{" "}
        <input onChange={(e) => setUsername(e.target.value)} value={username} />
      </p>
      <p>
        Password:{" "}
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </p>
      <p>
        <button onClick={login}>Login</button>
      </p>
      <p>
        <button onClick={register}>Register</button>
      </p>
    </div>
  );
}

export default UserRegister;
