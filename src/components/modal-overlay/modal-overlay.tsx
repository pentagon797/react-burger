import React from "react";
import cn from "classnames";
import s from "./modal-overlay.module.css";

interface ModalOverlayProps {
  onClick: () => void;
}

export const ModalOverlay: React.FC<ModalOverlayProps> = ({ onClick }) => {
  return <div onClick={onClick} className={cn(s.overlay)}></div>;
};
