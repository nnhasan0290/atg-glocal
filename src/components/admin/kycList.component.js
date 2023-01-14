import React, { useEffect, useState } from "react";

import AdminService from "../../services/admin.service";

import "bootstrap/dist/css/bootstrap.min.css";

import { setLoader, clearLoader } from "../../store/actions/loader";

import { useInterval } from "../../helpers/useInterval";
import { useDispatch } from "react-redux";
import { POLLING_INTERVAL } from "../../constants/variables";

const KycList = (props) => {
  const dispatch = useDispatch();
  const [kycList, setKycList] = useState([]);

  useInterval(async () => {
    dispatch(setLoader());
    //console.log("Checking for data updates");
    await AdminService.getKycList().then((res) => {
      dispatch(clearLoader());
      setKycList(res.data.kycBriefBeans);
    });
  }, POLLING_INTERVAL);

  useEffect(() => {
    dispatch(setLoader());
    AdminService.getKycList().then((res) => {
      dispatch(clearLoader());
      setKycList(res.data.kycBriefBeans);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleFilter = (e) => {
    setFilterValue(e.target.value);
  };

  const [filterValue, setFilterValue] = useState("all");
  return (
    <div className='row mt-2 w-50'>
      <input
        name='fileterValue'
        className='form-control'
        onChange={handleFilter}
        placeholder='Please Enter Mobile Number or Email'
      />

      {kycList
        .filter((userDetails) => {
          if (
            userDetails.officialEmail === filterValue ||
            userDetails.contactNumber === filterValue
          ) {
            return userDetails;
          }
          if (filterValue === "All") {
            return userDetails;
          }
          return null;
        })
        .map((userDetails, index) => {
          return (
            <div className='custom-card mt-3 p-2' key={index}>
              <div className='d-flex mt-2 active-job'>
                <div className='me-auto w-50 ps-2'>
                  <div className='text-break'>
                    <span style={{ fontSize: "0.9rem" }}>
                      <strong>{userDetails.organizationName}</strong>
                    </span>
                  </div>
                </div>
                <div className='me-3 '>
                  {" "}
                  <span className='live p-2'>{userDetails.kycStatusText}</span>
                </div>
              </div>
              <div className='mt-2 p-1'>
                <span className='job-type p-2'>
                  {userDetails.officialEmail}
                </span>
                <span className='ms-2 p-2 expire-text-box'>
                  {userDetails.contactNumber}
                </span>
              </div>
            </div>
          );
        })}
    </div>
  );
};
export default KycList;
