import css from "./index.module.css";

export const ButtonEl = (props: any) => {
  const typeButton = props.type ? props.type : "";

  return (
    <button
      className={css.button}
      onClick={props.handleClick}
      type={typeButton}
      style={{ backgroundColor: props.buttonColor }}
    >
      {props.children}
    </button>
  );
};
