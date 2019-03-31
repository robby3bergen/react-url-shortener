import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Shortener from './Components/shortener';
import ShortenService from './Services/shortenService';

class App extends Component {
  getDestinationUrl = (urlPath) => {
    const shortenService = new ShortenService();
    const destination = shortenService.getUrl(urlPath)
    return destination;
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Shortener} />
        </Switch>
      </div>
    );
  }
}

export default App;
