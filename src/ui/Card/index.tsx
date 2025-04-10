import css from "./index.module.css";

export const Card = (pet: any) => {
  return (
    <div className={css.rootel}>
      <div className={css.divimagen}>
        <img className={css.cardimagen} src={pet.photo} />
      </div>
      <div className={css.divinferior}>
        <div className={css.textosdiv}>
          <h1 className={css.h1card}>{pet.name}</h1>
          <h2 className={css.h2card}>{pet.location}</h2>
        </div>
        <div className={css.buttondiv}>
          <button onClick={pet.handleClick} className={css.buttoncard}>
            {pet.texto}
          </button>
        </div>
      </div>
    </div>
  );
};
