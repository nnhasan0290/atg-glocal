import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
const RegistrationDetails = ({ registrations }) => {
  return registrations.map((registration, index) => {
    return (
      <div
        className="list-group-item align-items-start rounded mb-2 bg-light bg-gradient custom-card"
        key={index}
      >
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1"> {registration.name}</h5>
        </div>
        <div className="mt-2">
          <span
            className="rounded-pill p-2"
            style={{ color: "#3B7FBD", backgroundColor: "#E1F0F7" }}
          >
            {registration.email}
          </span>

          <span
            className="rounded-pill p-2 ms-3"
            style={{ color: "#F9F9F9", backgroundColor: "#F2643F" }}
          >
            {registration.contactNumber}
          </span>
          <span
            className="rounded-pill p-2 ms-3"
            style={{ color: "#F9F9F9", backgroundColor: "#F2643F" }}
          >
            {registration.cityName}
          </span>
        </div>
      </div>
    );
  });
};
const RegistrationModal = (props) => {
  const { data } = props;
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable={true}
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Registration List
        </Modal.Title>
        <div>Total Number Of Registrations: {data.length}</div>
      </Modal.Header>
      <Modal.Body>
        <div className="list-group">
          <RegistrationDetails registrations={data} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-primary" onClick={props.onHide}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegistrationModal;
