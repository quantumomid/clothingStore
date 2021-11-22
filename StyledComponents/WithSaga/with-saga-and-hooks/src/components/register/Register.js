import React from 'react';
import FormInput from '../form-input/FormInput';
import CustomButton from '../custom-button/CustomButton';
import { RegisterContainer, RegisterTitle } from './registerStyles';
import { connect } from 'react-redux'
import { registerStart } from '../../redux/user/userActions';

class Register extends React.Component{
    constructor(){
        super()
        this.state={
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }
    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({[name]: value})
    }
    handleSubmit = async (event) => {
        event.preventDefault()

        const {displayName, email, password, confirmPassword} = this.state;
        const { registerStart } = this.props;

        if(password !== confirmPassword){
            alert("Passwords dont match!")
            return
        }
        registerStart({ displayName, email, password });
        // No need to reset form state because user is signed in and taken to home page
    }
    render(){
        const {displayName, email, password, confirmPassword} = this.state
        return(
            <RegisterContainer>
                <RegisterTitle>I do not have an account</RegisterTitle>
                <span>Sign up with your email and password</span>
                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                    <FormInput  
                        type="text"
                        name="displayName"
                        value={displayName}
                        onChange={this.handleChange}
                        label="Display Name"
                        required
                    />
                    <FormInput  
                        type="email"
                        name="email"
                        value={email}
                        onChange={this.handleChange}
                        label="Email"
                        required
                    />
                    <FormInput  
                        type="password"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                        label="Password"
                        required
                    />
                    <FormInput  
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={this.handleChange}
                        label="Confirm Password"
                        required
                    />
                    <CustomButton type="submit">SIGN-UP</CustomButton>
                </form>
            </RegisterContainer>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    registerStart: (userRegisterDetails) => dispatch(registerStart(userRegisterDetails))
})

export default connect(null, mapDispatchToProps)(Register)