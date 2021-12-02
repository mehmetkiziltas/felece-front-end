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

export const setAuthorizationHeader = (props) => {
    const { isLoggedIn, token } = props.auth;
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
    return axios.post(`/api/1.0/tickets/${id}`);
};

export const buyTicket = async (body) => {
    return await axios.post(`/api/1.0/tickets/buy`, body);
}

export const getTicketsByUserEmail = async (email) => {
    return await axios.post(`/api/1.0/tickets/useremail`, email);
}

export const cancelTicket = async (body) => {
    return await axios.post(`/api/1.0/tickets/cancel`, body);
};

export const delayTickets = async (body) => {
    return await axios.post(`/api/1.0/tickets/delay`, body);
};

export const getByUserIdAndFromDirections = async (body) => {
    return await axios.post(`/api/1.0/tickets/useridandfromdirections`, body);
}

export const updateBusById = async (id, body) => {
    return await axios.post(`/api/1.0/buses/update/${id}`, body);
}

export const deleteBusById = async (id) => {
    return await axios.delete(`/api/1.0/buses/delete/${id}`);
}