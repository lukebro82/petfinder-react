import { useEffect, useState } from "react";
import { ButtonEl } from "../../ui/ButtonEl";
import css from "./index.module.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuthState } from "../../atom/state";

export const ChangePass = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { newPass, email, token } = useAuthState();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword || password === "") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Las contraseñas no coinciden",
      });
      setPassword("");
      setConfirmPassword("");
      return;
    } else {
      newPass(password, email);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Contraseña cambiada con éxito",
      });
      navigate("/userdata");
    }
  };

  return (
    <div className={css.homepage}>
      <h1 className={css.h1datos}>Contraseña</h1>

      <form className={css.datosform} onSubmit={handleSubmit}>
        <label className={css.datoslabel}>CONTRASEÑA</label>
        <input
          className={css.datosinput}
          name="pass1"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label className={css.datoslabel}>CONFIRMAR CONTRASEÑA</label>
        <input
          className={css.datosinput}
          name="pass2"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <ButtonEl buttonColor="#5A8FEC" className={css.guardar} type="submit">
          Guardar
        </ButtonEl>
      </form>
      <ButtonEl
        buttonColor="#5A8FEC"
        className={css.volverbutton}
        handleClick={() => {
          navigate("/userdata");
        }}
      >
        Volver
      </ButtonEl>
    </div>
  );
};
