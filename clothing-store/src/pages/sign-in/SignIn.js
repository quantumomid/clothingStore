import './SignIn.scss'
import Login from '../../components/login/Login'
import Register from '../../components/register/Register'

export default function SignIn(){
    return (
        <div className="sign-in">
            <Login />
            <Register />
        </div>
    )
}
