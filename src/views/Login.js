import React, { useState } from "react";
import { useCookies } from 'react-cookie';

const Login = ( {LogInSuccess} ) => {
  const [cookies, setCookie] = useCookies(['user']);
  const [username, setUsername] = useState(cookies.username);
  const [password, setPassword] = useState(cookies.password);


  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
  e.preventDefault();

  

  try {
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 'userName': username, 'password': password }),
    });

    // Handle the response
    // ...

    if (response.ok){
        const data = await response.json();

        if (data.status == "success"){
            LogInSuccess();
        }else if (data.status == "failure"){
            alert("Wrong password");
        }
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const loginCookies = () => {
  setCookie('username', username, { path: '/' });
  setCookie('password', password, { path: '/' });
};

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
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
          <button type="submit" onClick={loginCookies}>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;