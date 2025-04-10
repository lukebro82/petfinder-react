import { useAuthState } from "../../atom/state";
import { ButtonEl } from "../../ui/ButtonEl";
import Swal from "sweetalert2";
import css from "./index.module.css";
import { useNavigate } from "react-router-dom";

export const RegisterHome = () => {
  const navigate = useNavigate();
  const { fetchAuth, fetchLogin } = useAuthState();

  const handleClick = () => {
    navigate("/login");
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const passwordcheck = e.target.passwordcheck.value;

    if (password !== passwordcheck) {
      Swal.fire({
        icon: "error",
        title: "Las contraseñas no coiciden",
        confirmButtonColor: "#9CBBE9",
      });
      return;
    } else if (
      name == "" ||
      email == "" ||
      password == "" ||
      passwordcheck == ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Tienes que completar todos los campos",
        confirmButtonColor: "#9CBBE9",
      });
    } else {
      fetchAuth(name, email, password).then((res: any) => {
        if (res.message == "Usuario creado con exito") {
          fetchLogin(email, password).then(() => {
            navigate("/home");
          });
        }
        if (res === "Ya existe el email") {
          Swal.fire({
            icon: "error",
            title: "Ya existe el email",
            confirmButtonColor: "#9CBBE9",
          });
        }
      });
    }
  };

  return (
    <>
      <div className={css.homepage}>
        <h1 className={css.formh1}>Registrarse</h1>
        <h3 className={css.formh3}>
          Ingresá los siguientes datos para <br /> realizar el registro
        </h3>

        <form className={css.formregistro} onSubmit={handleSubmit}>
          <label className={css.registrolabel}>NOMBRE</label>
          <input className={css.registroinput} name="name" type="text" />
          <label className={css.registrolabel}>EMAIL</label>
          <input className={css.registroinput} name="email" type="email" />
          <label className={css.registrolabel}>CONTRASEÑA</label>
          <input
            className={css.registroinput}
            name="password"
            type="password"
          />
          <label className={css.registrolabel}>CONFIRMAR CONTRASEÑA</label>
          <input
            className={css.registroinput}
            name="passwordcheck"
            type="password"
          />
          <ButtonEl type={"submit"}>Registrarse</ButtonEl>
        </form>

        <p className={css.textform}>
          Ya tenes una cuenta?{" "}
          <a href="" className={css.forma} onClick={handleClick}>
            Iniciar sesión.
          </a>
        </p>
      </div>
    </>
  );
};
