/* eslint-disable import/no-extraneous-dependencies */
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'
import EditorsPickList from '../EditorsPickList'
import GenresList from '../GenresList'
import RecentPlayList from '../RecentPlayList'
import Navbar from '../Navbar'
//  TODO: try to make separate file for api Fetching..;)

const Home = () => {
  const token = Cookies.get('jwt_token')

  if (token === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <div className="home-page">
      <Navbar />
      <div className="responsive-home-page">
        <EditorsPickList />
        <GenresList />
        <RecentPlayList />
      </div>
    </div>
  )
}

export default Home
