import React, { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";

import { clearLoader, setLoader } from "../../../../store/actions/loader";
import UserService from "../../../../services/user.service";
import { alertCustom } from "../../../../helpers/alerts";

import parse from "html-react-parser";

import FillFundingUpdate from "./fuFillForm";

const NgoFundingUpdate = (props) => {
  const {
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = useForm();
  const dispatch = useDispatch();
  const [fuDetails, setFuDetails] = useState();

  const onSubmit = () => {
    window.scrollTo(0, 0);
  };

  const { id } = props.match.params;
  useEffect(() => {
    UserService.getFundingUpdateDetails(id)
      .then((res) => {
        setFuDetails(res.data.fundingUpdateBean);
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

  if (!fuDetails) {
    dispatch(setLoader());
    return null;
  } else {
    dispatch(clearLoader());
    return (
      <div>
        {isSubmitSuccessful ? (
          <FillFundingUpdate fuDetails={fuDetails} />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-3 custom-card">
              <div className="px-4 py-4 mx-auto mt-2 ">
                <h4 className="text-center border border-2 rounded-lg p-2 border-primary">
                  {fuDetails.title}{" "}
                </h4>
                <div className="me-1 flex justify-end">
                  <span className="expire-text-box p-2">
                    {`Expires On ${fuDetails.applicationDeadlineText}`}
                  </span>
                </div>
                <div className="mt-3">
                  <div className="font-bold label-box w-25">
                    Key Project Interventions
                  </div>
                  <div className="border border-dotted rounded-lg p-3 mt-2 border-primary">
                    {" "}
                    {parse(fuDetails.description)}
                  </div>
                </div>
                <div className="flex mt-3">
                  <div className="font-bold label-box w-25 self-start">
                    Thematic Area
                  </div>
                  <div className="w-75 flex flex-wrap gap-2">
                    {fuDetails.thematicAreaBeans &&
                      fuDetails.thematicAreaBeans.map((area) => {
                        return (
                          <div
                            className="ms-2 rounded-lg bg-blue-100 p-2"
                            key={area.id}
                          >
                            {area.name}
                          </div>
                        );
                      })}
                  </div>
                </div>
                <div className="flex mt-3">
                  <div className="font-bold label-box w-25">
                    Location of Interest
                  </div>
                  <div className="w-75 flex flex-wrap gap-2">
                    {fuDetails.cityBeans &&
                      fuDetails.cityBeans.map((city) => {
                        return (
                          <div
                            className="ms-2 rounded-lg bg-blue-100 p-2 "
                            key={city.id}
                          >
                            {city.name}
                          </div>
                        );
                      })}
                  </div>
                </div>
                <div className="flex mt-3">
                  <div className="font-bold label-box w-25">
                    Target Audience
                  </div>
                  <div className="w-75 flex">
                    <div className="ms-2 rounded-lg border border-2 border-primary p-2 ">
                      {fuDetails.fundingUpdateTargetAudienceBean &&
                        fuDetails.fundingUpdateTargetAudienceBean.beneficiaries}
                    </div>
                  </div>
                </div>
                <div className="flex mt-3">
                  <div className="font-bold label-box w-25">
                    Beneficiaries Gender
                  </div>
                  <div className="w-75 flex">
                    {fuDetails.genderBeans &&
                      fuDetails.genderBeans.map((gender) => {
                        return (
                          <div
                            className="ms-2 rounded-lg bg-yellow-100 p-2"
                            key={gender.id}
                          >
                            {gender.name}
                          </div>
                        );
                      })}
                  </div>
                </div>

                <div className="mt-3 flex">
                  <div className="font-bold label-box w-25">Age Group</div>
                  <div className="ms-2 rounded-lg bg-yellow-100 p-2">
                    {" "}
                    {`${fuDetails.fundingUpdateTargetAudienceBean.minAge} to ${fuDetails.fundingUpdateTargetAudienceBean.maxAge} Years`}
                  </div>
                </div>

                <div className="mt-4 text-center">
                  {" "}
                  <button className="btn btn-primary" type="submit">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    );
  }
};
function mapStateToProps(state) {
  const { isLoading } = state.loader;

  const { fuDataBean } = state.fuData;

  return {
    isLoading,

    fuDataBean,
  };
}

export default connect(mapStateToProps)(NgoFundingUpdate);
