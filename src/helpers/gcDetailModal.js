import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Modal from "react-bootstrap/Modal";

const GcDetailModal = (props) => {
  console.log(props);
  const { gc } = props;

  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      scrollable={true}
    >
      <Modal.Header>
        <Modal.Title id='contained-modal-title-vcenter'>User List</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {gc.userReferralBeans.map((user, index) => {
          return (
            <div
              className='list-group-item align-items-start rounded mb-3 bg-light bg-gradient custom-card'
              key={index}
            >
              <div className='d-flex w-100 justify-content-between'>
                <h5 className='mb-1'> {user.name}</h5>
                <span
                  className='rounded-pill p-2 font-weight-bold'
                  style={{
                    color: "#F9F9F9",

                    backgroundColor: user.paid ? "#d43530" : "#00CCA9",
                  }}
                >
                  {user.paid ? "Paid" : "Not Paid"}
                </span>
              </div>
              <div className='mt-2'>
                <span
                  className='rounded-pill p-2'
                  style={{ color: "#3B7FBD", backgroundColor: "#E1F0F7" }}
                >
                  {user.email}
                </span>

                <span
                  className='rounded-pill p-2 ms-3'
                  style={{ color: "#F9F9F9", backgroundColor: "#F2643F" }}
                >
                  {user.contactNumber}
                </span>
              </div>
            </div>
          );
        })}
      </Modal.Body>
      <Modal.Footer>
        <button className='btn btn-primary' onClick={props.onHide}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default GcDetailModal;
