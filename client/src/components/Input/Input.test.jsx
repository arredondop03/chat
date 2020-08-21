import React from 'react';
import { shallow } from 'enzyme';
import Input from './Input';

describe('Input', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Input message="" setMessage={jest.fn()} sendMessage={jest.fn()} />);
    expect(wrapper).toHaveLength(1);
  });

  it('calls setMessage on onChange', () => {
    const setMessageMock = jest.fn();
    const wrapper = shallow(<Input message="" setMessage={setMessageMock} sendMessage={jest.fn()} />);
    wrapper.find('.input-area').simulate('change', { target: { value: 'a' } });
    expect(setMessageMock).toHaveBeenCalledTimes(1);
    expect(setMessageMock).toHaveBeenCalledWith('a');
  });

  it('calls sendMessage on onKeyPress with Enter', () => {
    const sendMessageMock = jest.fn();
    const wrapper = shallow(<Input message="" setMessage={jest.fn()} sendMessage={sendMessageMock} />);
    wrapper.find('.input-area').simulate('keyPress', { key: 'Enter' });
    expect(sendMessageMock).toHaveBeenCalledTimes(1);
    expect(sendMessageMock).toHaveBeenCalledWith({ key: 'Enter' });
  });

  it('does not call sendMessage on onKeyPress with "a"', () => {
    const sendMessageMock = jest.fn();
    const wrapper = shallow(<Input message="" setMessage={jest.fn()} sendMessage={sendMessageMock} />);
    wrapper.find('.input-area').simulate('keyPress', { key: 'a' });
    expect(sendMessageMock).not.toHaveBeenCalled();
    expect(sendMessageMock).not.toHaveBeenCalledWith({ key: 'a' });
  });

  it('calls sendMessage on click', () => {
    const sendMessageMock = jest.fn();
    const wrapper = shallow(<Input message="" setMessage={jest.fn()} sendMessage={sendMessageMock} />);
    wrapper.find('.input-send-button').simulate('click');
    expect(sendMessageMock).toHaveBeenCalledTimes(1);
  });
});
