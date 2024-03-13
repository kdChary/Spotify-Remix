import {Component} from 'react'
import Cookies from 'js-cookie'

import LoadingView from '../LoadingView'
import FailureView from '../FailureView'
import GenreItem from '../GenreItem'
import Navbar from '../Navbar'

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
      const modifyCategories = data.playlists.items.map(eachItem => ({
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
      <ul className="genre-details-List">
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
        <Navbar />
        <div className="responsive-genre-details-section">
          <h3 className="genre-item-details-title">{title}</h3>
          {this.renderGenreAndMoodsView()}
        </div>
      </div>
    )
  }
}

export default GenreItemDetails
