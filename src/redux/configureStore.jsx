
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import authReducer from './authReducer';
import SecureLS from 'secure-ls';
import thunk from 'redux-thunk';
import { setAuthorizationHeader } from '../api/apiCalls';
import busReducer from './busRedux/busReducer';
import seatReducer from './seatRedux/seatReducer';

const secureLS = new SecureLS();

const getStateFromStorage = () => {
    const ticketAuth = secureLS.get('ticket-auth');
    let stateInLS = {
        isLoggedIn: false,
        email: undefined,
        password: undefined,
        role: undefined
    }

    if (ticketAuth) {
        return ticketAuth;
    }
    return (stateInLS);
}

const updateStateInStorage = (newState) => {
    secureLS.set('ticket-auth', newState);
}

const configureStore = () => {
    const initialState = getStateFromStorage();
    setAuthorizationHeader(initialState);
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const busAndSeatReducer = combineReducers({
        bus: busReducer,
        seat: seatReducer
    });
    const rootReducer = combineReducers({
        auth: authReducer,
        busAndSeat: busAndSeatReducer
    });
    const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(thunk)));

    store.subscribe(() => {
        updateStateInStorage(store.getState());
        setAuthorizationHeader(store.getState());
    })

    return store;
}

export default configureStore;