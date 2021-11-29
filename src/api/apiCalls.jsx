import axios from "axios"

export const singup = body => {
    return axios.post('/api/1.0/users/sign-up', body);
}

export const login = creds => {
    return axios.post('/api/1.0/auth', creds);
};

export const logout = () => {
    return axios.post('/api/1.0/logout');
};

export const setAuthorizationHeader = ({ isLoggedIn, token }) => {
    if (isLoggedIn) {
        const authorizationHeaderValue = `Bearer ${token}`
        axios.defaults.headers['Authorization'] = authorizationHeaderValue;
    } else {
        delete axios.defaults.headers['Authorization'];
    }
}

export const getAllCity = () => {
    return axios.get('/api/1.0/cities');
};

export const getBus = (body) => {
    return axios.post('/api/1.0/buses/getbus', body);
};

export const createBus = (body) => {
    return axios.post('/api/1.0/buses/create', body);
};

export const getAllBus = () => {
    return axios.get('/api/1.0/buses/getAll');
};

export const getTicketsByBusId = (id) => {
    return axios.post(`/api/v1/tickets/${id}`);
};