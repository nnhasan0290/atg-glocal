import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import UserService from "../../../services/user.service";
import LocationImg from "../../../assets/Icons/location.svg";
import { setLoader, clearLoader } from "../../../store/actions/loader";
import "bootstrap/dist/css/bootstrap.min.css";
import EventDetailModal from "../../../helpers/eventDetailModal";

import RegisteredModal from "../../../helpers/registeredModal";
import { useInterval } from "../../../helpers/useInterval";
import { POLLING_INTERVAL } from "../../../constants/variables";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import userService from "../../../services/user.service";
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

const MyEvents = (props) => {
  const dispatch = useDispatch();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [registrations, setregistrations] = useState([]);
  const [modalShowregistration, setModalShowregistration] = useState(false);

  const [filterValue, setFilterValue] = useState("All");
  const handleFilter = (e) => {
    setFilterValue(e.target.value);
  };

  useInterval(async () => {
    dispatch(setLoader());
    await UserService.fetchAllEvents().then((res) => {
      dispatch(clearLoader());
      setEvents(res.data.eventBeans);
    });
  }, POLLING_INTERVAL);

  useEffect(() => {
    dispatch(setLoader());
    UserService.fetchAllEvents().then((res) => {
      dispatch(clearLoader());
      setEvents(res.data.eventBeans);
      setSelectedEvent(res.data.eventBeans[0]);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="row p-2" style={{ backgroundColor: "#F9F9FB" }}>
      {events.length !== 0 && (
        <>
          <div className="col-12 col-sm-6">
            {/* <select className="form-select" onChange={handleFilter}>
                <option value="All" label="All" />
                <option value="In Review" label="In Review" />
                <option value="Live" label="Live" />
                <option value="Cancelled" label="Cancelled" />
              </select> */}

            <select className="form-select" onChange={handleFilter}>
              <option value="All" label="All" />
              <option
                value="Workshops & Trainings"
                label="Workshops & Trainings"
              />
              <option
                value="Awards & Competitions"
                label="Awards & Competitions"
              />
              <option
                value="Exhibitions & Summits"
                label="Exhibitions & Summits"
              />
            </select>
            {events
              .filter((event) => {
                if (event.eventCategoryText === filterValue) {
                  return event;
                }
                if (filterValue === "All") {
                  return event;
                }
                return null;
              })
              .map((event, index) => {
                return (
                  <div
                    className="custom-card mt-3 p-2 list-group-item list-group-item-action"
                    key={index}
                    onClick={(e) => {
                      setSelectedEvent(event);
                    }}
                  >
                    <div className="d-flex mt-2 active-job">
                      {/* {event.companyLogo.length !== 0 ? (
                          <div className="company-logo-bg">
                            <span
                              style={{
                                position: "relative",
                                top: "30%",
                                left: "35%",
                              }}
                            >
                              <img
                                src={event.banner}
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
                              {event.companyName[0]}
                            </span>
                          </div>
                        )} */}

                      <div className="me-auto w-50 ps-2">
                        <div className="text-break">
                          <span style={{ fontSize: "0.9rem" }}>
                            <strong>{event.title}</strong>
                          </span>
                        </div>
                        <div className="text-muted">
                          <span style={{ fontSize: "0.8rem" }}>
                            {event.postedBy}
                          </span>
                        </div>
                      </div>
                      <div className="me-3 ">
                        {" "}
                        <span
                          className={
                            event.eventCategoryText === "Workshops & Trainings"
                              ? "in-review p-2"
                              : event.eventCategoryText ===
                                "Awards & Competitions"
                              ? "live p-2"
                              : "expire-text-box p-2"
                          }
                        >
                          {event.eventCategoryText}
                        </span>
                      </div>
                      <div className="me-n3">
                        <span className="expire-text p-2">
                          {event.daysToExpiry} days left to register
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 p-1">
                      <span className="job-type p-2">
                        {event.eventCategoryText}
                      </span>
                      <span className="ms-2 p-2 text-muted">{event.fees}</span>
                      <span className="ms-2 p-2 text-muted">
                        <img
                          src={LocationImg}
                          className="me-1 inline"
                          alt="Location svg"
                        />
                        {event.venue}
                      </span>

                      <span className="ms-2 p-2 text-muted">
                        {registrations.length}
                      </span>

                      {/* <span className="ms-2 p-2 text-muted">
                        {registrations}
                      </span> */}
                    </div>
                    <div className="mt-2">
                      <button
                        className="btn btn-primary d-inline d-sm-none rounded-pill btn-sm"
                        onClick={(e) => {
                          setSelectedEvent(event);
                          setModalShow(true);
                        }}
                      >
                        View event details
                      </button>
                      {/* {event.editAllowed && (
                          <Link
                            to={{
                              pathname: "/user/updateEvent",
                              state: {
                                eventId: event.eventId,
                              },
                            }}
                          >
                            <button className="btn btn-dark ms-1 lg-ms-3 rounded-pill btn-sm">
                              Update
                              <span className="ms-2">
                                <Info reason={event.reasonText} />
                              </span>
                            </button>
                          </Link>
                        )} */}

                      {/* {registrations.map((registration) => {
                        registration.length ? (
                          <button
                            className="btn btn-danger ms-1 lg-ms-3 rounded-pill btn-sm"
                            onClick={() => {
                              setSelectedEvent(event);

                              setModalShowregistration(true);
                            }}
                          >
                            View Registrations
                          </button>
                        ) : (
                          <button
                            className="btn btn-danger ms-1 rounded-pill btn-sm"
                            disabled
                          >
                            No registrations
                          </button>
                        );
                      })} */}

                      {registrations.length ? (
                        <button
                          className="btn btn-danger ms-1 lg-ms-3 rounded-pill btn-sm"
                          onClick={() => {
                            setSelectedEvent(event);

                            setModalShowregistration(true);
                          }}
                        >
                          View Registrations
                        </button>
                      ) : (
                        <button
                          className="btn btn-danger ms-1 rounded-pill btn-sm"
                          disabled
                        >
                          No registrations
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            {modalShow && (
              <EventDetailModal
                event={selectedEvent}
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
            )}

            {modalShowregistration && (
              <RegisteredModal
                // data={selectedEvent}
                data={registrations}
                show={modalShowregistration}
                onHide={() => setModalShowregistration(false)}
              />
            )}
          </div>
          {selectedEvent !== null && (
            <div className="col-12 col-sm-6 d-none d-md-block d-lg-block custom-card p-0">
              <div className="text-center">
                {/* <div className="company-logo-bg-large mx-auto mt-3">
                    {selectedEvent.companyLogo ? (
                      <div className="company-logo-bg-large">
                        <span
                          style={{
                            position: "relative",
                            top: "30%",
                            left: "30%",
                          }}
                        >
                          <img
                            src={selectedEvent.companyLogo}
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
                          {selectedEvent.companyName[0]}
                        </span>
                      </div>
                    )}
                  </div> */}

                <div className="mt-2 fw-bolder">{selectedEvent.title}</div>
                <div className="text-muted fw-light">
                  <img
                    src={LocationImg}
                    className="me-1 inline"
                    alt="Location svg"
                  />
                  {selectedEvent.venue}
                </div>
                <div className="mt-4 p-1">
                  <span className="job-type p-2">
                    {selectedEvent.eventCategoryText}
                  </span>
                  <span className="fw-bold p-2">{selectedEvent.postedBy}</span>
                  <span className="ms-2 p-2 expire-text-box">
                    {selectedEvent.daysToExpiry}
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
                <div>{parse(selectedEvent.description)}</div>

                <HorizontalLine />

                {/* <div>{parse(selectedEvent.topicsCovered)}</div> */}

                {/* <HorizontalLine />

                  <div>{parse(selectedEvent.companyDetails)}</div> */}

                <HorizontalLine />

                <div>
                  <div className="fw-bold">SPOC Person Details</div>
                  <div className="mt-1">
                    {"Posted By ( Name of the contact person ) :"}
                  </div>
                  <div className="mt-1 fw-bold text-muted">
                    {selectedEvent.postedBy}
                  </div>
                  <a
                    className="btn btn-primary ms-2"
                    href={`${process.env.REACT_APP_URL}/event/workshop/${selectedEvent.id}`}
                    role="button"
                    target="_blank"
                    rel="noreferrer noopener"
                    style={{
                      margin: "10px 0 10px 0 !important",
                      fontSize: "12px",
                      padding: "7px",
                    }}
                  >
                    Go To Link
                  </a>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
    // <>hello</>
  );
};

export default MyEvents;
