import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import logo from '../assets/felece.png'
import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess } from '../redux/authActions'
import './topbar.css'


const TopBar = () => {

    const { username, isLoggedIn } = useSelector(store => ({
        isLoggedIn: store.auth.isLoggedIn,
        username: store.auth.userName
    }));

    const menuArea = useRef(null)

    const [menuVisible, setMenuVisible] = useState(false)

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        document.addEventListener('click', menuClickTracker);
        return () => {
            document.removeEventListener('click', menuClickTracker);
        }
    }, [isLoggedIn])

    const menuClickTracker = (event) => {
        if (menuArea.current === null || !menuArea.current.contains(event.target)) {
            setMenuVisible(false);
        }
    }

    const onLogoutSuccess = async () => {
        await dispatch(logoutSuccess()).then(() => {
            history.push('/login')
        })
    }

    let links = (
        <div className='containerTopbar'>
            <ul className="navbar-nav ml-auto">
                <li>
                    <Link className="nav-link" to="/login">
                        Login
                    </Link>
                </li>
                <li >
                    <Link className="nav-link" to="/signup">
                        Sign Up
                    </Link>
                </li>
            </ul>
        </div>
    );

    if (isLoggedIn) {
        let dropDownClass = 'dropdown-menu p-0 shadow';
        if (menuVisible) {
            dropDownClass += ' show';
        }
        links = (
            <div className='containerTopbar'>
                <ul className="navbar-nav ml-auto" ref={menuArea}>
                    <li className="nav-item dropdown">
                        <div className="d-flex" style={{ cursor: 'pointer' }} onClick={() => setMenuVisible(true)}>
                            <span className="nav-link dropdown-toggle">{username}</span>
                        </div>
                        <div className={dropDownClass}>
                            <Link className="dropdown-item d-flex p-2" to={`/user/${username}`} onClick={() => setMenuVisible(false)}>
                                <i className="material-icons text-info mr-2">person</i>
                                My Profile
                            </Link>
                            <span className="dropdown-item d-flex p-2" onClick={onLogoutSuccess} style={{ cursor: 'pointer' }}>
                                <i className="material-icons text-danger mr-2">power_settings_new</i>
                                Logout
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }

    return (
        <div className='containerTopbarImage' >
            <div className="shadow-sm bg-light mb-2">
                <nav className="navbar navbar-light container navbar-expand">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} alt="Felece Logo" width="60" />
                        Felece
                    </Link>
                    {links}
                </nav>
            </div>
        </div>
    );
}

export default TopBar;