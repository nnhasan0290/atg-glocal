import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import AdminService from "../../services/admin.service";
import LocationImg from "../../assets/Icons/location.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import DetailModal from "../../helpers/detailModal";
import ApplicantModal from "../../helpers/applicantModal";
import { setLoader, clearLoader } from "../../store/actions/loader";
import ConfirmationModal from "../../helpers/confirmationModal";
import { useInterval } from "../../helpers/useInterval";
import { POLLING_INTERVAL } from "../../constants/variables";

const AllJobs = (props) => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState({});

  const [modalShow, setModalShow] = React.useState(false);
  const [modalShowApplicant, setModalShowApplicant] = useState(false);
  const [modalShowDelete, setModalShowDelete] = useState(false);
  const { id } = props.match.params;

  useInterval(async () => {
    props.dispatch(setLoader());
    await AdminService.fetchAllJobs().then((res) => {
      props.dispatch(clearLoader());
      setJobs(res.data.jobDetailsBeans);
    });
  }, POLLING_INTERVAL);
  useEffect(() => {
    props.dispatch(setLoader());
    AdminService.fetchAllJobs().then((res) => {
      props.dispatch(clearLoader());
      setJobs(res.data.jobDetailsBeans);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleFilter = (e) => {
    setFilterValue(e.target.value);
  };
  const [filterValue, setFilterValue] = useState("all");
  return (
    <div className="list-group row mt-2">
      <select className="form-select" onChange={handleFilter}>
        <option value="" label="Choose One" />
        <option value="In Review" label="In Review" />
        <option value="Live" label="Live" />
        <option value="Cancelled" label="Cancelled" />
      </select>

      {jobs
        .filter((job) => {
          if (job.jobStatusText === filterValue) {
            return job;
          }
          if (filterValue === "All") {
            return job;
          }
          return null;
        })
        .map((job, index) => {
          return (
            <div
              className="list-group-item  col-sm-12 align-items-start rounded mb-2 bg-light bg-gradient mt-3"
              key={index}
            >
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{job.companyName}</h5>
                <p className="mt-1">
                  <span
                    className="rounded-pill p-2 "
                    style={{
                      color: "#F9F9F9",

                      backgroundColor:
                        job.jobStatusText === "Reviewed"
                          ? "#d43530"
                          : "#00CCA9",
                    }}
                  >
                    {job.jobStatusText === "Reviewed"
                      ? "Live"
                      : job.jobStatusText}
                  </span>
                  <span
                    className="rounded-pill p-2 font-weight-bold ms-2"
                    style={{ color: "#E74E54", backgroundColor: "#FDD8D8" }}
                  >
                    {job.expiryText}
                  </span>
                </p>
              </div>
              <div className="mt-2 mb-2">
                <span
                  className="rounded-pill p-2"
                  style={{ color: "#3B7FBD", backgroundColor: "#E1F0F7" }}
                >
                  {job.jobType}
                </span>

                <span
                  className="rounded-pill p-2 ms-3"
                  style={{ backgroundColor: "#FFF9E6" }}
                >
                  {`₹${job.salaryText}`}
                </span>
              </div>
              <div className="mt-4">
                <span
                  className="rounded-pill p-2"
                  style={{ color: "#F9F9F9", backgroundColor: "#F2643F" }}
                >
                  {job.designation}
                </span>
              </div>
              <div className="mt-3">
                <span className="py-2 text-muted">
                  <img src={LocationImg} height="25" alt="" />
                  {job.location}
                </span>
              </div>
              <div className="mt-2">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={(e) => {
                    setSelectedJob(job);
                    setModalShow(true);
                  }}
                >
                  View job details
                </button>
                {job.jobApplicationBeans.length ? (
                  <button
                    className="btn btn-danger ms-3"
                    onClick={() => {
                      setSelectedJob(job);
                      setModalShowApplicant(true);
                    }}
                  >
                    View Applicant Details
                  </button>
                ) : (
                  <button className="btn btn-danger ms-1" disabled>
                    No Applicants
                  </button>
                )}
                <button
                  className="btn btn-danger ms-2"
                  onClick={(e) => {
                    setSelectedJob(job);
                    setModalShowDelete(true);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                    <path
                      fillRule="evenodd"
                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      {modalShow && (
        <DetailModal
          data={selectedJob}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      )}
      {modalShowApplicant && (
        <ApplicantModal
          data={selectedJob}
          show={modalShowApplicant}
          onHide={() => setModalShowApplicant(false)}
        />
      )}
      {modalShowDelete && (
        <ConfirmationModal
          data={selectedJob}
          show={modalShowDelete}
          type="job"
          onHide={() => setModalShowDelete(false)}
        />
      )}
    </div>
  );
};
function matchPropsToState(state) {
  const { isLoading } = state.loader;
  return {
    isLoading,
  };
}
export default connect(matchPropsToState)(AllJobs);
