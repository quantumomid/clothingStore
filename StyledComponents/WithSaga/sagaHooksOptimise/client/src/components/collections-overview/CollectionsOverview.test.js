import React from "react";
import { shallow } from "enzyme";
import CollectionsOverview from "./CollectionsOverview";
import * as redux from 'react-redux';

const mockCollections = [
    {
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
    {
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
]

describe("Testing the Collections Overview Component", () => {
    let wrapper;
    let spyOnUseSelector;

    beforeEach(() => {
        // Mock useSelector hook
        spyOnUseSelector = jest.spyOn(redux, 'useSelector');
        spyOnUseSelector.mockReturnValue(mockCollections);

        wrapper = shallow(<CollectionsOverview />)
    })

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("CollectionOverview Component should render", () => {
        expect(wrapper).toMatchSnapshot();
    })

})