import emailIcon from '@assets/email.png';
import passwordIcon from '@assets/password.png';
import PropTypes from 'prop-types';
import React from 'react';


const Login = ({ onToggle }) => {
    return (
        <>
            <div className="inputs">
                <div className="input">
                    <label>Email</label>
                    <div className="input-field">
                        <img src={emailIcon} alt="Email Icon" />
                        <input type="email" placeholder="" />
                    </div>
                </div>
                <div className="input">
                    <label>Password</label>
                    <div className="input-field">
                        <img src={passwordIcon} alt="Password Icon" />
                        <input type="password" placeholder="" />
                    </div>
                </div>
            </div>
            <div className="forgot-password-container">
                <div className="forgot-password" onClick={() => {/* Handle forgot password logic */}}>
                    Forgot Password?
                </div>
            </div>
            <div className="submit-container">
                <div className="submit" onClick={() => {/* Handle login logic here */}}>
                    Login
                </div>
                <div className="toggle-text">
                <span className="text">Don&apos;t have an account? </span>
                <span className="link" onClick={onToggle}>Sign Up here</span>
                </div>
            </div>
        </>
    );
};

// Define the prop types
Login.propTypes = {
    onToggle: PropTypes.func.isRequired,  // Validate that onToggle is a function and required
};

export default Login;
