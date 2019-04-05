import React, { Component } from 'react';
import ShortenService from '../Services/shortenService';

class UrlList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'urlList': []
    };
    this.getUrlList(this.props.userLoggedIn.userId);
  }

  getUrlList = (userId) => {
    const shortenService = new ShortenService();
    shortenService.getListOfUrls(userId)
    .then(response => {
      this.setState({'urlList': response});
    })
    .catch(error => console.log(error))
  }

  render() {
    const List = this.state.urlList.map(url => <li key={url._id}>{url.destination}</li>);
    return(
      <div>
        <ul>
          {List}
        </ul>
      </div>
    );
  }
}

export default UrlList