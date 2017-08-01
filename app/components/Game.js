import React, { Component } from 'react';
import { render } from 'react-dom';
import { Route } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io();

export default class Game extends Component {
	constructor(props) {
		super(props)
		this.state = {
			userName: '',
			currentClue: {},
			category: 'click new question to begin game',
			userAnswer: '',
			status: '',
			displayAnswer: '',
			submissionStatus: 'disabled',
			onlyGuess:[]
		}

		socket.on('nextClue', (clue, obj) => {
			this.state.onlyGuess.pop()
			this.setState({ currentClue: clue, category: obj.title, submissionStatus:'', onlyGuess: this.state.onlyGuess })
		})

		socket.on('announceWinner', (obj) => {
			this.setState({ status: `${obj.userName} got the correct answer`, displayAnswer: this.state.currentClue.answer, submissionStatus:'disabled'})
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
						this.setState({ currentClue: clue, category: obj.title, status: '', displayAnswer: '', submissionStatus: ''})
						socket.emit('newQuestion', clue, obj)
					})
			})
	}

	handleSubmit (){
		let userAns = this.state.userAnswer.toLowerCase();
		let clueAns = this.state.currentClue.answer.toLowerCase();
		let percentage = userAns.length/clueAns.length
		this.state.onlyGuess.push(userAns)

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
		this.setState({ userAnswer:'' });
	}

	displayAnswer(){
		this.setState({displayAnswer: this.state.currentClue.answer})
	}

	setUserName() {
		this.setState({ userName: this.props.currentUser })
	}

	render() {
		const inputStat = () => {
			if(this.state.onlyGuess.length){
				return 'disabled'
			} else {
				return ''
			}
		}
		return(
			<section id='game-container'>
				<section className='question-wrapper'>
					<section className='question-card'>
						<p>Category: {this.state.category.toUpperCase()}</p>
						<p>{this.state.currentClue.question}</p>
					</section>
				</section>
				<section className='answer-wrapper'>
					<p>{this.state.status}</p>
					<div className='answer-append'></div>
				</section>
				<section className='submission-wrapper'>
					<input
						disabled={inputStat()}
						type='text'
						className='user-answer'
						placeholder='Your Answer'
						value={this.state.userAnswer}
						onChange={(e) => this.setState({userAnswer: e.target.value})}
					/>
					<input disabled={this.state.submissionStatus} type='submit' className='answer-submit' onClick={(e) => this.handleSubmit(e)}/>
					<button className='new-question-btn' onClick={() => this.fetchQuestion()}>New Question</button>
				</section>
			</section>
		)
	}
}
