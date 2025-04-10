import { Route, Routes } from "react-router-dom";
import { Layout } from "../components/Layout/index.tsx";
import { Home } from "../pages/Home/index.tsx";
import { Homemascotas } from "../pages/HomeMascotas/index.tsx";
import { RegisterHome } from "../pages/Register/index.tsx";
import { LoginPage } from "../pages/Login/index.tsx";
import { UserData } from "../pages/UserData/index.tsx";
import { ReportPet } from "../pages/reportPet/index.tsx";
import { MyPets } from "../pages/MyPets/index.tsx";
import { ReportPetEdit } from "../pages/PetEdit/index.tsx";
import { ChangeUserData } from "../pages/ChangeUserData/index.tsx";
import { ChangePass } from "../pages/ChangePass/index.tsx";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/homemascotas" element={<Homemascotas />} />
        <Route path="/register" element={<RegisterHome />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/userdata" element={<UserData />} />
        <Route path="/reportpet" element={<ReportPet />} />
        <Route path="/mypets" element={<MyPets />} />
        <Route path="/petedit" element={<ReportPetEdit />} />
        <Route path="/changedata" element={<ChangeUserData />} />
        <Route path="/changepass" element={<ChangePass />} />
      </Route>
    </Routes>
  );
}
