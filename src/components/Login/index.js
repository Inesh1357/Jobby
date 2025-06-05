import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorStatus: false, error: ''}

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const useDetails = {
      username,
      password,
    }
    const url = 'https://apis.ccbp.in/login'
    const option = {
      method: 'POST',
      body: JSON.stringify(useDetails),
    }
    const response = await fetch(url, option)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.successStatus(data.jwt_token)
    } else {
      this.failureStatus(data.error_msg)
    }
  }

  successStatus = jwtToken => {
    this.setState({username: '', password: '', errorStatus: false, error: ''})
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 10})
    history.replace('/')
  }

  failureStatus = error => {
    this.setState({errorStatus: true, error})
  }

  render() {
    const {username, password, errorStatus, error} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="bg">
        <div className="bg-login">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo-img"
          />
          <form onSubmit={this.onSubmit}>
            <div className="div">
              <label htmlFor="username">USERNAME</label>
              <input
                onChange={this.changeUsername}
                value={username}
                type="text"
                id="username"
                placeholder="Username"
              />
            </div>
            <div className="div">
              <label htmlFor="password">PASSWORD</label>
              <input
                onChange={this.changePassword}
                value={password}
                type="password"
                id="password"
                placeholder="Password"
              />
            </div>
            <button className="button" type="submit">
              Login
            </button>
            {errorStatus && <p className="error">{error}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
