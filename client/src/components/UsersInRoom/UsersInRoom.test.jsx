import React from 'react';
import { shallow } from 'enzyme';
import UsersInRoom from './UsersInRoom';

describe('UsersInRoom', () => {
  it('renders without crashing', () => {
    const users = [
      {
        id: '1',
        name: 'Paola',
        room: '12',
      },
    ];
    const wrapper = shallow(<UsersInRoom usersInRoom={users} />);
    expect(wrapper).toHaveLength(1);
  });
  it('displays zero users', () => {
    const users = [];
    const wrapper = shallow(<UsersInRoom usersInRoom={users} />);
    expect(wrapper.find('.user-in-chat')).toHaveLength(0);
  });
  it('displays one user', () => {
    const users = [
      {
        id: '1',
        name: 'Paola',
        room: '12',
      },
    ];
    const wrapper = shallow(<UsersInRoom usersInRoom={users} />);
    expect(wrapper.find('.user-in-chat')).toHaveLength(1);
    expect(wrapper.find('.user-in-chat').text()).toEqual('Paola');
  });
  it('displays two users', () => {
    const users = [
      {
        id: '1',
        name: 'Paola',
        room: '12',
      },
      {
        id: '2',
        name: 'Rafael',
        room: '12',
      },
    ];
    const wrapper = shallow(<UsersInRoom usersInRoom={users} />);
    expect(wrapper.find('.user-in-chat')).toHaveLength(2);
    wrapper.find('.user-in-chat').forEach((user, index) => {
      expect(user.text()).toEqual(users[index].name);
    });
  });
});
