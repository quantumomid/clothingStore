import { shallow } from "enzyme";
import * as redux from 'react-redux';
import { addItem } from "../../redux/cart/cartActions";
import CollectionItem from "./CollectionItem";

describe("Collection Item Component", () => {
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

        wrapper = shallow(<CollectionItem item={mockItem} />);
    });
  
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("Collection Item Item component should be rendered", () => {
          expect(wrapper).toMatchSnapshot();
    })

    it('Should render the price of the Collection item as the text', () => {
        const price = parseInt(wrapper.find('PriceContainer').text());
        expect(price).toBe(35);
    });

    it('Should call dispatch when add button is clicked', () => {
        wrapper.find('AddCartButton').simulate('click');
        expect(mockDispatch).toHaveBeenCalled();
    });

    it('Should call dispatch with addItem method when add button is clicked', () => {
    wrapper.find('AddCartButton').simulate('click');
    expect(mockDispatch).toHaveBeenCalledWith(addItem(mockItem));
    });

    it('Should render the name of the Collection item as the text', () => {
        const name = wrapper.find('NameContainer').text();
        expect(name).toBe("Brown Cowboy");
    });

    it('should render imageUrl as a prop on BackgroundImage', () => {
        expect(wrapper.find('BackgroundImage').prop('imageUrl')).toBe("https://i.ibb.co/QdJwgmp/brown-cowboy.png");
    });
    
})
