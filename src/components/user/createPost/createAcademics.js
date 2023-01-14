import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";

import { validationSchemaAcademics } from "../../../constants/schema";
import {
  renderCities,
  renderStates,
  onChangeStates,
} from "../../../services/render-services";
import { useLocation } from "react-router-dom";

import { clearLoader, setLoader } from "../../../store/actions/loader";
import UserService from "../../../services/user.service";
import { alertCustom } from "../../../helpers/alerts";

const Academics = (props) => {
  const [cities, getCities] = useState([]);
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchemaAcademics) });
  const [eventType, setEventType] = useState("");

  const eventTypeFieldRegister = register("eventType", { required: true });

  const onChangeState = (e) => {
    onChangeStates(e.target.value).then((res) => {
      getCities(res.data);
    });
  };
  const onSubmit = (values) => {
    let location;
    if (values.eventType === "Offline") {
      location = values.venue;
    } else {
      location = "Online";
    }
    props.dispatch(setLoader());
    const data = {
      title: values.title,
      organisedBy: values.organisedBy,
      externalLink: values.webpageLink,
      location: location,

      applicationDeadline: new Date(values.applicationDeadline).getTime(),
      termsAndConditions: values.terms,
    };

    UserService.createAcademics(data)
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
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mx-auto'>
        <h1>
          Create Academics{" "}
          <span className='ms-2 expire-text-box p-2'>
            {location.state.expiryText}
          </span>
          <span className='ms-2 in-review p-2'>
            {location.state.package ? " Premium " : "Standard"}
          </span>{" "}
        </h1>
      </div>
      <div className='form-group'>
        <label htmlFor='title'>Title</label>
        <input
          className={errors.title ? "form-control is-invalid" : "form-control"}
          type='text'
          {...register("title")}
        />
        {errors.title && errors.title.message ? (
          <div className='invalid-feedback'>{errors.title.message}</div>
        ) : null}
      </div>

      <div className='form-group'>
        <label htmlFor='organisedBy'>
          Organised By{" "}
          <span className='text-muted'>
            <em>( Name of Organising Company/Organisation )</em>
          </span>
        </label>
        <input
          className={
            errors.organisedBy ? "form-control is-invalid" : "form-control"
          }
          type='text'
          {...register("organisedBy")}
        />
        {errors.organisedBy && errors.organisedBy.message ? (
          <div className='invalid-feedback'>{errors.organisedBy.message}</div>
        ) : null}
      </div>

      <div className='row mt-2'>
        <label>Event Type</label>
        <div className='col-3 form-group'>
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
            <option value='Online' label='Online' />;
            <option value='Offline' label='Offline' />;
          </select>
          <small className='text-danger'>
            {errors.eventType && errors.eventType.message}
          </small>
        </div>
      </div>
      {eventType === "Offline" && (
        <div className='row mt-2'>
          <label>Location</label>
          <div className='col-6 form-group'>
            <select onChange={onChangeState} className='form-select'>
              {renderStates(props.states)}
            </select>
          </div>
          <div className='col-6 form-group'>
            <select
              className={
                errors.location ? "form-select is-invalid" : "form-select"
              }
              {...register("location")}
            >
              {renderCities(cities)}
            </select>

            <small className='text-danger'>
              {errors.location && errors.locartion.message}
            </small>
          </div>
        </div>
      )}
      <div className='form-group'>
        <label htmlFor='webpageLink'>Link to web-page</label>
        <input
          {...register("webpageLink")}
          className={
            errors.webpageLink ? "form-control is-invalid" : "form-control"
          }
        />
        {errors.webpageLink && errors.webpageLink.message ? (
          <div className='invalid-feedback'>{errors.webpageLink.message}</div>
        ) : null}
      </div>

      <div className='form-group'>
        <label htmlFor='applicationDeadline'>
          Application Deadline
          <span className='text-danger'>
            <em>
              {" "}
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

export default connect(mapStateToProps)(Academics);
