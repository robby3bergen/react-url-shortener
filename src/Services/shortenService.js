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

  getUrl = (id) => {
    return this.shorten.get(`/findbyid/${id}`)
    .then(response => response.data)
  }
}

export default ShortenService;