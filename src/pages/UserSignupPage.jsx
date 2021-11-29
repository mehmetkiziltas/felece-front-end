import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import ButtonWithProgress from '../components/ButtonWithProgress';
import Input from '../components/Input';
import { signupHandler } from '../redux/authActions';
import { useApiProgress } from '../shared/ApiProgress';

const UserSignupPage = (props) => {

    const [form, setForm] = useState({
        username: null,
        email: null,
        password: null,
        passwordRepeat: null
    })
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch()

    const onChange = event => {
        const { name, value } = event.target;

        setErrors((previousErrors) => ({ ...previousErrors, [name]: undefined }))
        setForm((previousForm) => ({ ...previousForm, [name]: value }));
    }

    const onClickSignup = async event => {
        event.preventDefault();
        const { push } = props.history;


        const { username, email, password } = form;
        const body = {
            username,
            email,
            password
        }
        try {
            await dispatch(signupHandler(body));
            push('/')
        } catch (error) {
            if (error.response.data.validationErrors) {
                setErrors(error.response.data.validationErrors)
            }
        }
    }

    const { username: usernameError, email: emailError, password: passwordError } = errors;
    const pendingApiCallSignup = useApiProgress('post', '/api/1.0/users');
    const pendingApiCallLogin = useApiProgress('post', '/api/1.0/auth');
    const pendingApiCall = pendingApiCallSignup || pendingApiCallLogin;

    let passwordRepeatError;
    if (form.password !== form.passwordRepeat) {
        passwordRepeatError = "Password mismatch";
    }

    return (

        <div className="container">
            <form>
                <h1 className="text-center">Sign Up</h1>
                <Input name="username" label="Username" error={usernameError} onChange={onChange}></Input>

                <Input name="email" label="Email" error={emailError} onChange={onChange}></Input>

                <Input name="password" label="Password" error={passwordError} onChange={onChange} type="password"></Input>

                <Input name="passwordRepeat" label="Password Repeat" error={passwordRepeatError} onChange={onChange} type="password" />

                <div className="text-center"><br />
                    <ButtonWithProgress
                        onClick={onClickSignup}
                        disabled={pendingApiCall || passwordRepeatError !== undefined}
                        pendingApiCall={pendingApiCall}
                        text="Sign Up" />
                </div>
            </form>
        </div>
    );
}

export default UserSignupPage
