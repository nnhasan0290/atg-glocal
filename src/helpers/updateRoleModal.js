import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";

import AdminService from "../services/admin.service";
import { alert, alertCustom } from "./alerts";

const UpdateRoleModal = (props) => {
  const { data } = props;
  const [newRole, setNewRole] = React.useState("");
  const handelRoleChange = (e) => {
    setNewRole(e.target.value);
  };

  const handleClick = () => {
    AdminService.updateRole(data.id, newRole)
      .then((res) => {
        if (res.data.status === 1) {
          alert("success", "Role is Successfully Changed");
        } else {
          alert("error", res.data.message);
        }
      })
      .catch((err) => {
        alertCustom("error", err.message, "/home");
      });
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
          Change Role
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <p>1 = User</p>
          <p>2 = Admin</p>
          <p>3 = Growth Consultant</p>
          <p>4 = Manager</p>
        </div>

        <input
          className='form-control w-25'
          type='text'
          onChange={handelRoleChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <button className='btn btn-primary' onClick={props.onHide}>
          close
        </button>
        <button
          className='ms-2 btn btn-primary'
          onClick={(e) => {
            props.onHide();
            handleClick();
          }}
        >
          Submit
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateRoleModal;
