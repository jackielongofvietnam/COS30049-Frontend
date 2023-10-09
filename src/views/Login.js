import React, { useState } from 'react';



function Login({ LogInSuccess }){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };
    
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    /// handle API 
    const handleLogIn = async (e) =>{
        LogInSuccess();
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogIn}>
                <label htmlFor="username">User Name:</label>
                <input type="text" name="username" value={username} onChange={handleUsernameChange} required />

                <label htmlFor="accountPassword">Password:</label>
                <input type="password" name="accountPassword" value={password} onChange={handlePasswordChange} required />

                <input type="submit" value="Login" />
            </form>
        </div>
    );
}


export default Login;