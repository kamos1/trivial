import React, { Component } from 'react';
import { render } from 'react-dom';
import { Route } from 'react-router-dom';


export default class App extends Component {
  constructor(props){
    super(props)
  }

  componentWillMount(){
  }

  render(){
    return(
      <section>
        <p>IT WORKS</p>
      </section>
    )
  }
}
