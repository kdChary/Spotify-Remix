import Loader from 'react-loader-spinner'

import './index.css'

const LoadingView = () => {
  const imgUrl =
    'https://res.cloudinary.com/dgga8cymk/image/upload/v1710133016/Spotify/Login/music-waves_saqzvb.png'
  return (
    <div className="loader-view-container">
      <img src={imgUrl} alt="website logo" className="loading-section-logo" />
      <div className="loader-text-section" data-testid="loader">
        <h1 className="loader-text">Loading</h1>
        <Loader
          type="ThreeDots"
          color="#ffffff"
          height="39"
          width="39"
          className="loader"
        />
      </div>
    </div>
  )
}

export default LoadingView
