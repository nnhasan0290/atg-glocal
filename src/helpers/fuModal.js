import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import parse from "html-react-parser";
import { connect } from "react-redux";

const FuDetailModal = (props) => {
  const { data } = props;

  return (
    <Modal
      show={props.show}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      scrollable={true}
    >
      <Modal.Header>
        <Modal.Title id='contained-modal-title-vcenter'>
          {data.organizationName}
        </Modal.Title>
        <div className='w-25 mt-2 fw-bolder  rounded-lg bg-gray-100 p-1'>
          {data.email}
        </div>{" "}
        <div className='w-25 mt-2 fw-bolder  rounded-lg bg-gray-100 p-1'>
          {data.contactNumber}
        </div>
      </Modal.Header>
      <Modal.Body>
        {" "}
        <div className='flex gap-2 mt-2 text-sm'>
          <div className='label-box w-25'>Full Time</div>
          <div className=' w-25 ms-2 rounded-lg bg-blue-100 p-2' key={"dss"}>
            {data.fullTime}
          </div>
          <div className='label-box w-25'>Part Time</div>
          <div className=' w-25 ms-2 rounded-lg bg-blue-100 p-2' key={"dss"}>
            {data.partTime}
          </div>
        </div>
        <div className='flex gap-2 mt-2 text-sm'>
          <div className='label-box w-25'>Consultants</div>
          <div className=' w-25 ms-2 rounded-lg bg-blue-100 p-2' key={"dss"}>
            {data.consultants}
          </div>
          <div className='label-box w-25 text-sm'>Volunteers</div>
          <div className=' w-25 ms-2 rounded-lg bg-blue-100 p-2' key={"dss"}>
            {data.volunteers}
          </div>
        </div>
        <div className='flex gap-2 mt-2 text-sm'>
          <div className='label-box w-25 self-start'>
            Previous Year’s Turnover
          </div>
          <div className=' w-25 ms-2 rounded-lg bg-blue-100 p-2' key={"dss"}>
            {data.organizationTurnover}
          </div>
          <div className='label-box w-25'>
            Highest Budget of previous projects so far
          </div>
          <div className=' w-25 ms-2 rounded-lg bg-blue-100 p-2' key={"dss"}>
            {data.organizationBudget}
          </div>
        </div>
        <div className='mt-1 text-sm'>
          <div className='font-bold label-box w-50'>
            Key Project Interventions
          </div>
          <div className='border border-dotted rounded-lg p-2 mt-2 border-primary'>
            {parse(data.fundingUpdateProjects[0].description)}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className='btn btn-primary' onClick={props.onHide}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

function matchStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}
export default connect(matchStateToProps)(FuDetailModal);
