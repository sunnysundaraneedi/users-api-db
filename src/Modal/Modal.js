import React from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../Store/userSlice";
import "./Modal.css";

const Modal = (props) => {
  const dispatch = useDispatch();
  const handleClose = (event) => {
    if (event.target.className === "modalContainer") {
      dispatch(userActions.showHideModal());
    }
  };
  return (
    <div className="modalContainer" onClick={handleClose}>
      <div className="modal">
        <h2>{props.label}</h2>
        <span
          className="modal__close"
          onClick={() => dispatch(userActions.showHideModal())}
        >
          x
        </span>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
