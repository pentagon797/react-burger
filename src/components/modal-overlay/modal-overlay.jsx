import cn from "classnames";
import s from "./modal-overlay.module.css";
import PropTypes from 'prop-types';

export const ModalOverlay = ({ onClick }) => {
  return <div onClick={onClick} className={cn(s.overlay)}></div>;
};

ModalOverlay.propTypes = {
	onClick: PropTypes.func.isRequired,
};