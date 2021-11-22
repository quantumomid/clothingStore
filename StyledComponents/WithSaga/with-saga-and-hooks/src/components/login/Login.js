import React, { useState } from 'react'
import FormInput from '../form-input/FormInput'
import CustomButton from '../custom-button/CustomButton'
import { ButtonsContainer, LoginContainer, LoginInTitle } from './loginStyles'
import { connect } from 'react-redux'
import { emailSignInStart, googleSignInStart } from '../../redux/user/userActions'

const Login = ({ emailSignInStart, googleSignInStart }) => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target
        if (name === "email") setEmail(value)
        if (name === "password") setPassword(value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        emailSignInStart(email, password);
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
                    <CustomButton type="button" onClick={googleSignInStart} isGoogleSignIn>Log In with Google</CustomButton>
                </ButtonsContainer>
            </form>
        </LoginContainer>
    )
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
})

export default connect(null, mapDispatchToProps)(Login);