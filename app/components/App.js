import React, { Component } from 'react';
import { render } from 'react-dom';
import { Route } from 'react-router';
import Controls from './Controls';
import openSocket from 'socket.io-client';
import display from '../socket-api';

const socket = openSocket('http://localhost:3000')

export default class App extends Component {
  constructor(){
    super()
    this.state = {
      users: {}
    }
    socket.on('newUser', (msg) => {
      console.log('newUser hooked up')
      // this.setState({ users: Object.assign({}, this.state.users, {msg: 0}) })
    })
  }



  render(){
    return(
      <section>
        <Controls />
        <p>IT WORKS</p>
      </section>
    )
  }
}
