import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from "react-redux";
import { mockStore } from '../../test/testUtils';
import Shop from "./Shop";

const store = mockStore({
    shop: {
        isFetching: true
    }
});

describe('Shope Page Component', () => {
    let wrapper;
    let spyOnUseDispatch;
    let mockDispatch;
    let mockFetchCollectionsStart;


    beforeEach(() => {

    // Mock useDispatch hook
    spyOnUseDispatch = jest.spyOn(redux, 'useDispatch');
    // Mock dispatch function returned from useDispatch
    mockDispatch = jest.fn();
    spyOnUseDispatch.mockReturnValue(mockDispatch);

    mockFetchCollectionsStart = jest.fn();
    mockDispatch.mockReturnValue(mockFetchCollectionsStart);

    const mockMatch = {
        path: ''
    };

    wrapper = mount(
        <Provider store={store}>
            <Shop match={mockMatch} />
        </Provider>
    );
    // wrapper = shallow(<Shop match={mockMatch} />)

    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('Should Render Shop Page Component', () => {
        expect(wrapper).toMatchSnapshot();
    });

    // it('should render ShopPage component', () => {
    //     expect(fetchCollectionsStart()).toHaveBeenCalled();
    // });
  
  });
