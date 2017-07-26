import React, { Component } from 'react';
import { render } from 'react-dom';
import { Route } from 'react-router-dom';
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3000')

export default class Game extends Component {
	constructor() {
		super()
		this.state = {
			currentClue: {},
			category: '',
			userAnswer: '',
			status: '',
			displayAnswer: 'take a guess to see the correct answer',
		}

		socket.on('nextClue', (clue, obj) => {
			this.setState({ currentClue: clue, category: obj.title })
		})
		socket.on('announceWinner', (person, answer) => {
			this.setState({ status: person, displayAnswer: this.state.currentClue.answer})
		})
	}

	fetchQuestion (){
		fetch('/api/v1/category')
			.then((res) => res.json())
			.then((obj) => {
				fetch(`/api/v1/category/${obj.title}`)
					.then((res) => res.json())
					.then((clue) => {
						this.setState({ currentClue: clue, category: obj.title })
						socket.emit('newQuestion', clue, obj)
					})
			})
	}

	handleSubmit (){
		let userAns = this.state.userAnswer.toLowerCase();
		let clueAns = this.state.currentClue.answer.toLowerCase();
		let percentage = userAns.length/clueAns.length
		console.log(percentage);
		
		if(clueAns.includes(userAns) && percentage > .5){
			this.setState({status: 'WINNER'});
			socket.emit('checkWinner', userAns)
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
					<p>Category: {this.state.category.toUpperCase()}</p>
					<p>Clue: {this.state.currentClue.question}</p>
					<p>{this.state.status}</p>
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