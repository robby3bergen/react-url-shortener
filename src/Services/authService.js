import axios from 'axios';

class AuthService {
  constructor() {
    this.authorise = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true
    })
  }

  signup = (username, password) => {
    return this.authorise.post('/signup', {username, password})
    .then(response => response.data)
  }

  login = (username, password) => {
    return this.authorise.post('/login', {username, password})
    .then(response => response.data)
  }

  userLoggedIn = () => {
    return this.authorise.get('/userLoggedIn')
    .then(response => response.data)
  }
}

export default AuthService;