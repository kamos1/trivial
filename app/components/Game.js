import React, { Component } from 'react';
import { render } from 'react-dom';
import { Route } from 'react-router-dom';

export default class Game extends Component {
	constructor() {
		super()
		this.state = {
			currentClue: {},
			category: '',
			userAnswer: ''
		}
	}

	componentWillMount() {

		fetch('/api/v1/category')
			.then((res) => res.json())
			.then((obj) => {
				fetch(`/api/v1/category/${obj.title}`)
					.then((res) => res.json())
					.then((clue) => this.setState({ currentClue: clue, category: obj.title }))
			})
		}



	render() {
		return(
			<section>
				<section className='question'>
					<p>Category: {this.state.category}</p>
					<p>Clue: {this.state.currentClue.question}</p>
				</section>
				<div className='answer-append'></div>
				<input type='text' className='user-answer' placeholder='Your Answer'/>
				<input type='submit' className='answer-submit'/>
			</section>
		)
	}
}
