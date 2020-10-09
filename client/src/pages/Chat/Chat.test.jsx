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

  it('hides users on overlay click', () => {
    const wrapper = shallow(<Chat history={{ goBack: jest.fn() }} />);
    wrapper.find('.users-button').simulate('click');
    wrapper.find('.overlay').simulate('click');
    expect(wrapper.find('.chat-users-container').props().className).toBe('chat-users-container');
  });

  it('hides users on overlay keydown', () => {
    const wrapper = shallow(<Chat history={{ goBack: jest.fn() }} />);
    wrapper.find('.users-button').simulate('click');
    wrapper.find('.overlay').simulate('keyPress', { keyCode: 13 });
    expect(wrapper.find('.chat-users-container').props().className).toBe('chat-users-container');
  });

  it('calls history.push when socket is undefined', () => {
    const context = {
      socket: {
        connected: undefined,
      },
      name: '',
      room: '',
    };
    const history = { push: jest.fn() };
    const useEffect = jest.spyOn(React, 'useEffect');
    const useContext = jest.spyOn(React, 'useContext');
    useContext.mockImplementationOnce(() => context);
    useEffect.mockImplementationOnce((f) => f());

    shallow(<Chat a="d" history={history} />);
    expect(history.push).toHaveBeenCalledWith('/');
    expect(history.push).not.toHaveBeenCalledWith('/chat');
    useEffect.mockRestore();
    useContext.mockRestore();
  });

  it('calls socket.on when socket is defined', () => {
    const context = {
      socket: {
        connected: true,
        on: jest.fn(),
      },
      name: '',
      room: '',
    };
    const useEffect = jest.spyOn(React, 'useEffect');
    const useContext = jest.spyOn(React, 'useContext');
    useContext.mockImplementationOnce(() => context);
    useEffect.mockImplementationOnce((f) => f());

    shallow(<Chat history={{ push: jest.fn() }} />);

    expect(context.socket.on).toHaveBeenCalledWith('message', expect.any(Function));
    expect(context.socket.on).toHaveBeenCalledWith('roomData', expect.any(Function));
    useEffect.mockRestore();
    useContext.mockRestore();
  });
});
