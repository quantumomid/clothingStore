import React from 'react';
import { mount } from 'enzyme';
import { Provider } from "react-redux";
import { mockStore } from '../../test/testUtils';
import Checkout from './Checkout';

const mockCartItems = [        
    {
    id: 3,
    name: 'Brown Cowboy',
    imageUrl: 'https://i.ibb.co/QdJwgmp/brown-cowboy.png',
    quantity: 1,
    price: 35
  },
  {
    id: 4,
    name: 'Grey Brim',
    imageUrl: 'https://i.ibb.co/RjBLWxB/grey-brim.png',
    quantity: 1,
    price: 25
  }]

const store = mockStore({
    cart: {
        cartItems: mockCartItems
    }
});

describe('Checkout Page Component', () => {
  let wrapper;

  beforeEach(() => {


    wrapper = mount(
        <Provider store={store}>
            <Checkout />
        </Provider>);
  });

    it('Should Render Checkout Page Component', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('Should render the total price of the checkout items', () => {
        const price = wrapper.find('TotalContainer').children().children().text();
        // console.log(wrapper.find('TotalContainer').children().children().text());
        // console.log(wrapper.find('TotalContainer').childAt(0).debug());
        expect(price).toMatch("£60");
    });

})