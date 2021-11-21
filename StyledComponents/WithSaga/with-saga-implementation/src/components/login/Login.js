import React from 'react'
import FormInput from '../form-input/FormInput'
import CustomButton from '../custom-button/CustomButton'
import { ButtonsContainer, LoginContainer, LoginInTitle } from './loginStyles'
import { connect } from 'react-redux'
import { emailSignInStart, googleSignInStart } from '../../redux/user/userActions'

class Login extends React.Component{
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
        const { emailSignInStart } = this.props;
        const { email, password } = this.state;

        emailSignInStart(email, password);
    }

    render(){
        const { googleSignInStart } = this.props;
        return(
            <LoginContainer>
                <LoginInTitle>I already have an account</LoginInTitle>
                <span>Log-in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput name="email" type="email" value={this.state.email} required handleChange={this.handleChange} label="email"/>
                    <FormInput name="password" type="password" value={this.state.password} required handleChange={this.handleChange} label="password"/>

                    <ButtonsContainer>
                        <CustomButton type="submit">Log In</CustomButton>
                        <CustomButton type="button" onClick={googleSignInStart} isGoogleSignIn>Log In with Google</CustomButton>
                    </ButtonsContainer>
                </form>
            </LoginContainer>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
})

export default connect(null, mapDispatchToProps)(Login);