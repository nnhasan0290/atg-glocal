import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";

import { validationSchemaAwardEvent } from "../../../../constants/schema";
import {
  renderCities,
  renderStates,
  onChangeStates,
} from "../../../../services/render-services";
import MyEditor from "../../../../helpers/editor";
import { clearLoader, setLoader } from "../../../../store/actions/loader";
import UserService from "../../../../services/user.service";
import { alertCustom } from "../../../../helpers/alerts";

import { useLocation } from "react-router-dom";
import { S3_CONFIG_AWARDS } from "../../../../constants/variables";
import S3FileUpload from "react-s3";

const AwardEvent = (props) => {
  const [cities, getCities] = useState([]);
  const [posterLink, setPosterLink] = useState("");
  const [judges, setJudges] = useState([
    {
      name: "",
      details: "",
      profilePicUrl: "",
      eventPeopleType: 2,
    },
  ]);
  const [guests, setGuests] = useState([
    {
      name: "",
      details: "",
      profilePicUrl: "",
      eventPeopleType: 3,
    },
  ]);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchemaAwardEvent) });
  const [eventType, setEventType] = useState("");

  const eventTypeFieldRegister = register("eventType", { required: true });

  const handleInputChange = (e, index, type, field) => {
    const { value } = e.target;
    if (type === "judge") {
      const list = [...judges];
      list[index][field] = value;
      setJudges(list);
    } else {
      const list = [...guests];
      list[index][field] = value;
      setGuests(list);
    }
  };

  const handleRemoveClick = (index, type) => {
    if (type === "judge") {
      const list = [...judges];
      list.splice(index, 1);
      setJudges(list);
    } else {
      const list = [...guests];
      list.splice(index, 1);
      setGuests(list);
    }
  };

  const handleAddClick = (type) => {
    console.log(type);
    if (type === "judge") {
      setJudges([
        ...judges,
        {
          name: "",
          details: "",
          profilePicUrl: "",
          eventPeopleType: 2,
        },
      ]);
    } else {
      setGuests([
        ...guests,
        {
          name: "",
          details: "",
          profilePicUrl: "",
          eventPeopleType: 3,
        },
      ]);
    }
  };
  const location = useLocation();

  const onChangeState = (e) => {
    onChangeStates(e.target.value).then((res) => {
      getCities(res.data);
    });
  };
  const onSubmit = (values) => {
    let venue;
    if (values.eventType === "Offline") {
      venue = values.venue;
    } else {
      venue = "Online";
    }
    props.dispatch(setLoader());
    const data = {
      createEventBean: {
        title: values.eventTitle,
        description: values.description,
        eventLink: values.eventLink,
        venue: venue,
        eventTime: new Date(values.eventTime).getTime(),
        applicationDeadline: new Date(values.applicationDeadline).getTime(),
        termsAndConditions: "true",
        postedBy: values.postedBy,
        posterImageLink: posterLink,
        videoLink: values.videoLink,
      },
      eligibilityCriteria: values.eligibilityCriteria,
      guests: guests,
      totalSeats: 0,
      judges: judges,
    };

    UserService.createAwardEvent(data)
      .then((res) => {
        props.dispatch(clearLoader());
        if (res.data.status === 1) {
          alertCustom("success", "Event Successfully Created", "/home");
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
  const uploadImage = (e) => {
    S3FileUpload.uploadFile(e.target.files[0], S3_CONFIG_AWARDS)
      .then((data) => setPosterLink(data.location))
      .catch((err) => {
        alertCustom("error", err.message, "/home");
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mx-auto'>
        <h1>
          Create Awards and Competitions{" "}
          <span className='ms-2 expire-text-box p-2'>
            {location.state.expiryText}
          </span>
          <span className='ms-2 in-review p-2'>
            {location.state.package ? " Premium " : "Standard"}
          </span>
        </h1>
      </div>
      <div className='form-group'>
        <label htmlFor='eventTitle'>Event Title</label>
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

      <div className='form-group'>
        <label htmlFor='description'>
          About Event
          <span className='text-muted'>
            <em>( Event Brief )</em>
          </span>
        </label>
        <Controller
          name='description'
          control={control}
          rules={{ required: true }}
          render={(field) => (
            <MyEditor
              {...field}
              errors={errors}
              className={
                errors.description ? "form-control is-invalid" : "form-control"
              }
            />
          )}
        />
        <small className='text-danger'>
          {errors.description && errors.description.message}
        </small>
      </div>
      <div className='form-group'>
        <label htmlFor='eligibilityCriteria'>Eligibilty Criteria</label>
        <Controller
          name='eligibilityCriteria'
          control={control}
          rules={{ required: true }}
          render={(field, control) => (
            <MyEditor {...control} {...field} errors={errors} />
          )}
        />
        <small className='text-danger'>
          {errors.eligibilityCriteria && errors.eligibilityCriteria.message}
        </small>
      </div>
      <div className='form-group'>
        <label htmlFor='eventTime'>Event Time </label>
        <input
          {...register("eventTime")}
          className={
            errors.eventTime ? "form-control is-invalid" : "form-control"
          }
          type='datetime-local'
        />
        {errors.eventTime && errors.eventTime.message ? (
          <div className='invalid-feedback'>{errors.eventTime.message}</div>
        ) : null}
      </div>

      <div className='form-group'>
        <label htmlFor='Judges'>Judges Details</label>
        {judges.map((x, i) => {
          return (
            <div key={i} className='row mt-2'>
              <div className='col-sm-3'>
                <input
                  className={
                    errors.judgeName
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  placeholder='Enter Name'
                  value={x.name}
                  onChange={(e) => handleInputChange(e, i, "judge", "name")}
                />
              </div>
              <div className='col-sm-3'>
                <input
                  name='judgeDetails'
                  placeholder='Enter Details'
                  value={x.details}
                  className='form-control'
                  onChange={(e) => handleInputChange(e, i, "judge", "details")}
                />
              </div>
              <div className='col-sm-3'>
                <input
                  name='jusdgeProfilePicUrl'
                  placeholder='Enter Profile pic url'
                  value={x.profilePicUrl}
                  className='form-control'
                  onChange={(e) =>
                    handleInputChange(e, i, "judge", "profilePicUrl")
                  }
                />
              </div>
              <div className='col-sm-1'>
                {judges.length - 1 === i && (
                  <button
                    className='btn btn-primary'
                    onClick={() => handleAddClick("judge")}
                  >
                    Add
                  </button>
                )}
              </div>
              <div className='col-1'>
                {judges.length !== 1 && (
                  <button
                    className='btn btn-danger'
                    onClick={() => handleRemoveClick(i, "judge")}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className='form-group'>
        <label htmlFor='Guests'>Guests Details</label>
        {guests.map((x, i) => {
          return (
            <div key={i} className='row mt-2'>
              <div className='col-sm-3'>
                <input
                  name='guestName'
                  className='form-control'
                  placeholder='Enter Name'
                  value={x.name}
                  onChange={(e) => handleInputChange(e, i, "guest", "name")}
                />
              </div>
              <div className='col-sm-3'>
                <input
                  name='guestDetails'
                  placeholder='Enter Details'
                  value={x.details}
                  className='form-control'
                  onChange={(e) => handleInputChange(e, i, "guest", "details")}
                />
              </div>
              <div className='col-sm-3'>
                <input
                  name='guestProfilePicUrl'
                  placeholder='Enter Profile pic url'
                  value={x.profilePicUrl}
                  className='form-control'
                  onChange={(e) =>
                    handleInputChange(e, i, "guest", "profilePicUrl")
                  }
                />
              </div>
              <div className='col-sm-1'>
                {guests.length - 1 === i && (
                  <button
                    className='btn btn-primary'
                    onClick={() => handleAddClick("guest")}
                  >
                    Add
                  </button>
                )}
              </div>
              <div className='col-1'>
                {guests.length !== 1 && (
                  <button
                    className='btn btn-danger'
                    onClick={() => handleRemoveClick(i, "guest")}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* <div className='form-group'>
        <label htmlFor='totalSeats'>Seat Limit</label>
        <input
          {...register("totalSeats")}
          className={
            errors.totalSeats ? "form-control is-invalid" : "form-control"
          }
        />
        {errors.totalSeats && errors.totalSeats.message ? (
          <div className='invalid-feedback'>{errors.totalSeats.message}</div>
        ) : null}
      </div> */}
      <div className='row'>
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
        <div className='row'>
          <label>Venue</label>
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
              {...register("venue")}
            >
              {renderCities(cities)}
            </select>

            <small className='text-danger'>
              {errors.venue && errors.venue.message}
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
      </div>
      <div className='form-group'>
        <label htmlFor='postedBy'>
          Posted By
          <span className='text-muted'>
            <em> ( Name of Organiser/SPOC/Contact Person )</em>
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
        <label htmlFor='posterImageLink'>Upload Poster</label>
        <input type='file' onChange={uploadImage}></input>
      </div>
      <div className='form-group'>
        <label htmlFor='videoLink'>
          Video Link{" "}
          <span className='text-danger'>
            <em> ( *Note - YouTube Link Only )</em>
          </span>
        </label>
        <input
          {...register("videoLink")}
          className={
            errors.videoLink ? "form-control is-invalid" : "form-control"
          }
          defaultValue=''
        />
        {errors.videoLink && errors.videoLink.message ? (
          <div className='invalid-feedback'>{errors.videoLink.message}</div>
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

export default connect(mapStateToProps)(AwardEvent);
