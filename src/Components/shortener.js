import React, { Component } from 'react';
import ShortenService from '../Services/shortenService';

class Shortener extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destination: '',
      shortUrl: ''
    };
    this.shortenService = new ShortenService();
  }

  handleChange = (event) => {
    // prevent page refresh
    event.preventDefault();
    
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  handleSubmit = (event) => {
    // prevent page refresh
    event.preventDefault();

    // get shortPath from api and store destination url in database
    const destination = this.state.destination;
    const userId = this.props.userLoggedIn.userId;
    this.shortenService.addUrl(destination, userId)
    .then(response => {
      const url = `${process.env.REACT_APP_API_URL}/${response._id}`;
      this.setState({shortUrl: url})
    })
    .catch(error => console.log(error))
  }

  render() {
    return(
      <div>
        <article>
          Use this app to create a short url
        </article>
        <form onSubmit={this.handleSubmit}>
          <label>Destination</label>
          <input name="destination" type="text" onChange={this.handleChange} value={this.state.destination} placeholder="type or paste your url here" />
          <input type="submit" value="Get short url" />
        </form>
        <p>The following short url was created for you</p>
        <p>{this.state.shortUrl}</p>
      </div>
    )
  }
}

export default Shortener;