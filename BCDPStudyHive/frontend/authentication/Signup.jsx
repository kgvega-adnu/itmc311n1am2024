import emailIcon from '@assets/email.png';
import passwordIcon from '@assets/password.png';
import userIcon from '@assets/person.png';
import PropTypes from 'prop-types';
import React from 'react';

const Signup = ({ onToggle }) => {
    return (
        <>
            <div className="inputs">
                <div className="input">
                    <label>Username</label>
                    <div className="input-field">
                        <img src={userIcon} alt="User Icon" />
                        <input type="text" placeholder="" />
                    </div>
                </div>
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
            <div className="submit-container">
                <div className="submit" onClick={() => {/* Handle sign-up logic here */}}>
                    Sign Up
                </div>
                <div className="toggle-text">
                    <span className="text">Already have an account? </span>
                    <span className="link" onClick={onToggle}>Login here</span>
                </div>
            </div>
        </>
    );
};

// Define the prop types
Signup.propTypes = {
    onToggle: PropTypes.func.isRequired,  // Validate that onToggle is a function and required
};

export default Signup;
