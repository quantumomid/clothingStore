import Login from '../../components/login/Login'
import Register from '../../components/register/Register'
import { SignInAndRegisterContainer } from './signInStyles'

export default function SignIn(){
    return (
        <SignInAndRegisterContainer>
            <Login />
            <Register />
        </SignInAndRegisterContainer>
    )
}
