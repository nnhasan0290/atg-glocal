import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AdminService from "../../../services/admin.service";
import parse from "html-react-parser";
import "bootstrap/dist/css/bootstrap.min.css";
import { setLoader, clearLoader } from "../../../store/actions/loader";
import ConfirmationModal from "../../../helpers/confirmationModal";
import { useInterval } from "../../../helpers/useInterval";
import { POLLING_INTERVAL } from "../../../constants/variables";

const AllFundingUpdate = (props) => {
  const dispatch = useDispatch();
  const [fus, setFus] = useState([]);
  const [selectedFU, setSelectedFU] = useState({});
  const [modalShowDelete, setModalShowDelete] = useState(false);
  const { id } = props.match.params;

  useInterval(async () => {
    dispatch(setLoader());
    //console.log("Checking for data updates");
    await AdminService.fetchFundingUpdateByCategory(id, { dataType: 1 }).then(
      (res) => {
        dispatch(clearLoader());
        setFus(res.data.fundingUpdateBeans);
      }
    );
  }, POLLING_INTERVAL);

  useEffect(() => {
    dispatch(setLoader());
    AdminService.fetchFundingUpdateByCategory(id, 1).then((res) => {
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
              <a
                className="btn btn-primary ms-2"
                href={`${process.env.REACT_APP_URL}/fundingUpdate/${id}/${fu.id}`}
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

export default AllFundingUpdate;
