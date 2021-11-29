const initialState = {
    fromDirection: '',
    toDirection: '',
    busDepartureTime: '',
    capacity: '',
    seatPrice: ''
}

const busReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'BUS_TO_STORE':
            return {
                ...state,
                fromDirection: action.payload.fromDirection,
                toDirection: action.payload.toDirection,
                busDepartureTime: action.payload.busDepartureTime,
                capacity: action.payload.capacity,
                seatPrice: action.payload.seatPrice
            }
        default:
            return state;
    }
}

export default busReducer;