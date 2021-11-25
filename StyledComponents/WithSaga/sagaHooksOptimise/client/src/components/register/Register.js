import React, { useState } from 'react';
import FormInput from '../form-input/FormInput';
import CustomButton from '../custom-button/CustomButton';
import { RegisterContainer, RegisterTitle } from './registerStyles';
import { useDispatch } from 'react-redux'
import { registerStart } from '../../redux/user/userActions';

const Register = () => {
    const [ userCredentials, setUserCredentials ] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const dispatch = useDispatch();

    const {displayName, email, password, confirmPassword} = userCredentials;

    const handleChange = (event) => {
        const {name, value} = event.target
        // remember the setter method replaces entire state so use spread operator to
        // keep the exisiting state that is not being changed
        setUserCredentials({    
            ...userCredentials,
            [name]: value   
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if(password !== confirmPassword){
            alert("Passwords dont match!")
            return
        }
        dispatch(registerStart({ displayName, email, password }));
        // No need to reset form state because user is signed in and taken to home page
    }

    return(
        <RegisterContainer>
            <RegisterTitle>I do not have an account</RegisterTitle>
            <span>Sign up with your email and password</span>
            <form className="sign-up-form" onSubmit={handleSubmit}>
                <FormInput  
                    type="text"
                    name="displayName"
                    value={displayName}
                    handleChange={handleChange}
                    label="Display Name"
                    required
                />
                <FormInput  
                    type="email"
                    name="email"
                    value={email}
                    handleChange={handleChange}
                    label="Email"
                    required
                />
                <FormInput  
                    type="password"
                    name="password"
                    value={password}
                    handleChange={handleChange}
                    label="Password"
                    required
                />
                <FormInput  
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    handleChange={handleChange}
                    label="Confirm Password"
                    required
                />
                <CustomButton type="submit">SIGN-UP</CustomButton>
            </form>
        </RegisterContainer>
    )
}

export default Register;