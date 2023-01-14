import React, { useState } from "react";

import AdminService from "../../services/admin.service";

import "bootstrap/dist/css/bootstrap.min.css";
import UpdateRoleModal from "../../helpers/updateRoleModal";
import { setLoader, clearLoader } from "../../store/actions/loader";

const ManageUser = (props) => {
  const [queryValue, setQueryValue] = useState("");
  const [noData, setNoData] = useState(false);
  const [user, setUsers] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState();
  const handleFilter = (e) => {
    setQueryValue(e.target.value);
  };
  const handleSearch = () => {
    setLoader();
    AdminService.searchUser(queryValue).then((res) => {
      clearLoader();

      if (res.data.userBeans.length === 0) {
        setNoData(true);
      } else {
        setNoData(false);
      }

      setUsers(res.data.userBeans);
    });
  };

  const checkRole = (userDetails) => {
    return userDetails.admin
      ? "Admin"
      : userDetails.growthConsultant
      ? "GC"
      : userDetails.manager
      ? "Manager"
      : "No Role Assigned";
  };

  return (
    <div className='row mt-2 w-75'>
      <div className='inline w-50'>
        <input
          name='queryValue'
          className='form-control'
          onChange={handleFilter}
          placeholder='Please Enter Mobile Number or Email'
        />
      </div>
      <div className='inline w-50'>
        {" "}
        <button className='btn btn-primary' onClick={handleSearch}>
          Search
        </button>
      </div>

      {noData ? (
        <div className='mt-2'>No Data Found</div>
      ) : (
        <div>
          {user.map((userDetails, index) => {
            return (
              <div className='custom-card mt-3 p-2' key={index}>
                <div className='d-flex mt-2 active-job'>
                  <div className='me-auto w-50 ps-2'>
                    <div className='text-break'>
                      <span style={{ fontSize: "0.9rem" }}>
                        <strong>{userDetails.name}</strong>
                      </span>
                    </div>
                  </div>
                  <div className='me-3 '>
                    {" "}
                    <span className='live p-2'>{checkRole(userDetails)}</span>
                  </div>
                </div>
                <div className='mt-2 p-1'>
                  <span className='job-type p-2'>{userDetails.email}</span>
                  <span className='ms-2 p-2 expire-text-box'>
                    {userDetails.contactNumber}
                  </span>
                  <span>
                    <button
                      className='ms-4 btn btn-primary btn-sm'
                      onClick={(e) => {
                        setSelectedUser(userDetails);
                        setModalShow(true);
                      }}
                    >
                      Change Role
                    </button>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {modalShow && (
        <UpdateRoleModal
          data={selectedUser}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      )}
    </div>
  );
};
export default ManageUser;
