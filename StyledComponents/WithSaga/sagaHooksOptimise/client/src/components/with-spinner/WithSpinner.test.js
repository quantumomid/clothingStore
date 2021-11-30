import React from 'react';
import { shallow } from 'enzyme';
import WithSpinner from "./WithSpinner";
import Spinner from "../spinner/Spinner";

describe('WithSpinner HOC', () => {

    const TestComponent = () => <div className='test' />;
    const TestComponentWithSpinnerHOC = WithSpinner(TestComponent);
  
    describe('When loading is true', () => {

      it('Should render the Spinner component', () => {
        const wrapper = shallow(<TestComponentWithSpinnerHOC isLoading={true} />);
        expect(wrapper.exists(Spinner)).toBe(true);
      });
  
      it('And should not render component', () => {
        const wrapper = shallow(<TestComponentWithSpinnerHOC isLoading={true} />);
        expect(wrapper.exists(TestComponent)).toBe(false);
      });

    });
  
    describe('When loading is false', () => {

      it('Should render the actual component', () => {
        const wrapper = shallow(<TestComponentWithSpinnerHOC isLoading={false} />);
        expect(wrapper.exists(TestComponent)).toBe(true);
      });
  
      it('And the spinner should not be rendered', () => {
        const wrapper = shallow(<TestComponentWithSpinnerHOC isLoading={false} />);
        expect(wrapper.exists(Spinner)).toBe(false);
      });
      
    });

  });
