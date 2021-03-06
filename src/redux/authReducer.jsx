import * as ACTIONS from './Constants'

const defaultState = {
  isLoggedIn: false,
  email: undefined,
  password: undefined,
  role: undefined
}

const authReducer = (state = { ...defaultState }, action) => {
  if (action.type === ACTIONS.LOGOUT_SUCCESS) {
    return {
      defaultState,
      isLoggedIn: false,
    };
  } else if (action.type === ACTIONS.LOGIN_SUCCESS) {
    return {
      ...action.payload,
      isLoggedIn: true
    }
  } else if (action.type === ACTIONS.UPDATE_SUCCESS) {
    return {
      ...state,
      ...action.payload
    }
  }
  return state;
}

export default authReducer;