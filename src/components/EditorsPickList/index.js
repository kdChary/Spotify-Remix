import {Component} from 'react'
import Cookies from 'js-cookie'
import moment from 'moment'

import './index.css'
import EditorsPickItem from '../EditorsPickItem'
import LoadingView from '../LoadingView'
import FailureView from '../FailureView'

const apiStatusConst = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class EditorsPickList extends Component {
  state = {editorsPickList: {}, apiFetchStatus: apiStatusConst.initial}

  componentDidMount() {
    this.getEditorsPicks()
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

  renderLoader = () => <LoadingView />

  renderFailureView = () => <FailureView />

  renderEditorPicks = () => {
    const {editorsPickList} = this.state

    return (
      <div className="editors-pick-container">
        <h3 className="editors-pick-title">Editor's picks</h3>
        <ul className="editors-pick-list">
          {editorsPickList.map(eachItem => (
            <EditorsPickItem key={eachItem.key} itemDetails={eachItem} />
          ))}
        </ul>
      </div>
    )
  }

  renderFinalView = () => {
    const {apiFetchStatus} = this.state

    switch (apiFetchStatus) {
      case apiStatusConst.inProgress:
        return <>{this.renderLoader()}</>

      case apiStatusConst.success:
        return <>{this.renderEditorPicks()}</>

      case apiFetchStatus.failure:
        return <>{this.renderFailureView()} </>

      default:
        return null
    }
  }

  render() {
    return <>{this.renderFinalView()}</>
  }
}

export default EditorsPickList
