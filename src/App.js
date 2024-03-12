import {Redirect, Route, Switch} from 'react-router-dom'

import './App.css'
import Login from './components/Login'
import NotFound from './components/NotFound'

//  TODO: add Routing
const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" component={NotFound} />
  </Switch>
)

export default App
