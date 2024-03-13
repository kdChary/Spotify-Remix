/* eslint-disable import/no-extraneous-dependencies */
import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import moment from 'moment'
import Cookies from 'js-cookie'

import LoadingView from '../LoadingView'
// import FailureView from '../FailureView'
import EditorsPickList from '../EditorsPickList'
import GenresList from '../GenresList'
//  TODO: try to make separate file for api Fetching..;)

const apiStatusConst = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
class Home extends Component {
  state = {
    genresAndMoodsList: {},
    newReleasesList: {},
    apiFetchStatus: apiStatusConst.initial,
  }

  //   componentDidMount() {
  //     this.getNewReleases()
  //   }

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
    return (
      <div>
        Hello Testing
        <EditorsPickList />
        <GenresList />
      </div>
    )
  }
}

export default Home
