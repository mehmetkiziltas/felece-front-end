import React from 'react';
import "./Sidebar.css";
import {
    LineStyle,
    Timeline,
    TrendingUp,
} from '@material-ui/icons';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <ul className="sidebarList">
                        <li className="sidebarListItem">
                            <LineStyle className='sidebarIcon' />
                            <Link to="/admin">Home</Link>
                        </li>
                        <li className="sidebarListItem">
                            <Timeline className='sidebarIcon' />
                            <Link to="/admin/rotation" >Create Rotetion</Link>
                        </li>
                        <li className="sidebarListItem">
                            <TrendingUp className='sidebarIcon' />
                            <Link to="/admin/driver">
                                Driver
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;
