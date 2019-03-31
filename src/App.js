import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Shortener from './Components/shortener';
import ShortenService from './Services/shortenService';

class App extends Component {
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
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Shortener} />
          <Route exact path="/:id" render={(({match}) => {
            this.redirectToDestination(match.params.id);
            return(<Redirect to="/" />);
          })} />
        </Switch>
      </div>
    );
  }
}

export default App;
