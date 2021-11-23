import { createContext } from "react";
import shopData from "../../redux/shop/shop.data";

const CollectionsContext = createContext(shopData);

export default CollectionsContext;