import {Redirect, Route, Switch} from 'react-router-dom'

import './App.css'
import Login from './components/Login'
import Home from './components/Home'
import NotFound from './components/NotFound'
import GenreItemDetails from './components/GenreItemDetails'
import ProtectedRoute from './components/ProtectedRoute'
import EditorPickItemDetails from './components/EditorPickItemDetails'

//  TODO: add Routing
const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute
      exact
      path="/category/:id/:name"
      component={GenreItemDetails}
    />
    <ProtectedRoute exact path="/:name/:id" component={EditorPickItemDetails} />
    <Route path="/bad-path" component={NotFound} />
    <Redirect to="/bad-path" component={NotFound} />
  </Switch>
)

export default App
