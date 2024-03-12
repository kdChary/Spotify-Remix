import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import moment from 'moment'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

//  TODO: try to make separate file for api Fetching..;)

const apiStatusConst = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
class Home extends Component {
  state = {
    editorsPicksList: {},
    genresAndMoodsList: [],
    newReleasesList: [],
    apiFetchStatus: apiStatusConst.initial,
  }

  componentDidMount() {
    this.getEditorsPicks()
    this.getGenresAndMoods()
    this.getNewReleases()
  }

  modifyData = data => ({
    name: data.name,
    id: data.id,
    imageUrl: data.images[0].url,
  })

  getEditorsPicks = async () => {
    this.setState({apiFetchStatus: apiStatusConst.inProgress})
    const timestamp = moment(new Date()).format('YYYY-MM-DDTHH:00:00')

    const url = `https://apis2.ccbp.in/spotify-clone/featured-playlists?country=IN&timestamp=${timestamp}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.setState({apiFetchStatus: apiStatusConst.success})
      const checkData = data.playlists.items.map(eachItem =>
        this.modifyData(eachItem),
      )
      console.log(checkData)
    } else {
      this.setState({apiFetchStatus: apiStatusConst.failure})
      console.log(data.error_msg)
    }
  }

  getGenresAndMoods = async () => {
    this.setState({apiFetchStatus: apiStatusConst.inProgress})

    const url = 'https://apis2.ccbp.in/spotify-clone/categories'
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
      const modifyCategories = data.categories.items.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        imageUrl: eachItem.icons[0].url,
      }))
      this.setState({apiFetchStatus: apiStatusConst.success})

      console.log(modifyCategories)
    } else {
      this.setState({apiFetchStatus: apiStatusConst.failure})
      console.log(data.error_msg)
    }
  }

  getNewReleases = async () => {
    this.setState({apiFetchStatus: apiStatusConst.inProgress})

    const url = 'https://apis2.ccbp.in/spotify-clone/new-releases'
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
      const modifyNewReleases = data.albums.items.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        imageUrl: eachItem.images[2].url,
      }))
      this.setState({apiFetchStatus: apiStatusConst.success})
      console.log(modifyNewReleases)
    } else {
      this.setState({apiFetchStatus: apiStatusConst.failure})
      console.log(data.error_msg)
    }
  }

  renderLoadingView = () => {
    const imgUrl =
      'https://res.cloudinary.com/dgga8cymk/image/upload/v1710133016/Spotify/Login/music-waves_saqzvb.png'
    return (
      <div className="loader-view-container">
        <img src={imgUrl} alt="website logo" className="loading-section-logo" />
        <div className="loader-text-section" data-testid="loader">
          <h1 className="loader-text">Loading</h1>
          <Loader type="ThreeDots" color="#ffffff" height="30" width="30" />
        </div>
      </div>
    )
  }

  render() {
    const {apiFetchStatus} = this.state
    const token = Cookies.get('jwt_token')

    if (token === undefined) {
      return <Redirect to="/login" />
    }
    if (apiFetchStatus === apiStatusConst.inProgress) {
      return <>{this.renderLoadingView()}</>
    }
    return <div>Hello Testing</div>
  }
}

export default Home
