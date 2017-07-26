import React, { Component } from 'react';
import { render } from 'react-dom';
import { Route } from 'react-router-dom';

export default class Game extends Component {
	constructor() {
		super()
		this.state = {
			currentClue: {},
			category: '',
			userAnswer: '',
			status: '',
			displayAnswer: 'take a guess to see the correct answer'
		}
	}

	componentWillMount() {
		this.fetchQuestion();
	}

	fetchQuestion (){
		fetch('/api/v1/category')
			.then((res) => res.json())
			.then((obj) => {
				fetch(`/api/v1/category/${obj.title}`)
					.then((res) => res.json())
					.then((clue) => this.setState({ currentClue: clue, category: obj.title }))
			})
	}

	handleSubmit (){
		if(this.state.userAnswer === this.state.currentClue.answer){
			this.setState({status: 'WINNER'});
		} else {
			this.setState({status: 'LOSER'});
		}
		this.displayAnswer();
	}

	displayAnswer(){
		this.setState({displayAnswer: this.state.currentClue.answer})
	}

	render() {
		return(
			<section>
				<section className='question'>
					<p>Category: {this.state.category}</p>
					<p>Clue: {this.state.currentClue.question}</p>
					<p>You are a: {this.state.status}</p>
					<p>The correct answer is: {this.state.displayAnswer}</p>
				</section>
				<div className='answer-append'></div>
				<input 	type='text'
								className='user-answer'
								placeholder='Your Answer'
								value={this.state.userAnswer}
								onChange={(e) => this.setState({userAnswer: e.target.value})}
				/>
				<input type='submit' className='answer-submit' onClick={(e) => this.handleSubmit(e)}/>
				<button onClick={() => this.fetchQuestion()}>New Question</button>
			</section>
		)
	}
}
