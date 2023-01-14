import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import parse from "html-react-parser";

import LocationImg from "../assets/Icons/location.svg";

const EventDetailModal = (props) => {
  const { event } = props;
  console.log(event);

  return (
    <Modal
      show={props.show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable={true}
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {event?.title}{" "}
          <p className="text-muted m-0">{event?.eventTimeText}</p>
          <p className="text-muted m-0">
            <img src={LocationImg} alt="" height="10" />
            <span className="ms-1 text-sm">{event.venue}</span>
          </p>
          <p>
            {" "}
            <span
              className="rounded-pill p-2 text-sm"
              style={{ color: "#E74E54", backgroundColor: "#FDD8D8" }}
            >
              {event.id}
            </span>
          </p>
          <a
            href={`${process.env.REACT_APP_URL}/event/workshop/${event.id}`}
            className="btn btn-primary"
            // href={event.eventLink}
            role="button"
            target="_blank"
            rel="noreferrer noopener"
          >
            Event Link
          </a>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{parse(event.description)}</Modal.Body>
      <Modal.Footer>
        <button className="btn btn-primary" onClick={props.onHide}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default EventDetailModal;
