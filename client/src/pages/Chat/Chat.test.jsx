import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import Chat from './Chat';
import UserContext from '../../context/UserContext';
import { Socket } from 'socket.io-client';

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

  it('hides users on overlay click', () => {
    const wrapper = shallow(<Chat history={{ goBack: jest.fn() }} />);
    wrapper.find('.users-button').simulate('click');
    wrapper.find('.overlay').simulate('click');
    expect(wrapper.find('.chat-users-container').props().className).toBe('chat-users-container')
  });

  it('hides users on overlay keydown', () => {
    const wrapper = shallow(<Chat history={{ goBack: jest.fn() }} />);
    wrapper.find('.users-button').simulate('click');
    wrapper.find('.overlay').simulate('keyPress', {keyCode: 13});
    expect(wrapper.find('.chat-users-container').props().className).toBe('chat-users-container')
  });

  it('calls history.push when socket is undefined', () => {
    const context = {
      socket: {
        connected: undefined
      },
      name: '',
      room: ''
    }
    const history = { goBack: jest.fn(), push: jest.fn() }
    const useEffect = jest.spyOn(React, "useEffect");
    const useContext = jest.spyOn(React, "useContext");
    useContext.mockImplementationOnce(() => context);
    useEffect.mockImplementationOnce(f => f());

    const wrapper = shallow(<Chat a='d' history={history} />);
    expect(history.push).toHaveBeenCalledWith('/');
    expect(history.push).not.toHaveBeenCalledWith('/chat');
    useEffect.mockRestore();
    useContext.mockRestore();
  });
});
