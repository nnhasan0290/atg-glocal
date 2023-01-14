import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";

import AdminService from "../services/admin.service";
import { alert, alertCustom } from "./alerts";

const ConfirmationModal = (props) => {
  const { data, type } = props;

  const handleClick = () => {
    switch (type) {
      case "news":
        AdminService.deleteNews(data.id)
          .then((res) => {
            if (res.data.status === 1) {
              alert("success", "Item is Successfully Deleted");
            } else {
              alert("error", res.data.message);
            }
          })
          .catch((err) => {
            alertCustom("error", err.message, "/home");
          });
        break;
      case "job":
        AdminService.deleteJob(data.jobId)
          .then((res) => {
            if (res.data.status === 1) {
              alert("success", "Item is Successfully Deleted");
            } else {
              alert("error", res.data.message);
            }
          })
          .catch((err) => {
            alertCustom("error", err.message, "/home");
          });
        break;
      case "1":
        AdminService.deleteWorkshop(data.id)
          .then((res) => {
            if (res.data.status === 1) {
              alert("success", "Item is Successfully Deleted");
            } else {
              alert("error", res.data.message);
            }
          })
          .catch((err) => {
            alertCustom("error", err.message, "/home");
          });
        break;
      case "2":
        AdminService.deleteAward(data.id)
          .then((res) => {
            if (res.data.status === 1) {
              alert("success", "Item is Successfully Deleted");
            } else {
              alert("error", res.data.message);
            }
          })
          .catch((err) => {
            alertCustom("error", err.message, "/home");
          });
        break;
      case "3":
        AdminService.deleteExhibition(data.id)
          .then((res) => {
            if (res.data.status === 1) {
              alert("success", "Item is Successfully Deleted");
            } else {
              alert("error", res.data.message);
            }
          })
          .catch((err) => {
            alertCustom("error", err.message, "/home");
          });
        break;
      case "fu":
        AdminService.deleteFundingUpdate(data.id)
          .then((res) => {
            if (res.data.status === 1) {
              alert("success", "Item is Successfully Deleted");
            } else {
              alert("error", res.data.message);
            }
          })
          .catch((err) => {
            alertCustom("error", err.message, "/home");
          });
        break;
      case "rfp":
        AdminService.deleteRFP(data.id)
          .then((res) => {
            if (res.data.status === 1) {
              alert("success", "Item is Successfully Deleted");
            } else {
              alert("error", res.data.message);
            }
          })
          .catch((err) => {
            alertCustom("error", err.message, "/home");
          });
        break;
      case "academics":
        AdminService.deleteAcademics(data.id)
          .then((res) => {
            if (res.data.status === 1) {
              alert("success", "Item is Successfully Deleted");
            } else {
              alert("error", res.data.message);
            }
          })
          .catch((err) => {
            alertCustom("error", err.message, "/home");
          });
        break;

      default:
    }
  };

  return (
    <Modal
      show={props.show}
      aria-labelledby='contained-modal-title-vcenter'
      centered
      scrollable={true}
    >
      <Modal.Header>
        <Modal.Title id='contained-modal-title-vcenter'>
          Confirm Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>Do You want to delete this Item?</strong>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <button className='btn btn-primary' onClick={props.onHide}>
          close
        </button>
        <button
          className='ms-2 btn btn-danger'
          onClick={(e) => {
            props.onHide();
            handleClick();
          }}
        >
          Delete
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
