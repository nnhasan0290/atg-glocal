import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import AdminService from "../../../services/admin.service";
import LocationImg from "../../../assets/Icons/location.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import DetailModal from "../../../helpers/detailModal";
import ApplicantModal from "../../../helpers/applicantModal";
import { setLoader, clearLoader } from "../../../store/actions/loader";
import ConfirmationModal from "../../../helpers/confirmationModal";
import { useInterval } from "../../../helpers/useInterval";
import { POLLING_INTERVAL } from "../../../constants/variables";

const AllJobs = (props) => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState({});
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShowApplicant, setModalShowApplicant] = useState(false);
  const [modalShowDelete, setModalShowDelete] = useState(false);
  const { id } = props.match.params;

  useInterval(async () => {
    props.dispatch(setLoader());
    await AdminService.fetchJobsByCategory(id, 1).then((res) => {
      props.dispatch(clearLoader());
      setJobs(res.data.jobDetailsBeans);
    });
  }, POLLING_INTERVAL);
  useEffect(() => {
    props.dispatch(setLoader());
    AdminService.fetchJobsByCategory(id, 1).then((res) => {
      props.dispatch(clearLoader());
      setJobs(res.data.jobDetailsBeans);
      console.log(jobs);
    });
  }, [id]);

  const filterValue = "Live";
  return (
    <div className="list-group row mt-2">
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
                {/* {job.jobApplicationBeans.length ? (
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
                )} */}
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
      {/* {modalShowApplicant && (
        <ApplicantModal
          data={selectedJob}
          show={modalShowApplicant}
          onHide={() => setModalShowApplicant(false)}
        />
      )} */}
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
