import Cookies from 'js-cookie'
import {Route, Redirect} from 'react-router-dom'

const ProtectedRoute = props => {
  const accessToken = Cookies.get('jwt_token')

  if (accessToken === undefined || accessToken === null) {
    return <Redirect to="/login" />
  }

  return <Route {...props} />
}

export default ProtectedRoute
