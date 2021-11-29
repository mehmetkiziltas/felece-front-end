import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import ButtonWithProgress from '../components/ButtonWithProgress';
import Input from '../components/Input';
import { loginHandler } from '../redux/authActions'
import { useApiProgress } from '../shared/ApiProgress';
// import {
//     AUTH_GET_PERMISSIONS,
//     AUTH_LOGIN,
//     AUTH_LOGOUT,
//     AUTH_ERROR,
//     AUTH_CHECK
// } from 'react-admin';



const LoginPage = (props) => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const dispatch = useDispatch()
    const [error, setError] = useState()

    const { push } = props.history;

    useEffect(() => {
        setError(undefined)
    }, [email, password])

    const onClickLogin = async event => {
        event.preventDefault();
        const creds = {
            email,
            password
        }
        setError(undefined);
        try {
            const response = await dispatch(loginHandler(creds));
            if(response.data.role === 'ADMIN'){
                push('/admin')
            }else{
                push('/')
            }
        } catch (apiError) {
            setError(apiError.response.data.message);
        }
    }

    const pendingApiCall = useApiProgress('post', '/api/1.0/auth')
    const buttonEnabled = email && password
    return (
        <div className='container'>
            <h1 className='text-center' >Login</h1>
            <form>
                <Input name="email" type="email" label="Email" onChange={(event) => setEmail(event.target.value)} />
                <Input label="Password" type="password" onChange={(event) => setPassword(event.target.value)}></Input>
                {error && <div className="alert alert-danger">
                    {error}
                </div>}
                <div className="text-center mt-2">
                    <ButtonWithProgress
                        onClick={onClickLogin}
                        disabled={!buttonEnabled || pendingApiCall}
                        pendingApiCall={pendingApiCall}
                        text='Login' />
                </div>
            </form>
        </div>
    )
}

export default LoginPage
