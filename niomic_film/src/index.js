import React from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import Routes from './Routes';
import 'semantic-ui-css/semantic.min.css'
import { Auth0Provider } from "@auth0/auth0-react";
import {createStore} from 'redux'
import {Provider} from 'react-redux'

const stateFilm = {
  activeItems : 'home'
}

const reducerFilm = ( state = stateFilm, action) => {
  console.log("action nya ", action)
  switch(action.type){
    case "ACTIVE_ITEM":
      var stateActiveItems = {...state, activeItems : action.activeItem}
      return stateActiveItems
      default:
        return state
  }
}

const store = createStore(reducerFilm)

ReactDOM.render(
  
    <Auth0Provider
    domain="dev-ekejek3o.us.auth0.com"
    clientId="8QTJOQ1qBXf4uoWL8Xreu13zTseQ2d1C"
    redirectUri={window.location.origin}
  >
    <Provider store={store} >
    <Routes />
    </Provider>
    </Auth0Provider>
  ,
  document.getElementById('root')
);

