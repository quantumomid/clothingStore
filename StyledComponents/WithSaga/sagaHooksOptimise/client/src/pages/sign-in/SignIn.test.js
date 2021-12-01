import React from 'react';
import { shallow } from 'enzyme';
import SignIn from "./SignIn"; 

it('should render SignInAndSignUpPage component', () => {
  expect(shallow(<SignIn />)).toMatchSnapshot();
});