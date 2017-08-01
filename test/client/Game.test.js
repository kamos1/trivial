import React from 'react';
import { Router, Route, MemoryRouter } from 'react-router';
import { shallow, mount } from 'enzyme';
import fetchMock from 'fetch-mock';
import Game from '../../app/components/Game';

describe('Game component tests', () => {

	const resolvePromise = () => new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, 2000);
	});

	it('render to the DOM', () => {
		const mock = jest.fn();
		const wrapper = shallow(<Game currentUser={''} history={''} setScore={ () => mock }/>);

		expect(wrapper.is('#game-container')).toEqual(true);
	});

it('should retrieve a question', async () => {
		
		const mock = jest.fn();
		const wrapper = mount(<Game currentUser={''} history={''} setScore={ () => mock }/>);
		const getQuestion = wrapper.find('.new-question-btn');
		const categoryName = {title: "sports"}

		fetchMock.get('/api/v1/category', { status: 200, body: {title: 'sports'} });
		fetchMock.get(`/api/v1/category/${categoryName.title}`, { 
			status: 200, 
			body: {currentClue: { question: "what", answer: "who", value: 200 }, category: 'sports'} });
		
		getQuestion.simulate('click');
		expect(fetchMock.called()).toEqual(true);
		expect(wrapper.state('category')).toEqual('click new question to begin game');
		await resolvePromise();
		expect(wrapper.state('category')).toEqual('sports');
	});

	it('should enter an answer', () => {
		const mock = jest.fn();
		const wrapper = mount(<Game currentUser={''} history={''} setScore={ () => mock }/>);
		const input = wrapper.find('.user-answer');
		const answerButton = wrapper.find('.answer-submit');
		const newQuestionButton = wrapper.find('.new-question-btn');

		newQuestionButton.simulate('click')
		input.simulate('change', { target: {value: 'Trebek' } });
		expect(wrapper.state('userAnswer')).toEqual('Trebek');
	});

});