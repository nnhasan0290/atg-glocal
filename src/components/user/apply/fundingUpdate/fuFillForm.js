import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";

import { renderStatesNew } from "../../../../services/render-services";

import { validationSchemaFundingUpdateNgo } from "../../../../constants/schema";

import { clearLoader, setLoader } from "../../../../store/actions/loader";
import UserService from "../../../../services/user.service";
import { alertCustom } from "../../../../helpers/alerts";
import { CSR_IMAGE } from "../../../../constants/variables";

import Multiselect from "multiselect-react-dropdown";
import MyEditor from "../../../../helpers/editor";

const FillFundingUpdate = (props) => {
  const dispatch = useDispatch();
  const { fuDetails } = props;

  const [cities, setCities] = useState();
  const [thematicArea, setThematicArea] = useState([]);
  const [headOffice, setHeadOffice] = useState();
  const [selectedCities, setSelectedCities] = useState([{ name: "", id: "" }]);
  const [projectLocations, setProjectLocations] = useState([
    { name: "", id: "" },
  ]);

  let csrSection = fuDetails.csrSectionBeans;

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchemaFundingUpdateNgo) });
  const showPrevQue = watch("prevQue");

  const onChangeState = (e) => {
    var __FOUND = props.fuDataBean.stateBeans.find(function (states, index) {
      // eslint-disable-next-line
      if (states.id === e.target.value) return true;
      return null;
    });

    setCities(__FOUND.cityBeans);
  };

  const handleHeadOfficeSelection = (e) => {
    setHeadOffice(e[0].id);
  };

  const handleThematicArea = (e) => {
    let temp = [];
    e.forEach((item) => {
      temp.push(item.id);
    });
    setThematicArea(temp);
  };

  const handleInputChange = (e, index) => {
    const list = [...selectedCities];
    list[index].name = e[0].name;
    list[index].id = e[0].id;
    setSelectedCities(list);
  };

  const handleInputChangeProjectLocations = (e, index) => {
    const list = [...projectLocations];
    list[index].name = e[0].name;
    list[index].id = e[0].id;
    setProjectLocations(list);
  };

  const handleAddClick = () => {
    setSelectedCities([
      ...selectedCities,
      {
        name: "",
        id: "",
      },
    ]);
  };

  const handleAddClickProjectLocations = () => {
    setProjectLocations([
      ...projectLocations,
      {
        name: "",
        id: "",
      },
    ]);
  };

  const onSubmit = (values) => {
    props.dispatch(setLoader());
    let tempCities = [];
    let tempProjectLocations = [];
    selectedCities.forEach((city) => {
      tempCities.push(city.id);
    });

    projectLocations.forEach((city) => {
      tempProjectLocations.push(city.id);
    });

    const data = {
      fundingUpdateId: fuDetails.id,
      organizationName: values.orgName,
      organizationBudget: values.orgBudget,
      organizationTurnover: values.orgTurnover,
      cities: tempCities,
      headLocationId: headOffice,
      consultants: values.consultants,
      fullTime: values.fullTime,
      partTime: values.partTime,
      volunteers: values.volunteers,
      thematicAreaList: thematicArea,
      previousProjects: [
        {
          description: values.description,
          fromYear: values.fromYear,
          toYear: values.toYear,
          targetAudience: values.targetAudience,
          fundedBy: values.fundedBy,
          cities: tempProjectLocations,
        },
      ],
      csrSectionBeans: csrSection,
    };

    UserService.applyFundingUpdate(data)

      .then((res) => {
        props.dispatch(clearLoader());
        if (res.data.status === 1) {
          alertCustom("success", "Successfully Created", "/home");
        } else {
          alertCustom("error", res.data.message, "/home");
        }
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

  const handleCsrSection = (e) => {
    // eslint-disable-next-line
    csrSection.map((section) => {
      // eslint-disable-next-line
      section.questions.map((question) => {
        if (question.identifier === e.target.name) {
          question.solutionOptions[e.target.value].selected = true;
          // eslint-disable-next-line
          // question.solutionOptions.map((solutionOption) => {
          //   if (solutionOption.identifier.toString() === value) {
          //     solutionOption.selected = true;
          //   }
          // });
        }
      });
    });
  };
  if (!(props && props.fuDataBean)) {
    dispatch(setLoader());
    return null;
  } else {
    dispatch(clearLoader());
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="ngo">
        <div className="ngo-form-box w-50">
          <div className="ngo-form-box-below w-5/6"></div>
          <h2 className="p-2">About the Organisation</h2>
        </div>

        <div className="mt-4">
          <div className="flex gap-2">
            <label className="label-box w-1/3 self-start" htmlFor="orgName">
              Name of The Organisation
            </label>
            <div className="w-2/3">
              {" "}
              <input
                className={`form-control ${errors.orgName ? "is-invalid" : ""}`}
                type="text"
                {...register("orgName")}
              />
              {errors.orgName && errors.orgName.message ? (
                <div className="invalid-feedback">{errors.orgName.message}</div>
              ) : null}
            </div>
          </div>

          <div className="flex mt-4 gap-2">
            <div className="w-1/3 self-start ">
              <label className="label-box">Select Geographic Location</label>
            </div>
            <div className="w-2/3">
              <div className="flex gap-2">
                <label className="sub-label-box  w-1/4 text-sm">
                  {" "}
                  Head Office
                </label>
                <div className="w-1/3">
                  <select onChange={onChangeState} className="form-select">
                    {renderStatesNew(props.fuDataBean.stateBeans)}
                  </select>
                </div>
                <div className="w-1/3">
                  <Multiselect
                    isObject={true}
                    onRemove={handleHeadOfficeSelection}
                    onSelect={handleHeadOfficeSelection}
                    options={cities}
                    displayValue="name"
                    singleSelect={true}
                    style={{
                      searchBox: {
                        border: "1px solid #3b7fbd",
                        borderRadius: "5px",
                        backgroundColor: "white",
                      },
                    }}
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <label className="sub-label-box  w-1/4 self-center text-sm">
                  Field Locations
                </label>
                <div className="w-2/3">
                  {" "}
                  {selectedCities.map((x, i) => {
                    return (
                      <div key={i} className="flex mt-2 gap-2">
                        <div className="w-1/3">
                          <select
                            onChange={onChangeState}
                            className="form-select"
                          >
                            {renderStatesNew(props.fuDataBean.stateBeans)}
                          </select>
                        </div>
                        <div className="w-1/3">
                          <Multiselect
                            isObject={true}
                            options={cities}
                            displayValue="name"
                            singleSelect={true}
                            style={{
                              searchBox: {
                                border: "1px solid #3b7fbd",
                                borderRadius: "5px",
                                backgroundColor: "white",
                              },
                            }}
                            onSelect={(e) => handleInputChange(e, i)}
                          />
                        </div>

                        <div className="w-1/3">
                          {selectedCities.length - 1 === i && (
                            <button
                              className="btn btn-primary"
                              onClick={handleAddClick}
                            >
                              Add
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="flex mt-3 gap-2">
            <label className="label-box w-1/3" htmlFor="orgName">
              Thematic Area
            </label>
            <div className="w-2/3">
              <Multiselect
                isObject={true}
                onRemove={handleThematicArea}
                onSelect={handleThematicArea}
                options={props.fuDataBean.thematicAreaBeans}
                displayValue="name"
                style={{
                  searchBox: {
                    border: "1px solid #3b7fbd",
                    borderRadius: "5px",
                    backgroundColor: "white",
                  },
                }}
              />
            </div>
          </div>
          <div className="flex mt-4 gap-2">
            <div className="w-1/3 self-start">
              <label className="label-box">
                What is the current team size of your Organisation?
              </label>
            </div>
            <div className="w-2/3">
              <div className="flex gap-2">
                <label className="sub-label-box sub-label-box-green w-1/4 text-sm self-start">
                  {" "}
                  Full Time
                </label>
                <div className="w-1/4">
                  <input
                    className={`form-control ${
                      errors.fullTime ? "is-invalid" : ""
                    }`}
                    type="text"
                    {...register("fullTime")}
                  />
                  {errors.fullTime && errors.fullTime.message ? (
                    <div className="invalid-feedback">
                      {errors.fullTime.message}
                    </div>
                  ) : null}
                </div>

                <label className="sub-label-box sub-label-box-light-green w-1/4 text-sm self-start">
                  {" "}
                  Part Time
                </label>
                <div className="w-1/4">
                  <input
                    className={`form-control ${
                      errors.partTime ? "is-invalid" : ""
                    }`}
                    type="text"
                    {...register("partTime")}
                  />
                  {errors.partTime && errors.partTime.message ? (
                    <div className="invalid-feedback">
                      {errors.partTime.message}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <label className="sub-label-box sub-label-box-green w-1/4 text-sm self-start">
                  {" "}
                  Consultants
                </label>
                <div className="w-1/4">
                  <input
                    className={`form-control ${
                      errors.consultants ? "is-invalid" : ""
                    }`}
                    type="text"
                    {...register("consultants")}
                  />
                  {errors.consultants && errors.consultants.message ? (
                    <div className="invalid-feedback">
                      {errors.consultants.message}
                    </div>
                  ) : null}
                </div>
                <label className="sub-label-box sub-label-box-light-green w-1/4 text-sm self-start">
                  {" "}
                  Volunteers
                </label>
                <div className="w-1/4">
                  <input
                    className={`form-control ${
                      errors.volunteers ? "is-invalid" : ""
                    }`}
                    type="text"
                    {...register("volunteers")}
                  />
                  {errors.volunteers && errors.volunteers.message ? (
                    <div className="invalid-feedback">
                      {errors.volunteers.message}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="flex mt-3 gap-4">
            <div className="w-1/2 flex gap-2">
              {" "}
              <label className="label-box w-5/6 self-start" htmlFor="orgName">
                Previous year turnover of your organisation as per audit report?
                (In INR Lacs and Figures only)
              </label>
              <div>
                {" "}
                <input
                  className={`form-control ${
                    errors.orgTurnover ? "is-invalid" : ""
                  }`}
                  type="text"
                  {...register("orgTurnover")}
                />
                {errors.orgTurnover && errors.orgTurnover.message ? (
                  <div className="invalid-feedback">
                    {errors.orgTurnover.message}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="w-1/2 flex gap-2">
              <label className="label-box w-5/6" htmlFor="orgName">
                What was your highest budget for any of your previous projects?
                (In INR Lacs and Figures only)
              </label>
              <div>
                {" "}
                <input
                  className={`form-control ${
                    errors.orgBudget ? "is-invalid" : ""
                  }`}
                  type="text"
                  {...register("orgBudget")}
                />
                {errors.orgBudget && errors.orgBudget.message ? (
                  <div className="invalid-feedback">
                    {errors.orgBudget.message}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          {fuDetails.csrSectionBeans.length > 0 && (
            <>
              <div className="ngo-form-box w-50 mt-4">
                <div className="ngo-form-box-below w-5/6"></div>
                <h2 className="p-2">Mandatory Requirements</h2>
              </div>
              <div className="mt-4 ">
                <div>
                  {fuDetails.csrSectionBeans.map((section) => {
                    return (
                      <div
                        className="flex mt-2 custom-card p-2"
                        key={section.identifier}
                      >
                        <div className="csr-image-box px-2 py-2 w-22">
                          <img
                            src={CSR_IMAGE[section.sectionText]}
                            alt="legal compliance"
                          />
                          <p className="text-xs text-center mt-2">
                            {section.sectionText}
                          </p>
                        </div>
                        <div className="w-3/4 px-4 ">
                          {section.questions.map((question) => {
                            return (
                              <div
                                className="flex gap-2 mt-2"
                                key={question.identifier}
                              >
                                <div className="self-center">
                                  {" "}
                                  {question.questionText}
                                </div>
                                {question.solutionOptions.map(
                                  (option, index) => {
                                    return (
                                      <div
                                        className="boxed"
                                        key={option.identifier}
                                      >
                                        <input
                                          type="radio"
                                          id={`${option.identifier}_${question.identifier}`}
                                          name={question.identifier}
                                          value={index}
                                          onChange={handleCsrSection}
                                        />
                                        <label
                                          htmlFor={`${option.identifier}_${question.identifier}`}
                                        >
                                          {option.solutionOptionText}
                                        </label>
                                      </div>
                                    );
                                  }
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          <div className="ngo-form-box w-50 mt-4">
            <div className="ngo-form-box-below w-5/6"></div>
            <h2 className="p-2"> Prior Project Experience</h2>
          </div>
          {fuDetails && fuDetails.fundingUpdateAssessmentBean && (
            <div>
              <div className="flex">
                <div className="w-2/3 mt-3">
                  {" "}
                  <label className="label-box " htmlFor="orgName">
                    Has your organisation worked on any project similar to this
                    project?
                  </label>
                </div>

                <div className="flex  ms-2 mt-3">
                  <div className="form-check form-check-inline">
                    <input
                      className={`form-check-input ${
                        errors.prevQue ? "is-invalid" : ""
                      }`}
                      type="radio"
                      id="prevQueYes"
                      value="Yes"
                      {...register("prevQue")}
                    />
                    <label className="form-check-label mt-0" for="inlineRadio1">
                      Yes
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className={`form-check-input ${
                        errors.prevQue ? "is-invalid" : ""
                      }`}
                      type="radio"
                      {...register("prevQue")}
                      id="prevQueNO"
                      value="no"
                    />
                    <label className="form-check-label mt-0" for="inlineRadio2">
                      No
                    </label>
                  </div>
                </div>
              </div>

              {errors.prevQue && errors.prevQue.message ? (
                <div className="invalid-feedback mt-2">
                  {errors.prevQue.message}
                </div>
              ) : null}
              {showPrevQue === "Yes" && (
                <div>
                  {" "}
                  <div className="flex mt-4 mt-2">
                    <div className="w-1/3 self-center">
                      <label className="label-box">
                        Select Geographic Location
                      </label>
                    </div>
                    <div className="w-2/3">
                      <div className="flex gap-2 ms-4">
                        <div className="w-2/3">
                          {projectLocations.map((x, i) => {
                            return (
                              <div key={i} className="flex mt-2 gap-2">
                                <div className="w-1/3">
                                  <select
                                    onChange={onChangeState}
                                    className="form-select"
                                  >
                                    {renderStatesNew(
                                      props.fuDataBean.stateBeans
                                    )}
                                  </select>
                                </div>
                                <div className="w-1/3">
                                  <Multiselect
                                    isObject={true}
                                    options={cities}
                                    displayValue="name"
                                    singleSelect={true}
                                    style={{
                                      searchBox: {
                                        border: "1px solid #3b7fbd",
                                        borderRadius: "5px",
                                        backgroundColor: "white",
                                      },
                                    }}
                                    onSelect={(e) =>
                                      handleInputChangeProjectLocations(e, i)
                                    }
                                  />
                                </div>

                                <div className="w-1/3">
                                  {projectLocations.length - 1 === i && (
                                    <button
                                      className="btn btn-primary"
                                      onClick={handleAddClickProjectLocations}
                                    >
                                      Add
                                    </button>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex mt-4 gap-2">
                    <label
                      className={`label-box self-start w-1/3 ${
                        errors.description ? "is-invalid" : ""
                      }`}
                      htmlFor="description"
                    >
                      Key Project Interventions
                    </label>
                    <div className="w-2/3 ">
                      <Controller
                        name="description"
                        control={control}
                        rules={{ required: true }}
                        className={
                          errors.description
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        render={(field) => (
                          <MyEditor {...field} errors={errors} />
                        )}
                      />
                      <small className="text-danger">
                        {errors.description && errors.description.message}
                      </small>
                    </div>
                  </div>
                  <div className="flex mt-3 gap-2">
                    <label
                      className="label-box w-1/3 self-start"
                      htmlFor="orgName"
                    >
                      Target Audience (Beneficiaries)
                    </label>

                    <div className="w-2/3">
                      {" "}
                      <input
                        className={`form-control ${
                          errors.targetAudience ? "is-invalid" : ""
                        }`}
                        type="text"
                        {...register("targetAudience")}
                      />
                      {errors.targetAudience &&
                      errors.targetAudience.message ? (
                        <div className="invalid-feedback">
                          {errors.targetAudience.message}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex mt-3 gap-2">
                    <label className="label-box w-1/3" htmlFor="orgName">
                      Project Year
                    </label>
                    <div className="w-1/3">
                      {" "}
                      <input
                        className={`form-control ${
                          errors.fromYear ? "is-invalid" : ""
                        }`}
                        type="text"
                        {...register("fromYear")}
                      />
                      {errors.fromYear && errors.fromYear.message ? (
                        <div className="invalid-feedback">
                          {errors.fromYear.message}
                        </div>
                      ) : null}
                    </div>
                    <div className="w-1/3">
                      {" "}
                      <input
                        className={`form-control ${
                          errors.toYear ? "is-invalid" : ""
                        }`}
                        type="text"
                        {...register("toYear")}
                      />
                      {errors.toYear && errors.toYear.message ? (
                        <div className="invalid-feedback">
                          {errors.toYear.message}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex mt-3 gap-2">
                    <label className="label-box w-1/3" htmlFor="orgName">
                      Project Funded By
                    </label>
                    <div className="w-2/3">
                      {" "}
                      <input
                        className={`form-control ${
                          errors.fundedBy ? "is-invalid" : ""
                        }`}
                        type="text"
                        {...register("fundedBy")}
                      />
                      {errors.fundedBy && errors.fundedBy.message ? (
                        <div className="invalid-feedback">
                          {errors.fundedBy.message}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex mt-3 gap-2">
                    <label className="label-box w-1/3" htmlFor="orgName">
                      Project Impact Assessment Status (By Third Party)
                    </label>
                    <div className="w-2/3 flex gap-2">
                      <div className="w-1/3">
                        {" "}
                        <input
                          type="radio"
                          className="btn-check w-100"
                          name="optionsOutlined"
                          id="success-outlined"
                          autoComplete="off"
                          {...register("optionsOutlined")}
                          value="completed"
                        />
                        <label
                          className="btn btn-outline-success w-100"
                          htmlFor="success-outlined"
                        >
                          Completed
                        </label>
                      </div>
                      <div className="w-1/3">
                        {" "}
                        <input
                          type="radio"
                          className="btn-check"
                          name="options-outlined"
                          id="warning-outlined"
                          autoComplete="off"
                          value="inProgress"
                          {...register("optionsOutlined")}
                        />
                        <label
                          className="btn btn-outline-warning w-100"
                          htmlFor="warning-outlined"
                        >
                          In Progress
                        </label>
                      </div>
                      <div className="w-1/3">
                        {" "}
                        <input
                          type="radio"
                          className="btn-check"
                          name="optionsOutlined"
                          id="danger-outlined"
                          autoComplete="off"
                          {...register("optionsOutlined")}
                          value="notDone"
                        />
                        <label
                          className="btn btn-outline-danger w-100"
                          htmlFor="danger-outlined"
                        >
                          Not Done
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="form-group mt-2 text-center mt-3">
            <button
              type="submit"
              className="btn btn-primary mt-2 btn-lg"
              disabled={props.isLoading}
            >
              {props.isLoading ? "Please wait..." : "Submit"}
            </button>
          </div>
        </div>
      </form>
    );
  }
};
function mapStateToProps(state) {
  const { isLoading } = state.loader;
  const { states } = state.states;
  const { fuDataBean } = state.fuData;

  return {
    isLoading,
    states,
    fuDataBean,
  };
}

export default connect(mapStateToProps)(FillFundingUpdate);
