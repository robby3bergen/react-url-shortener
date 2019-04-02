import React, { Component } from 'react';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import './App.css';

import Shortener from './Components/shortener';
import Signup from './Components/signup';
import Login from './Components/login';

import ShortenService from './Services/shortenService';
import AuthService from './Services/authService';

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
      /* console.log('Auth service checking session...'); */
      this.authService.userLoggedIn()
      .then(response => {
        /* console.log('Current user in session: ');
        console.log(response); */
        this.setState({currentUser: response.currentUser});
      })
    }
  }

  // function setCurrentUser is passed through props to Signup and Login components and will be called from within those components
  setCurrentUser = (user) => {
    this.setState({currentUser: user});
  }

  redirectToDestination(id) {
    // get destination url
    const shortenService = new ShortenService();
    shortenService.getUrl(id)
    .then(response => {
      if ( response === null) {
        return;
      } else {
        // redirect to destination url
        const destination = response.destination;
        window.location.href = destination;
      }
    })
    .catch(error => console.log(error));
  }

  render() {
    const userLoggedIn = this.state.currentUser;

    return (
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/signup">Signup</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/logout">Logout</Link></li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/" component={Shortener} />
          <Route exact path='/signup'>
            {userLoggedIn ? (<Redirect to="/" />) : (<Signup setCurrentUser={this.setCurrentUser} />)}
          </Route>
          <Route exact path='/login'>
            {userLoggedIn ? (<Redirect to="/" />) : (<Login setCurrentUser={this.setCurrentUser} />)}
          </Route>
          <Route exact path="/:id" render={(({match}) => {
            this.redirectToDestination(match.params.id); // async function, so next statement will execute first!
            return(<Redirect to="/" />);
          })} />
        </Switch>
      </div>
    );
  }
}

export default App;
