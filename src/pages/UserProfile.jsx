import React, { useEffect, useState } from 'react'
import { Button, FormControl, InputGroup, Modal, Table } from 'react-bootstrap'
import { cancelTicket, getTicketsByUserEmail, delayTickets, getByUserIdAndFromDirections } from '../api/apiCalls'
import { connect } from 'react-redux'
import ReactDatePicker from 'react-datepicker';

const UserProfile = (props) => {

    const [newDate, setNewDate] = useState(new Date())
    const [tickets, setTickets] = useState([])
    const [pastTicket, setPastTicket] = useState([]);
    const [futureTicket, setFutureTicket] = useState([]);
    const [datePicker, setDatePicker] = useState(false);
    const [searchTicket, setSearchTicket] = useState([]);
    const [search, setSearch] = useState('');


    const { email } = props;
    const body = {
        email
    }

    const getTickets = () => {
        const response = getTicketsByUserEmail(body);
        response.then(res => {
            setTickets(res.data)
            console.log(res.data);
            tickets.map(ticket => {
                if (ticket.ticketDate < new Date().toString()) {
                    return setPastTicket(pastTicket.concat(ticket))
                } else {
                    return setFutureTicket(futureTicket.concat(ticket))
                }
            })
        }).catch(err => {
            console.log(err)
        })

    }

    useEffect(() => {
        getTickets()
    }, []);

    const ticketCanceled = (ticketId) => {
        const response = cancelTicket(ticketId.id);
        response.then(res => {
            setTickets(tickets.filter(ticket => ticket.id !== ticketId.id));
        }).catch(err => {
            console.log(err)
        })
    }

    const ticketDelay = (ticketId) => {
        const body = {
            ticketId: ticketId.id,
            date: newDate
        }
        const response = delayTickets(body);
        response.then(res => {
            setTickets(tickets.filter(ticket => ticket.id !== ticketId.id));
            setDatePicker(false);
            alert(`${res.data}`)
        }).catch(err => {
            console.log(err)
            setDatePicker(false);
        })
    }

    const handleChange = (date) => {
        setNewDate(new Date(date).toUTCString());
    };

    const searchTicketByFromDirection = (value) => {
        const body = {
            email: email,
            fromDirection: value
        }
        const response = getByUserIdAndFromDirections(body);
        response.then(res => {
            setSearchTicket(res.data);
        }).catch(err => {
            console.log(err)
        })
    }


    return (
        <div className='container'>
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Search"
                    aria-label="text"
                    onChange={(e) => setSearch(e.target.value)}
                    aria-describedby="basic-addon1"
                />
                <InputGroup.Text id="basic-addon1">
                    <span
                        onClick={() => searchTicketByFromDirection(search)}
                        className="material-icons-outlined"
                        style={{ cursor: 'pointer' }} >
                        Search
                    </span>
                </InputGroup.Text>
            </InputGroup>
            <p className='text-center'>Past Tickets</p>
            <Table striped bordered hover className='container'>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Where</th>
                        <th>To</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {pastTicket.map((ticket, index) => {
                        return (
                            <tr key={index}>
                                <td>{ticket.id}</td>
                                <td>{ticket.fromDirection}</td>
                                <td>{ticket.toDirection}</td>
                                <td>{ticket.ticketDate}</td>
                            </tr>
                        )
                    }
                    )}
                </tbody>
                { searchTicket.length === 0 ?
                    pastTicket.map((ticket) => {
                        return (
                            <div className='container'>
                                <Modal.Dialog key={ticket.id}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Future Tickets</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <p>{ticket.fromDirection} {ticket.toDirection} {ticket.ticketDate} </p>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        {!datePicker && <Button variant="secondary" onClick={() => setDatePicker(true)}  >Delay</Button>}
                                        <Button variant="danger" onClick={() => ticketCanceled(ticket)} >Cancel</Button>
                                        {datePicker &&
                                            <>
                                                <Button variant="secondary" onClick={() => ticketDelay(ticket)}  >Delay</Button>
                                                <ReactDatePicker
                                                    onChange={handleChange}
                                                    value={newDate}
                                                />

                                            </>
                                        }
                                    </Modal.Footer>
                                </Modal.Dialog>
                            </div>
                        )
                    }) : searchTicket.map((ticket) => {
                        return (
                            <div className='container'>
                                <Modal.Dialog key={ticket.id}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Future Tickets</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <p>{ticket.fromDirection} {ticket.toDirection} {ticket.ticketDate} </p>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        {!datePicker && <Button variant="secondary" onClick={() => setDatePicker(true)}  >Delay</Button>}
                                        <Button variant="danger" onClick={() => ticketCanceled(ticket)} >Cancel</Button>
                                        {datePicker &&
                                            <>
                                                <Button variant="secondary" onClick={() => ticketDelay(ticket)}  >Delay</Button>
                                                <ReactDatePicker
                                                    onChange={handleChange}
                                                    value={newDate}
                                                />

                                            </>
                                        }
                                    </Modal.Footer>
                                </Modal.Dialog>
                            </div>
                        )
                    })
                }
            </Table>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        email: state.auth.email,

    }
}


export default connect(mapStateToProps)(UserProfile)
