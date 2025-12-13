import { createContext } from "react";

const CurrentUserContext = createContext({
  _id: null,
  name: null,
  email: null,
  avatar: null,
});

export default CurrentUserContext;
