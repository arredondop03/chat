import React from 'react';
import { shallow } from 'enzyme';
import Join from './Join';

describe('Join', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Join />);
    expect(wrapper).toHaveLength(1);
  });
  it('calls setState when changing an input', () => {
    const setFormUsername = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementationOnce((init) => [init, setFormUsername]);
    const joinWrapper = shallow(<Join />);
    joinWrapper.find('#username').simulate('change', { target: { value: 'MyUsername' } });
    expect(setFormUsername).toHaveBeenCalled();
  });
});
