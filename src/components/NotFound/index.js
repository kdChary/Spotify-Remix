import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'
import Navbar from '../Navbar'
import NavigateBack from '../Navbar/NavigateBack'

//  TODO: add comments
const NotFound = () => {
  const token = Cookies.get('jwt_token')
  if (token === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <div className="notfound-bg">
      <Navbar />
      <div className="notfound-container">
        <NavigateBack />
        <div className="notfound-card">
          <img
            src="https://res.cloudinary.com/dgga8cymk/image/upload/v1710212881/Spotify/Not-found/404not-found_es9rui.png"
            alt="page not found"
            className="notfound-img"
          />
          <h1 className="notfound-msg">Page Not Found</h1>
        </div>
      </div>
    </div>
  )
}

export default NotFound
