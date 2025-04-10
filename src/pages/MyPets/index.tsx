import { useReportPet } from "../../atom/state";
import noPetLogo from "../../assets/nopet.svg";
import { Card } from "../../ui/Card";
import { ButtonEl } from "../../ui/ButtonEl";
import css from "./index.module.css";
import { useAuthState, usePetToEdit } from "../../atom/state";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const MyPets = () => {
  const { MyPets, fetchMyPets } = useReportPet();
  const { token } = useAuthState();
  const navigate = useNavigate();
  const { setPetId, setPetPhoto } = usePetToEdit();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    if (token) {
      fetchMyPets();
    }
  }, [token]);

  const handleClick = (petid: any, photo: any) => {
    setPetId(petid);
    setPetPhoto(photo);
    navigate("/petedit");
  };

  return (
    <div className={css.homepage}>
      <h1 className={css.homemascotash1}>Mascotas reportadas</h1>

      {Array.isArray(MyPets) && MyPets.length === 0 ? (
        <div className={css.nomascotas}>
          <h2 className={css.homemascotash1}>No tenés mascotas reportadas</h2>
          <img src={noPetLogo} alt="No hay mascotas" />
          <ButtonEl
            className={css.reportebutton}
            style={{ backgroundColor: "#5A8FEC" }}
          >
            Publicar reporte
          </ButtonEl>
        </div>
      ) : (
        <div className={css.mascotaslist}>
          {MyPets.map((e: any) => (
            <Card
              key={e.id}
              name={e.name}
              location={e.lastLocation}
              photo={e.photoURL}
              texto="Editar"
              color="#5A8FEC"
              id={e.id}
              handleClick={() => handleClick(e.id, e.photoURL)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
