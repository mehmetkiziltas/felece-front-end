const initialState = {
    fromDirection: '',
    toDirection: '',
    busDepartureTime: '',
    seatNumber: '',
    seatPrice: ''
}

const seatReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SEAT_TO_STORE':
            return {
                ...state,
                fromDirection: action.payload.fromDirection,
                toDirection: action.payload.toDirection,
                busDepartureTime: action.payload.busDepartureTime,
                seatPrice: action.payload.seatPrice,
                seatNumber: action.payload.seatNumber,
            }
        default:
            return state;
    }
}

export default seatReducer;