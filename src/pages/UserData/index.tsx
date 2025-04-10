import { ButtonEl } from "../../ui/ButtonEl";
import css from "./index.module.css";
import { useAuthState } from "../../atom/state";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const UserData = () => {
  const { token, email, closeSession } = useAuthState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleClickCerrarSesion = () => {
    closeSession();
    navigate("/");
  };

  return (
    <>
      <div className={css.homepage}>
        <h1 className={css.h1datos}>Mis datos</h1>

        <div className={css.divbotones}>
          <ButtonEl
            buttonColor="#5A8FEC"
            className={css.datosbutton}
            handleClick={() => {
              navigate("/changedata");
            }}
          >
            Modificar datos personales
          </ButtonEl>
          <ButtonEl
            buttonColor="#5A8FEC"
            className={css.passmailbutton}
            handleClick={() => {
              navigate("/changepass");
            }}
          >
            Modificar contraseña
          </ButtonEl>
        </div>

        <div>
          {" "}
          {token !== "" ? (
            <div className={css.cerrarEmail}>
              <h3>{email}</h3>
              <a className={css.cerrarSesion} onClick={handleClickCerrarSesion}>
                CERRAR SESIÓN
              </a>
            </div>
          ) : (
            ``
          )}{" "}
        </div>
      </div>
    </>
  );
};
