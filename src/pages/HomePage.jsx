import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { getAllCity } from '../api/apiCalls';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import dateFormat from "dateformat";
import "react-datepicker/dist/react-datepicker.css";

const HomePage = (props) => {
    const [newDate, setNewDate] = useState('');
    const [city, setCity] = useState([]);
    const [from, setFrom] = useState('');
    const [to, setToo] = useState('');

    const history = useHistory();

    
    const handleChange = (date) => {
        const selectDate = new Date(date);
        setNewDate(dateFormat(selectDate, "dd-mm-yyyy"));
    };

    const onSubmit = async () => {
        const body = {
            busDepartureTime: newDate,
            fromDirection: from,
            toDirection: to
        }
        props.busToStore(body);
        history.push('/select-seats');
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
                        onChange={(e) => setToo(e.target.value)}
                    >
                        {city.map(item => {
                            return <option key={item.id} value={item.name}>{item.name}</option>
                        })}
                    </select>
                </div>
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

const mapStateToProps = (state) => {
    return {
        from: state.bus.fromDirection,
        to: state.bus.toDirection,
        departureTime: state.bus.busDepartureTime,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        busToStore: (body) => dispatch({ type: 'BUS_TO_STORE', payload: body })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);


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
