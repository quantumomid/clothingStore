import { createContext } from "react";

// Because current user initially undefined
const CurrentUserContext = createContext(undefined);

export default CurrentUserContext;