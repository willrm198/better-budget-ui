import styleClasses from "./Modal.module.css";

function Modal(props) {
  return <div className={styleClasses.modal}>{props.children}</div>;
}

export default Modal;
