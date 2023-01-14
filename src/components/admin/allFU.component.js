import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import AdminService from "../../services/admin.service";
import parse from "html-react-parser";

import "bootstrap/dist/css/bootstrap.min.css";

import { setLoader, clearLoader } from "../../store/actions/loader";
import ConfirmationModal from "../../helpers/confirmationModal";
import { useInterval } from "../../helpers/useInterval";
import { POLLING_INTERVAL } from "../../constants/variables";

const AllFundingUpdate = (props) => {
  const dispatch = useDispatch();
  const [fus, setFus] = useState([]);
  const [selectedFU, setSelectedFU] = useState({});
  const [modalShowDelete, setModalShowDelete] = useState(false);
  const { id } = props.match.params;

  useInterval(async () => {
    dispatch(setLoader());
    //console.log("Checking for data updates");
    await AdminService.fetchFundingUpdate({ dataType: 1 }).then((res) => {
      dispatch(clearLoader());
      setFus(res.data.fundingUpdateBeans);
    });
  }, POLLING_INTERVAL);

  useEffect(() => {
    dispatch(setLoader());
    AdminService.fetchFundingUpdate({ dataType: 1 }).then((res) => {
      dispatch(clearLoader());
      setFus(res.data.fundingUpdateBeans);
    });
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="list-group row">
      {fus.map((fu, index) => {
        return (
          <div
            className="list-group-item col-sm-8 align-items-start rounded mb-2 bg-light bg-gradient custom-card"
            key={index}
          >
            <div className="flex ">
              <div className="w-75">
                <h5 className="mb-1">{fu.title}</h5>
              </div>

              <div className="expire-text-box p-2 self-center">
                {fu.applicationDeadlineText}
              </div>
            </div>
            <div className="mt-3">
              <span
                className="p-2 rounded-pill"
                style={{ color: "#3B7FBD", backgroundColor: "#E1F0F7" }}
              >
                {fu.createdBy}
              </span>
            </div>
            <div className="mt-3">{parse(fu.description)}</div>

            <div className="mt-3">
              <button
                className="btn btn-danger ms-2"
                onClick={(e) => {
                  setSelectedFU(fu);
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

              <a
                className="btn btn-primary ms-2"
                href={`${process.env.REACT_APP_URL}/fundingUpdate/ngo/${fu.id}`}
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

      {modalShowDelete && (
        <ConfirmationModal
          data={selectedFU}
          show={modalShowDelete}
          type="fu"
          onHide={() => setModalShowDelete(false)}
        />
      )}
    </div>
  );
};

export default AllFundingUpdate;
