import { Link, useLocation } from "react-router-dom";

const Menu = () => {
  const localizacao = useLocation();

  return (
    <header>
      <nav className="">
        <Link
          className={`text-white ${
            localizacao.pathname === "/inicio" ? "underline" : ""
          }`}
          to="/inicio"
        >
          Inicio |
        </Link>
        <Link
          className={`text-white ${
            localizacao.pathname === "/agenda" ? "underline" : ""
          }`}
          to="/agenda"
        >
          Agenda |
        </Link>
        <Link
          className={`text-white ${
            localizacao.pathname === "/sobre" ? "underline" : ""
          }`}
          to="/sobre"
        >
          Sobre
        </Link>
      </nav>
    </header>
  );
};

export default Menu;
