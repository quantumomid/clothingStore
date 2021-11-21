import React from 'react'
import FormInput from '../form-input/FormInput'
import CustomButton from '../custom-button/CustomButton'
import { auth, signInWithGoogle } from '../../firebase/firebase.utils'
import { ButtonsContainer, LoginContainer, LoginInTitle } from './loginStyles'

export default class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        
        const { email, password } = this.state

        try {
            await auth.signInWithEmailAndPassword(email, password)
            this.setState({email: '', password:''})

        } catch (error) {
            // console.log(error)
        }

    }

    render(){
        return(
            <LoginContainer>
                <LoginInTitle>I already have an account</LoginInTitle>
                <span>Log-in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput name="email" type="email" value={this.state.email} required handleChange={this.handleChange} label="email"/>
                    <FormInput name="password" type="password" value={this.state.password} required handleChange={this.handleChange} label="password"/>

                    <ButtonsContainer>
                        <CustomButton type="submit">Log In</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>Log In with Google</CustomButton>
                    </ButtonsContainer>
                </form>
            </LoginContainer>
        )
    }
}