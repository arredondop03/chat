import React from 'react';
import { shallow } from 'enzyme';
import Message from './Message';

describe('Message', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Message message={{ text: 'hey', sender: 'paola' }} currentUser="paola" />);
    expect(wrapper).toHaveLength(1);
  });
  it('shows that message was sent by current user', () => {
    const names = [
      { rawName: 'paola', finalName: 'paola' },
      { rawName: 'PaOla', finalName: 'paola' },
      { rawName: ' paola ', finalName: 'paola' },
    ];
    names.forEach((name) => {
      const wrapper = shallow(<Message message={{ text: 'hey', sender: 'paola' }} currentUser={name.rawName} />);
      expect(wrapper.find('.message-user-container')).toHaveLength(1);
      expect(wrapper.find('.message-user-name').text()).toEqual(name.finalName);
    });
  });
  it('shows that message was sent by friend', () => {
    const wrapper = shallow(<Message message={{ text: 'hey', sender: 'rafael' }} currentUser="paola" />);
    expect(wrapper.find('.message-user-container')).toHaveLength(0);
    expect(wrapper.find('.message-friend-name').text()).toEqual('rafael');
  });
  it('displays message correctly', () => {
    const wrapper = shallow(<Message message={{ text: 'iuhg7', sender: 'rafael' }} currentUser="paola" />);
    expect(wrapper.find('.message-box > p').text()).toEqual('iuhg7');
  });
});
