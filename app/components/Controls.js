import React, { Component } from 'react';
import { render } from 'react-dom';
import { Route } from 'react-router-dom';
// import { inputUsername } from '../socket-api.js';
import io from 'socket.io-client';
const socket = io();

export default class Controls extends Component {
  constructor(){
    super()
    this.state = {
      userName: ''
    }
  }

  inputUsername(username) {
    socket.emit('username', username)
  }

  handleClick () {
    this.props.setUserName(this.state.userName)
    inputUsername(this.state.userName)
    this.setState({ userName: '' })
    this.props.history.replace('/game')
  }

  handleUserInput (e) {
    this.setState({ userName: e.target.value })
  }

  render(){
    return(
      <section id='controls'>
        <section id='controls-wrapper'>
          <input id='input-field' type='text' placeholder='Enter Your Username' value={this.state.userName} onChange={(e) => this.handleUserInput(e)} />
          <input id='submit-btn' type='submit' onClick={() => this.handleClick()} />
        </section>
      </section>
    )
  }
}
