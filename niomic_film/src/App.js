import React, {Component} from 'react';
import {connect} from 'react-redux'
import LoginButton from './components/login-button';
import LogoutButton from './components/logout-button';

class App extends Component {
  render() {
  return (
    <div>
      <LoginButton />
      <LogoutButton />
    </div>
  );}
}

const stateApp = (state) => {
  return {
    tes : state.test
  }
}

export default connect(stateApp) (App);