import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

//  TODO: add navBar
const NotFound = () => {
  const token = Cookies.get('jwt_token')
  if (token === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <div className="notfound-bg">
      <div className="notfound-container">
        <img
          src="https://res.cloudinary.com/dgga8cymk/image/upload/v1710212881/Spotify/Not-found/404not-found_es9rui.png"
          alt="page not found"
          className="notfound-img"
        />
        <h1 className="notfound-msg">Page Not Found</h1>
      </div>
    </div>
  )
}

export default NotFound
