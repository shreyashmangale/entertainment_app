import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

function AuthModal({ show, handleClose }) {
    const navigate = useNavigate(); 

  return (
    <Modal className='modal' show={show} onHide={handleClose} centered>
      <Modal.Header className='modal-content' >
      <button
      type="button"
      className="btn-close"
      aria-label="Close"
      style={{
        backgroundColor: '#605EA1',
        color: 'white',
        opacity: 1,
      }}
      onClick={handleClose}
    ></button>
        <Modal.Title>Authentication Required</Modal.Title>
      </Modal.Header>
      <Modal.Body>You need to log in to bookmark this item.</Modal.Body>
      <Modal.Footer className='modal-content'>
        
        <Button className='modal-button' onClick={()=>navigate('/auth/login')}>
          Log In
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AuthModal;
