import React, { Component } from 'react';
import { render } from 'react-dom';
import { Route } from 'react-router-dom';
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3000')

export default class Game extends Component {
	constructor(props) {
		super(props)
		this.state = {
			userName: '',
			currentClue: {},
			category: '',
			userAnswer: '',
			status: '',
			displayAnswer: 'take a guess to see the correct answer',
		}

		socket.on('nextClue', (clue, obj) => {
			this.setState({ currentClue: clue, category: obj.title })
		})

		socket.on('announceWinner', (obj) => {
			this.setState({ status: obj.userName, displayAnswer: this.state.currentClue.answer})
			this.props.setScore(obj, this.state.currentClue.value)
		})

		socket.on('deduct', (obj) => {
			this.props.setScore(obj, this.state.currentClue.value)
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

		this.setUserName()
		setTimeout(() => {
			if(clueAns.includes(userAns) && percentage > .5){
				this.setState({status: 'WINNER'});
				socket.emit('checkWinner', {userName: this.state.userName, answer: 'correct'})
			} else {
				this.setState({status: 'LOSER'});
				socket.emit('wrong', {userName: this.state.userName, answer: 'incorrect'})

		}

		},250)
		
		this.displayAnswer();
	}

	displayAnswer(){
		this.setState({displayAnswer: this.state.currentClue.answer})
	}

	setUserName() {
		this.setState({ userName: this.props.currentUser })
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
