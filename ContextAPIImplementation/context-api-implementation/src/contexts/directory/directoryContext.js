import { createContext } from "react";
import { directoryData } from "./directoryData"

const directoryContext = createContext(directoryData);

export default directoryContext;
