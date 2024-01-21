import { ApolloProvider } from "@apollo/client";
import client from "./client";
import Sidebar from "./components/Sidebar";
import Router from "./Router";
import { useContext } from "react";
import { AppContext } from "./AppProvider";

function App() {
  const { openSideBar, setOpenSideBar } = useContext(AppContext);
  return (
    <ApolloProvider client={client}>
      <div className="flex h-screen w-screen">
        <Sidebar openSideBar={openSideBar} setOpenSideBar={setOpenSideBar} />
        <div className="flex flex-col justify-start flex-1 h-screen overflow-auto">
          <Router />
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
