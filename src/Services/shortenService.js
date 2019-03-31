import axios from 'axios';

class ShortenService {
  constructor() {
    this.shorten = axios.create({
      baseURL: 'http://localhost:5000/url',
      withCredentials: true
    })
  }

  addUrl = (destination) => {
    return this.shorten.post('/add', {destination})
    .then(response => response.data)
  }

  getUrl = (id) => {
    return this.shorten.get(`/findbyid/${id}`)
    .then(response => response.data)
  }
}

export default ShortenService;