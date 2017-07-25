import React, { Component } from 'react';
import { render } from 'react-dom';
import { Route } from 'react-router-dom';
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3000')

export default class App extends Component {
  constructor(){
    super()
  }

  render(){
    return(
      <section>
        <p>IT WORKS</p>
      </section>
    )
  }
}
