import {Component} from 'react'
// import {Redirect} from 'react-router-dom'
// import moment from 'moment'
import Cookies from 'js-cookie'

import './index.css'
import LoadingView from '../LoadingView'
import FailureView from '../FailureView'
import EditorsPickItem from '../EditorsPickItem'

const apiStatusConst = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class RecentPlayList extends Component {
  state = {
    newReleasesList: {},
    apiFetchStatus: apiStatusConst.initial,
  }

  componentDidMount() {
    this.getNewReleases()
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
        imageUrl: eachItem.images[0].url,
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

  renderLoadingView = () => <LoadingView />

  renderFailureView = () => <FailureView />

  renderRecentPlayList = () => {
    const {newReleasesList} = this.state
    return (
      <div className="categories-container">
        <h3 className="categories-title">New Releases</h3>
        <ul className="categories-list">
          {newReleasesList.map(eachItem => (
            <EditorsPickItem key={eachItem.id} itemDetails={eachItem} />
          ))}
        </ul>
      </div>
    )
  }

  renderRecentPlayListView = () => {
    const {apiFetchStatus} = this.state

    switch (apiFetchStatus) {
      case apiStatusConst.inProgress:
        return <>{this.renderLoadingView()}</>

      case apiStatusConst.success:
        return <>{this.renderRecentPlayList()}</>

      case apiStatusConst.failure:
        return <>{this.renderFailureView}</>

      default:
        return null
    }
  }

  render() {
    return <>{this.renderRecentPlayListView()}</>
  }
}

export default RecentPlayList
