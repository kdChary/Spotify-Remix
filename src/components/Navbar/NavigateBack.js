import {withRouter} from 'react-router-dom'
import {TiArrowLeft} from 'react-icons/ti'

import './index.css'

const NavigateBack = props => {
  const onClickBack = () => {
    const {history} = props
    history.goBack()
  }
  return (
    <div className="back-option-container">
      <TiArrowLeft className="nav-icon" onClick={onClickBack} />
      <p className="back-text">Back</p>
    </div>
  )
}

export default withRouter(NavigateBack)
