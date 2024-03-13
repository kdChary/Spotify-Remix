import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'
import LoadingView from '../LoadingView'
import FailureView from '../FailureView'
// import GenreItem from '../GenreItem'
import Navbar from '../Navbar'
import NavigateBack from '../Navbar/NavigateBack'

const apiStatusConst = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class EditorPickItemDetails extends Component {
  state = {
    playListData: {},
    apiFetchStatus: apiStatusConst.initial,
    currentTrack: {},
  }

  componentDidMount() {
    this.getPlayListData()
  }

  modifyPlayListData = data => ({
    followers: data.followers.total,
    id: data.id,
    imageUrl: data.images[0].url,
    name: data.name,
    tracks: data.tracks.items.map(eachTrack => ({
      addedAt: eachTrack.added_at,
      album: eachTrack.track.album.name,
      artist: eachTrack.track.artists.map(artist => ({
        name: artist.name,
      })),
      id: eachTrack.track.id,
      name: eachTrack.track.name,
      trackImageUrl: eachTrack.track.album.images[0].url,
      duration: eachTrack.track.duration_ms,
      popularity: eachTrack.track.popularity,
      previewUrl: eachTrack.track.preview_url,
    })),
  })

  getPlayListData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis2.ccbp.in/spotify-clone/playlists-details/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      Headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      console.log(data)
      //   const lists = data.tracks.items.filter(item => item !== null)

      const modifyPlayList = this.modifyPlayListData(data)

      this.setState({
        apiFetchStatus: apiStatusConst.success,
        playListData: modifyPlayList,
        currentTrack: modifyPlayList.tracks[0],
      })
    } else {
      this.setState({apiFetchStatus: apiStatusConst.failure})
    }
  }

  renderLoadingView = () => <LoadingView />

  renderFailureView = () => <FailureView />

  renderPlayListHeader = () => {
    const {playListData} = this.state
    const {imageUrl, name, followers} = playListData

    return (
      <div className="editors-picks-details-header">
        <img src={imageUrl} alt="" className="editors-pick-details-img" />
        <div className="editors-pick-album-details">
          <p className="editors-pick-details-title">Editor&apos;s picks</p>
          <h1 className="editors-pick-details-name">{name}</h1>
          <p className="editors-pick-details-followers">{followers}</p>
        </div>
      </div>
    )
  }

  renderSuccessView = () => (
    <div className="editors-pick-item-details-container">
      <Navbar />
      <div className="editors-pick-details-responsive-section">
        <NavigateBack />
        {this.renderPlayListHeader()}
      </div>
    </div>
  )

  render() {
    const {apiFetchStatus, currentTrack} = this.state
    console.log(currentTrack)

    switch (apiFetchStatus) {
      case apiStatusConst.inProgress:
        return <>{this.renderLoadingView()}</>

      case apiStatusConst.success:
        return <>{this.renderSuccessView()}</>

      case apiStatusConst.failure:
        return <>{this.renderFailureView()} </>

      default:
        return null
    }
  }
}

export default EditorPickItemDetails
