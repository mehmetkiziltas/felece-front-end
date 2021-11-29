import React, { useEffect, useState } from 'react'
import { getAllBus } from "../../api/apiCalls";
import './adminHome.css'

const AdminHome = () => {


    const [bus, setBus] = useState([]);

    const getBuses = () => {
        getAllBus().then(res => {
            setBus(res.data);
        })
    };

    useEffect(() => {
        getBuses();
    }, []);


    return (
        <>
            {bus.map((bus) => {
                return (
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
                                <tr>
                                    <td>A</td>
                                    <td><input type="checkbox" class="seats" value="A1" id="A1" /></td>
                                    <td class="seatGap"></td>
                                    <td><input type="checkbox" class="seats" value="A2" id="A2" /></td>
                                    <td><input type="checkbox" class="seats" value="A3" id="A3" /></td>
                                </tr>
                                <tr>
                                    <td>B</td>
                                    <td><input type="checkbox" class="seats" value="B1" /></td>
                                    <td class="seatGap"></td>
                                    <td><input type="checkbox" class="seats" value="B2" /></td>
                                    <td><input type="checkbox" class="seats" value="B3" /></td>
                                </tr>
                                <tr>
                                    <td>C</td>
                                    <td><input type="checkbox" class="seats" value="C1" /></td>
                                    <td class="seatGap"></td>
                                    <td><input type="checkbox" class="seats" value="C2" /></td>
                                    <td><input type="checkbox" class="seats" value="C3" /></td>
                                </tr>
                                <tr>
                                    <td>D</td>
                                    <td><input type="checkbox" class="seats" value="D1" /></td>
                                    <td class="seatGap"></td>
                                    <td><input type="checkbox" class="seats" value="D2" /></td>
                                    <td><input type="checkbox" class="seats" value="D3" /></td>
                                </tr>
                                <tr>
                                    <td>E</td>
                                    <td><input type="checkbox" class="seats" value="E1" /></td>
                                    <td class="seatGap"></td>
                                    <td><input type="checkbox" class="seats" value="E2" /></td>
                                    <td><input type="checkbox" class="seats" value="E3" /></td>
                                </tr>
                                <tr>
                                    <td>F</td>
                                    <td><input type="checkbox" class="seats" value="F1" /></td>
                                </tr>
                                <tr>
                                    <td>G</td>
                                    <td><input type="checkbox" class="seats" value="G1" /></td>
                                    <td class="seatGap"></td>
                                    <td><input type="checkbox" class="seats" value="G2" /></td>
                                    <td><input type="checkbox" class="seats" value="G3" /></td>
                                </tr>

                                <tr>
                                    <td>H</td>
                                    <td><input type="checkbox" class="seats" value="H1" /></td>
                                    <td class="seatGap"></td>
                                    <td><input type="checkbox" class="seats" value="H2" /></td>
                                    <td><input type="checkbox" class="seats" value="H3" /></td>
                                </tr>

                                <tr>
                                    <td>I</td>
                                    <td><input type="checkbox" class="seats" value="I1" /></td>
                                    <td class="seatGap"></td>
                                    <td><input type="checkbox" class="seats" value="I2" /></td>
                                    <td><input type="checkbox" class="seats" value="I3" /></td>
                                </tr>

                                <tr>
                                    <td>J</td>
                                    <td><input type="checkbox" class="seats" value="J1" /></td>
                                    <td class="seatGap"></td>
                                    <td><input type="checkbox" class="seats" value="J2" /></td>
                                    <td><input type="checkbox" class="seats" value="J3" /></td>
                                </tr>
                                <tr>
                                    <td>K</td>
                                    <td><input type="checkbox" class="seats" value="J1" /></td>
                                    <td class="seatGap"></td>
                                    <td><input type="checkbox" class="seats" value="J2" /></td>
                                    <td><input type="checkbox" class="seats" value="J3" /></td>
                                </tr>
                                <tr>
                                    <td>L</td>
                                    <td><input type="checkbox" class="seats" value="J1" /></td>
                                    <td class="seatGap"></td>
                                    <td><input type="checkbox" class="seats" value="J2" /></td>
                                    <td><input type="checkbox" class="seats" value="J3" /></td>
                                </tr>
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
