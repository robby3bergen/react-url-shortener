import React, { Component } from 'react';
import ShortenService from '../Services/shortenService';

class UrlList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'urlList': []
    };
    this.shortenService = new ShortenService();
    this.getUrlList(this.props.userLoggedIn.userId);
  }

  getUrlList = (userId) => {
    this.shortenService.getListOfUrls(userId)
    .then(response => {
      this.setState({'urlList': response});
    })
    .catch(error => console.log(error))
  }

  deleteUrl = (event) => {
    event.preventDefault();
    const urlId = event.target.value;
    console.log('url id: ' + urlId);
    // callback function to filter out the deleted url from urlList
    const newUrlList = this.state.urlList.filter(element => element._id === urlId ? false : true);

    this.shortenService.deleteUrl(urlId, this.props.userLoggedIn.userId)
    .then(response => {
      this.setState({'urlList': newUrlList});
    })
    .catch(error => console.log(error))
  }

  render() {
    const List = this.state.urlList.map(url =>
      <li key={url._id}>
        <span>{url.destination}</span>
        <button onClick={this.deleteUrl} value={url._id}>delete</button>
      </li>);
    return(
      <div className="main">
        <h3>My personal url's</h3> 
        <ul>
          {List}
        </ul>
      </div>
    );
  }
}

export default UrlList