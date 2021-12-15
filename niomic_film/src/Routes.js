import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import App from './App'
import Home from './Home'
import {Actor} from './Actor'
import Film from './Film'
import ProtectedRoute from './auth/protected-route'

class Routes extends Component {
    render () {
        return (
            <Router>
                <App />
                <Switch>

                <Route path="/" exact component ={Home}></Route>
                <Route path="/Home" component={Home} />
                <ProtectedRoute path="/Film" component={Film} />
                <ProtectedRoute path="/Actor" component={Actor} /> 
                </Switch>
            </Router>
        )
    }
}

export default Routes;