import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";

import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchemaRFP } from "../../../constants/schema";

import {
  renderCities,
  renderStates,
  onChangeStates,
  renderThematicArea,
} from "../../../services/render-services";
import { clearLoader, setLoader } from "../../../store/actions/loader";
import MyEditor from "../../../helpers/editor";

import UserService from "../../../services/user.service";
import { alertCustom } from "../../../helpers/alerts";
import { useLocation } from "react-router-dom";

const FundingUpdateOld = (props) => {
  const [cities, getCities] = useState([]);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchemaRFP) });
  const onChangeState = (e) => {
    onChangeStates(e.target.value).then((res) => {
      getCities(res.data);
    });
  };
  const location = useLocation();

  const onSubmit = (values) => {
    props.dispatch(setLoader());
    let location;
    if (values.eventType === "Offline") {
      location = values.location;
    } else {
      location = "Online";
    }
    const data = {
      title: values.eventTitle,
      description: values.description,
      externalLink: values.eventLink,
      applicationDeadline: new Date(values.applicationDeadline).getTime(),
      termsAndConditions: "true",
      location: location,
      thematicArea: values.thematicArea,
      postedBy: values.postedBy,
    };
    console.log(data);
    UserService.createFundingUpdate(data).then((res) => {
      props.dispatch(clearLoader());
      if (res.data.status === 1) {
        alertCustom("success", "Successfully Created", "/home");
      } else {
        alertCustom("error", res.data.message, "/home");
      }
    });
  };
  const [eventType, setEventType] = useState("");

  const eventTypeFieldRegister = register("eventType", { required: true });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mx-auto'>
        <h1>
          Create Funding Update{" "}
          <span className='ms-2 expire-text-box p-2'>
            {location.state.expiryText}
          </span>
          <span className='ms-2 in-review p-2'>
            {location.state.package ? " Premium " : "Standard"}
          </span>
        </h1>
      </div>
      <div className='form-group'>
        <label htmlFor='eventTitle'>Funding Update Title</label>
        <input
          className={
            errors.eventTitle ? "form-control is-invalid" : "form-control"
          }
          type='text'
          {...register("eventTitle")}
        />
        {errors.eventTitle && errors.eventTitle.message ? (
          <div className='invalid-feedback'>{errors.eventTitle.message}</div>
        ) : null}
      </div>
      <div className='form-group'>
        <label htmlFor='description'>Funding Description</label>
        <Controller
          name='description'
          control={control}
          rules={{ required: true }}
          className={
            errors.description ? "form-control is-invalid" : "form-control"
          }
          render={(field) => <MyEditor {...field} errors={errors} />}
        />
        <small className='text-danger'>
          {errors.description && errors.description.message}
        </small>
      </div>
      <div className='form-group'>
        <label>Thematic Area</label>

        <select
          className={
            errors.thematicArea ? "form-select is-invalid" : "form-select"
          }
          {...register("thematicArea")}
        >
          {renderThematicArea()}
        </select>

        <small className='text-danger'>
          {errors.thematicArea && errors.thematicArea.message}
        </small>
      </div>
      <div className='row mt-2'>
        <label>Tender - News</label>
        <div className='form-group'>
          <select
            className={
              errors.eventType ? "form-select is-invalid" : "form-select"
            }
            {...eventTypeFieldRegister}
            onChange={(e) => {
              eventTypeFieldRegister.onChange(e);
              setEventType(e.target.value);
            }}
          >
            <option value='' label='Select Option' />;
            <option value='Online' label='Pan India' />;
            <option value='Offline' label='Location' />;
          </select>
          <small className='text-danger'>
            {errors.eventType && errors.eventType.message}
          </small>
        </div>
      </div>
      {eventType === "Offline" && (
        <div className='row'>
          <label>Location</label>
          <div className='col-6 form-group'>
            <select onChange={onChangeState} className='form-select'>
              {renderStates(props.states)}
            </select>
          </div>
          <div className='col-6 form-group'>
            <select
              className={
                errors.venue ? "form-select is-invalid" : "form-select"
              }
              {...register("location")}
            >
              {renderCities(cities)}
            </select>

            <small className='text-danger'>
              {errors.location && errors.location.message}
            </small>
          </div>
        </div>
      )}
      <div className='form-group'>
        <label htmlFor='eventLink'>Link to web-page</label>
        <input
          {...register("eventLink")}
          className={
            errors.eventLink ? "form-control is-invalid" : "form-control"
          }
        />
        {errors.eventLink && errors.eventLink.message ? (
          <div className='invalid-feedback'>{errors.eventLink.message}</div>
        ) : null}
      </div>{" "}
      <div className='form-group'>
        <label htmlFor='postedBy'>
          Posted By{" "}
          <span className='text-muted'>
            <em>( Name of Organization/Organizer/SPOC/Contact Person )</em>
          </span>
        </label>
        <input
          {...register("postedBy")}
          className={
            errors.postedBy ? "form-control is-invalid" : "form-control"
          }
        />
        {errors.postedBy && errors.postedBy.message ? (
          <div className='invalid-feedback'>{errors.postedBy.message}</div>
        ) : null}
      </div>
      <div className='form-group'>
        <label htmlFor='applicationDeadline'>
          Last Date of Submission{" "}
          <span className='text-danger'>
            <em>
              ( *Note - The post will be deleted after Last Date of Application
              or if the post expires )
            </em>
          </span>
        </label>
        <input
          {...register("applicationDeadline")}
          className={
            errors.applicationDeadline
              ? "form-control is-invalid"
              : "form-control"
          }
          type='date'
        />
        {errors.applicationDeadline && errors.applicationDeadline.message ? (
          <div className='invalid-feedback'>
            {errors.applicationDeadline.message}
          </div>
        ) : null}
      </div>
      <div className='form-group form-check'>
        <input
          {...register("terms")}
          className={
            errors.terms ? "form-check-input is-invalid" : "form-check-input"
          }
          type='checkbox'
        ></input>
        <label htmlFor='terms' className='form-check-label'>
          I Agree to Glocal Bodh
          <span>
            <a
              href='/rfpPolicy'
              style={{ color: "#0057A8", textDecoration: "none" }}
              target='_blank'
            >
              {" "}
              Posting Policy
            </a>
          </span>
          ,
          <span>
            <a
              href='/terms'
              style={{ color: "#0057A8", textDecoration: "none" }}
              target='_blank'
            >
              Terms of Service
            </a>
          </span>
          {" and "}
          <span>
            <a
              href='/privacyPolicy'
              style={{ color: "#0057A8", textDecoration: "none" }}
              target='_blank'
            >
              Privacy Policy
            </a>
          </span>
        </label>
        {errors.terms && errors.terms.message ? (
          <div className='invalid-feedback'>{errors.terms.message}</div>
        ) : null}
      </div>
      <div className='form-group mt-2 text-center'>
        <button
          type='submit'
          className='btn btn-primary mt-2 btn-lg'
          disabled={props.isLoading}
        >
          {props.isLoading ? "Please wait..." : "Submit"}
        </button>
      </div>
    </form>
  );
};
function mapStateToProps(state) {
  const { isLoading } = state.loader;
  const { states } = state.states;

  return {
    isLoading,
    states,
  };
}

export default connect(mapStateToProps)(FundingUpdateOld);
