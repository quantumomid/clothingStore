import { shallow } from "enzyme";
import CartDropdown from "./CartDropdown";
import * as redux from 'react-redux';
import { toggleCartHidden } from '../../redux/cart/cartActions';
import CartItem from "../cart-item/CartItem";

// Mock History parts need to be defined outside describe and 
// test blocks (https://stackoverflow.com/questions/60404319/react-jest-enzyme-testing-usehistory-hook-breaks-test)
const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
      push: mockHistoryPush,
    }),
}));

describe("CartDropdown component", () => {
    let wrapper;
    let spyOnUseSelector;
    const mockCartItems = [{ id: 1 }, { id: 2 }, { id: 3 }];
    let spyOnUseDispatch;
    let mockDispatch;

    beforeEach(() => {
        // Mock useSelector hook
        spyOnUseSelector = jest.spyOn(redux, 'useSelector');
        spyOnUseSelector.mockReturnValue(mockCartItems);
    
        // Mock useDispatch hook
        spyOnUseDispatch = jest.spyOn(redux, 'useDispatch');
        // Mock dispatch function returned from useDispatch
        mockDispatch = jest.fn();
        spyOnUseDispatch.mockReturnValue(mockDispatch);

        wrapper = shallow(<CartDropdown />);
    });

    it("CartDropdown should render", () => {
        expect(wrapper).toMatchSnapshot();
    })

    it('Should call history and dispatch when button is clicked', () => {
        wrapper.find('CartDropdownButton').simulate('click');
        expect(mockHistoryPush).toHaveBeenCalled();
        expect(mockDispatch).toHaveBeenCalledWith(toggleCartHidden());
      });

    it('Should render an equal number of CartItem components as the cartItems redux state', () => {
    expect(wrapper.find(CartItem).length).toEqual(mockCartItems.length);
    });
})

describe("CartDropdown component when the cart is empty", () => {
    let wrapper;
    let spyOnUseSelector;
    const mockCartItems = [];
    let spyOnUseDispatch;
    let mockDispatch;

    beforeEach(() => {
        // Mock useSelector hook
        spyOnUseSelector = jest.spyOn(redux, 'useSelector');
        spyOnUseSelector.mockReturnValue(mockCartItems);
    
        // Mock useDispatch hook
        spyOnUseDispatch = jest.spyOn(redux, 'useDispatch');
        // Mock dispatch function returned from useDispatch
        mockDispatch = jest.fn();
        spyOnUseDispatch.mockReturnValue(mockDispatch);

        wrapper = shallow(<CartDropdown />);
    });

    it("Empty message container to be displayed when cart items are empty", () => {
        expect(wrapper.exists('EmptyMessageContainer')).toBe(true);
    })
})