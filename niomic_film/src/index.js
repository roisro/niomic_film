import React from 'react';
import ReactDOM from 'react-dom';

import Routes from './Routes';
import 'semantic-ui-css/semantic.min.css'
import { Auth0Provider } from "@auth0/auth0-react";
import {createStore} from 'redux'
import {Provider} from 'react-redux'

const stateFilm = {
  test : 'test redux'
}

const reducerFilm = (state=stateFilm) => {
  return state
}

const store = createStore(reducerFilm)

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
    domain="dev-ekejek3o.us.auth0.com"
    clientId="8QTJOQ1qBXf4uoWL8Xreu13zTseQ2d1C"
    redirectUri={window.location.origin}
  >
    <Provider store={store} >
    <Routes />
    </Provider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

