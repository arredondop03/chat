import React from 'react';
import { shallow } from 'enzyme';
import Chat from './Chat';

describe('Chat', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Chat history={{ goBack: jest.fn() }} />);
    expect(wrapper).toHaveLength(1);
  });

  it('shows overlay on "show users" click', () => {
    const wrapper = shallow(<Chat history={{ goBack: jest.fn() }} />);
    wrapper.find('.users-button').simulate('click');
    expect(wrapper.find('.overlay')).toHaveLength(1);
  });
});
