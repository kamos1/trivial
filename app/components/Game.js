import React, { Component } from 'react';
import { render } from 'react-dom';
import { Route } from 'react-router-dom';

export default class Game extends Component {
	constructor() {
		super()
		this.state = {
			currentClue: {},
			userAnswer: ''
		}
	}

	componentWillMount() {
		fetch('/api/v1/category/sports')
		.then((res) => res.json())
		.then((clue) => this.setState({ currentClue: clue }))
	}

	render() {
		return(
			<section>
				<section className='question'>
					<p>{this.state.currentClue.category}</p>
					<p>{this.state.currentClue.question}</p>
				</section>
				<div className='answer-append'></div>
				<input type='text' className='user-answer' placeholder='Your Answer'/>
				<input type='submit' className='answer-submit'/>
			</section>
		)
	}
}