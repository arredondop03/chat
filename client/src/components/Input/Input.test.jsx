import React from 'react';
import { shallow, mount } from 'enzyme';
import Input from './Input';

describe('Input', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Input />);
    expect(wrapper).toHaveLength(1);
  });

  it('calls setMessage on onChange', () => {
    const setMessage = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setMessage]);

    const wrapper = shallow(<Input />);
    wrapper.find('.input-area').simulate('change', { target: { value: 'a' } });
    expect(setMessage).toHaveBeenCalledWith('a');
    useStateSpy.mockRestore();
  });

  // it('calls sendMessage on onKeyPress with Enter', () => {
  // const context = {
  //   socket: {
  //     connected: true,
  //     emit: jest.fn(),
  //   },
  // };
  // const useContext = jest.spyOn(React, 'useContext');
  // useContext.mockImplementationOnce(() => context);

  // const wrapper = mount(<Input />);
  // wrapper.sendMessage = jest.fn();
  // const sendMessageSpy = jest.spyOn(wrapper, 'sendMessage');
  // wrapper.find('.input-area').simulate('change', { target: { value: 'a' } });
  // wrapper.find('.input-area').simulate('keyPress', { key: 'Enter', preventDefault: jest.fn() });

  // expect(wrapper.sendMessage).toHaveBeenCalledTimes(1);
  // expect(wrapper.sendMessage).toHaveBeenCalledWith({ key: 'Enter' });
  // useContext.mockRestore();
  // });

  // it('calls setMessage on onChange', () => {
  //   const context = {
  //     socket: {
  //       connected: true,
  //       emit: jest.fn()
  //     },
  //   }
  //   const useContext = jest.spyOn(React, "useContext");
  //   useContext.mockImplementationOnce(() => context);

  //   const wrapper = shallow(<Input />);
  //   wrapper.find('.input-area').simulate('change', { target: { value: 'a' } });
  //   wrapper.find('.input-area').simulate('keyPress', { preventDefault: jest.fn(), key: 'Enter' });
  //   console.log(context.socket.emit)
  //   expect(context.socket.emit).toHaveBeenCalledWith('sendMessage', 'a');

  //   useContext.mockRestore();
  // });

  // it('does not call sendMessage on onKeyPress with "a"', () => {
  //   const sendMessageMock = jest.fn();
  //   const wrapper = shallow(<Input />);
  //   wrapper.find('.input-area').simulate('keyPress', { key: 'a' });
  //   expect(sendMessageMock).not.toHaveBeenCalled();
  //   expect(sendMessageMock).not.toHaveBeenCalledWith({ key: 'a' });
  // });

  // it('calls sendMessage on click', () => {
  //   const sendMessageMock = jest.fn();
  //   const wrapper = shallow(<Input />);
  //   wrapper.find('.input-send-button').simulate('click');
  //   expect(sendMessageMock).toHaveBeenCalledTimes(1);
  // });
});
