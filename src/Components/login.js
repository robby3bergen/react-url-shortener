import React, { Component } from 'react';
import AuthService from '../Services/authService';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
        'username': '',
        'password': ''
    };
    this.authService = new AuthService();
  }

  handleChange = (event) => {
    // maintain input values in state
    event.preventDefault();
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {username, password} = this.state;
    
    this.authService.login(username, password)
    .then(response => {
      // clear username and password in the form
      this.setState({username: '', password: ''});
      
      // lifting state up: call setCurrentUser function that was passed through props
      // and store the currentUser in the state in App.js
      this.props.setCurrentUser(response);;
    })
    .catch(error => console.log('error: ' + error))        
  }

  render() {
    return(
      <div className="auth">
        <form onSubmit={this.handleSubmit}>
          <input name="username" type="text" placeholder="username" value={this.state.username} onChange={this.handleChange} />
          <input name="password" type="password" placeholder="password" value={this.state.password} onChange={this.handleChange} />
          <input className="submit" type="submit" value="Login" />
        </form>
        <p>{this.state.error}</p>
      </div>
    )
  }
}

export default Login;