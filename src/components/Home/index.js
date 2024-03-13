/* eslint-disable import/no-extraneous-dependencies */
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

// import FailureView from '../FailureView'
import EditorsPickList from '../EditorsPickList'
import GenresList from '../GenresList'
import RecentPlayList from '../RecentPlayList'
//  TODO: try to make separate file for api Fetching..;)

const Home = () => {
  const token = Cookies.get('jwt_token')

  if (token === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <div>
      Hello Testing
      <EditorsPickList />
      <GenresList />
      <RecentPlayList />
    </div>
  )
}

export default Home
