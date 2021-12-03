import React, { useEffect, useState } from 'react'
import './userList.css'
import { Button, Form, Table } from "react-bootstrap"
import { getAllUsers, updateUserByEmail, deleteUserByEmail } from '../../api/apiCalls';

const UserList = () => {

    const [users, setUsers] = useState([]);
    const [updateClick, setUpdateClick] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [userFirstName, setFirstname] = useState('');
    const [userLastName, setLastname] = useState('');
    const [userPhoneNumber, setUserPhoneNumber] = useState('');
    const [userRole, setUserRole] = useState('');


    useEffect(() => {
        getAllUsers()
            .then(res => {
                setUsers(res.data)
            }).catch(err => {
                console.log(err)
            })
    }, [])


    const updateButtonClick = (email) => {
        setUpdateClick(true);
        setUserEmail(email);
    }

    const deleteUser = (email) => {
        deleteUserByEmail(email)
            .then(res => {
                setUsers(users.filter(user => user.email !== email))
            }).catch(err => {
                console.log(err)
            })
    }

    const updateUser = (event) => {
        event.preventDefault();
        const user = {
            email: userEmail,
            firstName: userFirstName,
            lastName: userLastName,
            phoneNumber: userPhoneNumber,
            role: userRole
        }
        updateUserByEmail(user)
            .then(res => {
                alert("User updated successfully " + res.data)
                setUpdateClick(false);
                setUserEmail('');
                setFirstname('');
                setLastname('');
                setUserPhoneNumber('');
                setUserRole('');
            }).catch(err => {
                alert("User not updated")
            })
    }

    return (
        <div className='userList'>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>User Name</th>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => {
                        return (
                            <>
                                <tr key={index}>
                                    <td>{index}</td>
                                    <td>{user.userName}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td> {user.phoneNumber} </td>
                                    <td>{user.email}</td>
                                    <td>{user.roleName}</td>
                                    <Button variant="btn btn-outline-warning" onClick={() => updateButtonClick(user.email)} >Update</Button>
                                    <Button variant="btn btn-outline-danger" onClick={() => deleteUser(user.email)} >Delete</Button>
                                </tr>
                            </>
                        )
                    }
                    )}
                </tbody>
            </Table>
            {
                updateClick &&
                <>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Firstname" onChange={(event) => setFirstname(event.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Lastname" onChange={(event) => setLastname(event.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="tel" name="phone"
                                placeholder="Enter Phone Number"
                                pattern="[0-9]{11}"
                                onChange={(event) => setUserPhoneNumber(event.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="my-1 mr-2" for="inlineFormCustomSelectPref">Role</Form.Label>
                            <Form.Select className="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref" onChange={(event) => setUserRole(event.target.value)} >
                                <option value="ADMIN">ADMIN</option>
                                <option value="USER">USER</option>
                            </Form.Select>
                        </Form.Group>

                        <Button variant="primary" type="submit" onClick={updateUser} >
                            Submit
                        </Button>
                    </Form>
                </>
            }
        </div>
    )
}

export default UserList;

