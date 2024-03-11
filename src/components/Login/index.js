import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

/* const apiStatusConst = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
} */

class Login extends Component {
  //  TODO: add Routing
  state = {
    username: '',
    password: '',
    showErrMsg: false,
    errorMsg: '',
  }

  userAuthenticationSuccessful = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
  }

  onSubmitCredentials = async () => {
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

    return <div>Test</div>
  }
}

export default Login
