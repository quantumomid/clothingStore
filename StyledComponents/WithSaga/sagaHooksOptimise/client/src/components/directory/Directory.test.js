import React from "react";
import { shallow } from "enzyme";
import * as redux from 'react-redux';
import Directory from "./Directory";
import sections from "../../data/directoryData";


describe("Testing the Directory Component", () => {
    let wrapper;
    let spyOnUseSelector;

    beforeEach(() => {
        // Mock useSelector hook
        spyOnUseSelector = jest.spyOn(redux, 'useSelector');
        spyOnUseSelector.mockReturnValue(sections);

        wrapper = shallow(<Directory />)
    })

    afterEach(() => {
        jest.restoreAllMocks();
    });


    it("Directory Component should render", () => {
        expect(wrapper).toMatchSnapshot();
    })
})