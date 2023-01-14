import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";

import Multiselect from "multiselect-react-dropdown";
import { alertCustom } from "../../helpers/alerts";
import UserService from "../../services/user.service";

import CSR from "./CSR";

const CSRForm = (props) => {
  const [csrDetails, setCsrDetails] = useState({});
  const [thematicArea, setThematicArea] = useState([]);
  const [orgData, setOrgData] = useState();

  useEffect(() => {
    UserService.getCsrData()
      .then((res) => {
        setOrgData(res.data);
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

  const {
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = useForm({});

  const onSubmit = (data) => {
    data["thematicAreaList"] = thematicArea;
    window.scrollTo(0, 0);
    setCsrDetails(data);
  };

  const handleThematicArea = (e) => {
    let temp = [];
    e.forEach((item) => {
      temp.push(item.id);
    });
    setThematicArea(temp);
  };
  return (
    <div>
      {isSubmitSuccessful ? (
        <CSR csrDetails={csrDetails} orgData={orgData} />
      ) : (
        <div>
          <div className='text-center'>
            <h2>Let's Move one step closer towards </h2>
            <h2>your organisation's growth</h2>
          </div>
          <div className='p-3 sm:max-w-xl sm:mx-auto custom-card mt-8'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='font-bold text-current'>Organisation Details</div>
              {orgData && (
                <div>
                  {" "}
                  <div className='ml-4'>
                    <div className='form-group'>
                      <label htmlFor='organisationName'>
                        Organisation Name
                      </label>
                      <input
                        className='disabled form-control'
                        defaultValue={orgData.organizationName}
                        type='text'
                        readOnly
                        disabled
                      />
                    </div>
                  </div>
                  <div className='form-group'>
                    <div className='font-bold text-current'>Thematic Area</div>
                    <Multiselect
                      isObject={true}
                      onRemove={handleThematicArea}
                      onSelect={handleThematicArea}
                      options={orgData.thematicAreaBeans}
                      displayValue='name'
                    />
                  </div>
                </div>
              )}

              <div className='form-group ml-4 mt-4 '>
                <button type='submit' className='btn btn-primary mt-2'>
                  Take Test
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
function mapStateToProps(state) {
  const { isLoading } = state.loader;
  const { fuDataBean } = state.fuData;

  return {
    isLoading,
    fuDataBean,
  };
}

export default connect(mapStateToProps)(CSRForm);
