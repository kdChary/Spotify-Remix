import {Link, withRouter} from 'react-router-dom'
import {TiArrowLeft} from 'react-icons/ti'
import {HiMenu} from 'react-icons/hi'
import {AiOutlineLogout} from 'react-icons/ai'

import './index.css'

const Navbar = () => {
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
      <AiOutlineLogout className="nav-icon" />
    </nav>
  )

  return (
    <>
      {mobileView()}
      {largeDevicesView()}
    </>
  )
}

export default Navbar
