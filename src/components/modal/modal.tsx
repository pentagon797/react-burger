import React, { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import cn from "classnames";
import s from "./modal.module.css";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

const modalRoot = document.querySelector("#modals");

export const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  useEffect(() => {
    function escapeClose(evt: KeyboardEvent) {
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
        <div className={cn(s.modal__close_icon)} aria-label='Закрыть окно'>
          <CloseIcon onClick={onClose} type="primary" />
        </div>
        {children}
      </div>
      <ModalOverlay onClick={onClose} />
    </>,
    modalRoot as Element
  );
};

export default Modal;
