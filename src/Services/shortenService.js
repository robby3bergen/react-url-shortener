import axios from 'axios';

class ShortenService {
  constructor() {
    this.shorten = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/url`,
      withCredentials: true
    })
  }

  addUrl = (destination, userId) => {
    return this.shorten.post('/add', {destination, userId})
    .then(response => response.data)
  }

  deleteUrl = (urlId, userId) => {
    return this.shorten.post('/delete', {urlId, userId})
    .then(response => response.data);
  }

  getListOfUrls = (userId) => {
    return this.shorten.post('/list', {userId})
    .then(response => response.data)
  }
}

export default ShortenService;