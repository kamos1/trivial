import React, { Component } from 'react';
import { render } from 'react-dom';
import { Route } from 'react-router-dom';
import { inputUsername } from '../socket-api.js';


export default class Controls extends Component {
  constructor(){
    super()
    this.state = {
      userName: ''
    }
  }

  handleClick () {
    this.props.setUserName(this.state.userName)
    inputUsername(this.state.userName)
    this.setState({ userName: '' })
  }

  handleUserInput (e) {
    this.setState({ userName: e.target.value })
  }

  render(){
    return(
      <section>
        <input type='text' placeholder='enter your username' value={this.state.userName} onChange={(e) => this.handleUserInput(e)} />
        <input type='submit' onClick={() => this.handleClick()} />
      </section>
    )
  }
}
