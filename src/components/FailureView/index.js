import {FaExclamationTriangle} from 'react-icons/fa'
import './index.css'

const FailureView = () => (
  <div className="failure-view-card">
    <FaExclamationTriangle className="failure-img" />
    <p className="failure-text">Something went wrong. Please try again</p>
    <button type="button" className="try-again-btn">
      Try Again
    </button>
  </div>
)

export default FailureView
