import {Redirect, Route, Switch} from 'react-router-dom'

import './App.css'
import Login from './components/Login'

// write your code here
//  TODO: add Routing
const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    {/* <Redirect to='not-found' component={NotFound}/> */}
  </Switch>
)

export default App
