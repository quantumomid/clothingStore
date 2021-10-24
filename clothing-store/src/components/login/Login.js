import React from 'react'
import './Login.scss'
import FormInput from '../form-input/FormInput'
import CustomButton from '../custom-button/CustomButton'

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

    handleSubmit = (event) => {
        event.preventDefault()

        this.setState({email: '', password:''})
    }

    render(){
        return(
            <div className="login">
                <h2>I already have an account</h2>
                <span>Log-in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput name="email" type="email" value={this.state.email} required handleChange={this.handleChange} label="email"/>
                    <FormInput name="password" type="password" value={this.state.password} required handleChange={this.handleChange} label="password"/>

                    <CustomButton type="submit">Log In</CustomButton>
                </form>
            </div>
        )
    }
}