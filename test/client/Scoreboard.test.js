import React from 'react';
import { shallow } from 'enzyme';
import {Scoreboard} from '../../app/components/Scoreboard';

describe('Scoreboard Tests', () => {
  it('should generate a user card', () => {
    const wrapper = shallow(<Scoreboard history={''} users={{mortician: 0}} />);

    expect(wrapper.find(".scoreboard-wrapper").length).toEqual(1);
  });  
});
