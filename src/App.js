import {Redirect, Route, Switch} from 'react-router-dom'

import './App.css'
import Login from './components/Login'
import Home from './components/Home'
import NotFound from './components/NotFound'
import GenreItemDetails from './components/GenreItemDetails'

//  TODO: add Routing
const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route exact path="/" component={Home} />
    <Route exact path="/category/:id/:name" component={GenreItemDetails} />
    <Route path="/bad-path" component={NotFound} />
    <Redirect to="/bad-path" component={NotFound} />
  </Switch>
)

export default App
