import React from "react";
import { shallow } from "enzyme";
import { MenuItem } from "./MenuItem";

describe("Menu Item Component", () => {
    let wrapper;
    let mockMatch;
    let mockHistory;

    beforeEach(() => {

        mockMatch = {
            url: "/shop"
        }

        mockHistory = {
            push: jest.fn()
        }

        const mockProps = {
            title: "hats", 
            imageUrl: "testimage", 
            size: "large", 
            history: mockHistory, 
            linkUrl: "/hats", 
            match: mockMatch
        }

        wrapper = shallow(<MenuItem { ...mockProps } />);
    });

    it("Menu Item Component should render", () => {
        expect(wrapper).toMatchSnapshot();
    })

    it('Should pass size to MenuItemContainer as the prop size', () => {
        expect(wrapper.find('MenuItemContainer').prop('size')).toBe("large");
    });

    it('should pass imageUrl to BackgroundImageContainer as the prop imageUrl', () => {
        expect(wrapper.find('BackgroundImageContainer').prop('imageUrl')).toBe("testimage");
    });

    it('should call history.push with the right string when MenuItemContainer clicked', () => {
        wrapper.find('MenuItemContainer').simulate('click');
        expect(mockHistory.push).toHaveBeenCalledWith(`${mockMatch.url}/hats`);
    });
})