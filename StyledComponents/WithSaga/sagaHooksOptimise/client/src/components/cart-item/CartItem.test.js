import { shallow } from "enzyme";
import CartItem from "./CartItem";


it("Cart Item component should be rendered", () => {
    const mockItem =    {
        id: 3,
        name: 'Brown Cowboy',
        imageUrl: 'https://i.ibb.co/QdJwgmp/brown-cowboy.png',
      //   imageUrl: "/images/shop-img/hats/brown-cowboy.png",
        price: 35
      }

      expect(shallow(<CartItem item={mockItem} />)).toMatchSnapshot();
})