import {Component} from 'react'
// import {Redirect} from 'react-router-dom'
import moment from 'moment'
import Cookies from 'js-cookie'

import './index.css'
import LoadingView from '../LoadingView'
import FailureView from '../FailureView'
import GenreItem from '../GenreItem'

const apiStatusConst = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class GenresList extends Component {
  state = {genreAndMoodsList: {}, apiFetchStatus: apiStatusConst.initial}

  componentDidMount() {
    this.getGenreAndMoods()
  }

  getGenreAndMoods = async () => {
    this.setState({apiFetchStatus: apiStatusConst.inProgress})
    const timestamp = moment(new Date()).format('YYYY-MM-DDTHH:00:00')

    const url = `https://apis2.ccbp.in/spotify-clone/categories?country=IN&timestamp=${timestamp}`
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
      const modifyCategories = data.categories.items.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        imageUrl: eachItem.icons[0].url,
      }))
      this.setState({
        apiFetchStatus: apiStatusConst.success,
        genreAndMoodsList: modifyCategories,
      })
    } else {
      this.setState({apiFetchStatus: apiStatusConst.failure})
      console.log(data.error_msg)
    }
  }

  renderLoadingView = () => <LoadingView />

  renderFailureView = () => <FailureView />

  renderGenreAndMoodsList = () => {
    const {genreAndMoodsList} = this.state
    return (
      <div className="categories-container">
        <h3 className="categories-title">Genres & Moods</h3>
        <ul className="categories-list">
          {genreAndMoodsList.map(eachItem => (
            <GenreItem key={eachItem.id} itemDetails={eachItem} />
          ))}
        </ul>
      </div>
    )
  }

  renderGenreAndMoodsView = () => {
    const {apiFetchStatus} = this.state

    switch (apiFetchStatus) {
      case apiStatusConst.inProgress:
        return <>{this.renderLoadingView()}</>

      case apiStatusConst.success:
        return <>{this.renderGenreAndMoodsList()}</>

      case apiStatusConst.failure:
        return <>{this.renderFailureView}</>

      default:
        return null
    }
  }

  render() {
    return <>{this.renderGenreAndMoodsView()}</>
  }
}

export default GenresList
