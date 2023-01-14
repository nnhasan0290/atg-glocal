import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AdminService from "../../../services/admin.service";
import "bootstrap/dist/css/bootstrap.min.css";
import EventDetailModal from "../../../helpers/eventDetailModal";
import { setLoader, clearLoader } from "../../../store/actions/loader";
import ConfirmationModal from "../../../helpers/confirmationModal";
import { useInterval } from "../../../helpers/useInterval";
import { POLLING_INTERVAL } from "../../../constants/variables";

const AllEvents = (props) => {
  const dispatch = useDispatch();
  const { id } = props.match.params;
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState({});
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShowDelete, setModalShowDelete] = useState(false);
  useInterval(async () => {
    dispatch(setLoader());
    await AdminService.fetchEventsByCategory(id, 1).then((res) => {
      dispatch(clearLoader());
      setEvents(res.data.eventBeans);
    });
  }, POLLING_INTERVAL);

  useEffect(() => {
    dispatch(setLoader());
    AdminService.fetchEventsByCategory(id, 1).then((res) => {
      dispatch(clearLoader());
      setEvents(res.data.eventBeans);
    });
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="list-group row">
      {events.map((event, index) => {
        return (
          <div
            className="list-group-item col-sm-8 align-items-start rounded mb-2 bg-light bg-gradient"
            key={index}
          >
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{event.postedBy}</h5>
              <span
                className="rounded-pill p-2 font-weight-bold"
                style={{ color: "#E74E54", backgroundColor: "#FDD8D8" }}
              >
                {event.applicationDeadlineText}
              </span>
            </div>
            <div className="mt-3">
              <span
                className="p-2 rounded-pill"
                style={{ color: "#3B7FBD", backgroundColor: "#E1F0F7" }}
              >
                {event.organisedBy.contactNumber}
              </span>
              <span
                className="rounded-pill p-2 ms-3"
                style={{ color: "#0DB71A", backgroundColor: "#EEFDEE" }}
              >
                {event.organisedBy.email}
              </span>
            </div>
            <div className="mt-3">
              <a
                className="btn btn-primary ms-2"
                href={`${process.env.REACT_APP_URL}/event/${event.eventCategoryText}/${event.id}`}
                role="button"
                target="_blank"
                rel="noreferrer noopener"
              >
                Go To Link
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllEvents;
