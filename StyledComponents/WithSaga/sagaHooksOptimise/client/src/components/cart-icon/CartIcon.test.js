import * as redux from 'react-redux';
import { shallow } from "enzyme";
import CartIcon from './CartIcon';

describe("Cart Icon Component", () => {
    let wrapper;
    let spyOnUseSelector;
    let spyOnUseDispatch;
    let mockDispatch;
  
    beforeEach(() => {
        // Mock useSelector hook
        spyOnUseSelector = jest.spyOn(redux, 'useSelector');
        spyOnUseSelector.mockReturnValue(0);
    
        // Mock useDispatch hook
        spyOnUseDispatch = jest.spyOn(redux, 'useDispatch');
        // Mock dispatch function returned from useDispatch
        mockDispatch = jest.fn();
        spyOnUseDispatch.mockReturnValue(mockDispatch);

        wrapper = shallow(<CartIcon />);
    });
  
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("Cart Icon Component should render", () => {
        expect(wrapper).toMatchSnapshot();
    })

    it('Dispatch is called when icon is clicked', () => {
        wrapper.find('CartIconContainer').simulate('click');
        expect(mockDispatch).toHaveBeenCalled();
    });

    it('Should render the itemCount as the text', () => {
        const itemCount = parseInt(wrapper.find('ItemCountContainer').text());
        expect(itemCount).toBe(0);
    });
})