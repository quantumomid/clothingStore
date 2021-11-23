import { createContext } from "react";
import shopData from "./shop.data";

const CollectionsContext = createContext(shopData);

export default CollectionsContext;