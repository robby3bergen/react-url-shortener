import React, { Component } from 'react';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import './App.css';

import Shortener from './Components/shortener';
import Signup from './Components/signup';
import Login from './Components/login';

//import ShortenService from './Services/shortenService';
import AuthService from './Services/authService';

import PrivateRoute from './Routes/private';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {currentUser: null};
    this.authService = new AuthService();
    this.getCurrentUser();
  }

  // check current user in session (only) after page refresh and store in state
  getCurrentUser() {
    if (!this.state.currentUser) {
      this.authService.userLoggedIn()
      .then(currentUser => {
        this.setState({currentUser});
      })
    }
  }

  // function setCurrentUser is passed through props to Signup and Login components and will be called from within those components
  setCurrentUser = (currentUser) => {
    this.setState({currentUser});
  }

  logout = () => {
    // async function logout, return will be executed first
    this.authService.logout()
    .then(response => {
      this.setState({currentUser: null})
    })
    return <Redirect to="/" />;
  }

  render() {
    const userLoggedIn = this.state.currentUser;

    return (
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            {!userLoggedIn ? <li><Link to="/signup">Signup</Link></li> : null}
            {!userLoggedIn ? <li><Link to="/login">Login</Link></li> : null}
            {userLoggedIn ? <li><Link to="/list">My shortened urls</Link></li> : null}
            {userLoggedIn ? <li><Link to="/logout">Logout</Link></li> : null}
          </ul>
        </nav>
        <Switch>
          <PrivateRoute exact path="/" userLoggedIn={userLoggedIn} component={Shortener} />
          <Route exact path='/signup'>
            {userLoggedIn ? (<Redirect to="/" />) : (<Signup setCurrentUser={this.setCurrentUser} />)}
          </Route>
          <Route exact path='/login'>
            {userLoggedIn ? (<Redirect to={this.props.location} />) : (<Login setCurrentUser={this.setCurrentUser} />)}
          </Route>
          <Route exact path='/logout' render={this.logout} />
        </Switch>
      </div>
    );
  }
}

export default App;
