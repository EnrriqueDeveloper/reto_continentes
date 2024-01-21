import { createContext, useState } from "react";

export const AppContext = createContext({ openSideBar: false });

//eslint-disable-next-line
export const AppProvider = ({ children }) => {
  const [openSideBar, setOpenSideBar] = useState(false);
  const [inputName, setInputName] = useState("");

  const [continent, setContinent] = useState("");

  return <AppContext.Provider value={{ openSideBar, setOpenSideBar, inputName, setInputName, continent, setContinent }}>{children}</AppContext.Provider>;
};
