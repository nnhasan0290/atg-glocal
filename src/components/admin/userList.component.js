import React, { useState } from "react";
import AdminService from "../../services/admin.service";
import { setLoader, clearLoader } from "../../store/actions/loader";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { alertCustom } from "../../helpers/alerts";

const UserList = () => {
  const [userList, setUserList] = useState([]);
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (values) => {
    dispatch(setLoader());

    const data = {
      fromDate: new Date(values.fromDate).getTime(),
      toDate: new Date(values.toDate).getTime(),
    };
    AdminService.getUsersBetweenDates(data.fromDate, data.toDate)
      .then((res) => {
        setUserList(res.data.userBeans);
        dispatch(clearLoader());
        console.log(userList);
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
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='form-group w-1/3 d-inline-block'>
          <label htmlFor='fromDate'>From</label>
          <input
            {...register("fromDate")}
            className='form-control w-30'
            type='date'
          />
        </div>

        <div className='ms-2 form-group w-1/3 d-inline-block'>
          <label htmlFor='toDate'>To</label>
          <input {...register("toDate")} className='form-control' type='date' />
        </div>
        <div className='form-group text-center w-1/6 d-inline-block'>
          <button type='submit' className='btn btn-primary mt-2 btn-lg'>
            Search
          </button>
        </div>
      </form>

      <div>
        {userList.map((user, index) => {
          return (
            <div
              className='list-group-item  col-sm-12 col-md-6 align-items-start rounded mb-2  mt-3 custom-card'
              key={index}
            >
              <div className='d-flex w-100 justify-content-between'>
                <h5 className='mb-1'>{user.name}</h5>
                <p className='mt-1'>
                  <span
                    className='rounded-pill p-2 font-weight-bold ms-2'
                    style={{ color: "#E74E54", backgroundColor: "#FDD8D8" }}
                  >
                    {user.deviceTypes[0]}
                  </span>
                </p>
              </div>
              <div className='mt-2 mb-2'>
                <span
                  className='rounded-pill p-2'
                  style={{ color: "#3B7FBD", backgroundColor: "#E1F0F7" }}
                >
                  {user.contactNumber}
                </span>

                <span
                  className='rounded-pill p-2 ms-3'
                  style={{ backgroundColor: "#FFF9E6" }}
                >
                  {user.email}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default UserList;
