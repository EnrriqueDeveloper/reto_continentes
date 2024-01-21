import { Route, Routes } from "react-router-dom";
import Country from "./components/Country";
import Vista1 from "./components/Vista1";
import Vista2 from "./components/Vista2";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<Country />} path="/" />
      <Route element={<Country />} path="/:country" />
      <Route element={<Vista1 />} path="/vista1" />
      <Route element={<Vista2/>} path="/vista2"/>
    </Routes>
  );
}
