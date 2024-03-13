import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

//  TODO: add Comments.

class Login extends Component {
  state = {
    username: '',
    password: '',
    showErrMsg: false,
    errorMsg: '',
  }

  userAuthenticationSuccessful = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 1,
      path: '/',
    })

    history.replace('/')
  }

  onSubmitCredentials = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      this.userAuthenticationSuccessful(data.jwt_token)
    } else {
      const errorMsg = data.error_msg
      this.setState({showErrMsg: true, errorMsg})
    }
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, errorMsg, showErrMsg} = this.state
    const token = Cookies.get('jwt_token')

    // TODO: add redirection
    if (token !== undefined) {
      console.log(token)
      return <Redirect to="/" />
    }

    return (
      <div className="main-container">
        <div className="login-form-container">
          <div className="app-logo-card">
            <img
              src="https://res.cloudinary.com/dgga8cymk/image/upload/v1710084712/music-waves_yc2qcu.png"
              alt="login website logo"
              className="app-logo"
            />
            <h2 className="title">Spotify Remix</h2>
          </div>
          <form
            onSubmit={this.onSubmitCredentials}
            className="login-form"
            id="form"
          >
            <div className="input-label-card">
              <label htmlFor="username" className="label">
                USERNAME
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={this.onChangeUserName}
                className="input"
              />
            </div>

            <div className="input-label-card">
              <label htmlFor="password" className="label">
                PASSWORD
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={this.onChangePassword}
                className="input"
              />
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>
            {showErrMsg && <p className="error-msg">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
