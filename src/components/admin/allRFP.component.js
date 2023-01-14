import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import AdminService from "../../services/admin.service";
import parse from "html-react-parser";

import "bootstrap/dist/css/bootstrap.min.css";

import { setLoader, clearLoader } from "../../store/actions/loader";
import ConfirmationModal from "../../helpers/confirmationModal";
import { useInterval } from "../../helpers/useInterval";
import { POLLING_INTERVAL } from "../../constants/variables";

const AllRFP = () => {
  const dispatch = useDispatch();

  const [rfp, setRFP] = useState([]);
  const [selectedRFP, setSelectedRFP] = useState({});
  const [modalShowDelete, setModalShowDelete] = useState(false);

  useInterval(async () => {
    dispatch(setLoader());
    //console.log("Checking for data updates");
    await AdminService.fetchRFP().then((res) => {
      dispatch(clearLoader());

      setRFP(res.data.requestForProposalBeans);
    });
  }, POLLING_INTERVAL);

  useEffect(() => {
    dispatch(setLoader());
    AdminService.fetchRFP().then((res) => {
      dispatch(clearLoader());

      setRFP(res.data.requestForProposalBeans);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='list-group row'>
      {rfp.map((rfp, index) => {
        return (
          <div
            className='list-group-item col-sm-8 align-items-start rounded mb-2 bg-light bg-gradient'
            key={index}
          >
            <div className='d-flex w-100 justify-content-between'>
              <h5 className='mb-1'>{rfp.title}</h5>
              <span
                className='rounded-pill p-2 font-weight-bold'
                style={{ color: "#E74E54", backgroundColor: "#FDD8D8" }}
              >
                {rfp.applicationDeadlineText}
              </span>
            </div>
            <div>
              <p>
                {" "}
                <span
                  className='rounded-pill p-2 text-sm'
                  style={{ color: "#E74E54", backgroundColor: "#FDD8D8" }}
                >
                  {rfp.id}
                </span>
              </p>
            </div>
            <div className='mt-3'>
              <span
                className='p-2 rounded-pill'
                style={{ color: "#3B7FBD", backgroundColor: "#E1F0F7" }}
              >
                {rfp.createdBy}
              </span>
              <span
                className='rounded-pill p-2 ms-3'
                style={{ color: "#0DB71A", backgroundColor: "#EEFDEE" }}
              >
                {rfp.thematicArea}
              </span>
            </div>
            <div className='mt-3'>{parse(rfp.description)}</div>

            <div className='mt-3'>
              <button
                className='btn btn-danger ms-2'
                onClick={(e) => {
                  setSelectedRFP(rfp);
                  setModalShowDelete(true);
                }}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  fill='currentColor'
                  className='bi bi-trash'
                  viewBox='0 0 16 16'
                >
                  <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z' />
                  <path
                    fillRule='evenodd'
                    d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'
                  />
                </svg>
              </button>
            </div>
          </div>
        );
      })}

      {modalShowDelete && (
        <ConfirmationModal
          data={selectedRFP}
          show={modalShowDelete}
          type='rfp'
          onHide={() => setModalShowDelete(false)}
        />
      )}
    </div>
  );
};

export default AllRFP;
