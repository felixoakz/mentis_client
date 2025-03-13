import { Route, Routes } from "react-router-dom";
import { RequireAuth } from "./RequireAuth";

import CarrousselScreen from "@/screens/CarrousselScreen";
import LoginScreen from "@/screens/LoginScreen";
import RegisterScreen from "@/screens/RegisterScreen"

export default function Navigation() {
  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />

      <Route element={<RequireAuth />}>
        <Route path="/" element={<CarrousselScreen />} />

      </Route>
    </Routes>
  );
}
