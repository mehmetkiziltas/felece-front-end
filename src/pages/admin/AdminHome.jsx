import React, { useEffect, useState } from 'react'
import { getAllBus, getTicketsByBusId } from "../../api/apiCalls";
import './adminHome.css'

const AdminHome = () => {


    const [bus, setBus] = useState([]);
    const [seats, setSeats] = useState([])
    const [busId, setBusId] = useState([])

    const getBuses = () => {
        getAllBus().then(res => {
            setBus(res.data);
            setBusId(res.data.map(bus => bus.id))
            console.log(busId)
        })
    };
    const getSeats = async () => {
        busId.map(id => {
            return (getTicketsByBusId(id).then(res => {
                setSeats(res.data)

            }))
        })
    }
    useEffect(() => {
        if (bus !== undefined) {
            getSeats();
        }
    }, [bus]);

    useEffect(() => {
        getBuses();
    }, []);

    return (
        <>
            {bus.map((bus) => {
                return (
                    <div key={bus.id} className='adminHome' >
                        <form className='form'>
                            <center>
                                <p id="notification"></p>
                                <table className='table'>

                                    <thead>
                                        <tr>
                                            <td colSpan="14">
                                                <div className="screen" style={{
                                                    width: '100%',
                                                    height: '40px',
                                                    background: '#ff4b2b',
                                                    color: '#fff',
                                                    lineHeight: '20px',
                                                    fontSize: '15px'
                                                }}>Front Of
                                                </div>
                                            </td>
                                            <td rowSpan="20">
                                                <div className="smallBox greenBox" style={{ width: 'max-content' }}> Selected Seat</div> <br />
                                                <div className="smallBox redBox" style={{ width: 'max-content' }}> Reserved Seat</div><br />
                                                <div className="smallBox emptyBox" style={{ width: 'max-content' }}> Empty Seat</div><br />
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td></td>
                                            <td>A</td>
                                            <td></td>
                                            <td>B</td>
                                            <td>C</td>
                                        </tr>
                                        {seats.map((seat, index) => {
                                            let seatNumber = index + 1;
                                            if (seatNumber % 3 === 0) {
                                                let row = Math.floor(seatNumber / 3);
                                                return (
                                                    <tr key={seat.id}>
                                                        <td>{row}</td>
                                                        <td><input type="checkbox" className="seats" value={row} id={row} /></td>
                                                        <td className="seatGap"></td>
                                                        <td><input type="checkbox" className="seats" value={row} id={row} /></td>
                                                        <td><input type="checkbox" className="seats" value={row} id={row} /></td>
                                                    </tr>
                                                )
                                            } else {
                                                seatNumber++;
                                            }
                                        })}
                                    </tbody>
                                </table>
                            </center>
                        </form>
                    </div>
                )
            })
            }
        </>
    )
}

export default AdminHome
