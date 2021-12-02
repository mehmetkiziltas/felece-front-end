import React from 'react'
import { useSelector } from 'react-redux';
import './App.css';
import LoginPage from './pages/LoginPage';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import UserSignupPage from './pages/UserSignupPage';
import TopBar from './components/TopBar';
import HomePage from './pages/HomePage';
import AdminHome from './pages/admin/AdminHome';
import Rotation from './pages/admin/Rotation';
import Driver from './pages/admin/Driver';
import Sidebar from './pages/sidebar/Sidebar';
import SelectSeats from './pages/SelectSeats';
import UserTicketPage from './pages/UserTicketPage';
import UserProfile from './pages/UserProfile';
import UpdateBus from './pages/admin/UpdateBus';


const App = () => {

  const { isLoggedIn, role, username } = useSelector(store => ({
    isLoggedIn: store.auth.isLoggedIn,
    role: store.auth.role,
    username: store.auth.userName
  }));

  return (
    <div className='App'>
        <Router>
          <TopBar />
          {role === 'ADMIN' && <Sidebar />}
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/signup" component={UserSignupPage} />
            {!isLoggedIn && <Route path="/login" component={LoginPage} />}
            {isLoggedIn && <Route path={`/user/${username}`} component={UserProfile} />}
            <Route exact path="/select-seats" component={SelectSeats} />
            <Route exact path="/userpage" component={UserTicketPage} />
            {role === 'ADMIN' && <Route exact path='/admin' component={AdminHome} />}
            {role === 'ADMIN' && <Route exact path='/admin/rotation' component={Rotation} />}
            {role === 'ADMIN' && <Route exact path='/admin/driver' component={Driver} />}
            {role === 'ADMIN' && <Route exact path="/admin/updateBus/:busid"  component={UpdateBus}/>}
            <Redirect to="/" />
          </Switch>
        </Router>
      </div>
  );
}

export default App;
