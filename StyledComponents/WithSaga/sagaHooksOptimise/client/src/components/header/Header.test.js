import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { mount } from 'enzyme';
import { Provider } from "react-redux";
import Header from './Header';
import { mockStore } from '../../test/testUtils';
import CartDropdown from '../cart-dropdown/CartDropdown';
import * as redux from 'react-redux';
import { signOutStart } from "../../redux/user/userActions";

const store = mockStore({});

describe('Header component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
        <Provider store={store}>
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        </Provider>);
  });

  it('Should render Header component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render sign in link when no current user', () => {
    expect(
      wrapper
        .find('OptionLink')
        .at(2)
        .text()
    ).toBe('SIGN-IN');
  });

})

describe('Header component with user logged in', () => {
    let wrapper1;
    let spyOnUseDispatch;
    let mockDispatch;
    const store1 = mockStore({
        user: {
            currentUser: {
                uid: '123'
              }
        }
    });

    beforeEach(() => {
    spyOnUseDispatch = jest.spyOn(redux, 'useDispatch');
    // Mock dispatch function returned from useDispatch
    mockDispatch = jest.fn();
    spyOnUseDispatch.mockReturnValue(mockDispatch);
      wrapper1 = mount(
          <Provider store={store1}>
              <BrowserRouter>
                  <Header />
              </BrowserRouter>
          </Provider>);
    });
  
    it('Should render sign in link when no current user', () => {
      expect(
        wrapper1
          .find('OptionLink')
          .at(2)
          .text()
      ).toBe('SIGN-OUT');
    });

    it('Should call signOutStart method when link is clicked', () => {
        wrapper1
          .find('OptionLink')
          .at(2)
          .simulate('click');
          expect(mockDispatch).toHaveBeenCalled();
          expect(mockDispatch).toHaveBeenCalledWith(signOutStart());
      });
  })

  describe('If hidden is true then CartDropdown should be showing', () => {
    const mockCartItems = [{ id: 1 }, { id: 2 }, { id: 3 }]
    const storeHiddenFalse = mockStore({
        cart: {
            hidden: false,
            cartItems: mockCartItems
        }
    });

    let wrapperHiddenFalse;
    
    beforeEach(() => {
      wrapperHiddenFalse = mount(
          <Provider store={storeHiddenFalse}>
              <BrowserRouter>
                  <Header />
              </BrowserRouter>
          </Provider>);
    });

    it('should not render CartDropdown', () => {
      expect(wrapperHiddenFalse.exists(CartDropdown)).toBe(true);
    });
  });