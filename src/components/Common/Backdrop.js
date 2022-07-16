import styleClasses from "./Backdrop.module.css";

function Backdrop(props) {
  return <div className={styleClasses.backdrop} onClick={props.onClick} />;
}

export default Backdrop;
