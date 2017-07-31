import React, { Component } from 'react';
import { render } from 'react-dom';
import { Route } from 'react-router-dom';
import Controls from './Controls';
import Game from './Game'
import { Scoreboard } from './Scoreboard'
import { Navigation } from './Navigation'
import openSocket from 'socket.io-client';
import display from '../socket-api';

// const socket = openSocket(process.env.PORT || 'http://localhost:8081')
 const socket = io();
 console.log(socket)
 
export default class App extends Component {
  constructor(){
    super()
    this.state = {
      users: {},
      currentUser: ''
    }

    socket.on('works', (msg) => {
      console.log(msg)
    })

    socket.on('newUser', (username) => {
      this.setState({ users: Object.assign({}, this.state.users, {[username]: 0}) })
    })
  }

  setUserName(name) {
    this.setState({ currentUser: name })
  }

  setScore(obj, value=200) {
    if (obj.answer === 'correct') {
      this.state.users[obj.userName] += value
      this.setState({users: this.state.users})
    } else {
      this.state.users[obj.userName] -= value
      this.setState({users: this.state.users})
    }
  }


  render(){
    return(
      <section>
        <Navigation />
        <Route exact path='/' render={({ history }) => (
            <Controls history={ history } setUserName={this.setUserName.bind(this)}/>
        )}/>
        <Route exact path='/game' render={({ history }) => (
          <div>
            <Game history={ history } currentUser={this.state.currentUser} setScore={this.setScore.bind(this)}/>
            <Scoreboard history={ history } users={this.state.users}/>
          </div>
        )}/>
      </section>
    )
  }
}
