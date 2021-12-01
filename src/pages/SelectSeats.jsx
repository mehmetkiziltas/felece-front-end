import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getBus, getTicketsByBusId, buyTicket } from '../api/apiCalls';
import '../pages/admin/adminHome.css';

const SelectSeats = (props) => {

    const [bus, setBus] = useState();
    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [user, setUser] = useState();

    const { fromDirection, toDirection, busDepartureTime, userEmail } = props;

    const getBusData = async () => {
        const body = {
            departureTime: busDepartureTime,
            fromDirection,
            toDirection
        }
        const response = await getBus(body);
        setBus(...response.data);
    }

    const getSeats = async () => {
        const response = await getTicketsByBusId(bus.id);
        setSeats(response.data);
    }

    useEffect(() => {
        if (bus !== undefined) {
            getSeats();
        }
    }, [bus])

    useEffect(() => {
        getBusData();
    }, []);

    const confirmSelection = () => {
        props.history.push('/userpage');
    }

    const selectedSeat = (e) => {
        seats.map(seat => {
            console.log(e.target.value);
            if (seat.ticketNumber == e.target.value) {
                const body = {
                    userEmail,
                    seatId: seat.id,
                    busId: bus.id
                }
                buyTicket(body).then(response => {
                    setTickets(response.data);
                    alert(`${seat.ticketNumber} for ${response.data} has been bought`);
                }).catch(err => {
                    console.log(err.message);
                })
            }
        })
    }

    useEffect(() => {
        console.log(userEmail);
    }, [])

    return (
        <>
            {bus !== undefined &&
                <div className='adminHome' >
                    <form className='form'>
                        <center>
                            <p className='text-center' style={{ fontSize: '30' }}>{props.busDepartureTime} {props.fromDirection} {props.toDirection}</p>
                            <p id="notification"></p>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <td colSpan="14">
                                            <div className="screen" style={{
                                                width: '100%',
                                                height: '50px',
                                                background: '#ff4b2b',
                                                color: '#fff',
                                                lineHeight: '20px',
                                                fontSize: '15px'
                                            }}>Front Of
                                            </div>
                                            <br />
                                        </td>
                                        <td rowSpan="20">
                                            <div className="smallBox greenBox" style={{ width: 'max-content' }}> Selected Seat</div> <br />
                                            <div className="smallBox redBox" style={{ width: 'max-content' }}> Reserved Seat</div><br />
                                            <div className="smallBox emptyBox" style={{ width: 'max-content' }}> Empty Seat</div><br />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>A</td>
                                        <td></td>
                                        <td>B</td>
                                        <td>C</td>
                                    </tr>
                                </thead >
                                <tbody onClick={(e) => selectedSeat(e)} >
                                    <tr>
                                        <td>1</td>
                                        <td><input type="checkbox" className="seats" value={1} id={bus.id} /></td>
                                        <td className="seatGap"></td>
                                        <td><input type="checkbox" className="seats" value={2} id={bus.id} /></td>
                                        <td><input type="checkbox" className="seats" value={3} id={bus.id} /></td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td><input type="checkbox" className="seats" value={4} id={bus.id} /></td>
                                        <td className="seatGap"></td>
                                        <td><input type="checkbox" className="seats" value={5} id={bus.id} /></td>
                                        <td><input type="checkbox" className="seats" value={6} id={bus.id} /></td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td><input type="checkbox" className="seats" value={7} id={bus.id} /></td>
                                        <td className="seatGap"></td>
                                        <td><input type="checkbox" className="seats" value={8} id={bus.id} /></td>
                                        <td><input type="checkbox" className="seats" value={9} id={bus.id} /></td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td><input type="checkbox" className="seats" value={10} id={bus.id} /></td>
                                        <td className="seatGap"></td>
                                        <td><input type="checkbox" className="seats" value={11} id={bus.id} /></td>
                                        <td><input type="checkbox" className="seats" value={12} id={bus.id} /></td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td><input type="checkbox" className="seats" value={13} id={bus.id} /></td>
                                        <td className="seatGap"></td>
                                        <td><input type="checkbox" className="seats" value={14} id={bus.id} /></td>
                                        <td><input type="checkbox" className="seats" value={15} id={bus.id} /></td>
                                    </tr>
                                    <tr>
                                        <td>6</td>
                                        <td><input type="checkbox" className="seats" value={16} id={bus.id} /></td>
                                        <td className="seatGap"></td>
                                    </tr>
                                    <tr>
                                        <td>7</td>
                                        <td><input type="checkbox" className="seats" value={17} id={bus.id} /></td>
                                        <td className="seatGap"></td>
                                        <td><input type="checkbox" className="seats" value={18} id={bus.id} /></td>
                                        <td><input type="checkbox" className="seats" value={19} id={bus.id} /></td>
                                    </tr>
                                    <tr>
                                        <td>8</td>
                                        <td><input type="checkbox" className="seats" value={20} id={bus.id} /></td>
                                        <td className="seatGap"></td>
                                        <td><input type="checkbox" className="seats" value={21} id={bus.id} /></td>
                                        <td><input type="checkbox" className="seats" value={22} id={bus.id} /></td>
                                    </tr>
                                    <tr>
                                        <td>9</td>
                                        <td><input type="checkbox" className="seats" value={23} id={bus.id} /></td>
                                        <td className="seatGap"></td>
                                        <td><input type="checkbox" className="seats" value={24} id={bus.id} /></td>
                                        <td><input type="checkbox" className="seats" value={25} id={bus.id} /></td>
                                    </tr>
                                    <tr>
                                        <td>10</td>
                                        <td><input type="checkbox" className="seats" value={26} id={bus.id} /></td>
                                        <td className="seatGap"></td>
                                        <td><input type="checkbox" className="seats" value={27} id={bus.id} /></td>
                                        <td><input type="checkbox" className="seats" value={28} id={bus.id} /></td>
                                    </tr>
                                    <tr>
                                        <td>11</td>
                                        <td><input type="checkbox" className="seats" value={29} id={bus.id} /></td>
                                        <td className="seatGap"></td>
                                        <td><input type="checkbox" className="seats" value={30} id={bus.id} /></td>
                                        <td><input type="checkbox" className="seats" value={31} id={bus.id} /></td>
                                    </tr>
                                    <tr>
                                        <td>12</td>
                                        <td><input type="checkbox" className="seats" value={32} id={bus.id} /></td>
                                        <td><input type="checkbox" className="seats" value={33} id={bus.id} /></td>
                                        <td><input type="checkbox" className="seats" value={34} id={bus.id} /></td>
                                        <td><input type="checkbox" className="seats" value={35} id={bus.id} /></td>
                                    </tr>
                                </tbody>
                            </table>
                            <button className='btn btn-primary' onClick={confirmSelection}>Confirm </button>
                        </center>
                    </form>
                </div>
            }
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        fromDirection: state.busAndSeat.bus.fromDirection,
        toDirection: state.busAndSeat.bus.toDirection,
        busDepartureTime: state.busAndSeat.bus.busDepartureTime,
        userEmail: state.auth.email,
    }
}


export default connect(mapStateToProps)(SelectSeats);
