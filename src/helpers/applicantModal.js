import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import UserService from "../services/user.service";
import { setLoader, clearLoader } from "../store/actions/loader";
import { alert, alertCustom } from "./alerts";
import fileDownload from "js-file-download";
const ApplicantDetails = ({ applicants }) => {
  //console.log(applicants);
  const dispatch = useDispatch();
  const handleClick = (id, type) => {
    dispatch(setLoader());
    UserService.reviewJobApplication(id, type)
      .then((res) => {
        dispatch(clearLoader());
        if (res.data.status === 1) {
          alert("success", "Application is Successfully Reviewed");
        } else {
          alert("error", res.data.message);
        }
      })
      .catch((err) => {
        alertCustom("error", err.message, "/home");
      });
  };

  const handleDownload = (url, filename) => {
    dispatch(setLoader());
    UserService.downloadPdf(url).then((res) => {
      fileDownload(res.data, filename);
      dispatch(clearLoader());
    });
  };

  return applicants.map((applicant, index) => {
    return (
      <div
        className='list-group-item align-items-start rounded mb-2 bg-light bg-gradient custom-card'
        key={index}
      >
        <div className='d-flex w-100 justify-content-between'>
          <h5 className='mb-1'> {applicant.name}</h5>
          <span
            className='rounded-pill p-2 font-weight-bold'
            style={{ color: "#E74E54", backgroundColor: "#FDD8D8" }}
          >
            {applicant.jobApplicationStatusText}
          </span>
        </div>
        <div className='mt-2'>
          <span
            className='rounded-pill p-2'
            style={{ color: "#3B7FBD", backgroundColor: "#E1F0F7" }}
          >
            {applicant.email}
          </span>

          <span
            className='rounded-pill p-2 ms-3'
            style={{ color: "#F9F9F9", backgroundColor: "#F2643F" }}
          >
            {applicant.contactNumber}
          </span>
        </div>
        {/* <div className='mt-2'>
          <span
            className='rounded-pill p-2'
            style={{ color: "#3B7FBD", backgroundColor: "#E1F0F7" }}
          >
            {applicant.qualification}
          </span>

          <span
            className='rounded-pill p-2 ms-3'
            style={{ color: "#F9F9F9", backgroundColor: "#F2643F" }}
          >
            {applicant.experience}
          </span>
        </div> */}

        <div className='mt-3'>
          <button
            onClick={() =>
              handleDownload(
                applicant.resumeLink,
                `${applicant.name}_Resume.pdf`
              )
            }
            className='btn btn-dark d-inline d-sm-none'
          >
            Download Resume
          </button>
          <a
            href={applicant.resumeLink}
            className='btn btn-dark d-none d-sm-inline rounded-pill'
            target='_blank'
            rel='noreferrer'
          >
            View Resume
          </a>
          {applicant.showAccept && (
            <button
              className='btn btn-primary ms-2 rounded-pill'
              value='2'
              onClick={(e) => handleClick(applicant.id, e.target.value)}
            >
              Accept
            </button>
          )}
          {applicant.showReject && (
            <button
              className='btn btn-danger ms-2 rounded-pill'
              value='3'
              onClick={(e) => handleClick(applicant.id, e.target.value)}
            >
              Reject
            </button>
          )}
        </div>
      </div>
    );
  });
};
const ApplicantModal = (props) => {
  const { data } = props;

  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      scrollable={true}
    >
      <Modal.Header>
        <Modal.Title id='contained-modal-title-vcenter'>
          Applicant List
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='list-group'>
          <ApplicantDetails applicants={data.jobApplicationBeans} />
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

export default ApplicantModal;
