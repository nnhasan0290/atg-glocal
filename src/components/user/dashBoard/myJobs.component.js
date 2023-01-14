import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import UserService from "../../../services/user.service";
import LocationImg from "../../../assets/Icons/location.svg";
import { setLoader, clearLoader } from "../../../store/actions/loader";
import "bootstrap/dist/css/bootstrap.min.css";
import MyModal from "../../../helpers/detailModal";

import ApplicantModal from "../../../helpers/applicantModal";
import { useInterval } from "../../../helpers/useInterval";
import { POLLING_INTERVAL } from "../../../constants/variables";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
const HorizontalLine = () => {
  return (
    <div
      style={{
        boxShadow: "0 0 25px 0 rgba(201,208,230,0.38)",
      }}
    >
      <hr className=" border-4 border-top "></hr>
    </div>
  );
};

const Info = (props) => {
  const { reason } = props;
  return (
    <OverlayTrigger
      delay={{ hide: 450, show: 300 }}
      overlay={(props) => <Tooltip {...props}>{reason}</Tooltip>}
      placement="top"
    >
      <i className="fa fa-info-circle" />
    </OverlayTrigger>
  );
};

const MyJobs = () => {
  const dispatch = useDispatch();
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [modalShowApplicant, setModalShowApplicant] = useState(false);

  const handleFilter = (e) => {
    setFilterValue(e.target.value);
  };
  const [filterValue, setFilterValue] = useState("All");

  useInterval(async () => {
    dispatch(setLoader());
    //console.log("Checking for data updates");
    await UserService.fetchJobs().then((res) => {
      dispatch(clearLoader());
      setJobs(res.data.jobDetailsBeans);
    });
  }, POLLING_INTERVAL);

  useEffect(() => {
    dispatch(setLoader());
    UserService.fetchJobs().then((res) => {
      dispatch(clearLoader());
      setJobs(res.data.jobDetailsBeans);
      setSelectedJob(res.data.jobDetailsBeans[0]);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="row p-2" style={{ backgroundColor: "#F9F9FB" }}>
      {jobs.length !== 0 && (
        <>
          <div className="col-12 col-sm-6">
            <select className="form-select" onChange={handleFilter}>
              <option value="All" label="All" />
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
                    className="custom-card mt-3 p-2 list-group-item list-group-item-action"
                    key={index}
                    onClick={(e) => {
                      setSelectedJob(job);
                    }}
                  >
                    <div className="d-flex mt-2 active-job">
                      {job.companyLogo.length !== 0 ? (
                        <div className="company-logo-bg">
                          <span
                            style={{
                              position: "relative",
                              top: "30%",
                              left: "35%",
                            }}
                          >
                            <img
                              src={job.companyLogo}
                              alt="Company Logo"
                              width="25"
                            />
                          </span>
                        </div>
                      ) : (
                        <div className="company-logo-bg-none">
                          {" "}
                          <span
                            style={{
                              position: "relative",
                              top: "30%",
                              left: "40%",
                            }}
                          >
                            {job.companyName[0]}
                          </span>
                        </div>
                      )}
                      <div className="me-auto w-50 ps-2">
                        <div className="text-break">
                          <span style={{ fontSize: "0.9rem" }}>
                            <strong>{job.designation}</strong>
                          </span>
                        </div>
                        <div className="text-muted">
                          <span style={{ fontSize: "0.8rem" }}>
                            {job.companyName}
                          </span>
                        </div>
                      </div>
                      <div className="me-3 ">
                        {" "}
                        <span
                          className={
                            job.jobStatus === 1
                              ? "in-review p-2"
                              : job.jobStatus === 2
                              ? "live p-2"
                              : "expire-text-box p-2"
                          }
                        >
                          {job.jobStatusText}
                        </span>
                      </div>
                      <div className="me-n3">
                        <span className="expire-text p-2">
                          {job.expiryText}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 p-1">
                      <span className="job-type p-2">{job.jobType}</span>
                      <span className="ms-2 p-2 text-muted">
                        {job.salaryText}
                      </span>
                      <span className="ms-2 p-2 text-muted">
                        <img
                          src={LocationImg}
                          className="me-1 inline"
                          alt="Location svg"
                        />
                        {job.location}
                      </span>
                    </div>
                    <div className="mt-2">
                      <button
                        className="btn btn-primary d-inline d-sm-none rounded-pill btn-sm"
                        onClick={(e) => {
                          setSelectedJob(job);
                          setModalShow(true);
                        }}
                      >
                        View job details
                      </button>
                      {job.editAllowed && (
                        <Link
                          to={{
                            pathname: "/user/updateJob",
                            state: {
                              jobId: job.jobId,
                            },
                          }}
                        >
                          <button className="btn btn-dark ms-1 lg-ms-3 rounded-pill btn-sm">
                            Update
                            <span className="ms-2">
                              <Info reason={job.reasonText} />
                            </span>
                          </button>
                        </Link>
                      )}
                      {job.jobApplicationBeans.length ? (
                        <button
                          className="btn btn-danger ms-1 lg-ms-3 rounded-pill btn-sm"
                          onClick={() => {
                            setSelectedJob(job);
                            setModalShowApplicant(true);
                          }}
                        >
                          View Applicant Details
                        </button>
                      ) : (
                        <button
                          className="btn btn-danger ms-1 rounded-pill btn-sm"
                          disabled
                        >
                          No Applicants
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            {modalShow && (
              <MyModal
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
          </div>
          {selectedJob !== null && (
            <div className="col-12 col-sm-6 d-none d-md-block d-lg-block custom-card p-0">
              <div className="text-center">
                <div className="company-logo-bg-large mx-auto mt-3">
                  {selectedJob.companyLogo ? (
                    <div className="company-logo-bg-large">
                      <span
                        style={{
                          position: "relative",
                          top: "30%",
                          left: "30%",
                        }}
                      >
                        <img
                          src={selectedJob.companyLogo}
                          alt="Company Logo"
                          width="45"
                        />
                      </span>
                    </div>
                  ) : (
                    <div className="company-logo-bg-large-none">
                      {" "}
                      <span
                        style={{
                          position: "relative",
                          top: "30%",
                          fontSize: "2rem",
                        }}
                      >
                        {selectedJob.companyName[0]}
                      </span>
                    </div>
                  )}
                </div>
                <div className="mt-2 fw-bolder">{selectedJob.companyName}</div>
                <div className="text-muted fw-light">
                  <img
                    src={LocationImg}
                    className="me-1 inline"
                    alt="Location svg"
                  />
                  {selectedJob.location}
                </div>
                <div className="mt-4 p-1">
                  <span className="fw-bold p-2">{selectedJob.designation}</span>
                  <span className="ms-2 job-type p-2">
                    {selectedJob.jobType}
                  </span>
                  <span className="ms-2 p-2 expire-text-box">
                    {selectedJob.expiryText}
                  </span>
                </div>
              </div>

              <div
                style={{
                  boxShadow: "0 0 25px 0 rgba(201,208,230,0.38)",
                }}
              >
                <hr className=" border-4 border-top "></hr>
              </div>

              <div style={{ fontSize: "0.8rem" }} className="p-2">
                <div>{parse(selectedJob.jobDescription)}</div>

                <HorizontalLine />

                <div>{parse(selectedJob.requirement)}</div>

                <HorizontalLine />

                <div>{parse(selectedJob.companyDetails)}</div>

                <HorizontalLine />

                <div>
                  <div className="fw-bold">SPOC Person Details</div>
                  <div className="mt-1">
                    {"Posted By ( Name of the contact person ) :"}
                  </div>
                  <div className="mt-1 fw-bold text-muted">
                    {selectedJob.postedBy}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyJobs;
