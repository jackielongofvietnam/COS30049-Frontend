import React, { useState } from "react";
import APIGateway from "../components/APIGateway";

const Login = ( {LogInSuccess} ) => {
  const [user_name, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
  e.preventDefault();

  const login_response = await APIGateway.Login(user_name, password);
  if (!login_response){
    alert("Wrong password");
  }
  else{
    LogInSuccess();
  }
};

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={user_name}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;