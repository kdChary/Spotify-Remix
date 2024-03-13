import {Link} from 'react-router-dom'
import './index.css'

// TODO: add protected route

const EditorsPickItem = props => {
  const {itemDetails} = props
  const {name, id, imageUrl} = itemDetails

  return (
    <li className="editors-pick-item">
      <Link to={`/${name}/${id}`} className="link-item">
        <img src={imageUrl} alt="" className="playlist-img" />
        <p className="playlist-text">{name}</p>
      </Link>
    </li>
  )
}

export default EditorsPickItem
