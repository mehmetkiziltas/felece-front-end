import * as ACTIONS from './Constants'
import { login, logout, singup } from '../api/apiCalls';

export const logoutSuccess = () => {
    return async function(dispacth){
        try {
            await logout();
        } catch (err) {
            
        }
        dispacth({
            type: ACTIONS.LOGOUT_SUCCESS
        })
    }
}

export const updateSuccess = ({ tickets }) => {
    return {
        type: ACTIONS.UPDATE_SUCCESS,
        payload: {
            tickets
        }
    }
}

export const loginSuccess = (authState) => {
    return {
        type: ACTIONS.LOGIN_SUCCESS,
        payload: authState
    }
}

export const loginHandler = (credentials) => {
    return async (dispatch) => {
        const response = await login(credentials);
        const authState = {
            ...response.data.user,
            password: credentials.password,
            token: response.data.token,
            role: response.data.role
        }
        dispatch(loginSuccess(authState));
        return response;
    }
}

export const signupHandler = (user) => {
    return async (dispatch) => {
        const response = await singup(user);
        await dispatch(loginHandler(user))
        return response;
    }
}