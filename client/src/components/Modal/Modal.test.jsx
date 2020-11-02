import React from 'react';
import { shallow } from 'enzyme';
import Modal from './Modal';

describe('Modal', () => {
  it('renders without crashing', () => {
    const messages = [
      { id: '1', sender: 'paola', text: 'hello' },
    ];
    const wrapper = shallow(<Modal messages={messages} currentUser="paola" />);
    expect(wrapper).toHaveLength(1);
  });
//   it('checks that Message component recives right props', () => {
//     const messages = [
//       { id: '1', sender: 'paola', text: 'hello' },
//     ];
//     const wrapper = shallow(<Modal messages={messages} currentUser="paola" />);
//     expect(wrapper.find('Message').props()).toEqual({ message: { id: '1', sender: 'paola', text: 'hello' }, currentUser: 'paola' });
//   });
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
