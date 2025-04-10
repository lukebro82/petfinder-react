import mainLogo from "../../assets/mainlogo.svg";
import css from "./index.module.css";
import { ButtonEl } from "../../ui/ButtonEl";
import { useNavigate } from "react-router-dom";
import { usePetsNears } from "../../atom/state";
import { useAuthState } from "../../atom/state";

export const Home = () => {
  const navigate = useNavigate();
  const fetchPetsNear = usePetsNears((state) => state.fetchPetsNear);
  const { token } = useAuthState();

  return (
    <>
      <div className={css.homepage}>
        <img src={mainLogo} alt="" />
        <h1 className={css.hometitle}>Pet Finder App</h1>
        <h2 className={css.homesubtitulo}>
          Encontrá y reportá mascotas perdidas cerca de tu ubicación{" "}
        </h2>
        <ButtonEl
          handleClick={() => {
            navigator.geolocation.getCurrentPosition((position) => {
              fetchPetsNear(
                position.coords.latitude,
                position.coords.longitude
              ).then(() => {
                navigate("/homemascotas");
              });
            });
          }}
        >
          Dar mi ubicación actual
        </ButtonEl>
        {token !== "" ? (
          ``
        ) : (
          <ButtonEl
            className={css.empezarbutton}
            buttonColor="rgba(0, 168, 132, 1)"
            handleClick={() => {
              navigate("/login");
            }}
          >
            Ingresar
          </ButtonEl>
        )}
      </div>
    </>
  );
};
