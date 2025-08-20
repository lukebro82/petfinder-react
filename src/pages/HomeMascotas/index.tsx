import css from "./index.module.css";
import xIcon from "../../assets/xicon.svg";
import { usePetsNears } from "../../atom/state";
import { Card } from "../../ui/Card";
import { ButtonEl } from "../../ui/ButtonEl";
import { useState } from "react";
import { useMailState } from "../../atom/state";
import { useNavigate } from "react-router-dom";

export const Homemascotas = () => {
  const { pets } = usePetsNears();
  const [openFormId, setOpenFormId] = useState<string | null>(null);
  const { sendMail } = useMailState();
  const navigator = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const name = e.target.name.value;
    const phone = e.target.phone.value;
    const message = e.target.message.value;
    const id = e.target.id.split("-")[1];
    sendMail(id, message, name, phone).then(() => {
      setOpenFormId(null);
      navigator("/homemascotas");
    });
  };

  return (
    <div className={css.homepage}>
      {pets.length === 0 ? (
        <h2 className={css.homemascotash1}>No hay mascotas cerca</h2>
      ) : (
        <>
          <h1 className={css.homemascotash1}>Mascotas perdidas cerca</h1>
          {pets.map((e: any) => (
            <div key={e.id}>
              <Card
                name={e.name}
                location={e.lastLocation}
                photo={e.photoURL}
                texto="Reportar"
                handleClick={() => setOpenFormId(e.id)}
              />

              <div
                id={`div${e.id}`}
                className={
                  openFormId === e.id ? css.divreportpetopen : css.divreportpet
                }
              >
                <img
                  id={`xicon${e.id}`}
                  className={css.xicon}
                  src={xIcon}
                  alt="Cerrar"
                  onClick={() => setOpenFormId(null)}
                />

                <form
                  className={css.formreportpet}
                  onSubmit={handleSubmit}
                  id={`form-${e.id}`}
                >
                  <label className={css.reportpetlabel}>NOMBRE</label>
                  <input
                    className={css.reportpetinput}
                    name="name"
                    type="text"
                  />
                  <label className={css.reportpetlabel}>TELEFONO</label>
                  <input
                    className={css.reportpetinput}
                    name="phone"
                    type="text"
                  />
                  <label className={css.reportpetlabel}>¿DÓNDE LO VISTE?</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    cols={50}
                  ></textarea>

                  <ButtonEl
                    button-color="#00A884"
                    className={css.enviarreporte}
                    type="submit"
                  >
                    Enviar información
                  </ButtonEl>
                </form>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
