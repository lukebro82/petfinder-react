import { ButtonEl } from "../../ui/ButtonEl";
import ingresarLogo from "../../assets/ingresar.svg";
import css from "./index.module.css";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "../../atom/state";
import Swal from "sweetalert2";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { fetchLogin } = useAuthState();

  const handleClick = () => {
    navigate("/register");
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    fetchLogin(email, password).then((res: any) => {
      if (res.error) {
        Swal.fire({
          icon: "error",
          title: "El mail o la contraseña no coiciden",
          confirmButtonColor: "#9CBBE9",
        });
      } else {
        navigate("/");
      }
    });
  };

  return (
    <>
      <div className={css.homepage}>
        <img className={css.ingresarlogo} src={ingresarLogo} alt="" />
        <h1 className={css.formh1}>Ingresar</h1>
        <h3 className={css.formh3}>Ingresá tu email para continuar.</h3>

        <form className={css.formingresar} onSubmit={handleSubmit}>
          <label className={css.formlabel}>EMAIL</label>
          <input className={css.ingresarinput} name="email" type="email" />
          <label className={css.formlabel}>CONTRASEÑA</label>
          <input
            className={css.ingresarinput}
            name="password"
            type="password"
          />

          <a className={css.forma} href="">
            Olvidé mi contraseña
          </a>

          <ButtonEl
            button-color="#5A8FEC"
            className={css.formbutton}
            type="submit"
          >
            Acceder
          </ButtonEl>
        </form>

        <p className={css.textform}>
          Aún no tenes cuenta?{" "}
          <a href="" className={css.forma} id="registro" onClick={handleClick}>
            Registrate.
          </a>
        </p>
      </div>
    </>
  );
};
