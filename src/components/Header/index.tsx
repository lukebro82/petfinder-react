import { useState } from "react";
import css from "./index.module.css";
import { useNavigate } from "react-router-dom";
import menuHeader from "../../assets/menu.svg";
import xIcon from "../../assets/xicon.svg";
import mapsLogo from "../../assets/image8.svg";
import { useAuthState } from "../../atom/state";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { token, email, closeSession } = useAuthState();

  const handleLogoClick = () => {
    navigate("/home");
  };

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickMisdatos = () => {
    navigate("/userdata");
    setMenuOpen(false);
  };
  const handleClickCerrarSesion = () => {
    closeSession();
    setMenuOpen(false);
  };

  const handleClickReport = () => {
    navigate("/reportpet");
    setMenuOpen(false);
  };

  const handleMypetsClick = () => {
    navigate("/mypets");
    setMenuOpen(false);
  };

  return (
    <div className={css.root}>
      <img
        className={css.mapslogo}
        src={mapsLogo}
        alt=""
        onClick={handleLogoClick}
      />
      <div
        className={`${css.burgermenu} ${menuOpen ? css.burgermenuopen : ""}`}
      >
        <img
          className={css.xicon}
          src={xIcon}
          alt=""
          onClick={() => setMenuOpen(false)}
        />
        <a
          className={css.burgerlink}
          id="mis-datos"
          onClick={handleClickMisdatos}
        >
          Mis datos
        </a>
        <a
          className={css.burgerlink}
          id="mis-mascotas"
          onClick={handleMypetsClick}
        >
          Mis mascotas reportadas
        </a>
        <a
          className={css.burgerlink}
          id="reportar-mascota"
          onClick={handleClickReport}
        >
          Reportar mascotas
        </a>

        <div>
          {token !== "" ? (
            <>
              <h5>{email}</h5>
              <a className={css.cerrarSesion} onClick={handleClickCerrarSesion}>
                CERRAR SESIÓN
              </a>
            </>
          ) : null}
        </div>
      </div>
      <img
        className="burger"
        src={menuHeader}
        alt="Menu Header"
        onClick={handleMenuClick}
      />
    </div>
  );
};
