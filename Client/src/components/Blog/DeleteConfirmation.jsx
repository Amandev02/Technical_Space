import React from 'react'
import { Button } from "react-bootstrap";
import Modal from "react-responsive-modal";
 import 'react-responsive-modal/styles.css'
import './ResponsiveModal.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
  width: "600px" ,
    height: "150px" 
};

const DeleteConfirmation = ({ showModal, hideModal, confirmModal, id, type, message }) => {
  const notify = () =>  toast("The Blog was deleted successfully");
    return (
      <div styles={styles}>
      <Modal open={showModal} onClose={hideModal}  styles={{
            //  padding: "16px",
            //  textAlign: "center",
              overlay: {
                height: "auto",
              },
            }} center >
            <div className='txt'> 
        <h2>Delete Blog</h2>
        <div className="alert-danger">{message}</div>
        </div>
        <div className='modal-footer'>
        <Button className="btn deletebtn" variant="danger"onClick={() => {confirmModal(type, id) ,notify} }>
            Delete
          </Button>
        <Button  className="btn cancelbtn" variant="default" onClick={hideModal}>
            Cancel
          </Button>
          <ToastContainer />
          
        </div>
      </Modal>
      </div>
    )
}

export default DeleteConfirmation;

     /* <Modal show={showModal} onHide={hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body><div className="alert alert-danger">{message}</div></Modal.Body>
        <Modal.Footer>
          <Button variant="default" onClick={hideModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => confirmModal(type, id) }>
            Delete
          </Button>
        </Modal.Footer>
        </Modal> */   