import React, { Component } from 'react'

class Shortener extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destination: ''
    }
  }

  handleChange = (event) => {
    event.preventDefault();
    
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <label>Destination</label>
        <input name="destination" type="text" onChange={this.handleChange} value={this.state.destination} placeholder="type or paste your url here" />
        <input type="submit" value="Get short url" />
      </form>
    )
  }
}

export default Shortener;