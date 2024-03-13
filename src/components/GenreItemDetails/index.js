import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'
import LoadingView from '../LoadingView'
import FailureView from '../FailureView'
import GenreItem from '../GenreItem'
import Navbar from '../Navbar'
import NavigateBack from '../Navbar/NavigateBack'

const apiStatusConst = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class GenreItemDetails extends Component {
  state = {genreItemDetails: {}, apiFetchStatus: apiStatusConst.initial}

  componentDidMount() {
    this.getResults()
  }

  getResults = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis2.ccbp.in/spotify-clone/category-playlists/${id}`
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
      const lists = data.playlists.items.filter(item => item !== null)

      const modifyCategories = lists.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        imageUrl: eachItem.images[0].url,
      }))

      this.setState({
        apiFetchStatus: apiStatusConst.success,
        genreItemDetails: modifyCategories,
      })
    } else {
      this.setState({apiFetchStatus: apiStatusConst.failure})
    }
  }

  renderLoadingView = () => <LoadingView />

  renderFailureView = () => <FailureView />

  renderGenreItemDetails = () => {
    const {genreItemDetails} = this.state

    return (
      <ul className="genre-details-list">
        {genreItemDetails.map(eachItem => (
          <GenreItem key={eachItem.id} itemDetails={eachItem} />
        ))}
      </ul>
    )
  }

  renderGenreAndMoodsView = () => {
    const {apiFetchStatus} = this.state

    switch (apiFetchStatus) {
      case apiStatusConst.inProgress:
        return <>{this.renderLoadingView()}</>

      case apiStatusConst.success:
        return <>{this.renderGenreItemDetails()}</>

      case apiStatusConst.failure:
        return <>{this.renderFailureView()}</>

      default:
        return null
    }
  }

  render() {
    const {location} = this.props
    const {pathname} = location
    const title = pathname.split('/')[3]

    return (
      <div className="genre-item-details-page">
        <div className="hide-nav">
          <Navbar />
        </div>
        <div className="genre-details">
          <NavigateBack />
          <div className="responsive-genre-details-section">
            <h3 className="genre-item-details-title">{title}</h3>
            {this.renderGenreAndMoodsView()}
          </div>
        </div>
      </div>
    )
  }
}

export default GenreItemDetails
