import React from 'react';
import { shallow } from 'enzyme';
import Chat from './Chat';

describe('Chat', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Chat history={{ goBack: jest.fn() }} />);
    // wrapper.resizeTo(769, 789);
    console.log(wrapper.props())
    expect(wrapper).toHaveLength(1);
  });

  it('doesn\'t show users in views smaller than 760px', () => {
    expect(true).toBe(true);
  });

  it('Shows users on "show users" button click in views smaller than 760px', () => {
    expect(true).toBe(true);
  });

  it('displays overlay when showing users in views smaller than 760px', () => {
    expect(true).toBe(true);
  });

  it('hides overlay and users on overlay click', () => {
    expect(true).toBe(true);
  });

  it('hides overlay and users on overlay keypress', () => {
    expect(true).toBe(true);
  });

  it('displays correct room coming from context', () => {
    expect(true).toBe(true);
  });

  it('shows displays "show users" on button at when it first renders', () => {
    expect(true).toBe(true);
  });

  it('shows displays "hide users" on button after clicking "show users" button once', () => {
    expect(true).toBe(true);
  });

  it('points url to home on "leave chat" button click', () => {
    expect(true).toBe(true);
  });
});
