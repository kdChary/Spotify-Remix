import {Link} from 'react-router-dom'
import './index.css'

// TODO: add protected route

const GenreItem = props => {
  const {itemDetails} = props
  const {name, id, imageUrl} = itemDetails

  return (
    <li className="genre-item">
      <Link to={`/category/${id}/${name}`} className="link-item">
        <img src={imageUrl} alt="category" className="genre-img" />
        <p className="genre-text">{name}</p>
      </Link>
    </li>
  )
}

export default GenreItem
