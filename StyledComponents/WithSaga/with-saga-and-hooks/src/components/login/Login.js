import React, { useState } from "react";
import { useDispatch } from "react-redux";
import FormInput from "../form-input/FormInput";
import CustomButton from "../custom-button/CustomButton";
import { ButtonsContainer, LoginContainer, LoginInTitle } from "./loginStyles";
import { emailSignInStart, googleSignInStart } from "../../redux/user/userActions";

const Login = () => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const dispatch = useDispatch();

    const handleChange = (event) => {
        const { name, value } = event.target
        if (name === "email") setEmail(value)
        if (name === "password") setPassword(value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        dispatch(emailSignInStart({ email, password }));
    }

    return(
        <LoginContainer>
            <LoginInTitle>I already have an account</LoginInTitle>
            <span>Log-in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput name="email" type="email" value={email} required handleChange={handleChange} label="email"/>
                <FormInput name="password" type="password" value={password} required handleChange={handleChange} label="password"/>

                <ButtonsContainer>
                    <CustomButton type="submit">Log In</CustomButton>
                    <CustomButton type="button" onClick={() => dispatch(googleSignInStart())} isGoogleSignIn>Log In with Google</CustomButton>
                </ButtonsContainer>
            </form>
        </LoginContainer>
    )
}

export default Login;