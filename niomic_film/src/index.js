import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import 'semantic-ui-css/semantic.min.css'

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
    <Provider store={store} >
    <Routes />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

