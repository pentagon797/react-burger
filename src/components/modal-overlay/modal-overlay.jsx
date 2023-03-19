import cn from "classnames";
import s from "./modal-overlay.module.css";

export const ModalOverlay = ({ onClick }) => {
  return <div onClick={onClick} className={cn(s.overlay)}></div>;
};
