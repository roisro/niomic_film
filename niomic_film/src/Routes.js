import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import App from './App'
import Home from './Home'
import Actor from './Actor'
import Film from './Film'
import Beranda from './Beranda'
import FilmDetail from './FilmDetail'
import ProtectedRoute from './auth/protected-route'

class Routes extends Component {
    render () {
        return (
            <Router>
                <App />
                <Switch>

                <Route path="/" exact component ={Beranda}></Route>
                <Route path="/Home" component={Home} />
                <Route path="/Film" component={Film} />
                <Route path="/Detail/:id" component={FilmDetail} />
                <Route path="/Actor" component={Actor} /> 
                {/* <ProtectedRoute path="/Actor" component={Actor} />  */}
                </Switch>
            </Router>
        )
    }
}

export default Routes;