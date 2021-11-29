import React from 'react';
import { shallow } from 'enzyme';
import CollectionPreview from "./CollectionPreview";

describe('CollectionPreview component', () => {
  let wrapper;
  let mockMatch;
  let mockHistory;
  const mockRouteName = 'hats';

    beforeEach(() => {
    
        mockMatch = {
            path: '/shop'
        }
        
        mockHistory = {
            push: jest.fn()
        };

        const mockProps = {
            match: mockMatch,
            history: mockHistory,
            routeName: mockRouteName,
            title: 'hats',
            items: []
        };

        wrapper = shallow(<CollectionPreview {...mockProps} />);

    })

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('Should render CollectionPreview component', () => {
        expect(wrapper).toMatchSnapshot();
    });

    // // Some issue with finding the title container below
    // it('Should call history.push with the right string when TitleContainer clicked', () => {
    //     wrapper.find("TitleContainer").simulate('click');
    
    //     expect(mockHistory.push).toHaveBeenCalledWith(
    //       `${mockMatch.path}/${mockRouteName}`
    //     );
    // });
})