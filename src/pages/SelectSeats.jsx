import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getBus, getTicketsByBusId } from '../api/apiCalls';
import '../pages/admin/adminHome.css';

const SelectSeats = (props) => {

    const [bus, setBus] = useState();
    const [seats, setSeats] = useState([]);

    const { fromDirection, toDirection, busDepartureTime } = props;

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
        getBusData();

        if (bus.id !== undefined) {
            getSeats();
        }
    }, []);

    return (
        <>
            <div className='adminHome' >
                <form className='form'>
                    <center>
                        <p id="notification"></p>
                        <table className='table'>

                            <tr>
                                <td colspan="14">
                                    <div className="screen" style={{
                                        width: '100%',
                                        height: '40px',
                                        background: '#ff4b2b',
                                        color: '#fff',
                                        lineHeight: '20px',
                                        fontSize: '15px'
                                    }}>Front Of
                                    </div>
                                    <br />
                                </td>
                                <td rowspan="20">
                                    <div className="smallBox greenBox" style={{ width: 'max-content' }}> Selected Seat</div> <br />
                                    <div className="smallBox redBox" style={{ width: 'max-content' }}> Reserved Seat</div><br />
                                    <div className="smallBox emptyBox" style={{ width: 'max-content' }}> Empty Seat</div><br />
                                </td>

                                <br />
                            </tr>
                            <tr>
                                <td></td>
                                <td>1</td>
                                <td></td>
                                <td>2</td>
                                <td>3</td>
                            </tr>

                            {
                                seats.map((item, index) => {
                                    return (
                                        <tr>
                                            <td>{index}</td>
                                            <td><input type="checkbox" class="seats" value={index} id={index} /></td>
                                            <td class="seatGap"></td>
                                            <td><input type="checkbox" class="seats" value={index} id={index} /></td>
                                            <td><input type="checkbox" class="seats" value={index} id={index} /></td>
                                        </tr>
                                    )
                                })
                            }
                        </table>
                    </center>
                </form>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        fromDirection: state.bus.fromDirection,
        toDirection: state.bus.toDirection,
        busDepartureTime: state.bus.busDepartureTime
    }
}


export default connect(mapStateToProps)(SelectSeats);
