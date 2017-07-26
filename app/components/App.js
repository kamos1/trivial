import React, { Component } from 'react';
import { render } from 'react-dom';
import { Route } from 'react-router';
import Controls from './Controls';
import Game from './Game'
import openSocket from 'socket.io-client';
import display from '../socket-api';

const socket = openSocket('http://localhost:3000')

export default class App extends Component {
  constructor(){
    super()
    this.state = {
      users: {}
    }

    socket.on('newUser', (username) => {
      this.setState({ users: Object.assign({}, this.state.users, {[username]: 0}) })
    })
  }




  render(){
    return(
      <section>
        <Controls />
        <Game />
      </section>
    )
  }
}
