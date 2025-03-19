import { Route, Routes } from "react-router-dom"
import { RequireAuth } from "./RequireAuth"

import LoginScreen from "@/screens/LoginScreen"
import RegisterScreen from "@/screens/RegisterScreen"
import HomeScreen from "@/screens/HomeScreen"
import FinancesScreen from "@/screens/FinancesScreen"

export default function Navigation() {
  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />

      <Route element={<RequireAuth />}>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/finances/:accountId" element={<FinancesScreen />} />
      </Route>
    </Routes>
  )
}

