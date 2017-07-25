import React, { Component } from 'react';
import { render } from 'react-dom';
import { Route } from 'react-router-dom';

export default class Controls extends Component {
  constructor(){
    super()
    this.state = {
      userName: ''
    }
  }


  render(){
    return(
      <section>
        <input type='text' placeholder='enter your username' value={this.state.userName}/>
        <input type='submit'/>
      </section>
    )
  }
}
