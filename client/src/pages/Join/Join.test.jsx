import React from 'react';
import { shallow } from 'enzyme';
import io from 'socket.io-client';
import Join from './Join';

jest.mock('socket.io-client');

describe('Join', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Join />);
    expect(wrapper).toHaveLength(1);
  });

  it('calls setState when changing username input', () => {
    const setFormUsername = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setFormUsername]);
    const joinWrapper = shallow(<Join />);
    joinWrapper.find('#username').simulate('change', { target: { value: 'MyUsername' } });
    expect(setFormUsername).toHaveBeenCalledWith('MyUsername');
    expect(setFormUsername).toHaveBeenCalledTimes(1);
    useStateSpy.mockRestore();
  });

  it('calls setState when changing room input', () => {
    const setFormRoom = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setFormRoom]);
    const joinWrapper = shallow(<Join />);
    joinWrapper.find('#room').simulate('change', { target: { value: '1' } });
    expect(setFormRoom).toHaveBeenCalledWith('1');
    expect(setFormRoom).toHaveBeenCalledTimes(1);
    useStateSpy.mockRestore();
  });

  it('calls preventDefault when no username or room exists', () => {
    const preventDefaultSpy = jest.fn();
    const event = { preventDefault: preventDefaultSpy };
    const joinWrapper = shallow(<Join />);
    joinWrapper.find('Link').simulate('click', event);
    expect(preventDefaultSpy).toHaveBeenCalledTimes(1);
  });

  it('joins socket on Link click', () => {
    // Arrange
    const mockEmit = jest.fn();
    io.mockImplementationOnce(() => ({ emit: mockEmit }));

    const event = { preventDefault: jest.fn() };
    const setFormRoom = jest.fn();
    const setFormUsername = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');

    useStateSpy.mockImplementationOnce(() => ['paola', setFormUsername]);
    useStateSpy.mockImplementationOnce(() => ['4434', setFormRoom]);

    // Act
    const joinWrapper = shallow(<Join />);
    joinWrapper.find('Link').simulate('click', event);

    // Assert
    expect(io).toHaveBeenCalledWith('localhost:5000');
    expect(mockEmit).toHaveBeenCalledWith('join', { name: 'paola', room: '4434' }, expect.any(Function));
  });
});
