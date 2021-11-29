import React, { useState } from 'react'
import { FormControl, InputGroup } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import dateFormat from "dateformat";
import { useHistory } from 'react-router-dom';
import { getAllCity, createBus } from '../../api/apiCalls'
import './rotation.css'
import "react-datepicker/dist/react-datepicker.css";

const Rotation = () => {
    const [newDate, setNewDate] = useState(new Date());
    const [city, setCity] = useState([]);
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [catacity, setCatacity] = useState('');
    const [price, setPrice] = useState('');

    const history = useHistory();

    const handleChange = (date) => {
        const selectDate = new Date(date);
        setNewDate(dateFormat(selectDate, "dd-mm-yyyy"));
    };

    const onSubmit = async () => {
        const data = {
            fromDirection: from,
            toDirection: to,
            busDepartureTime: newDate,
            capacity: catacity,
            seatPrice: price
        }
        await createBus(data)
            .then(res => {
                history.push('/admin')
            })
            .catch(err => {
                console.log(err.response.data)
            })
    };

    const getCities = async () => {
        await getAllCity().then(res => {
            setCity(res.data);
        }).catch(err => {
            console.log(err);
        });
    };

    return (
        <div className='container'>
            <div className="row">
                <div className="form-group">
                    <label style={styles.lbl}>Nereden</label>
                    <select className='form-select'
                        placeholder='Nereden'
                        onClick={() => getCities()}
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                    >
                        {city.map(item => {
                            return <option key={item.id} value={item.name}>{item.name}</option>
                        })}
                    </select>
                </div>
                <div className="form-group">
                    <label style={styles.lbl}>Nereye</label>
                    <select className='form-select'
                        placeholder='Nereye'
                        onClick={() => getCities()}
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                    >
                        {city.map(item => {
                            return <option key={item.id} value={item.name}>{item.name}</option>
                        })}
                    </select>
                </div>
                <div className="form-group">
                    <label style={styles.lbl}>Capacity</label>
                    <input class="form-control"
                        type="text"
                        placeholder='Capacity'
                        value={catacity}
                        onChange={(e) => setCatacity(e.target.value)}
                    >
                    </input>
                </div>
                <>
                    <label style={styles.lbl}>Price</label>
                    <InputGroup>
                        <FormControl aria-label="Dollar amount (with dot and two decimal places)"
                            onChange={(e) => setPrice(e.target.value)} value={price} />
                        <InputGroup.Text>$</InputGroup.Text>
                        <InputGroup.Text>0.00</InputGroup.Text>
                    </InputGroup>
                </>
                <div className="form-group">
                    <label style={styles.lbl}>Tarih</label>
                    <DatePicker
                        onChange={handleChange}
                        value={newDate}
                    />
                </div>
                <button
                    className='btn btn-primary'
                    style={styles.btn}
                    onClick={onSubmit}>
                    Git
                </button>

            </div>
        </div>
    )
}

export default Rotation

const styles = {
    lbl: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem'
    },
    btn: {
        marginTop: '1rem'
    }
}
