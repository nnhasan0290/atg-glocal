import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import AdminService from "../../services/admin.service";

import "bootstrap/dist/css/bootstrap.min.css";
import GcDetailModal from "../../helpers/gcDetailModal";

import { setLoader, clearLoader } from "../../store/actions/loader";

import { useInterval } from "../../helpers/useInterval";
import { POLLING_INTERVAL } from "../../constants/variables";
import { alertCustom } from "../../helpers/alerts";

const GcList = (props) => {
  const [gcList, setGcList] = useState([]);
  const [selectedGc, setSelectedGC] = useState({});
  const [filterList, setFilterList] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [modalShow, setModalShow] = useState(false);

  useInterval(async () => {
    props.dispatch(setLoader());
    //console.log("Checking for data updates");
    await AdminService.getMonthlyReferrelSummary(props.user.userId).then(
      (res) => {
        props.dispatch(clearLoader());
        setGcList(res.data.monthlyReferralSummaryList);
      }
    );
  }, POLLING_INTERVAL);

  useEffect(() => {
    props.dispatch(setLoader());

    AdminService.getMonthlyReferrelSummary(props.user.userId)
      .then((res) => {
        props.dispatch(clearLoader());

        setGcList(res.data.monthlyReferralSummaryList);
        let temp = [];

        res.data.monthlyReferralSummaryList.forEach((data) => {
          temp.push(data.monthName);
        });
        setFilterList(temp);
        setFilterValue(temp[0]);
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        alertCustom("error", message, "/home");
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleFilter = (e) => {
    setFilterValue(e.target.value);
  };

  return (
    <div className='list-group row mt-2'>
      {filterList.length > 0 && (
        <select className='form-select' onChange={handleFilter}>
          {filterList.map((value, index) => {
            return <option value={value} label={value} key={index} />;
          })}
        </select>
      )}

      {gcList.length > 0 && gcList.find((gc) => gc.monthName === filterValue) && (
        <div>
          {gcList
            .find((gc) => gc.monthName === filterValue)
            .growthConsultantReferralSummaryList.map((gc, index) => {
              return (
                <div
                  className='list-group-item  col-sm-12 col-md-6 align-items-start rounded mb-2 bg-light bg-gradient mt-3'
                  key={index}
                >
                  <div className='d-flex w-100 justify-content-between'>
                    <h5 className='mb-1'>{gc.userBean.name}</h5>
                    <p className='mt-1'>
                      <span
                        className='rounded-pill p-2'
                        style={{
                          color: "#F9F9F9",
                          backgroundColor: "#00CCA9",
                        }}
                      >
                        {gc.conversionCount}
                      </span>
                      <span
                        className='rounded-pill p-2 ms-1'
                        style={{
                          color: "#F9F9F9",
                          backgroundColor: "#d43530",
                        }}
                      >
                        {gc.userReferralBeans.length}
                      </span>
                      <span
                        className='rounded-pill p-2 font-weight-bold ms-2'
                        style={{ color: "#E74E54", backgroundColor: "#FDD8D8" }}
                      >
                        {gc.earnings}
                      </span>
                    </p>
                  </div>
                  <div className='mt-2 mb-2'>
                    <span
                      className='rounded-pill p-2'
                      style={{ color: "#3B7FBD", backgroundColor: "#E1F0F7" }}
                    >
                      {gc.userBean.contactNumber}
                    </span>

                    <span
                      className='rounded-pill p-2 ms-3'
                      style={{ backgroundColor: "#FFF9E6" }}
                    >
                      {gc.userBean.email}
                    </span>
                  </div>

                  <div className='mt-3'>
                    <button
                      type='button'
                      className='btn btn-primary'
                      onClick={(e) => {
                        setSelectedGC(gc);
                        setModalShow(true);
                      }}
                    >
                      View Users
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      )}

      {modalShow && (
        <GcDetailModal
          gc={selectedGc}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      )}
    </div>
  );
};
function matchPropsToState(state) {
  const { isLoading } = state.loader;
  const { user } = state.auth;
  return {
    isLoading,
    user,
  };
}
export default connect(matchPropsToState)(GcList);
