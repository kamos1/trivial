import React, { Component } from 'react';
import { render } from 'react-dom';
import { Route } from 'react-router';
import Controls from './Controls'
import openSocket from 'socket.io-client'
import display from '../socket-api'

const socket = openSocket('http://localhost:3000')

export default class App extends Component {
  constructor(){
    super()
    socket.on('connect', () => {
      console.log('msg');
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
