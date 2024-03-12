/* eslint-disable import/no-extraneous-dependencies */
import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import moment from 'moment'
import Cookies from 'js-cookie'
import {FaExclamationTriangle} from 'react-icons/fa'

import LoadingView from '../LoadingView'
import EditorsPickItem from '../EditorsPickItem'
//  TODO: try to make separate file for api Fetching..;)

const apiStatusConst = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
class Home extends Component {
  state = {
    editorsPickList: {},
    genresAndMoodsList: {},
    newReleasesList: {},
    apiFetchStatus: apiStatusConst.initial,
  }

  componentDidMount() {
    this.getEditorsPicks()
    this.getGenresAndMoods()
    this.getNewReleases()
  }

  renderFailureView = () => (
    <div className="failure-view-card">
      <FaExclamationTriangle className="home-failure-img" />
      <p className="home-failure-text">
        Something went wrong. Please try again
      </p>
      <button type="button" className="try-again-btn">
        Try Again
      </button>
    </div>
  )

  renderEditorPicks = () => {
    const {editorsPickList, apiFetchStatus} = this.state

    return (
      <div className="editors-pick-container">
        <ul className="editors-pick-list">
          {editorsPickList.map(eachItem => (
            <EditorsPickItem key={eachItem.key} itemDetails={eachItem} />
          ))}
        </ul>
      </div>
    )
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
      const modifyEditorsPick = data.playlists.items.map(eachItem =>
        this.modifyData(eachItem),
      )

      this.setState({
        apiFetchStatus: apiStatusConst.success,
        editorsPickList: modifyEditorsPick,
      })
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
      this.setState({
        apiFetchStatus: apiStatusConst.success,
        genresAndMoodsList: modifyCategories,
      })
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
      this.setState({
        apiFetchStatus: apiStatusConst.success,
        newReleasesList: modifyNewReleases,
      })
    } else {
      this.setState({apiFetchStatus: apiStatusConst.failure})
      console.log(data.error_msg)
    }
  }

  render() {
    const {apiFetchStatus} = this.state
    const token = Cookies.get('jwt_token')

    if (token === undefined) {
      return <Redirect to="/login" />
    }
    if (apiFetchStatus === apiStatusConst.inProgress) {
      return <LoadingView />
    }
    return <div>Hello Testing</div>
  }
}

export default Home
