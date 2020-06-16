import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Switch, Route, Redirect } from 'react-router-dom';

import { App } from './App';

configure({ adapter: new Adapter() });

// test('renders learn react link', () => {
//   const { getByText } = render(<App/>);
//   const linkElement = getByText(/routes/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe('<App/>', () => {


  test('renders learn react link', () => {
    const wrapper = shallow(<App onTryAutoSignUp={() => {
    }}/>);
    wrapper.setProps({ isAuth: true });
    expect(wrapper.find(Switch)).toHaveLength(1);
    expect(wrapper.find(Route)).toHaveLength(5);
    expect(wrapper.find(Redirect)).toHaveLength(1);
  });
});

