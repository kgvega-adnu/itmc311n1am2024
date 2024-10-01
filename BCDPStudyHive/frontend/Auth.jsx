import robotIcon from '@assets/robot.png';
import React, { useState } from 'react';
import Login from './Login';
import Signup from './SignUp';

const Auth = () => {
    const [action, setAction] = useState("Sign Up");

    return (
        <div className='container'>
            <img src={robotIcon} alt="Robot Icon" />
            <div className="header">
                <div className="text">
                    {action === "Sign Up" ? "Create an Account" : "Welcome back"}
                </div>
                {action === "Sign Up" ? (
                    <Signup onToggle={() => setAction("Login")} />
                ) : (
                    <Login onToggle={() => setAction("Sign Up")} />
                )}
            </div>
        </div>
    );
};

export default Auth;
