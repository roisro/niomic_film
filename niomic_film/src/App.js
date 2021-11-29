import React, {Component} from 'react';
import {Button} from 'semantic-ui-react'
import {connect} from 'react-redux'

class App extends Component {
  render() {
  return (
    <div>
      <Button primary>{this.props.tes}</Button>
    </div>
  );}
}

const stateApp = (state) => {
  return {
    tes : state.test
  }
}

export default connect(stateApp) (App);