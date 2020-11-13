import React from 'react';
import { shallow } from 'enzyme';
import io from 'socket.io-client';
import Join from './Join';
import { UserContext } from '../../context/UserContext';

jest.mock('socket.io-client', () => {
  const emit = jest.fn();
  const on = jest.fn();
  const socket = { emit, on };
  return jest.fn(() => socket);
});

jest.mock('../../context/UserContext', () => {
  const context = {
    showModal: false,
    setShowModal: jest.fn(),
    setSocket: jest.fn(),
    setName: jest.fn(),
    setRoom: jest.fn(),
  };
  return context;
});

describe('Join', () => {
  let useContextSpy;
  beforeEach(() => {
    useContextSpy = jest.spyOn(React, 'useContext');
    useContextSpy.mockImplementationOnce(() => UserContext);
  });

  afterEach(() => {
    useContextSpy.mockRestore();
  });

  it('renders without crashing', () => {
    // Act
    const wrapper = shallow(<Join history={{ push: jest.fn() }} />);

    // Assert
    expect(wrapper).toHaveLength(1);
  });

  it('calls setState when changing username input', () => {
    // Arrange
    const setFormUsername = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setFormUsername]);

    // Act
    const wrapper = shallow(<Join history={{ push: jest.fn() }} />);
    wrapper.find('#username').simulate('change', { target: { value: 'MyUsername' } });

    // Assert
    expect(setFormUsername).toHaveBeenCalledWith('MyUsername');
    expect(setFormUsername).toHaveBeenCalledTimes(1);
    useStateSpy.mockRestore();
  });

  it('calls setState when changing room input', () => {
    // Arrange
    const setFormRoom = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setFormRoom]);

    // Act
    const wrapper = shallow(<Join history={{ push: jest.fn() }} />);
    wrapper.find('#room').simulate('change', { target: { value: '1' } });

    // Assert
    expect(setFormRoom).toHaveBeenCalledWith('1');
    expect(setFormRoom).toHaveBeenCalledTimes(1);
    useStateSpy.mockRestore();
  });

  it('calls preventDefault when no username or room exists', () => {
    // Arrange
    const preventDefaultSpy = jest.fn();
    const event = { preventDefault: preventDefaultSpy };

    // Act
    const wrapper = shallow(<Join history={{ push: jest.fn() }} />);
    wrapper.find('.join-button').simulate('click', event);

    // Assert
    expect(preventDefaultSpy).toHaveBeenCalledTimes(1);
  });

  it('calls all functions inside join', () => {
    // Arrange
    const event = { preventDefault: jest.fn() };
    const setFormRoom = jest.fn();
    const setFormUsername = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');

    useStateSpy.mockImplementationOnce(() => ['paola', setFormUsername]);
    useStateSpy.mockImplementationOnce(() => ['4434', setFormRoom]);

    //  Act
    const wrapper = shallow(<Join history={{ push: jest.fn() }} />);
    wrapper.find('.join-button').simulate('click', event);

    //  Assert
    expect(io).toHaveBeenCalledWith('localhost:5000', { reconnection: false });
    expect(io().emit).toHaveBeenCalledWith('join', { name: 'paola', room: '4434' }, expect.any(Function));
    expect(UserContext.setName).toHaveBeenCalledWith('paola');
    expect(UserContext.setRoom).toHaveBeenCalledWith('4434');
    expect(UserContext.setSocket).toHaveBeenCalledWith(
      expect.objectContaining({ emit: expect.any(Function), on: expect.any(Function) }),
    );
    expect(UserContext.setSocket).toHaveBeenCalledWith(io());

    //  clear mocks
    useStateSpy.mockRestore();
    io.mockRestore();
  });
});
