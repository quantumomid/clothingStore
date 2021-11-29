import { shallow } from "enzyme";
import CheckoutItem from "./CheckoutItem";
import * as redux from 'react-redux';
import { addItem, clearItemFromCart, removeItem } from "../../redux/cart/cartActions";


describe("Checkout Component", () => {
    let wrapper;
    let spyOnUseDispatch;
    let mockDispatch;
    const mockItem =    {
        id: 3,
        name: 'Brown Cowboy',
        imageUrl: 'https://i.ibb.co/QdJwgmp/brown-cowboy.png',
      //   imageUrl: "/images/shop-img/hats/brown-cowboy.png",
        price: 35
      }

    beforeEach(() => {

        // Mock useDispatch hook
        spyOnUseDispatch = jest.spyOn(redux, 'useDispatch');
        // Mock dispatch function returned from useDispatch
        mockDispatch = jest.fn();
        spyOnUseDispatch.mockReturnValue(mockDispatch);

        wrapper = shallow(<CheckoutItem cartItem={mockItem} />);
    });
  
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("Checkout Item component should be rendered", () => {
          expect(wrapper).toMatchSnapshot();
    })
    it('Should render the price of the cart item as the text', () => {
        const price = parseInt(wrapper.find('TextContainer').at(1).text());
        expect(price).toBe(35);
    });
    it('Should call dispatch when remove button is clicked', () => {
        wrapper.find('RemoveButtonContainer').simulate('click');
        expect(mockDispatch).toHaveBeenCalled();
      });
    it('Should call dispatch with clearItemFromCart method when remove button is clicked', () => {
    wrapper.find('RemoveButtonContainer').simulate('click');
    expect(mockDispatch).toHaveBeenCalledWith(clearItemFromCart(mockItem));
    });
    
  it('should call removeItem when left arrow is clicked', () => {
    wrapper
      .find('QuantityContainer')
      .childAt(0)
      .simulate('click');

      expect(mockDispatch).toHaveBeenCalledWith(removeItem(mockItem));
    });

  it('should call addItem when right arrow is clicked', () => {
    wrapper
      .find('QuantityContainer')
      .childAt(2)
      .simulate('click');

      expect(mockDispatch).toHaveBeenCalledWith(addItem(mockItem));
    });
})

