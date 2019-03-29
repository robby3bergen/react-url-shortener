import React, { Component } from 'react';
import './App.css';
import Shortener from './Components/shortener';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Shortener />
      </div>
    );
  }
}

export default App;
