import React from 'react';
import { Router, Route, MemoryRouter } from 'react-router';
import { shallow, mount } from 'enzyme';
import Controls from '../../app/components/Controls';

describe('Controls component tests', () => {

	it('should update the user name...in state', () => {
		const mock = jest.fn();
		const wrapper = mount(<Controls setUserName={ ()=> mock } history={''}/>);
		const input = wrapper.find('#input-field');
		const button = wrapper.find('#submit-btn');

		input.simulate('change', { target: {value: 'Trebek' } });
		expect(wrapper.state('userName')).toEqual('Trebek');
		button.simulate('click');
		expect(wrapper.state('userName')).toEqual('');
	});

});