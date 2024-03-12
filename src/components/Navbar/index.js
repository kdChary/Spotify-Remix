import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {HiMenu} from 'react-icons/hi'
import {AiOutlineLogout} from 'react-icons/ai'

import './index.css'

const Navbar = props => {
  const onClickLogout = () => {
    const {history} = props
    history.replace('/login')

    Cookies.remove('jwt_token')
  }
  const mobileView = () => (
    <nav className="mobile-navbar">
      <img
        src="https://res.cloudinary.com/dgga8cymk/image/upload/v1710133016/Spotify/Login/music-waves_saqzvb.png"
        alt="website logo"
        className="nav-logo"
      />
      <HiMenu className="nav-icon" />
    </nav>
  )

  const largeDevicesView = () => (
    <nav className="large-devices-navbar">
      <img
        src="https://res.cloudinary.com/dgga8cymk/image/upload/v1710133016/Spotify/Login/music-waves_saqzvb.png"
        alt="website logo"
        className="nav-logo"
      />
      <AiOutlineLogout className="nav-icon" onClick={onClickLogout} />
    </nav>
  )

  return (
    <>
      {mobileView()}
      {largeDevicesView()}
    </>
  )
}

export default withRouter(Navbar)
