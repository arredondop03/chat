import React from 'react';
import cancel from '../../assets/cancel.svg';
import { UserContext } from '../../context/UserContext';
import './Modal.css';

const Modal = () => {
  const context = React.useContext(UserContext);

  return (
    <div className="modal">
      <div className="modal-container">
        <button type="button" onClick={() => context.setShowModal(false)} className="modal-close-button">
          <img src={cancel} alt="close modal" />
        </button>
        <h1>Whoops!</h1>
        <p>Something went wrong. Please try later</p>
      </div>
    </div>
  );
};

export default Modal;
