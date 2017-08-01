import React, { Component } from 'react';
import { render } from 'react-dom';
import { Route } from 'react-router-dom';
import Controls from './Controls';
import Game from './Game'
import { Scoreboard } from './Scoreboard'
import { Navigation } from './Navigation'
import io from 'socket.io-client';

const socket = io();

export default class App extends Component {
  constructor(){
    super()
    this.state = {
      users: {},
      currentUser: ''
    }

    socket.on('works', (msg) => {
      console.log(msg);
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
      <section className='app-section'>
        <Navigation />
        <Route exact path='/' render={({ history }) => (
            <Controls history={ history } setUserName={this.setUserName.bind(this)}/>
        )}/>
        <Route exact path='/game' render={({ history }) => (
          <div className='game-wrap'>
            <Game history={ history } currentUser={this.state.currentUser} setScore={this.setScore.bind(this)}/>
            <Scoreboard history={ history } users={this.state.users}/>
          </div>
        )}/>
      </section>
    )
  }
}
