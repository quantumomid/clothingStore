import React from 'react';
import { mount } from 'enzyme';
import { Provider } from "react-redux";
import { mockStore } from '../../test/testUtils';
import Collection from "./Collection";
import { BrowserRouter } from "react-router-dom";
import Router from "react-router-dom";
import CollectionItem from "../../components/collection-item/CollectionItem";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: jest.fn(),
}));

const mockCollections = {
    hats: {
    id: 1,
    title: 'Hats',
    routeName: 'hats',
    items: [
      {
        id: 1,
        name: 'Brown Brim',
        imageUrl: 'https://i.ibb.co/ZYW3VTp/brown-brim.png',
        price: 25
      },
      {
        id: 2,
        name: 'Blue Beanie',
        imageUrl: 'https://i.ibb.co/ypkgK0X/blue-beanie.png',
        price: 18
      }
    ]
    },
    sneakers: {
        id: 2,
        title: 'Sneakers',
        routeName: 'sneakers',
        items: [
          {
            id: 10,
            name: 'Adidas NMD',
            imageUrl: 'https://i.ibb.co/0s3pdnc/adidas-nmd.png',
            price: 220
          },
          {
            id: 11,
            name: 'Adidas Yeezy',
            imageUrl: 'https://i.ibb.co/dJbG1cT/yeezy.png',
            price: 280
          },
          {
            id: 12,
            name: 'Black Converse',
            imageUrl: 'https://i.ibb.co/bPmVXyP/black-converse.png',
            price: 110
          }
        ]
      }
}

const store = mockStore({
    shop: {
        collections: mockCollections
    }
});



describe('Checkout Page Component', () => {
  let wrapper;

  beforeEach(() => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ collectionId: 'hats' })
    wrapper = mount(
        <Provider store={store}>
            <BrowserRouter>
                <Collection />
            </BrowserRouter>
        </Provider>);
  });

    it('Should Render Checkout Page Component', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render the same number of CollectionItems as collection array', () => {
        expect(wrapper.find(CollectionItem).length).toBe(2);
    });
})