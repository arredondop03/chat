import React from 'react';
import { shallow } from 'enzyme';
import Modal from './Modal';

import { UserContext } from '../../context/UserContext';

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

describe('Modal', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Modal />);
    expect(wrapper).toHaveLength(1);
  });
  it('sets showModal state to false', () => {
    const useContextSpy = jest.spyOn(React, 'useContext');
    useContextSpy.mockImplementationOnce(() => UserContext);

    const wrapper = shallow(<Modal />);
    wrapper.find('.modal-close-button').simulate('click');
    expect(UserContext.setShowModal).toHaveBeenCalled();


    expect(wrapper).toHaveLength(1);

    useContextSpy.mockRestore();
  });
//   it('checks that Message component renders once', () => {
//     const messages = [
//       { id: '1', sender: 'paola', text: 'hello' },
//     ];
//     const wrapper = shallow(<Modal messages={messages} currentUser="paola" />);
//     expect(wrapper.find('Message')).toHaveLength(1);
//   });
//   it('checks that Message component renders twice', () => {
//     const messages = [
//       { id: '1', sender: 'paola', text: 'hello' },
//       { id: '2', sender: 'paolah', text: 'hello 1' },
//     ];
//     const wrapper = shallow(<Modal messages={messages} currentUser="paola" />);
//     expect(wrapper.find('Message')).toHaveLength(2);
//   });
});
