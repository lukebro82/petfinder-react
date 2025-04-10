import { useEffect, useState } from "react";
import { ButtonEl } from "../../ui/ButtonEl";
import css from "./index.module.css";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "../../atom/state";

export const ChangeUserData = () => {
  const navigate = useNavigate();
  const { patchUser, token } = useAuthState();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // Estados controlados para los inputs
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    patchUser(name, location);
    navigate("/userdata");
  };

  return (
    <div className={css.homepage}>
      <h1 className={css.h1Datos}>
        Datos <br /> personales
      </h1>

      <form className={css.datosform} onSubmit={handleSubmit}>
        <label className={css.datoslabel}>NOMBRE</label>
        <input
          className={css.datosinput}
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label className={css.datoslabel}>LOCALIDAD</label>
        <input
          className={css.datosinput}
          name="location"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <ButtonEl buttonColor="#5A8FEC" className={css.guardar} type="submit">
          Guardar
        </ButtonEl>
      </form>
      <ButtonEl
        buttonColor="#5A8FEC"
        className={css.volverButton}
        handleClick={() => navigate("/userdata")}
      >
        Volver
      </ButtonEl>
    </div>
  );
};
