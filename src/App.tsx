import "./App.css";
import Login from "../pages/Login";
import Agenda from "../pages/Agenda";
import Menu from "./components/Menu";
import Cadastro from "../pages/Cadastro";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap-icons/font/bootstrap-icons.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Dashboard from "../pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route
          path="*"
          element={
            <div className="w-screen h-screen flex justify-center pr-[200px]">
              404 Página não encontrada
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
