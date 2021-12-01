import React from "react";
import { shallow } from "enzyme";
import HomePage from "./HomePage";

describe("HomePage Component", () => {
    let wrapper;
  
    beforeEach(() => {
        wrapper = shallow(<HomePage />);
    });
  
    it("HomePage Component should render", () => {
        expect(wrapper).toMatchSnapshot();
    })
})