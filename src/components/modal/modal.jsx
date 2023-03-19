import { createPortal } from "react-dom";
import cn from "classnames";
import s from "./modal.module.css";
import { useEffect } from "react";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.querySelector("#modals");

export const Modal = ({ onClose, children }) => {
  useEffect(() => {
    function escapeClose(evt) {
      if (evt.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", escapeClose);
    return () => {
      document.removeEventListener("keydown", escapeClose);
    };
  });

  return createPortal(
    <>
      <div className={cn(s.modal)}>
        <div className={cn(s.modal__close_icon)}>
          <CloseIcon onClick={onClose} />
        </div>
        {children}
      </div>
      <ModalOverlay onClick={onClose} />
    </>,
    modalRoot
  );
};
